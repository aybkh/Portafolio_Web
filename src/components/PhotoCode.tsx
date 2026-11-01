import { useEffect, useRef } from 'react';
import { useI18n } from '../lib/i18n';

/* Foto dibujada solo con caracteres de código, en tres fases:
   blanco y negro → verde sobre negro → color real. Una línea de análisis la recorre
   de arriba abajo cada 2 s y, a su paso, va dejando la fase siguiente. */
const CH = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const BG = '#0a0e17';
const PASS = 2000;   // lo que tarda la línea en bajar
const CYCLE = 5000;  // cada fase se queda 5 s antes de la siguiente pasada

export function PhotoCode({ src, alt }: { src: string; alt: string }) {
  const fig = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null), img = useRef<HTMLImageElement>(null), scan = useRef<HTMLSpanElement>(null);
  const restart = useRef<() => void>(() => {});
  const { t } = useI18n();

  useEffect(() => {
    const f = fig.current!, c = cv.current!, im = img.current!, sc = scan.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let phases: HTMLCanvasElement[] = [], W = 0, H = 0, dpr = 1, ctx: CanvasRenderingContext2D | null = null;
    let committed = false, cur = -1, next = 0, t0 = 0, raf = 0, visible = false, built = false, started = false, lastW = 0, rt = 0;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      W = f.clientWidth; H = f.clientHeight;
      c.width = W * dpr; c.height = H * dpr; ctx = c.getContext('2d');
      const cell = W < 220 ? 1.9 : 2.1, lh = cell * 1.6, cols = Math.ceil(W / cell), rows = Math.ceil(H / lh), ch = H / rows;
      const s = document.createElement('canvas'); s.width = cols; s.height = rows;
      const sx = s.getContext('2d', { willReadFrequently: true })!;
      const ir = im.naturalWidth / im.naturalHeight, br = W / H;
      let cw: number, chh: number, ox: number, oy: number;
      if (ir > br) { chh = im.naturalHeight; cw = chh * br; ox = (im.naturalWidth - cw) * 0.5; oy = 0; }
      else { cw = im.naturalWidth; chh = cw / br; ox = 0; oy = (im.naturalHeight - chh) * 0.2; }
      sx.drawImage(im, ox, oy, cw, chh, 0, 0, cols, rows);
      const px = sx.getImageData(0, 0, cols, rows).data, n = cols * rows;
      const lum = new Float32Array(n);
      for (let q = 0; q < n; q++) lum[q] = (0.299 * px[q * 4] + 0.587 * px[q * 4 + 1] + 0.114 * px[q * 4 + 2]) / 255;
      const sorted = Array.from(lum).sort((a, b) => a - b);
      const lo = sorted[Math.floor(n * 0.02)], span = Math.max(0.05, sorted[Math.floor(n * 0.98)] - lo);
      for (let q = 0; q < n; q++) lum[q] = Math.pow(Math.min(1, Math.max(0, (lum[q] - lo) / span)), 0.85);

      phases = [0, 1, 2].map((mode) => {
        const cc = document.createElement('canvas'); cc.width = W * dpr; cc.height = H * dpr;
        const x2 = cc.getContext('2d')!; x2.scale(dpr, dpr);
        x2.fillStyle = BG; x2.fillRect(0, 0, W, H);
        x2.font = `700 ${lh * 1.02}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        x2.textBaseline = 'top';
        for (let r = 0; r < rows; r++) for (let x = 0; x < cols; x++) {
          const k = r * cols + x, l = lum[k], R = px[k * 4], G = px[k * 4 + 1], B = px[k * 4 + 2];
          const chr = CH[Math.min(CH.length - 1, Math.floor((0.18 + 0.82 * l) * CH.length))];
          if (mode === 0) {
            const v = (30 + 225 * l) | 0, w = Math.min(255, v + 25);
            x2.fillStyle = `rgba(${v},${v},${v},.38)`; x2.fillRect(x * cell, r * ch, cell + 0.5, ch + 0.5);
            x2.fillStyle = `rgb(${w},${w},${w})`;
          } else if (mode === 1) {
            x2.fillStyle = `rgba(0,${(20 + 70 * l) | 0},${(10 + 25 * l) | 0},.35)`; x2.fillRect(x * cell, r * ch, cell + 0.5, ch + 0.5);
            x2.fillStyle = `rgb(${(25 + 120 * l * l) | 0},${(55 + 200 * l) | 0},${(35 + 95 * l) | 0})`;
          } else {
            x2.fillStyle = `rgba(${R},${G},${B},.42)`; x2.fillRect(x * cell, r * ch, cell + 0.5, ch + 0.5);
            x2.fillStyle = `rgb(${Math.min(255, (R * 1.3 + 22) | 0)},${Math.min(255, (G * 1.3 + 22) | 0)},${Math.min(255, (B * 1.3 + 30) | 0)})`;
          }
          if (chr !== ' ') x2.fillText(chr, x * cell, r * ch);
        }
        return cc;
      });
      built = true;
    }
    function paint(y: number) {
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (cur < 0) { ctx.fillStyle = BG; ctx.fillRect(0, 0, c.width, c.height); } else ctx.drawImage(phases[cur], 0, 0);
      const yy = Math.max(0, Math.min(c.height, y * dpr));
      if (yy > 0) ctx.drawImage(phases[next], 0, 0, c.width, yy, 0, 0, c.width, yy);
      sc.style.transform = `translateY(${y - sc.offsetHeight}px)`;
    }
    function loop(now: number) {
      raf = 0;
      if (!t0) t0 = now;
      // 0 → PASS: la línea baja y deja la fase siguiente; PASS → CYCLE: la fase se queda quieta
      const el = now - t0;
      if (el < PASS) { paint((el / PASS) * (H + 2)); sc.style.opacity = ''; }
      else if (!committed) { committed = true; cur = next; next = (next + 1) % 3; paint(0); sc.style.opacity = '0'; }
      if (el >= CYCLE) { t0 = now; committed = false; }
      if (visible) raf = requestAnimationFrame(loop);
    }
    function play() { if (!raf && visible && !reduced) raf = requestAnimationFrame(loop); }
    function startFrom(phase: number) {
      cur = phase; next = phase < 0 ? 0 : (phase + 1) % 3; t0 = 0; committed = false;
      f.classList.add('drawn');
      if (reduced) { cur = 2; paint(0); sc.style.opacity = '0'; return; }
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      play();
    }
    const fail = () => f.classList.add('drawn', 'fallback');
    const init = () => { try { build(); startFrom(-1); } catch { fail(); } };
    restart.current = () => { if (built) startFrom(-1); };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !started) {
        started = true; lastW = f.clientWidth;
        if (im.complete && im.naturalWidth) setTimeout(init, 200); else im.addEventListener('load', init, { once: true });
      } else if (visible && built) { t0 = 0; committed = false; play(); }
    }, { threshold: 0.25 });
    io.observe(f);
    const ro = new ResizeObserver(() => {
      if (!built || Math.abs(f.clientWidth - lastW) < 2) { lastW = f.clientWidth; return; }
      lastW = f.clientWidth; clearTimeout(rt);
      rt = window.setTimeout(() => { try { const c0 = cur; build(); startFrom(c0 < 0 ? 0 : c0); } catch { fail(); } }, 150);
    });
    ro.observe(f);
    return () => { io.disconnect(); ro.disconnect(); if (raf) cancelAnimationFrame(raf); clearTimeout(rt); };
  }, []);

  return (
    <div ref={fig} className="photo group absolute inset-0 overflow-hidden bg-[#0a0e17]">
      <img ref={img} src={src} alt={alt} width={720} height={720} fetchPriority="high"
        className="photo__img absolute inset-0 size-full object-cover [object-position:50%_20%]" />
      <canvas ref={cv} aria-hidden="true" className="absolute inset-0 size-full" />
      <span ref={scan} aria-hidden="true" className="photo__scan" />
      <button type="button" onClick={() => restart.current()} aria-label={t('replay')}
        className="absolute right-2.5 bottom-2.5 z-[2] h-[30px] rounded-full border border-[#7ea6ff]/35 bg-[#0a0e17]/55 px-2.5 font-mono text-xs font-semibold text-[#cfe0ff] opacity-0 backdrop-blur-md transition-opacity group-[.drawn]:opacity-100">
        &lt;/&gt;
      </button>
    </div>
  );
}
