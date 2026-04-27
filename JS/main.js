document.addEventListener('DOMContentLoaded', () => {
  /* Año */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Setup */
  setupTheme();
  setupDock();
  setupReveal();
  setupSkills();
  setupContact();
  setupI18N();
  setupLinks();
  setupLogoTooltips();

  /* New macOS Header Features */
  setupMenubar();
  setupLangDropdown();
  setupControlCenter();
  setupBattery();
  setupSpotlight();
  setupAboutModal();
  setupShortcutsModal();
  setupCVModal();
  setupKeyboard();
  setupBootAndLogin();
  setupContextMenu();

  /* Clock */
  updateClock();
  setInterval(updateClock, 1000);
});
