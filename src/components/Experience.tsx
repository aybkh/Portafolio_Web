import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EXPERIENCE, LOGOS, type Job } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon } from './ui';
import { SectionHead } from './Projects';

function bold(f: string) {
  const i = f.indexOf(':');
  return i > 0 && i < 45 ? <><b className="font-semibold text-ink">{f.slice(0, i)}:</b>{f.slice(i + 1)}</> : f;
}

function Role({ r, multi }: { r: Job; multi: boolean }) {
  const { t, b } = useI18n();
  const [open, setOpen] = useState(false);
  const tasks = Array.from({ length: r.tasks }, (_, i) => b(`exp.${r.n}_t${i + 1}`)).filter(Boolean);
  const lim = multi ? 2 : 99;
  return (
    <div className="relative mt-[18px] border-l-2 border-line pl-[18px]">
      <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 }}
        className={`absolute top-[5px] -left-1.5 size-2.5 rounded-full border-2 ${r.current ? 'border-ok bg-ok shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_20%,transparent)]' : 'border-muted bg-surface'}`} />
      <p className="font-display text-[17px] leading-tight font-bold tracking-[-.01em]">{b(`exp.${r.n}_role`)}</p>
      <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted">{b(`exp.${r.n}_place`)}
        {r.current && <span className="font-semibold text-ok">● {t('current')}</span>}</p>
      <ul className="mt-3 grid gap-2 text-[14.5px] text-muted">
        <AnimatePresence initial={false}>
          {tasks.map((x, i) => (i < lim || open) && (
            <motion.li key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="relative pl-4 before:absolute before:top-[.68em] before:left-0.5 before:size-[5px] before:rounded-full before:bg-accent">{bold(x)}</motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {tasks.length > lim && (
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="mt-2.5 inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-accent">
          {t(open ? 'less' : 'more')}<Icon name="chevronDown" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {r.tags.map((x) => <span key={x} className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">{x}</span>)}
      </div>
    </div>
  );
}

export function Experience() {
  const { t } = useI18n();
  const groups: { e: Job; roles: Job[] }[] = [];
  EXPERIENCE.forEach((e) => { const g = groups[groups.length - 1]; if (g && g.e.company === e.company) g.roles.push(e); else groups.push({ e, roles: [e] }); });
  return (
    <section id="experiencia" className="wrap pt-[72px] lg:pt-[120px]">
      <SectionHead kicker={t('exp_kicker')} title={t('exp_title')} intro={t('exp_intro')} />
      <ol className="grid gap-3.5 lg:grid-cols-2 lg:gap-[18px]">
        {groups.map(({ e, roles }, gi) => (
          <motion.li key={e.company} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: gi * 0.08 }}
            className={`card p-[18px] lg:p-6 ${roles.length > 1 ? 'lg:row-span-2' : ''}`}>
            <div className="grid grid-cols-[auto_1fr] items-center gap-3.5">
              <span className={`grid h-[54px] place-items-center overflow-hidden ${e.wide ? 'w-[100px]' : 'w-[54px] rounded-[15px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'}`}>
                <img src={`/logos/${LOGOS[e.logo]}`} alt={e.company} className={e.wide ? 'h-auto w-full' : 'h-[80%] w-[80%] object-contain'} />
              </span>
              <div>
                <h3 className="font-display text-[19px] leading-tight font-bold tracking-[-.02em]">
                  {e.url ? <a href={e.url} target="_blank" rel="noopener" className="hover:underline hover:underline-offset-4">{e.company}</a> : e.company}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-[13px] text-muted"><Icon name="mapPin" className="size-[13px]" />{e.place}</p>
              </div>
            </div>
            {roles.map((r) => <Role key={r.n} r={r} multi={roles.length > 1} />)}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
