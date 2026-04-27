document.addEventListener('DOMContentLoaded', () => {
  /* Año */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Setup Boot and Login First */
  setupBootAndLogin();

  /* Setup */
  setupTheme();
  setupDock();
  setupReveal();
  setupSkills();
  setupContact();
  setupI18N();
  setupLinks();
  setupLogoTooltips();
  setupMenubar();
  setupLangDropdown();
  setupControlCenter();
  setupBattery();
  setupSpotlight();
  setupAboutModal();
  setupShortcutsModal();
  setupCVModal();
  setupKeyboard();
  setupContextMenu();

  /* Clock */
  updateClock();
  setInterval(updateClock, 1000);
});
