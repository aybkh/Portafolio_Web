# Ayoub Jerari — Portafolio

Portafolio personal en [ayoubjerari.com](https://ayoubjerari.com): soporte y administración IT y desarrollo de webs y aplicaciones.

- **Mobile-first**: pensado para 390 px y escalado a tablet y escritorio.
- **Logos oficiales en color** en `assets/logos/`: SVG siempre que existe (Devicon, LobeHub, web oficial de cada empresa) y WebP cuando la marca no tiene SVG.
- **Iconos de interfaz** en un sprite SVG (`assets/icons.svg`, [Lucide](https://lucide.dev) y [Simple Icons](https://simpleicons.org)).
- **Proyectos con dispositivos reales en HTML/CSS** (MacBook, iPhone y terminal TPV, adaptados de Devices.css) que entran con animación al hacer scroll: web → portátil + móvil, TPV → TPV + portátil + móvil, juego/app → portátil. Capturas en `assets/screens/`.
- **Versión anterior** (simulador de macOS) en `legacy/` → ayoubjerari.com/legacy/
- **5 idiomas** (ES · CA · EN · FR · DE), tema claro/oscuro automático con selector.
- Sin frameworks ni build: HTML, CSS y JavaScript. Se publica tal cual en GitHub Pages.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | Página única |
| `assets/css/main.css` | Estilos (tokens de color, móvil → escritorio) |
| `assets/js/content.js` | **Proyectos, experiencia, habilidades y textos de la interfaz** — aquí se añade un proyecto nuevo |
| `assets/js/i18n-base.js` | Textos largos de experiencia y proyectos en los 5 idiomas |
| `assets/js/app.js` | Renderizado, filtros, idioma, tema y modal |
| `assets/screens/` | Capturas de cada proyecto (escritorio, móvil y TPV) |
| `assets/logos/` | Logos de tecnologías y empresas |
| `legacy/` | Portafolio anterior (simulador de macOS) |

## Añadir un proyecto

1. Exporta las capturas a `assets/screens/<id>-desk-640.webp`, `<id>-desk-1200.webp` (16:10), `<id>-mob.webp` (480 px de ancho) y, si es TPV, `<id>-pos.webp`.
2. Añade una entrada en `PROJECTS` (`assets/js/content.js`) con su `scene` (`web`, `tpv` o `laptop`), color, URL y stack.
3. Añade su subtítulo y descripción corta en `SHORT` (5 idiomas) y los detalles largos en `i18n-base.js`.
