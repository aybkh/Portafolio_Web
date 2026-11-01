import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { PROJECTS } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon, Logo, TechList, useMedia } from './ui';
import { Scene } from './Devices';

function bold(f: string) {
  const i = f.indexOf(':');
  return i > 0 && i < 45 ? <><b className="font-semibold text-ink">{f.slice(0, i)}:</b>{f.slice(i + 1)}</> : f;
}

/** Ficha de detalles: hoja inferior arrastrable en móvil, ventana centrada en PC */
export function ProjectModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { t, project } = useI18n();
  const p = PROJECTS.find((x) => x.id === id);
  const mobile = useMedia('(max-width: 599px)');
  const drag = useDragControls();
  const scroller = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!id) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', k); lastFocus.current?.focus({ preventScroll: true }); };
  }, [id, onClose]);

  const tx = p ? project(p) : null;
  return (
    <AnimatePresence>
      {p && tx && (
        <motion.div key="m" className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-[rgb(5_6_10/.55)] backdrop-blur-[6px]" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title"
            initial={mobile ? { y: '100%' } : { opacity: 0, y: 40, scale: 0.97 }} animate={mobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={mobile ? { y: '100%' } : { opacity: 0, y: 30, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            drag={mobile ? 'y' : false} dragControls={drag} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.8 }}
            onDragEnd={(_, i) => { if (i.offset.y > 120 || i.velocity.y > 600) onClose(); }}
            className="relative flex max-h-[94dvh] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[28px] bg-surface sm:rounded-[28px]" style={{ '--c': p.color } as React.CSSProperties}>
            {mobile && (
              <div onPointerDown={(e) => drag.start(e)} className="absolute inset-x-0 top-0 z-[5] flex h-7 touch-none justify-center pt-2" aria-label={t('drag')}>
                <span className="h-[5px] w-10 rounded-full bg-white/70 shadow" />
              </div>
            )}
            <button onClick={onClose} aria-label={t('close')} className="pill absolute top-3 right-3 z-[6] w-10 px-0 backdrop-blur-md"><Icon name="x" /></button>
            <div ref={scroller} className="overflow-y-auto overscroll-contain">
              <div className="relative overflow-hidden px-3 pt-6 pb-1"
                style={{ background: 'radial-gradient(90% 80% at 50% 100%, color-mix(in srgb, var(--c) 45%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in srgb, var(--c) 10%, var(--surface-2)), color-mix(in srgb, var(--c) 24%, var(--surface-2)))' }}>
                <Scene p={p} name={tx.name} tilt={false} />
              </div>
              <div className="grid gap-4 px-5 pt-5 sm:px-8 sm:pt-6">
                <div>
                  <h3 id="modal-title" className="text-[clamp(32px,9vw,48px)] leading-none font-extrabold tracking-[-.04em]">{tx.name}</h3>
                  <p className="mt-2 text-[15px] font-semibold" style={{ color: 'color-mix(in srgb, var(--c) 65%, var(--text))' }}>{tx.sub}</p>
                </div>
                <div className="grid gap-2.5 text-[15.5px] text-muted">
                  <p>{tx.short}</p>{tx.long.map((l, i) => <p key={i}>{l}</p>)}{p.edu && <p>{t('made_in')}</p>}
                </div>
                {tx.features.length > 0 && <>
                  <h4 className="mt-2 font-sans text-xs font-bold tracking-[.08em] text-muted uppercase">{t('features')}</h4>
                  <ul className="grid gap-2.5 text-[15px] text-muted">
                    {tx.features.map((f, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="grid grid-cols-[22px_1fr] gap-2.5">
                        <Icon name="check" className="mt-[3px] size-[18px] text-ok" /><span>{bold(f)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </>}
                <h4 className="mt-2 font-sans text-xs font-bold tracking-[.08em] text-muted uppercase">{t('stack_t')}</h4>
                <TechList items={p.stack} />
                <h4 className="mt-2 font-sans text-xs font-bold tracking-[.08em] text-muted uppercase">{t('screens')}</h4>
                <div className={`grid items-start gap-2.5 ${p.scene === 'laptop' ? '' : 'grid-cols-[1fr_auto]'}`}>
                  <img className="w-full rounded-[14px] border border-line bg-surface-2" loading="lazy" alt={tx.name} width={1200} height={750}
                    src={p.scene === 'tpv' ? `/screens/${p.id}-pos.webp` : `/screens/${p.id}-desk-1200.webp`} />
                  {p.scene !== 'laptop' && <img className="w-[92px] rounded-2xl border border-line sm:w-[150px]" loading="lazy" alt={tx.name} width={480} height={1021} src={`/screens/${p.id}-mob.webp`} />}
                </div>
                <div className="sticky bottom-0 mt-1 flex gap-2 pt-3.5 pb-[calc(16px+env(safe-area-inset-bottom))]" style={{ background: 'linear-gradient(transparent, var(--surface) 28%)' }}>
                  {p.url && <a className="btn btn-primary flex-1" href={p.url} target="_blank" rel="noopener">{t('visit')}<Icon name="arrowUpRight" /></a>}
                  {p.repo && <a className={`btn flex-1 ${p.url ? '' : 'btn-primary'}`} href={p.repo} target="_blank" rel="noopener"><Logo id="github" className="size-[1.1em] rounded-full bg-white" />{t('code')}</a>}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
