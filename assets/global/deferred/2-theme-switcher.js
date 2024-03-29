// Copied from themes/anatole/assets/js/anatole-theme-switcher.js so we could add in a high contrast mode
// initialize default value
function getTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
}

function setTheme(style) {
    document.documentElement.setAttribute('data-theme', style);
    localStorage.setItem('theme', style);
}

function init() {
    // initialize default value
    const theme = getTheme();

    // check if a preferred color theme is set for users that have never been to our site
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === null) {
        if (userPrefersDark) {
            setTheme('dark');
        } else if (!document.documentElement.getAttribute('data-theme')) {
            setTheme('light');
        } else {
            setTheme(document.documentElement.getAttribute('data-theme'));
        }
    } else {
        // load a stored theme
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (theme === 'high-contrast') {
            document.documentElement.setAttribute('data-theme', 'high-contrast');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
}


// switch themes
function switchTheme() {
    const theme = getTheme();
    if (theme === 'light') {
        setTheme('dark');
    } else if (theme === 'dark') {
        setTheme('high-contrast')
    } else {
        setTheme('light');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.theme-switch');
    themeSwitcher.addEventListener('click', switchTheme, false);
}, false);

init();
