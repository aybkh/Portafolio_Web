import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SKILLS } from '../data/content';
import { useI18n } from '../lib/i18n';
import { LogoBox } from './ui';
import { SectionHead } from './Projects';

const CAT_LOGO: Record<string, string> = { net: 'wireshark', sys: 'linux', cloud: 'azure', dev: 'react', db: 'postgresql', hw: 'zebra', ia: 'claude', prod: 'm365' };

export function Skills() {
  const { t, b } = useI18n();
  const cats = Object.keys(SKILLS);
  const [cat, setCat] = useState('ia');
  return (
    <section id="habilidades" className="wrap pt-[72px] lg:pt-[120px]">
      <SectionHead kicker={t('sk_kicker')} title={t('sk_title')} intro={t('sk_intro')} />
      <div role="tablist" className="-mx-4 mb-4 flex snap-x gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={c === cat} onClick={() => setCat(c)}
            className={`relative inline-flex h-[42px] shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${c === cat ? 'border-transparent text-bg' : 'border-line bg-surface text-muted hover:text-ink'}`}>
            {c === cat && <motion.span layoutId="skill-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative z-[1] inline-flex items-center gap-2"><LogoBox id={CAT_LOGO[c]} />{b(`cat.${c}`)}</span>
          </button>
        ))}
      </div>
      <p className="mb-3.5 min-h-[1.6em] text-[14.5px] text-muted">{b(`catdesc.${cat}`)}</p>
      <AnimatePresence mode="popLayout">
        <motion.ul key={cat} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-2.5 xl:grid-cols-5">
          {SKILLS[cat].map(([n, id], i) => (
            <motion.li key={n} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }}
              className="flex min-h-[62px] items-center gap-3 rounded-[18px] border border-line bg-surface px-3 py-2.5 text-sm leading-tight font-medium">
              <LogoBox id={id} className="!size-10 !rounded-xl [&>img]:!size-[26px]" />{n}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
