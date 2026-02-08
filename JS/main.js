/* Main entry point */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Iniciar tema (inmediato para evitar flicker, aunque ya carga defer)
  if (typeof initTheme === 'function') initTheme();

  // 2. Renderizar contenido (Experiencia, Skills, Proyectos) a partir de datos
  if (typeof renderAll === 'function') renderAll();

  // 3. Iniciar UI (eventos dinámicos sobre el contenido renderizado)
  if (typeof initUI === 'function') initUI();

  // 4. Traducir todo
  if (typeof initI18n === 'function') initI18n();
});
