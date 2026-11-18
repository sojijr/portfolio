const themeButton = document.getElementById('themeButton');
const body = document.body;

const THEME_KEY = 'soji-theme';

function applyTheme(theme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
    document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        /* storage can be unavailable in private mode */
    }
}

function currentTheme() {
    return body.classList.contains('dark-mode') ? 'dark' : 'light';
}

function toggleTheme() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        if (document.startViewTransition) {
            document.startViewTransition(toggleTheme);
        } else {
            toggleTheme();
        }
    });
}

(function restoreTheme() {
    let stored = null;
    try {
        stored = localStorage.getItem(THEME_KEY);
    } catch (error) {
        stored = null;
    }

    if (stored === 'dark' || stored === 'light') {
        applyTheme(stored);
        return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
})();

const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const todayEl = document.getElementById('today');
if (todayEl) {
    todayEl.textContent = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
