document.addEventListener('DOMContentLoaded', () => {
  const safeCall = (fn, name) => {
    try {
      if (typeof fn === 'function') fn();
      else console.warn(`${name} is not a function`);
    } catch (e) {
      console.error(`Error in ${name}:`, e);
    }
  };

  /* Año */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Setup Boot and Login First */
  safeCall(setupBootAndLogin, 'setupBootAndLogin');

  /* Setup */
  safeCall(setupTheme, 'setupTheme');
  safeCall(setupDock, 'setupDock');
  safeCall(setupReveal, 'setupReveal');
  safeCall(setupSkills, 'setupSkills');
  safeCall(setupContact, 'setupContact');
  safeCall(setupI18N, 'setupI18N');
  safeCall(setupLinks, 'setupLinks');
  safeCall(setupLogoTooltips, 'setupLogoTooltips');
  safeCall(setupMenubar, 'setupMenubar');
  safeCall(setupLangDropdown, 'setupLangDropdown');
  safeCall(setupControlCenter, 'setupControlCenter');
  safeCall(setupBattery, 'setupBattery');
  safeCall(setupSpotlight, 'setupSpotlight');
  safeCall(setupQuickLook, 'setupQuickLook');
  safeCall(setupAboutModal, 'setupAboutModal');
  safeCall(setupShortcutsModal, 'setupShortcutsModal');
  safeCall(setupCVModal, 'setupCVModal');
  safeCall(setupKeyboard, 'setupKeyboard');
  safeCall(setupLogout, 'setupLogout');
  safeCall(setupContextMenu, 'setupContextMenu');

  /* Clock */
  safeCall(updateClock, 'updateClock');
  setInterval(() => safeCall(updateClock, 'updateClock'), 1000);
});
