import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { Project } from '../data/content';
import { useMedia } from './ui';

/* Posición y escala de cada dispositivo en un lienzo de 1000×640 */
interface Dv { t: 'mac' | 'iphone' | 'pos'; x: number; y: number; s: number; depth: number; from: { x: number; y: number } }
const SCENES: Record<'web' | 'tpv' | 'laptop', Dv[]> = {
  web: [
    { t: 'mac', x: 20, y: 70, s: 1.15, depth: 0.4, from: { y: 70, x: 0 } },
    { t: 'iphone', x: 770, y: 180, s: 0.5, depth: 1.2, from: { y: 40, x: 90 } }
  ],
  tpv: [
    { t: 'mac', x: 390, y: 40, s: 0.8, depth: 0.3, from: { y: 60, x: 0 } },
    { t: 'pos', x: 10, y: 96, s: 0.94, depth: 0.8, from: { y: 30, x: -90 } },
    { t: 'iphone', x: 820, y: 262, s: 0.42, depth: 1.4, from: { y: 30, x: 90 } }
  ],
  laptop: [{ t: 'mac', x: 20, y: 50, s: 1.3, depth: 0.4, from: { y: 70, x: 0 } }]
};

function Screen({ p, t, name }: { p: Project; t: string; name: string }) {
  if (t === 'mac') return (
    <><div className="frame"><span className="notch" /><div className="screen">
      <img src={`/screens/${p.id}-desk-640.webp`} srcSet={`/screens/${p.id}-desk-640.webp 640w, /screens/${p.id}-desk-1200.webp 1200w`}
        sizes="(min-width: 960px) 620px, 92vw" alt={name} width={1200} height={750} loading="lazy" decoding="async" />
    </div></div><div className="base" /></>
  );
  if (t === 'iphone') return (
    <div className="frame"><span className="island" /><span className="btns" /><span className="power" /><div className="screen">
      <img src={`/screens/${p.id}-mob.webp`} alt={name} width={480} height={1021} loading="lazy" decoding="async" />
    </div></div>
  );
  return (
    <><div className="frame"><div className="screen">
      <img src={`/screens/${p.id}-pos.webp`} alt={`${name} · TPV`} width={1200} height={750} loading="lazy" decoding="async" />
    </div></div><div className="neck" /><div className="foot" /></>
  );
}

function Device({ d, p, name, progress, animate, shown }: {
  d: Dv; p: Project; name: string; progress: MotionValue<number>; animate: boolean; shown: boolean;
}) {
  // parallax: cada dispositivo se mueve según su «profundidad»
  const y = useTransform(progress, [0, 1], [40 * d.depth, -40 * d.depth]);
  return (
    <motion.div className="dv" style={{ left: d.x, top: d.y, y: animate ? y : 0 }}
      initial={animate ? { opacity: 0, x: d.from.x, translateY: d.from.y } : false}
      animate={shown ? { opacity: 1, x: 0, translateY: 0 } : undefined}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d.t === 'mac' ? 0 : d.t === 'pos' ? 0.12 : 0.24 }}>
      <div className={`dv__in ${d.t}`} style={{ transform: `scale(${d.s})` }}><Screen p={p} t={d.t} name={name} /></div>
    </motion.div>
  );
}

/** Escena con portátil / móvil / TPV, escalada al ancho disponible, con parallax y giro 3D al pasar el ratón */
export function Scene({ p, name, tilt = true }: { p: Project; name: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.34);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 1000));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  // la entrada se dispara cuando se ve la escena entera (no cada dispositivo, que puede quedar recortado)
  const shown = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 }), sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const doTilt = tilt && fine && !reduced;
  return (
    <div ref={ref} className="relative w-full [perspective:1400px]" style={{ aspectRatio: '1000 / 640' }}
      onPointerMove={doTilt ? (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      } : undefined}
      onPointerLeave={doTilt ? () => { rx.set(0); ry.set(0); } : undefined}>
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX: srx, rotateY: sry }}>
        <div className="stage" style={{ transform: `scale(${k})` }} aria-hidden="true">
          {SCENES[p.scene].map((d, i) => <Device key={i} d={d} p={p} name={name} progress={scrollYProgress} animate={!reduced} shown={shown || reduced} />)}
        </div>
      </motion.div>
    </div>
  );
}
