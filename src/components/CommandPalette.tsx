import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT, LANGS, PROJECTS } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon } from './ui';
import { SECTIONS } from './Header';

interface Item { id: string; label: string; hint: string; icon: string; run: () => void }

/** Paleta de comandos (⌘K / Ctrl+K): proyectos, secciones y acciones */
export function CommandPalette({ open, onClose, onOpenProject, onTheme }: { open: boolean; onClose: () => void; onOpenProject: (id: string) => void; onTheme: () => void }) {
  const { t, project, lang, setLang } = useI18n();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    return [
      ...PROJECTS.map((p) => ({ id: p.id, label: project(p).name, hint: project(p).sub, icon: 'layoutGrid', run: () => onOpenProject(p.id) })),
      ...SECTIONS.map((s) => ({ id: s.id, label: `${t('go')} ${t(s.key)}`, hint: `#${s.id}`, icon: 'arrowRight', run: go(s.id) })),
      { id: 'theme', label: t('toggle_theme'), hint: '', icon: 'moon', run: onTheme },
      ...LANGS.filter((l) => l.code !== lang).map((l) => ({ id: 'lang-' + l.code, label: `${t('change_lang')}: ${l.label}`, hint: l.short, icon: 'languages', run: () => setLang(l.code) })),
      { id: 'mail', label: CONTACT.email, hint: 'Email', icon: 'copy', run: () => { location.href = `mailto:${CONTACT.email}`; } },
      { id: 'legacy', label: t('legacy'), hint: 'macOS', icon: 'monitor', run: () => { location.href = '/legacy/'; } }
    ];
  }, [t, project, lang, setLang, onOpenProject, onTheme]);

  const list = useMemo(() => {
    const n = q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (!n) return items;
    return items.filter((i) => (i.label + ' ' + i.hint).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(n));
  }, [items, q]);

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 30); } }, [open]);
  useEffect(() => setSel(0), [q]);

  const run = (i?: Item) => { if (!i) return; onClose(); setTimeout(i.run, 80); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[85] flex items-start justify-center px-3 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[rgb(5_6_10/.5)] backdrop-blur-[6px]" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={t('palette')} initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="relative w-full max-w-[600px] overflow-hidden rounded-[22px] border border-line bg-surface" style={{ boxShadow: '0 30px 80px -20px rgb(0 0 0 / .5)' }}>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Icon name="search" className="text-muted" />
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
                  else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                  else if (e.key === 'Enter') run(list[sel]);
                  else if (e.key === 'Escape') onClose();
                }}
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted" />
              <kbd className="rounded-md border border-line bg-surface-2 px-1.5 font-mono text-[11px] text-muted">Esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{t('no_results')}</li>}
              {list.map((i, k) => (
                <li key={i.id}>
                  <button onMouseMove={() => setSel(k)} onClick={() => run(i)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] ${k === sel ? 'text-ink' : 'text-muted'}`}>
                    {k === sel && <motion.span layoutId="cmd-sel" className="absolute inset-0 -z-0 rounded-xl bg-surface-2" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                    <Icon name={i.icon} className="relative z-[1]" />
                    <span className="relative z-[1] flex-1 truncate font-medium">{i.label}</span>
                    <span className="relative z-[1] truncate text-xs text-muted max-sm:hidden">{i.hint}</span>
                    {k === sel && <Icon name="cornerDownLeft" className="relative z-[1] text-muted" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
