import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, type Variants } from 'motion/react';
import { PROJECTS, SPOKEN, STACK_TILE } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon, Logo, spotlight } from './ui';
import { PhotoCode } from './PhotoCode';

const EASE = [0.16, 1, 0.3, 1] as const;
const tile: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE, delay: 0.08 * i } })
};

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

/** Nombre que aparece letra a letra */
function SplitName({ text }: { text: string }) {
  return (
    <span className="block" aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span key={i} aria-hidden="true" className="inline-block"
          initial={{ y: '0.9em', opacity: 0, rotate: 6 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.05 }}>{ch}</motion.span>
      ))}
    </span>
  );
}

const T = 'card spot p-[18px] lg:p-[22px]';

export function Hero() {
  const { t } = useI18n();
  const live = PROJECTS.filter((p) => p.url).length;
  return (
    <section id="hero" className="wrap pt-3.5 pb-2 lg:pt-6">
      <div className="grid grid-cols-2 gap-3 [grid-template-areas:'intro_intro''photo_now''photo_num''qc_qc''langs_stack']
        sm:grid-cols-4 sm:[grid-template-areas:'intro_intro_intro_intro''photo_photo_now_num''photo_photo_qc_qc''langs_stack_qc_qc']
        lg:grid-cols-[1.2fr_1fr_.8fr_.8fr] lg:grid-rows-[auto_auto_230px] lg:gap-3.5 lg:[grid-template-areas:'intro_intro_photo_now''intro_intro_photo_num''qc_qc_langs_stack']">

        {/* Presentación */}
        <motion.article custom={0} variants={tile} initial="hidden" animate="show" onPointerMove={spotlight}
          className={`${T} flex min-h-[300px] flex-col justify-end [grid-area:intro] !p-6 lg:min-h-[440px] lg:!p-9`}
          style={{ background: 'radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%), var(--surface)' }}>
          <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_70%_at_85%_10%,#000,transparent)]" />
          <h1 className="text-[clamp(52px,15vw,112px)] leading-[.95] font-extrabold tracking-[-.05em]">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
              className="mb-[.12em] block text-[.4em] font-semibold tracking-[-.02em] text-muted">{t('hello')}</motion.span>
            <SplitName text="Ayoub" />
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 max-w-[46ch] text-[16.5px] text-muted lg:text-lg">{t('lead')}</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
            className="mt-6 grid grid-cols-2 gap-2 sm:flex">
            <a className="btn btn-primary px-3 sm:px-5" href="#proyectos">{t('cta_projects')}<Icon name="arrowRight" /></a>
            <a className="btn px-3 sm:px-5" href="#contacto">{t('nav.contact')}</a>
          </motion.div>
        </motion.article>

        {/* Foto en código */}
        <motion.figure custom={1} variants={tile} initial="hidden" animate="show" className="card m-0 min-h-[260px] [grid-area:photo] !bg-[#0a0e17]">
          <PhotoCode src="/img/foto.webp" alt="Ayoub" />
        </motion.figure>

        {/* Ahora */}
        <motion.a custom={2} variants={tile} initial="hidden" animate="show" whileHover={{ y: -3 }} href="#experiencia" onPointerMove={spotlight}
          className={`${T} flex flex-col gap-2 [grid-area:now]`}>
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted">
            <span className="size-2 rounded-full bg-ok animate-ping-soft" />{t('now')}
          </span>
          <img src="/logos/hipra.svg" alt="HIPRA" width={152} height={61} className="mt-1 w-full max-w-[132px]" />
          <span className="font-display text-[15px] leading-tight font-bold tracking-[-.01em]">{t('now_role')}</span>
          <span className="-mt-1 text-[12.5px] text-muted">{t('since')}</span>
        </motion.a>

        {/* Webs en producción */}
        <motion.div custom={3} variants={tile} initial="hidden" animate="show" onPointerMove={spotlight} className={`${T} flex flex-col justify-end [grid-area:num]`}>
          <span className="font-display text-[54px] leading-none font-extrabold tracking-[-.05em] lg:text-[64px]"><CountUp to={live} /></span>
          <span className="mt-1 text-[13px] leading-snug text-muted">{t('live')}</span>
        </motion.div>

        {/* QuiCondueix */}
        <motion.a custom={4} variants={tile} initial="hidden" animate="show" href="#p-quicondueix"
          className="group card relative flex min-h-[210px] flex-col gap-1.5 !border-transparent !bg-qc p-5 text-[#16161a] [grid-area:qc] lg:p-[26px]"
          whileHover={{ y: -3 }}>
          <span className="text-[13px] font-semibold text-[#16161a]/70">{t('latest')}</span>
          <span className="relative z-[1] mt-1.5 max-w-[66%] font-display text-[clamp(28px,8.4vw,34px)] leading-none font-extrabold tracking-[-.04em] lg:max-w-none lg:text-[46px]">
            Qui<em className="text-white not-italic">Condueix</em>?
          </span>
          <span className="relative z-[1] max-w-[min(19ch,58%)] text-[14.5px] leading-snug font-medium">{t('qc_tile')}</span>
          <span className="relative z-[1] mt-auto inline-flex items-center gap-1.5 text-sm font-bold">
            {t('open_project')}<Icon name="arrowRight" className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <img src="/screens/quicondueix-mob.webp" alt="" width={480} height={1021} loading="lazy"
            className="absolute -right-1.5 top-[34px] w-[34%] max-w-[170px] rotate-6 rounded-[22px] border-[6px] border-[#16161a] shadow-[0_30px_50px_-20px_rgba(60,40,0,.6)] transition-transform duration-500 ease-out-expo group-hover:translate-y-[-6px] group-hover:rotate-2 lg:right-10 lg:top-7 lg:w-[30%] lg:max-w-[190px]" />
        </motion.a>

        {/* Idiomas */}
        <motion.div custom={5} variants={tile} initial="hidden" animate="show" onPointerMove={spotlight} className={`${T} flex flex-col [grid-area:langs]`}>
          <span className="font-display text-[54px] leading-none font-extrabold tracking-[-.05em] lg:text-[64px]">{SPOKEN.length}</span>
          <span className="mt-1 text-[13px] text-muted">{t('langs')}</span>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {SPOKEN.map(([c, name, lv]) => (
              <li key={c} title={`${name} · ${t('lv.' + lv)}`}
                className={`rounded-lg px-2 py-1 text-[11.5px] font-bold tracking-wide ${lv === 'native' ? 'bg-ok/15 text-ok' : 'bg-surface-2'}`}>{c.toUpperCase()}</li>
            ))}
          </ul>
        </motion.div>

        {/* Con lo que construyo */}
        <motion.div custom={6} variants={tile} initial="hidden" animate="show" onPointerMove={spotlight} className={`${T} flex flex-col gap-3 [grid-area:stack]`}>
          <span className="text-[13px] font-semibold text-muted">{t('stack')}</span>
          <ul className="mt-auto grid grid-cols-4 gap-1.5">
            {STACK_TILE.map((id, i) => (
              <motion.li key={id} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.04, type: 'spring', stiffness: 300, damping: 18 }} whileHover={{ y: -3, scale: 1.08 }}
                className={`grid aspect-square place-items-center rounded-[10px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.07)] ${i >= 8 ? 'max-sm:hidden' : ''}`}>
                <Logo id={id} className="h-[58%] w-[58%] object-contain" alt={id} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/** Cinta infinita con los logos */
export function Marquee() {
  const list: [string, string][] = [['Claude Code', 'claude'], ['Codex', 'codex'], ['Supabase', 'supabase'], ['Next.js', 'next'], ['React', 'react'], ['TypeScript', 'ts'],
    ['Cloudflare', 'cloudflare'], ['PostgreSQL', 'postgresql'], ['Linux', 'linux'], ['Windows', 'windows'], ['Microsoft 365', 'm365'], ['Azure', 'azure'],
    ['Docker', 'docker'], ['Python', 'python'], ['Cisco', 'cisco'], ['n8n', 'n8n']];
  const row = list.map(([n, id]) => (
    <span key={n} className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-medium"><span className="lgbox size-7 rounded-lg"><Logo id={id} /></span>{n}</span>
  ));
  return (
    <div className="mt-6 overflow-hidden border-y border-line py-3.5 text-muted [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" aria-hidden="true">
      <div className="flex w-max gap-9 animate-marquee hover:[animation-play-state:paused]">{row}{row}</div>
    </div>
  );
}
