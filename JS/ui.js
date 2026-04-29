/* ═══════════════════════════════════════════════
   CLOCK
═══════════════════════════════════════════════ */
/* Clock and Battery functions moved to system.js */

/* ═══════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════ */
function applyTheme(theme, skipWallpaper = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const isDark = theme !== 'light';
    const label1 = document.getElementById('themeToggleLabel');
    const label2 = document.getElementById('ccThemeLabel');
    const aboutVal = document.getElementById('aboutThemeVal');
    
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const dict = I18N[lang] || I18N.es;
    
    if (label1) label1.textContent = isDark ? (dict.system.light_mode || 'Modo Claro') : (dict.system.dark_mode || 'Modo Oscuro');
    if (label2) label2.textContent = isDark ? (dict.system.light || 'Claro') : (dict.system.dark || 'Oscuro');
    if (aboutVal) aboutVal.textContent = isDark ? (dict.system.dark || 'Oscuro') : (dict.system.light || 'Claro');

    if (skipWallpaper) return;

    // Theme-aware Wallpapers
    const lightWallpapers = ["img/macos-mojave-day.webp", "img/macos-monterey-day.webp", "img/macos-monterey-day2.webp", "img/macos_catalina.webp", "img/macos_bigsur.webp"];
    const darkWallpapers = ["img/macos-mojave-night.webp", "img/macos-sequoia-night.webp", "img/macos_tahoe.webp"];

    const wallList = theme === 'light' ? lightWallpapers : darkWallpapers;
    const randomWall = wallList[Math.floor(Math.random() * wallList.length)];
    
    document.body.style.backgroundImage = `url('${randomWall}')`;
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) loginScreen.style.backgroundImage = `url('${randomWall}')`;
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
}

function setupTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }

    // Dock button
    const themeBtn = document.getElementById('themeToggleDock');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    // View menu toggle
    const menuToggle = document.getElementById('menuThemeToggle');
    if (menuToggle) menuToggle.addEventListener('click', () => { toggleTheme(); closeAllDropdowns(); });

    // Control Center toggle
    const ccToggle = document.getElementById('ccTheme');
    if (ccToggle) ccToggle.addEventListener('click', () => toggleTheme());

    // Control + T shortcut support (handled in setupKeyboard)
}

/* ═══════════════════════════════════════════════
   DOCK (CSS-driven, minimal JS)
═══════════════════════════════════════════════ */
function setupDock() {
    // Magnification is CSS-driven
}

/* ═══════════════════════════════════════════════
   REVEAL
═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════ */
function setupSkills() {
    const btns = document.querySelectorAll('.skill-cat-btn');
    const groups = document.querySelectorAll('.skills-group');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (!target) return;

            // Update buttons
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update groups
            groups.forEach(g => {
                if (g.id === target) {
                    g.classList.add('active');
                } else {
                    g.classList.remove('active');
                }
            });
            
            // Mobile scroll to top of display
            if (window.innerWidth <= 900) {
                const display = document.querySelector('.skills-display');
                if (display) display.scrollTop = 0;
            }
        });
    });
}

/* ═══════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════
   I18N
═══════════════════════════════════════════════ */
const LANG_META = {
    es: { icon: 'img/icons/es.svg', code: 'ES' },
    en: { icon: 'img/icons/en.svg', code: 'EN' },
    ca: { icon: 'img/icons/ca.svg', code: 'CAT' },
    fr: { icon: 'img/icons/fr.svg', code: 'FR' },
    de: { icon: 'img/icons/de.svg', code: 'DE' },
};

function i18nSet(lang) {
    const dict = I18N[lang] || I18N.es;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const txt = key.split('.').reduce((o, k) => o && o[k], dict);
        if (typeof txt === 'string') el.textContent = txt;
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        const txt = key.split('.').reduce((o, k) => o && o[k], dict);
        if (typeof txt === 'string') el.placeholder = txt;
    });
    // Update custom lang button display
    const meta = LANG_META[lang] || LANG_META.es;
    const flagEl = document.getElementById('langFlag');
    const codeEl = document.getElementById('langCode');
    if (flagEl) flagEl.src = meta.icon;
    if (codeEl) codeEl.textContent = meta.code;

    // Update CV links based on language
    const cvMap = {
        ca: 'data/cv_ayoub_es.pdf', // Defaulting to ES if CAT doesn't exist
        es: 'data/cv_ayoub_es.pdf',
        en: 'data/cv_ayoub_es.pdf'  // Defaulting to ES if EN doesn't exist
    };
    const cvPath = cvMap[lang] || cvMap.es;
    document.querySelectorAll('.cv-link').forEach(a => {
        a.href = cvPath;
    });

    // Update the Iframe source if it's already open or for next time
    const cvIframe = document.getElementById('cvIframe');
    if (cvIframe && cvIframe.src) {
        cvIframe.src = cvPath;
    }

    // Update Spotlight data
    if (typeof SPOTLIGHT_DATA !== 'undefined') {
        const dict = I18N[lang] || I18N.es;
        SPOTLIGHT_DATA.forEach(item => {
            const title = item.titleKey ? item.titleKey.split('.').reduce((o, k) => o && o[k], dict) : item.title;
            if (title === dict.system.download_cv || title === dict.system.print_cv) {
                item.href = cvPath;
            }
        });
    }

    // Update dynamic battery text for current language
    if (typeof updateBatteryStatus === 'function') {
        updateBatteryStatus();
    }

    // Refresh theme labels for the new language
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (typeof applyTheme === 'function') {
        applyTheme(currentTheme, true);
    }
}

function setupI18N() {
    const prefLang = localStorage.getItem('lang') || (navigator.language || 'es').slice(0, 2);
    const validLang = LANG_META[prefLang] ? prefLang : 'es';
    i18nSet(validLang);

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('lang', lang);
            i18nSet(lang);
            closeAllDropdowns();
        });
    });
}

/* ═══════════════════════════════════════════════
   LINKS — prevent empty hrefs
═══════════════════════════════════════════════ */
function setupLinks() {
    document.querySelectorAll('a[href=""], a[href="#"]').forEach(a => {
        if (!a.closest('[href^="#"]')) return; // allow anchor links
        a.addEventListener('click', e => {
            e.preventDefault();
        });
    });
}

/* ═══════════════════════════════════════════════
   LOGO TOOLTIPS
═══════════════════════════════════════════════ */
function setupLogoTooltips() {
    const logos = document.querySelectorAll('.logo-row img, .pill-body img, .exp-logo, .contact-compact .ic img, .contact-expanded img');
    logos.forEach(img => {
        if (img.alt && !img.title) {
            img.title = img.alt;
        }
    });
}

/* ═══════════════════════════════════════════════
   macOS MENU BAR — Dropdowns
═══════════════════════════════════════════════ */
function closeAllDropdowns() {
    document.querySelectorAll('.mac-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const btn = d.previousElementSibling;
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    // Close control center
    const cc = document.getElementById('controlCenterPanel');
    if (cc) cc.classList.remove('open');
    // Close lang dropdown
    const ld = document.getElementById('langDropdown');
    const lb = document.getElementById('langBtn');
    if (ld) ld.classList.remove('open');
    if (lb) lb.setAttribute('aria-expanded', 'false');
}

function setupMenubar() {
    // All menu buttons that open a mac-dropdown
    const menuMap = [
        { btnId: 'menu-apple',     dropId: 'drop-apple' },
        { btnId: 'menu-file',      dropId: 'drop-file' },
        { btnId: 'menu-edit',      dropId: 'drop-edit' },
        { btnId: 'menu-view',      dropId: 'drop-view' },
        { btnId: 'menu-go',        dropId: 'drop-go' },
        { btnId: 'menu-window',    dropId: 'drop-window' },
        { btnId: 'menu-help',      dropId: 'drop-help' },
        { btnId: 'clockBtn',       dropId: 'drop-calendar' },
        { btnId: 'batteryBtn',     dropId: 'drop-battery' },
        { btnId: 'wifiBtn',        dropId: 'drop-wifi' },
    ];

    menuMap.forEach(({ btnId, dropId }) => {
        const btn = document.getElementById(btnId);
        const drop = document.getElementById(dropId);
        if (!btn || !drop) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = drop.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) {
                drop.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        // Hover: open on hover if another menu is already open
        btn.addEventListener('mouseenter', () => {
            const anyOpen = document.querySelector('.mac-dropdown.open');
            if (anyOpen && !drop.classList.contains('open')) {
                closeAllDropdowns();
                drop.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item-wrap') &&
            !e.target.closest('.lang-wrap') &&
            !e.target.closest('.control-center')) {
            closeAllDropdowns();
        }
    });

    // Special actions
    const printBtn = document.getElementById('menuPrint');
    if (printBtn) printBtn.addEventListener('click', () => { closeAllDropdowns(); window.print(); });

    const fullscreenBtn = document.getElementById('menuFullscreen');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => {
        closeAllDropdowns();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    const ccFullscreen = document.getElementById('ccFullscreen');
    if (ccFullscreen) ccFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // Edit menu — copy to clipboard
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            navigator.clipboard.writeText(text).then(() => showToast(`✓ Copiado: ${text}`));
            closeAllDropdowns();
        });
    });

    // Anchor links inside dropdowns close menu
    document.querySelectorAll('.mac-dropdown a[href^="#"]').forEach(a => {
        a.addEventListener('click', () => closeAllDropdowns());
    });
}

/* ═══════════════════════════════════════════════
   LANGUAGE DROPDOWN (custom)
═══════════════════════════════════════════════ */
function setupLangDropdown() {
    const btn = document.getElementById('langBtn');
    const drop = document.getElementById('langDropdown');
    if (!btn || !drop) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = drop.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
            drop.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
}

/* ═══════════════════════════════════════════════
   CONTROL CENTER
═══════════════════════════════════════════════ */
function setupControlCenter() {
    const btn = document.getElementById('controlCenterBtn');
    const panel = document.getElementById('controlCenterPanel');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) panel.classList.add('open');
    });

    // Brightness slider
    const slider = document.getElementById('brightnessSlider');
    const overlay = document.getElementById('brightnessOverlay');
    if (slider && overlay) {
        slider.addEventListener('input', () => {
            // Slider 30 to 100
            // Overlay opacity 0.7 to 0
            const val = slider.value;
            const opacity = (100 - val) / 100;
            overlay.style.opacity = opacity;
        });
    }
}

/* ═══════════════════════════════════════════════
   BATTERY
═══════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════
   SPOTLIGHT
═══════════════════════════════════════════════ */
const SPOTLIGHT_DATA = [
    { titleKey: 'nav.home',       subKey: 'system.main_section', icon: '🏠', href: '#hero' },
    { titleKey: 'sections.exp',   subKey: 'sections.exp_desc',   icon: '💼', href: '#experiencia' },
    { titleKey: 'sections.sk',    subKey: 'sections.sk_desc',    icon: '⭐', href: '#skills' },
    { titleKey: 'sections.proj',  subKey: 'sections.proj_desc',  icon: '📁', href: '#proyectos' },
    { titleKey: 'sections.contact',subKey: 'sections.contact_desc',icon: '✉️', href: '#contacto' },
    { titleKey: 'system.download_cv', subKey: 'system.curr_pdf', icon: '📄', isCV: true },
    { titleKey: 'system.print_cv',    subKey: 'system.curr_pdf', icon: '🖨️', isCV: true },
    { titleKey: 'contact.github',     sub: 'github.com/aybkh',   icon: '🐙', href: 'https://github.com/aybkh', external: true },
    { titleKey: 'contact.linkedin',   sub: 'linkedin.com/in/ayoub-jerari', icon: '💼', href: 'https://linkedin.com/in/ayoub-jerari', external: true },
    { titleKey: 'contact.whatsapp',   sub: '+34 631 714 568',    icon: '💬', href: 'https://wa.me/34631714568', external: true },
    { titleKey: 'menubar.copy_email', sub: 'ayoubjerari47@gmail.com',  icon: '📧', href: 'mailto:ayoubjerari47@gmail.com' },
    { title: 'Snack Tanger POS',      subKey: 'system.tpv_desc', icon: '🍔', href: '#proyectos' },
    { title: 'Hotel Management',      sub: 'Python + PostgreSQL',icon: '🏨', href: '#proyectos' },
    { title: 'ERAY Slasher',          sub: 'Unity Roguelite',    icon: '🎮', href: '#proyectos' },
];

function updateBodyScroll() {
    const anyModalOpen = document.querySelector('.mac-modal-overlay.open, .spotlight-overlay.open');
    if (anyModalOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
}

function openSpotlight() {
    const overlay = document.getElementById('spotlightOverlay');
    const input = document.getElementById('spotlightInput');
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => { if (input) input.focus(); }, 100);
    renderSpotlightResults('');
    updateBodyScroll();
}

function closeSpotlight() {
    const overlay = document.getElementById('spotlightOverlay');
    const input = document.getElementById('spotlightInput');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (input) input.value = '';
    const results = document.getElementById('spotlightResults');
    if (results) results.innerHTML = '';
    updateBodyScroll();
}

function renderSpotlightResults(query) {
    const container = document.getElementById('spotlightResults');
    if (!container) return;

    const q = query.toLowerCase().trim();
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const dict = I18N[lang] || I18N.es;

    const filtered = q
        ? SPOTLIGHT_DATA.filter(item => {
            const title = item.titleKey ? item.titleKey.split('.').reduce((o, k) => o && o[k], dict) : item.title;
            const sub = item.subKey ? item.subKey.split('.').reduce((o, k) => o && o[k], dict) : item.sub;
            return (title && title.toLowerCase().includes(q)) || (sub && sub.toLowerCase().includes(q));
        })
        : SPOTLIGHT_DATA.slice(0, 8);

    if (filtered.length === 0) {
        container.innerHTML = `<div class="sp-category">${dict.system.no_results}</div>`;
        return;
    }

    container.innerHTML = (q ? '' : `<div class="sp-category">${dict.system.suggestions}</div>`) +
        filtered.map((item, i) => {
            const title = item.titleKey ? item.titleKey.split('.').reduce((o, k) => o && o[k], dict) : item.title;
            const sub = item.subKey ? item.subKey.split('.').reduce((o, k) => o && o[k], dict) : item.sub;
            
            const href = item.isCV ? 'javascript:void(0)' : (item.href || '#');
            const attr = item.isCV ? 'class="sp-result cv-btn-open"' : `class="sp-result${i === 0 ? ' active' : ''}"`;

            return `
            <a ${attr}
               href="${href}"
               ${item.external ? 'target="_blank" rel="noopener"' : ''}
               data-idx="${i}">
              <div class="sp-result-icon">${item.icon}</div>
              <div class="sp-result-text">
                <div class="sp-result-title">${title}</div>
                <div class="sp-result-sub">${sub}</div>
              </div>
            </a>
        `}).join('');

    // Click closes spotlight and handles CV
    container.querySelectorAll('.sp-result').forEach(el => {
        el.addEventListener('click', (e) => {
            if (el.classList.contains('cv-btn-open')) {
                e.preventDefault();
                // This will be handled by the global cv-btn-open listener if we ensure it's attached
                // But since spotlight is dynamic, we might need to trigger it manually
                if (typeof openCV === 'function') openCV();
            }
            closeSpotlight();
        });
    });
}

function setupSpotlight() {
    const overlay = document.getElementById('spotlightOverlay');
    const input = document.getElementById('spotlightInput');
    const spotBtn = document.getElementById('spotlightBtn');

    if (spotBtn) spotBtn.addEventListener('click', (e) => { e.stopPropagation(); openSpotlight(); });

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSpotlight();
        });
    }

    if (input) {
        input.addEventListener('input', () => renderSpotlightResults(input.value));

        let activeIdx = 0;
        input.addEventListener('keydown', (e) => {
            const results = document.querySelectorAll('.sp-result');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                results[activeIdx]?.classList.remove('active');
                activeIdx = Math.min(activeIdx + 1, results.length - 1);
                results[activeIdx]?.classList.add('active');
                results[activeIdx]?.scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                results[activeIdx]?.classList.remove('active');
                activeIdx = Math.max(activeIdx - 1, 0);
                results[activeIdx]?.classList.add('active');
                results[activeIdx]?.scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                results[activeIdx]?.click();
            }
        });
    }
}

/* ═══════════════════════════════════════════════
   ABOUT MODAL
═══════════════════════════════════════════════ */
function setupAboutModal() {
    const openBtn = document.getElementById('openAbout');
    const overlay = document.getElementById('aboutOverlay');
    const closeBtn = document.getElementById('aboutClose');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            closeAllDropdowns();
            if (overlay) { 
                overlay.classList.add('open'); 
                overlay.setAttribute('aria-hidden', 'false'); 
                updateBodyScroll();
            }
            // Sync theme label
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const aboutThemeVal = document.getElementById('aboutThemeVal');
            if (aboutThemeVal) aboutThemeVal.textContent = isDark ? 'Oscuro' : 'Claro';
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        updateBodyScroll();
    });

    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            updateBodyScroll();
        }
    });
}

/* ═══════════════════════════════════════════════
   SHORTCUTS MODAL
═══════════════════════════════════════════════ */
function setupShortcutsModal() {
    const openBtn = document.getElementById('menuShortcuts');
    const overlay = document.getElementById('shortcutsOverlay');
    const closeBtn = document.getElementById('shortcutsClose');

    if (openBtn) openBtn.addEventListener('click', () => {
        closeAllDropdowns();
        if (overlay) { 
            overlay.classList.add('open'); 
            overlay.setAttribute('aria-hidden', 'false'); 
            updateBodyScroll();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        updateBodyScroll();
    });

    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            updateBodyScroll();
        }
    });
}

/* ═══════════════════════════════════════════════
   CV MODAL (PDF Viewer)
   ═══════════════════════════════════════════════ */
function openCV() {
    const overlay = document.getElementById('cvOverlay');
    const iframe = document.getElementById('cvIframe');
    if (!overlay || !iframe) return;
    
    // Get current language and path
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const cvMap = {
        ca: 'data/cv_ayoub_es.pdf',
        es: 'data/cv_ayoub_es.pdf',
        en: 'data/cv_ayoub_es.pdf'
    };
    const cvPath = cvMap[lang] || cvMap.es;

    // Fetch and create a Blob URL to hide the real path
    fetch(cvPath)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            iframe.src = blobUrl;
            
            // Cleanup the blob URL when closing
            overlay.setAttribute('data-blob-url', blobUrl);
        })
        .catch(err => {
            console.error("Error loading PDF:", err);
            // Fallback to direct path if fetch fails
            iframe.src = cvPath;
        });

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    closeAllDropdowns();
    updateBodyScroll();
}

function closeCV() {
    const overlay = document.getElementById('cvOverlay');
    const iframe = document.getElementById('cvIframe');
    if (!overlay || !iframe) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    updateBodyScroll();
    
    // Revoke the blob URL to free memory
    const blobUrl = overlay.getAttribute('data-blob-url');
    if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        overlay.removeAttribute('data-blob-url');
    }
    
    iframe.src = ''; 
}

function setupCVModal() {
    const closeBtn = document.getElementById('cvClose');
    const maxBtn = document.getElementById('cvMaximize');
    const modal = document.querySelector('.cv-modal');

    // Attach to all buttons with class cv-btn-open
    document.querySelectorAll('.cv-btn-open').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCV();
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCV);

    const overlay = document.getElementById('cvOverlay');
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeCV();
    });

    if (maxBtn && modal) {
        maxBtn.addEventListener('click', () => {
            modal.classList.toggle('maximized');
        });
    }
}

/* ═══════════════════════════════════════════════
   KEYBOARD SHORTCUTS
═══════════════════════════════════════════════ */
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        const isMod = e.ctrlKey || e.metaKey;

        // Ctrl+K — Spotlight
        if (isMod && e.key === 'k') {
            e.preventDefault();
            const overlay = document.getElementById('spotlightOverlay');
            overlay?.classList.contains('open') ? closeSpotlight() : openSpotlight();
        }

        // Ctrl+P — Print
        if (isMod && e.key === 'p') {
            e.preventDefault();
            window.print();
        }

        // Ctrl+D — Download/Open CV
        if (isMod && e.key === 'd') {
            e.preventDefault();
            if (typeof openCV === 'function') openCV();
        }

        // Ctrl+I — About
        if (isMod && e.key === 'i') {
            e.preventDefault();
            const aboutBtn = document.getElementById('openAbout');
            aboutBtn?.click();
        }

        // Ctrl+L or Shift+Ctrl+Q — Logout
        if ((isMod && e.key === 'l') || (isMod && e.shiftKey && e.key === 'q')) {
            e.preventDefault();
            if (typeof handleLogout === 'function') handleLogout();
        }

        // Esc — Close all
        if (e.key === 'Escape') {
            const spotOrb = document.getElementById('spotlightOverlay');
            if (spotOrb?.classList.contains('open')) {
                closeSpotlight();
                return;
            }
            document.querySelectorAll('.mac-modal-overlay.open').forEach(m => {
                m.classList.remove('open');
                m.setAttribute('aria-hidden', 'true');
            });
            closeAllDropdowns();
            updateBodyScroll();
        }
    });
}

/* ═══════════════════════════════════════════════
   COPY TOAST
═══════════════════════════════════════════════ */
function showToast(msg) {
    let toast = document.getElementById('copyToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copyToast';
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ═══════════════════════════════════════════════
   BATTERY
   ═══════════════════════════════════════════════ */
/* System logic moved to system.js */

/* ═══════════════════════════════════════════════
   CONTEXT MENU
   ═══════════════════════════════════════════════ */
function setupContextMenu() {
    const menu = document.getElementById('macContextMenu');
    if (!menu) return;

    document.addEventListener('contextmenu', (e) => {
        // Don't show if clicking on interactive elements that might need native menu
        if (e.target.closest('input, textarea, [contenteditable="true"]')) return;
        
        e.preventDefault();
        
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const menuW = menu.offsetWidth || 180;
        const menuH = menu.offsetHeight || 200;
        
        let x = e.clientX;
        let y = e.clientY;
        
        // Prevent overflow
        if (x + menuW > winW) x -= menuW;
        if (y + menuH > winH) y -= menuH;
        
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.display = 'flex';
    });

    document.addEventListener('click', () => {
        menu.style.display = 'none';
    });

    // Sub-actions in the menu
    const ctxAbout = document.getElementById('ctxAbout');
    const ctxTheme = document.getElementById('ctxTheme');

    if (ctxAbout) ctxAbout.addEventListener('click', () => {
        const aboutBtn = document.getElementById('openAbout');
        if (aboutBtn) aboutBtn.click();
    });

    if (ctxTheme) ctxTheme.addEventListener('click', () => {
        toggleTheme();
        menu.style.display = 'none';
    });

    const ctxWallpaper = document.getElementById('ctxWallpaper');
    if (ctxWallpaper) ctxWallpaper.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const lightWallpapers = [
            "img/macos-mojave-day.webp",
            "img/macos-monterey-day.webp",
            "img/macos-monterey-day2.webp",
            "img/macos_catalina.webp",
            "img/macos_bigsur.webp"
        ];
        const darkWallpapers = [
            "img/macos-mojave-night.webp",
            "img/macos-sequoia-night.webp",
            "img/macos_tahoe.webp"
        ];
        
        const wallList = theme === 'light' ? lightWallpapers : darkWallpapers;
        let current = document.body.style.backgroundImage || "";
        let index = wallList.findIndex(w => current.includes(w));
        let next = wallList[(index + 1) % wallList.length];
        
        document.body.style.backgroundImage = `url('${next}')`;
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) loginScreen.style.backgroundImage = `url('${next}')`;
        
        menu.style.display = 'none';
    });

    const ctxCopy = document.getElementById('ctxCopy');
    const ctxPaste = document.getElementById('ctxPaste');

    if (ctxCopy) ctxCopy.addEventListener('click', () => {
        document.execCommand('copy');
        menu.style.display = 'none';
    });

    if (ctxPaste) ctxPaste.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            const activeEl = document.activeElement;
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
                const start = activeEl.selectionStart;
                const end = activeEl.selectionEnd;
                activeEl.value = activeEl.value.substring(0, start) + text + activeEl.value.substring(end);
            }
        } catch (err) {
            console.log("Paste failed", err);
        }
        menu.style.display = 'none';
    });
}
