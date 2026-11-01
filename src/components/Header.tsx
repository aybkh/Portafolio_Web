import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { LANGS } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon } from './ui';

export const SECTIONS = [
  { id: 'proyectos', key: 'nav.projects' },
  { id: 'experiencia', key: 'nav.experience' },
  { id: 'habilidades', key: 'nav.skills' },
  { id: 'contacto', key: 'nav.contact' }
];

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    const hero = document.getElementById('hero'); if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header({ theme, onTheme, onPalette }: { theme: string; onTheme: () => void; onPalette: () => void }) {
  const { t, lang, setLang } = useI18n();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = menu ? 'hidden' : ''; }, [menu]);
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener('click', close); return () => window.removeEventListener('click', close);
  }, [langOpen]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ scaleX: bar }} aria-hidden="true" />
      <header className={`sticky top-0 z-50 transition-[background,border-color] duration-300 ${scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'}`}>
        <div className="wrap flex h-[60px] items-center gap-2 lg:h-[68px] lg:gap-4">
          <a href="legacy/" className="pill border-dashed text-muted hover:text-ink max-[380px]:w-10 max-[380px]:px-0" title="Portafolio anterior (macOS)">
            <Icon name="monitor" /><span className="max-[380px]:hidden">{t('legacy')}</span>
          </a>
          <nav className="mr-auto hidden gap-0.5 lg:flex" aria-label="Principal">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors ${active === s.id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                {active === s.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-2" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                {t(s.key)}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button onClick={onPalette} className="pill hidden gap-2 pr-2 text-muted sm:inline-flex" aria-label={t('palette')}>
              <Icon name="search" /><span className="font-medium">{t('palette')}</span>
              <kbd className="rounded-md border border-line bg-surface-2 px-1.5 font-mono text-[11px]">⌘K</kbd>
            </button>
            <div className="relative">
              <button className="pill" aria-haspopup="listbox" aria-expanded={langOpen} aria-label={t('lang')}
                onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}>
                <Icon name="languages" /><span>{lang.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul role="listbox" initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16 }} className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-[180px] origin-top-right rounded-[18px] border border-line bg-surface p-1.5" style={{ boxShadow: 'var(--shadow)' }}>
                    {LANGS.map((l) => (
                      <li key={l.code}>
                        <button role="option" aria-selected={l.code === lang} onClick={() => setLang(l.code)}
                          className={`flex w-full justify-between rounded-xl px-3 py-2.5 text-[15px] hover:bg-surface-2 ${l.code === lang ? 'font-semibold text-accent' : ''}`}>
                          {l.label}<small className="font-semibold text-muted">{l.short}</small>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <button className="pill w-10 px-0" onClick={onTheme} aria-label={t('theme')}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
            </button>
            <button className="pill w-10 px-0 lg:hidden" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-label={t('menu')}>
              <Icon name={menu ? 'x' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] bottom-0 z-[49] bg-bg px-4 pt-4 pb-[calc(20px+env(safe-area-inset-bottom))] lg:hidden">
            <nav aria-label="Móvil">
              {SECTIONS.map((s, i) => (
                <motion.a key={s.id} href={`#${s.id}`} onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="flex items-baseline justify-between border-b border-line py-4 font-display text-[38px] leading-none font-extrabold tracking-[-.04em]">
                  {t(s.key)}<small className="font-sans text-[13px] font-medium tracking-normal text-muted">0{i + 1}</small>
                </motion.a>
              ))}
            </nav>
            <button onClick={() => { setMenu(false); onPalette(); }} className="btn mt-6 w-full justify-start gap-3 text-muted">
              <Icon name="search" />{t('search')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
