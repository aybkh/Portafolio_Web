function initTheme() {
    /* Año */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Tema */
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) root.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', e => {
            e.stopPropagation();
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);

            const icon = themeBtn.querySelector('i');
            if (icon) icon.textContent = next === 'light' ? '' : '';
        });

        const current = root.getAttribute('data-theme') || 'dark';
        const icon = themeBtn.querySelector('i');
        if (icon) icon.textContent = current === 'light' ? '' : '';
    }
}
