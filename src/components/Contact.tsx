import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Icon, Logo } from './ui';

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    navigator.clipboard?.writeText(CONTACT.email).then(done, done) ?? done();
  };
  const links: [string, string, string, boolean][] = [
    ['LinkedIn', CONTACT.linkedin, 'linkedin', false], ['GitHub', CONTACT.github, 'github', false],
    ['WhatsApp', CONTACT.whatsapp, 'whatsapp', false]
  ];
  return (
    <section id="contacto" className="wrap pt-[72px] pb-[calc(56px+env(safe-area-inset-bottom))] lg:pt-[120px]">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate grid justify-items-center gap-3.5 overflow-hidden rounded-[32px] bg-[#070b14] px-5 py-12 text-center text-[#f3f4f7] sm:px-8 sm:py-16 lg:py-24">
        {/* fondo tech: brillo azul, rejilla con nodos y línea de escaneo */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden"
          style={{ background: 'radial-gradient(60% 55% at 50% 0%, rgb(42 91 234 / .45), transparent 70%), radial-gradient(40% 40% at 50% 110%, rgb(0 190 255 / .18), transparent 70%)' }}>
          <div className="absolute inset-0 [mask-image:radial-gradient(75%_80%_at_50%_45%,#000_30%,transparent_85%)]"
            style={{ backgroundImage: 'radial-gradient(circle, rgb(126 166 255 / .55) 1.2px, transparent 1.6px), linear-gradient(rgb(126 166 255 / .09) 1px, transparent 1px), linear-gradient(90deg, rgb(126 166 255 / .09) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: '-20px -20px, 0 0, 0 0' }} />
          <div className="absolute inset-x-0 top-0 h-[120px] animate-scan border-b border-[#7ea6ff]/50 bg-gradient-to-b from-transparent via-[#7ea6ff]/10 to-[#7ea6ff]/35" />
        </div>
        <h2 className="text-[clamp(48px,14vw,96px)] leading-[.95] font-extrabold tracking-[-.05em]">{t('contact_title')}</h2>
        <p className="max-w-[42ch] opacity-75">{t('contact_text')}</p>
        <div className="mt-2 flex w-full max-w-[460px] justify-center gap-2">
          <a className="btn min-w-0 overflow-hidden border-transparent !bg-white !text-[#121317] text-ellipsis max-[380px]:px-3.5 max-[380px]:text-sm" href={`mailto:${CONTACT.email}`}>
            <Logo id="gmail" className="size-[1.2em] max-[380px]:hidden" />{CONTACT.email}
          </a>
          <button onClick={copy} aria-label={t('copy')} className="relative grid size-[50px] shrink-0 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={String(copied)} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <Icon name={copied ? 'check' : 'copy'} className={copied ? 'text-[#3fd28f]' : ''} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <ul className="mt-1.5 grid w-full max-w-[520px] grid-cols-3 gap-2">
          {links.map(([n, href, id, dl]) => (
            <li key={n}>
              <a href={href} {...(dl ? { download: true } : { target: '_blank', rel: 'noopener' })}
                className="flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[.06] text-[14.5px] font-semibold transition-colors hover:bg-white/[.12]">
                <span className="lgbox">{id ? <Logo id={id} /> : <Icon name="download" />}</span><span className="max-[360px]:sr-only">{n}</span>
              </a>
            </li>
          ))}
        </ul>
        <AnimatePresence>
          {copied && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} role="status"
              className="fixed bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-bg">{t('copied')}</motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
