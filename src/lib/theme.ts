import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
function initial(): Theme {
  try { const s = localStorage.getItem('theme'); if (s === 'light' || s === 'dark') return s; } catch { /* */ }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07090d' : '#f5f4f0');
  }, [theme]);
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch { /* */ }
    // transición circular desde el botón (View Transitions API) si está disponible
    const d = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (d.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) d.startViewTransition(() => setTheme(next));
    else setTheme(next);
  };
  return { theme, toggle };
}
