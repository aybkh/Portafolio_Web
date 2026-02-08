function initUI() {
    /* Helpers */
    const island = document.getElementById('island');
    const pill = document.getElementById('islandBtn');
    const touchLike = () => window.matchMedia('(hover: none)').matches;

    /* Táctil: abrir/cerrar pill */
    if (island && pill) {
        pill.addEventListener('click', (e) => {
            if (e.target.closest('.switch') || e.target.closest('.lang')) return;
            if (touchLike()) {
                const open = island.classList.toggle('open');
                pill.setAttribute('aria-expanded', String(open));
            }
        });

        document.addEventListener('click', (e) => {
            if (!touchLike()) return;
            if (!island.classList.contains('open')) return;
            if (!island.contains(e.target)) {
                island.classList.remove('open');
                pill.setAttribute('aria-expanded', 'false');
            }
        }, true);

        island.querySelectorAll('.pill-nav a').forEach(a => {
            a.addEventListener('click', () => {
                if (!touchLike()) return;
                setTimeout(() => {
                    island.classList.remove('open');
                    pill.setAttribute('aria-expanded', 'false');
                }, 150);
            });
        });

        pill.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); pill.click();
            }
        });

        window.addEventListener('resize', () => {
            if (!touchLike() && island.classList.contains('open')) {
                island.classList.remove('open');
                pill.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* Reveal */
    const revealTargets = document.querySelectorAll('.reveal');
    if (revealTargets.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        revealTargets.forEach(el => io.observe(el));
    }

    /* Skills: tap en móvil */
    document.querySelectorAll('.skill-pill').forEach(p => {
        p.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                const open = p.classList.toggle('open');
                p.setAttribute('aria-expanded', String(open));
            }
        });
    });

    /* Contacto: abrir/cerrar por tap */
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                contactCard.classList.toggle('open');
            }
        });
    }

    // Redirección a página de error si el enlace no tiene destino válido
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    });
}
