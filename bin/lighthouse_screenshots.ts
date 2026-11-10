const reportsDirectory = `${process.cwd()}/.lighthouseci`;
const screenshotsDirectory = `${reportsDirectory}/screenshots`;
const reportNames = (await Array.fromAsync(new Bun.Glob('lhr-*.json').scan(reportsDirectory)))
  .filter((name) => /^lhr-\d+(-\d+)?\.json$/.test(name))
  .sort();
const reportsByUrl = new Map<string, Array<{ name: string; score: number }>>();

for (const name of reportNames) {
  const report = await Bun.file(`${reportsDirectory}/${name}`).json();
  const url = report.requestedUrl ?? report.finalUrl;
  const score = report.categories?.performance?.score;
  if (!url || typeof score !== 'number') continue;

  const reports = reportsByUrl.get(url) ?? [];
  reports.push({ name, score });
  reportsByUrl.set(url, reports);
}

const reports = [...reportsByUrl.values()].map((runs) => {
  runs.sort((left, right) => left.score - right.score);
  return runs[Math.floor(runs.length / 2)].name.replace(/\.json$/, '.html');
});

if (reports.length === 0) {
  throw new Error(`No Lighthouse JSON reports with performance scores found in ${reportsDirectory}`);
}

const chromePath = Bun.which('google-chrome') ?? Bun.which('chromium') ?? Bun.which('chromium-browser');
if (!chromePath) throw new Error('Could not find a Chrome or Chromium executable');

const mkdir = Bun.spawn(['mkdir', '-p', screenshotsDirectory], { stdout: 'ignore', stderr: 'ignore' });
if (await mkdir.exited !== 0) throw new Error(`Could not create ${screenshotsDirectory}`);

const temp = Bun.spawn(['mktemp', '-d'], { stdout: 'pipe', stderr: 'inherit' });
const userDataDirectory = (await temp.stdout.text()).trim();
if (await temp.exited !== 0 || !userDataDirectory) throw new Error('Could not create a temporary Chrome profile');

const browser = Bun.spawn([
  chromePath,
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--remote-debugging-port=0',
  `--user-data-dir=${userDataDirectory}`,
  'about:blank',
], {
  env: Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key !== 'DEPLOY_ACCESS_TOKEN'),
  ),
  stdout: 'ignore',
  stderr: 'pipe',
});

let socket: WebSocket | undefined;
try {
  let resolveDevTools!: (url: string) => void;
  const devToolsReady = new Promise<string>((resolve) => { resolveDevTools = resolve; });
  void (async () => {
    const reader = browser.stderr.getReader();
    const decoder = new TextDecoder();
    let output = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      output = (output + decoder.decode(value)).slice(-4096);
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) resolveDevTools(match[1]);
    }
  })();
  const devToolsUrl = await Promise.race([
    devToolsReady,
    Bun.sleep(15_000).then(() => { throw new Error('Timed out waiting for Chrome DevTools'); }),
  ]);
  const port = new URL(devToolsUrl).port;
  const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!targetResponse.ok) throw new Error(`Chrome could not create a tab: HTTP ${targetResponse.status}`);
  const target = await targetResponse.json();

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise<void>((resolve, reject) => {
    socket!.addEventListener('open', () => resolve(), { once: true });
    socket!.addEventListener('error', () => reject(new Error('Could not connect to Chrome DevTools')), { once: true });
  });

  let nextId = 0;
  const pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>();
  const loadListeners: Array<() => void> = [];
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data as string);
    if (message.method === 'Page.loadEventFired') {
      loadListeners.splice(0).forEach((resolve) => resolve());
    }
    if (message.id !== undefined) {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    }
  });

  function send(method: string, params: Record<string, unknown> = {}) {
    const id = ++nextId;
    return new Promise<any>((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket!.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  for (const report of reports) {
    const loadComplete = new Promise<void>((resolve) => loadListeners.push(resolve));
    const reportPath = `${reportsDirectory}/${report}`;
    await send('Page.navigate', { url: `file://${encodeURI(reportPath)}` });
    await Promise.race([
      loadComplete,
      Bun.sleep(30_000).then(() => { throw new Error(`Timed out loading ${report}`); }),
    ]);

    for (let attempt = 0; attempt < 100; attempt++) {
      const result = await send('Runtime.evaluate', {
        expression: 'document.body.innerText.trim().length > 0',
        returnByValue: true,
      });
      if (result.result.value) break;
      if (attempt === 99) throw new Error(`Lighthouse report did not render: ${report}`);
      await Bun.sleep(100);
    }

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const binary = atob(screenshot.data);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    await Bun.write(`${screenshotsDirectory}/${report.replace(/\.html$/, '.png')}`, bytes);
  }
} finally {
  socket?.close();
  browser.kill();
  const cleanup = Bun.spawn(['rm', '-rf', userDataDirectory], { stdout: 'ignore', stderr: 'ignore' });
  await cleanup.exited;
}
