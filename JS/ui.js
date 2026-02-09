/* Clock */
function updateClock() {
    const clockEl = document.getElementById('macClock');
    if (!clockEl) return;
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    clockEl.textContent = now.toLocaleDateString('en-US', options).replace(',', '');
}

/* Theme */
function setupTheme() {
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeToggleDock');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) root.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const current = root.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
}

/* Dock */
function setupDock() {
    // Dock hover effects are handled by CSS in components.css
    // The previous JS implementation conflicted with CSS transitions
}

/* Reveal */
function setupReveal() {
    const revealTargets = document.querySelectorAll('.reveal');
    if (revealTargets.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        revealTargets.forEach(el => io.observe(el));
    }
}

/* Skills */
function setupSkills() {
    document.querySelectorAll('.skill-pill').forEach(p => {
        p.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                const open = p.classList.toggle('open');
                p.setAttribute('aria-expanded', String(open));
            }
        });
    });
}

/* Contact */
function setupContact() {
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                contactCard.classList.toggle('open');
            }
        });
    }
}

/* I18N */
function i18nSet(lang) {
    const dict = I18N[lang] || I18N.es;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const txt = key.split('.').reduce((o, k) => o && o[k], dict);
        if (typeof txt === 'string') el.textContent = txt;
    });
}

function setupI18N() {
    const langSel = document.getElementById('langSelect');
    const prefLang = localStorage.getItem('lang') || (navigator.language || 'es').slice(0, 2);
    if (langSel) {
        if ([...langSel.options].some(o => o.value === prefLang)) langSel.value = prefLang;
        i18nSet(langSel.value);
        langSel.addEventListener('change', () => {
            const v = langSel.value;
            localStorage.setItem('lang', v);
            i18nSet(v);
        });
    } else {
        i18nSet(prefLang);
    }
}

/* Links */
function setupLinks() {
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    });
}

/* Logo Tooltips */
function setupLogoTooltips() {
    const logos = document.querySelectorAll('.logo-row img, .pill-body img, .exp-logo, .contact-compact .ic img, .contact-expanded img');
    logos.forEach(img => {
        // Use alt text as title (native tooltip)
        if (img.alt && !img.title) {
            img.title = img.alt;
        }
    });
}
