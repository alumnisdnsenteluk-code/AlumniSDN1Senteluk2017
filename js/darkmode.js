// Central Dark Mode Manager - Sync across all pages/nav
// Load on DOMContentLoaded, sync via localStorage + custom events

(function() {
  'use strict';
  
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  const STORAGE_KEY = 'alumni-theme';
  const EVENT_THEME_CHANGE = 'themechange';
  
  // Init theme
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = LIGHT_THEME;
    if (saved === DARK_THEME || (!saved && prefersDark)) {
      theme = DARK_THEME;
    }
    
    applyTheme(theme);
    updateToggleIcon(theme);
  }
  
  // Apply theme to body
  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent(EVENT_THEME_CHANGE, { detail: { theme } }));
  }
  
  // Update toggle button icon
  function updateToggleIcon(theme) {
    const toggle = document.getElementById('darkToggle');
    if (!toggle) return;
    
    const icon = toggle.querySelector('i');
    if (theme === DARK_THEME) {
      icon.className = 'bi bi-sun-fill';
      toggle.title = 'Switch to Light Mode';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
      toggle.title = 'Switch to Dark Mode';
    }
  }
  
  // Toggle handler
  function setupToggle() {
    const toggle = document.getElementById('darkToggle');
    if (!toggle) return;
    
    toggle.onclick = () => {
      const current = document.body.dataset.theme || LIGHT_THEME;
      const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      applyTheme(next);
      updateToggleIcon(next);
    };
  }
  
  // Listen for system changes
  function setupMediaListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) { // Auto-mode
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      }
    });
  }
  
  // Sync from storage on load
  function syncFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved);
    }
  }
  
  // Init everything
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      syncFromStorage();
      setupToggle();
      setupMediaListener();
    });
  } else {
    syncFromStorage();
    setupToggle();
    setupMediaListener();
  }
  
  // Export for other scripts
  window.themeManager = {
    applyTheme,
    updateToggleIcon,
    getCurrentTheme: () => document.body.dataset.theme || LIGHT_THEME
  };
  
})();

