# Ayoub — Portafolio

Portafolio personal en [ayoubjerari.com](https://ayoubjerari.com).

- **React 18 + Vite + TypeScript + Tailwind CSS 4**, animaciones con [Motion](https://motion.dev).
- Mobile-first, 5 idiomas (ES · CA · EN · FR · DE), tema claro/oscuro y paleta de comandos (`⌘K` / `Ctrl+K`).
- Foto dibujada en código (canvas) en tres fases con línea de análisis.
- Proyectos con dispositivos en HTML/CSS (MacBook, iPhone y TPV, adaptados de Devices.css · MIT), parallax y giro 3D.
- Logos reales en `public/logos/` (SVG cuando existe; si no, WebP).
- La versión anterior (simulador de macOS) está en `legacy/` y se publica en `/legacy/` tal cual.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/
```

## Publicación

Cada push a `main` compila y publica con GitHub Actions (`.github/workflows/deploy.yml`).
En GitHub → Settings → Pages → *Build and deployment* → **Source: GitHub Actions** (una sola vez).

## Estructura

| Ruta | Qué contiene |
|---|---|
| `src/data/content.ts` | Proyectos, experiencia, habilidades, idiomas y textos de interfaz — **aquí se añade un proyecto** |
| `src/data/base.json` | Textos largos de experiencia y detalles de proyectos en los 5 idiomas |
| `src/components/` | Header, Hero (bento), Projects, Devices, ProjectModal, Experience, Skills, Contact, CommandPalette, PhotoCode |
| `public/screens/` | Capturas de cada proyecto (`<id>-desk-640/1200.webp`, `<id>-mob.webp`, `<id>-pos.webp`) |
| `public/logos/` | Logos de tecnologías y empresas |
| `legacy/` | Portafolio anterior (no se toca) |

## Añadir un proyecto

1. Capturas en `public/screens/` con los nombres de arriba.
2. Entrada en `PROJECTS` (`src/data/content.ts`) con `scene` (`web`, `tpv` o `laptop`), color, URL y stack.
3. Subtítulo y descripción corta en `SHORT` (5 idiomas) y, si quieres, detalles largos en `base.json`.
