/**
 * Adds in support for easy copying of text in code fences
 * to all pages.
 * Original code from https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/
 */

 function addCopyButtons(clipboard) {
    document.querySelectorAll('pre > code').forEach(function (codeBlock) {
       // With line numbers turned on, this will actually break.
       // hack for now to identify if the block just has the line
       // number, and then not adding in the copy button
       if (codeBlock.firstChild.innerText.trim() === "1") {
         return;
       }

        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = 'Copy';

        button.addEventListener('click', function () {
            clipboard.writeText(codeBlock.innerText).then(function () {
                /* Chrome doesn't seem to blur automatically,
                   leaving the button in a focused state. */
                button.blur();

                button.innerText = 'Copied!';

                setTimeout(function () {
                    button.innerText = 'Copy';
                }, 2000);
            }, function (error) {
                button.innerText = 'Error';
            });
        });

        var pre = codeBlock.parentNode;
        if (pre.parentNode.classList.contains('highlight')) {
            var highlight = pre.parentNode;
            highlight.parentNode.insertBefore(button, highlight);
        } else {
            pre.parentNode.insertBefore(button, pre);
        }
    });
}

if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
} else {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/3.0.2/promise/clipboard-polyfill.promise.min.js';
    script.integrity = 'sha512-O9Q+AhI1w7LT1/tHysPWDwwrgB1fKJ/nXPNLC30i8LF6RdSz4dGZyWB9WySag3DZMdGuK5yHJEdKXMKI2m5uSQ==';
    script.crossOrigin = 'anonymous';
    script.onload = function() {
        addCopyButtons(clipboard);
    };

    document.body.appendChild(script);
}
