import { motion } from 'motion/react';
import { PROJECTS, type Project } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon, Kicker, Logo, TechList } from './ui';
import { Scene } from './Devices';

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHead({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }}
      className="mb-7 lg:mb-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-10">
      <div className="lg:col-span-2"><Kicker>{kicker}</Kicker></div>
      <h2 className="text-[clamp(40px,10.5vw,76px)] leading-[.98] font-extrabold tracking-[-.05em]">{title}</h2>
      <p className="mt-3 max-w-[52ch] text-[16.5px] text-muted lg:m-0 lg:max-w-[36ch] lg:text-right">{intro}</p>
    </motion.header>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (id: string) => void }) {
  const { t, project } = useI18n();
  const tx = project(p);
  const even = i % 2 === 1;
  return (
    <motion.article id={`p-${p.id}`} style={{ '--c': p.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease: EASE }}
      className={`card grid scroll-mt-24 !rounded-[30px] lg:min-h-[500px] ${even ? 'lg:grid-cols-[1fr_1.35fr]' : 'lg:grid-cols-[1.35fr_1fr]'}`}>
      <div className={`relative overflow-hidden px-3 pt-4 pb-1.5 lg:flex lg:items-center lg:px-6 lg:pt-8 lg:pb-4 ${even ? 'lg:order-2' : ''}`}
        style={{ background: 'radial-gradient(90% 80% at 50% 100%, color-mix(in srgb, var(--c) 45%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in srgb, var(--c) 10%, var(--surface-2)), color-mix(in srgb, var(--c) 24%, var(--surface-2)))' }}>
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_40%,#000,transparent)]" />
        <Scene p={p} name={tx.name} />
      </div>
      <div className="flex flex-col gap-3 px-[18px] pt-5 pb-[22px] sm:px-[26px] sm:pb-7 lg:justify-center lg:gap-3.5 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[13px] font-bold tracking-wide text-muted">{String(i + 1).padStart(2, '0')}</span>
          {p.isNew && <span className="rounded-full bg-qc px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-[#16161a]">{t('new')}</span>}
          {p.edu && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-muted">{t('academic')}</span>}
        </div>
        <h3 className="text-[clamp(32px,8.5vw,50px)] leading-none font-extrabold tracking-[-.045em]">
          {p.key === 'qc' ? <>Qui<span style={{ color: 'var(--c)' }}>Condueix</span>?</> : tx.name}
        </h3>
        <p className="-mt-1 text-[15px] leading-snug font-semibold" style={{ color: 'color-mix(in srgb, var(--c) 65%, var(--text))' }}>{tx.sub}</p>
        <p className="text-[15.5px] text-muted">{tx.short}</p>
        <TechList items={p.stack} />
        <div className="mt-1 grid grid-cols-2 gap-2 sm:flex">
          {p.url
            ? <a className="btn btn-primary px-3 text-[14.5px] sm:px-5" href={p.url} target="_blank" rel="noopener">{t('visit')}<Icon name="arrowUpRight" /></a>
            : <a className="btn btn-primary px-3 text-[14.5px] sm:px-5" href={p.repo} target="_blank" rel="noopener"><Logo id="github" className="size-[1.1em] rounded-full bg-white" />{t('code')}</a>}
          <button className="btn px-3 text-[14.5px] sm:px-5" onClick={() => onOpen(p.id)}>{t('details')}</button>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useI18n();
  return (
    <section id="proyectos" className="wrap pt-[72px] lg:pt-[120px]">
      <SectionHead kicker={t('proj_kicker')} title={t('proj_title')} intro={t('proj_intro')} />
      <div className="grid gap-[18px] lg:gap-[26px]">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onOpen={onOpen} />)}
      </div>
    </section>
  );
}
