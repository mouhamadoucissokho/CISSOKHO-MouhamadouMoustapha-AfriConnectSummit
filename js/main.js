/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - INTERACTIVITÉ JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. GESTION DU MATE / DARK MODE (LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Charger le thème sauvegardé ou utiliser 'light' par défaut
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }
  }

  /* ------------------------------------------------------------------------
     2. COMPTE À REBOURS (COUNTDOWN)
     ------------------------------------------------------------------------ */
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Date cible de l'événement : 15 Octobre 2026
  const targetDate = new Date('October 15, 2026 09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0 && daysEl && hoursEl && minutesEl && secondsEl) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  }

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ------------------------------------------------------------------------
     3. MENU HAMBURGER (MOBILE)
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. BOUTON RETOUR EN HAUT (BACK TO TOP)
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});