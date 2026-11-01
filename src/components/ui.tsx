import { useCallback, useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { ICONS } from '../lib/icons';
import { LOGOS, TECH } from '../data/content';

/** Icono de interfaz (trazo Lucide) */
export function Icon({ name, className = '', style }: { name: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`ico ${className}`} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] ?? '' }} />
  );
}

/** Logo real de una tecnología o empresa (assets en /logos) */
export function Logo({ id, className = '', alt = '' }: { id: string; className?: string; alt?: string }) {
  const f = LOGOS[id];
  if (!f) return <Icon name="code" className={className} />;
  return <img src={`/logos/${f}`} alt={alt} width={32} height={32} loading="lazy" decoding="async" className={className} />;
}

export function LogoBox({ id, className = '' }: { id: string; className?: string }) {
  return <span className={`lgbox ${className}`}><Logo id={id} /></span>;
}

/** Chip de tecnología: siempre con su logo */
export function Tech({ name }: { name: string }) {
  return <li className="tech"><LogoBox id={TECH[name] ?? 'code'} />{name}</li>;
}

export function TechList({ items, className = '' }: { items: string[]; className?: string }) {
  return <ul className={`flex flex-wrap gap-1.5 ${className}`}>{items.map((t) => <Tech key={t} name={t} />)}</ul>;
}

/** Actualiza --mx/--my para el brillo que sigue al cursor (clase .spot) */
export function spotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget, r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

/** Media query reactiva */
export function useMedia(q: string) {
  const get = useCallback(() => typeof window !== 'undefined' && window.matchMedia(q).matches, [q]);
  const [m, setM] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(q), on = () => setM(mq.matches);
    mq.addEventListener('change', on); on();
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}
