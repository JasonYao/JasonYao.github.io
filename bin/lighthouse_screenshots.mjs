import { mkdir, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const reportsDirectory = resolve('.lighthouseci');
const screenshotsDirectory = resolve(process.argv[2] ?? '.lighthouseci/screenshots');
const reportNames = (await readdir(reportsDirectory))
  .filter((name) => /^lhr-\d+(-\d+)?\.json$/.test(name))
  .sort();
const reportsByUrl = new Map();

for (const name of reportNames) {
  const report = JSON.parse(await readFile(resolve(reportsDirectory, name), 'utf8'));
  const url = report.requestedUrl ?? report.finalUrl;
  const performanceScore = report.categories?.performance?.score;
  if (!url || typeof performanceScore !== 'number') continue;

  const reports = reportsByUrl.get(url) ?? [];
  reports.push({ name, performanceScore });
  reportsByUrl.set(url, reports);
}

const reports = [...reportsByUrl.entries()].map(([url, runs]) => {
  runs.sort((left, right) => left.performanceScore - right.performanceScore);
  return { url, name: runs[Math.floor(runs.length / 2)].name.replace(/\.json$/, '.html') };
});

if (reports.length === 0) {
  throw new Error(`No Lighthouse JSON reports with performance scores found in ${reportsDirectory}`);
}

await mkdir(screenshotsDirectory, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
  env: Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key !== 'DEPLOY_ACCESS_TOKEN'),
  ),
});
try {
  for (const { name } of reports) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(resolve(reportsDirectory, name)).href, {
      waitUntil: 'load',
      timeout: 30_000,
    });
    await page.waitForFunction(() => document.body.innerText.trim().length > 0, {
      timeout: 30_000,
    });
    await new Promise((resolve) => setTimeout(resolve, 1_000));
    await page.screenshot({
      path: resolve(screenshotsDirectory, name.replace(/\.html$/, '.png')),
    });
    await page.close();
  }
} finally {
  await browser.close();
}
