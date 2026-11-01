import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import base from '../data/base.json';
import { LANGS, QC, SHORT, UI, type Lang, type Project } from '../data/content';

/* Textos nuevos de la versión React (paleta de comandos, etc.) */
const UI2: Record<Lang, Record<string, string>> = {
  es: { search: 'Buscar proyectos, secciones o acciones…', palette: 'Buscar', go: 'Ir a', toggle_theme: 'Cambiar tema claro / oscuro', change_lang: 'Cambiar idioma', no_results: 'Sin resultados', tools: 'Herramientas que uso', drag: 'Desliza para cerrar', replay: 'Volver a dibujar la foto' },
  ca: { search: 'Cerca projectes, seccions o accions…', palette: 'Cercar', go: 'Anar a', toggle_theme: 'Canviar tema clar / fosc', change_lang: 'Canviar idioma', no_results: 'Sense resultats', tools: 'Eines que faig servir', drag: 'Llisca per tancar', replay: 'Tornar a dibuixar la foto' },
  en: { search: 'Search projects, sections or actions…', palette: 'Search', go: 'Go to', toggle_theme: 'Toggle light / dark theme', change_lang: 'Change language', no_results: 'No results', tools: 'Tools I use', drag: 'Swipe down to close', replay: 'Draw the photo again' },
  fr: { search: 'Rechercher projets, sections ou actions…', palette: 'Rechercher', go: 'Aller à', toggle_theme: 'Changer de thème', change_lang: 'Changer de langue', no_results: 'Aucun résultat', tools: 'Outils que j’utilise', drag: 'Glissez pour fermer', replay: 'Redessiner la photo' },
  de: { search: 'Projekte, Bereiche oder Aktionen suchen…', palette: 'Suchen', go: 'Gehe zu', toggle_theme: 'Hell / Dunkel wechseln', change_lang: 'Sprache wechseln', no_results: 'Keine Ergebnisse', tools: 'Meine Werkzeuge', drag: 'Zum Schließen wischen', replay: 'Foto neu zeichnen' }
};

const B_ = base as unknown as Record<Lang, Record<string, unknown>>;
const UI_ = UI as unknown as Record<Lang, Record<string, unknown>>;
const codes = LANGS.map((l) => l.code);

function get(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), obj);
}

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang') as Lang | null;
    if (q && codes.includes(q)) return q;
    const s = localStorage.getItem('lang') as Lang | null;
    if (s && codes.includes(s)) return s;
  } catch { /* sin almacenamiento */ }
  const n = (navigator.language || 'es').slice(0, 2).toLowerCase() as Lang;
  return codes.includes(n) ? n : 'es';
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  b: (key: string) => string;
  bAny: (key: string) => unknown;
  project: (p: Project) => { name: string; sub: string; short: string; long: string[]; features: string[] };
}
const I18n = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* */ }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const t = (key: string) => {
      const v = UI2[lang][key] ?? get(UI_[lang], key) ?? UI2.es[key] ?? get(UI_.es, key);
      return typeof v === 'string' ? v : key;
    };
    const bAny = (key: string) => get(B_[lang], key) ?? get(B_.es, key);
    const b = (key: string) => { const v = bAny(key); return typeof v === 'string' ? v : ''; };
    const project = (p: Project) => {
      const s = SHORT[p.key]?.[lang] ?? SHORT[p.key]?.es ?? ['', ''];
      const out = { name: p.title ?? 'QuiCondueix', sub: s[0], short: s[1], long: [] as string[], features: [] as string[] };
      if (p.key === 'qc') {
        const q = QC[lang] ?? QC.es;
        out.long = [q.long];
        out.features = q.features;
      } else {
        const d = (bAny(`proj.${p.key}_details`) ?? {}) as { description?: string; features?: string[] };
        const desc = b(`proj.${p.key}_desc`);
        if (desc && desc !== d.description) out.long.push(desc);
        if (d.description) out.long.push(d.description);
        out.features = d.features ?? [];
      }
      return out;
    };
    return { lang, setLang: setLangState, t, b, bAny, project };
  }, [lang]);

  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export function useI18n() {
  const c = useContext(I18n);
  if (!c) throw new Error('useI18n fuera de I18nProvider');
  return c;
}
