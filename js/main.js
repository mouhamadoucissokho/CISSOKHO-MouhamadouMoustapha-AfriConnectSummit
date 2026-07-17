/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - INTERACTIVITÉ JAVASCRIPT COMPLET (VANILLA)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     A. ANIMATION FADE-IN DE LA PAGE AU CHARGEMENT
     ------------------------------------------------------------------------ */
  document.body.classList.add('fade-in');

  /* ------------------------------------------------------------------------
     B. ANNÉE DYNAMIQUE DANS LE FOOTER
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     1. GESTION DU MODE SOMBRE / CLAIR (LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Charger le thème sauvegardé ou utiliser 'dark' par défaut
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    }
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR DYNAMIQUE AU SCROLL (fond + ombre après 80px)
     ------------------------------------------------------------------------ */
  const headerEl = document.getElementById('header');

  if (headerEl) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. BOUTON RETOUR EN HAUT (apparaît après 300px de scroll)
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. COMPTE À REBOURS (COUNTDOWN) - Uniquement sur l'accueil
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
     5. MENU HAMBURGER (MOBILE)
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'bi bi-x-lg' : 'bi bi-list';
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. ONGLETS DU PROGRAMME (TABS) - Uniquement page programme
     ------------------------------------------------------------------------ */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.day;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(`day-${targetTab}`).classList.add('active');
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. FILTRES INTERVENANTS - Uniquement page intervenants
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        speakerCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. COMPTEURS ANIMÉS (STATISTIQUES) - déclenchés au scroll
     ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(eased * target);

      el.textContent = currentValue.toLocaleString('fr-FR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('fr-FR');
      }
    }

    requestAnimationFrame(update);
  }

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /* ------------------------------------------------------------------------
     9. ANIMATION AU SCROLL (IntersectionObserver) - classe .reveal
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     10. VALIDATION FORMULAIRE CONTACT - Uniquement page contact
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-msg');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const typeInput = document.getElementById('type');
    const countryInput = document.getElementById('country');
    const messageInput = document.getElementById('message');

    // Fonction générique pour afficher une erreur sous un champ
    function setFieldState(input, isValid, errorText) {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        if (errorEl) errorEl.classList.remove('show');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        if (errorEl) {
          errorEl.textContent = errorText;
          errorEl.classList.add('show');
        }
      }
    }

    function validateName() {
      const isValid = nameInput.value.trim().length > 0;
      setFieldState(nameInput, isValid, 'Le nom complet est requis.');
      return isValid;
    }

    function validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = regex.test(emailInput.value.trim());
      setFieldState(emailInput, isValid, 'Adresse email invalide.');
      return isValid;
    }

    function validatePhone() {
      if (!phoneInput) return true;
      const digitsOnly = phoneInput.value.replace(/\D/g, '');
      const isValid = digitsOnly.length >= 8;
      setFieldState(phoneInput, isValid, 'Numéro invalide (minimum 8 chiffres).');
      return isValid;
    }

    function validateType() {
      if (!typeInput) return true;
      const isValid = typeInput.value !== '';
      setFieldState(typeInput, isValid, 'Veuillez choisir un type de participation.');
      return isValid;
    }

    function validateCountry() {
      if (!countryInput) return true;
      const isValid = countryInput.value !== '';
      setFieldState(countryInput, isValid, 'Veuillez choisir un pays.');
      return isValid;
    }

    function validateMessage() {
      const isValid = messageInput.value.trim().length >= 20;
      setFieldState(messageInput, isValid, 'Le message doit contenir au moins 20 caractères.');
      return isValid;
    }

    // Validation en temps réel
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (phoneInput) phoneInput.addEventListener('blur', validatePhone);
    if (typeInput) typeInput.addEventListener('change', validateType);
    if (countryInput) countryInput.addEventListener('change', validateCountry);
    if (messageInput) messageInput.addEventListener('blur', validateMessage);

    // Validation complète à la soumission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isTypeValid = validateType();
      const isCountryValid = validateCountry();
      const isMessageValid = validateMessage();

      const allValid = isNameValid && isEmailValid && isPhoneValid &&
                        isTypeValid && isCountryValid && isMessageValid;

      if (allValid) {
        if (successMessage) {
          successMessage.classList.add('show');
          setTimeout(() => {
            successMessage.classList.remove('show');
          }, 5000);
        }
        contactForm.reset();
        // Réinitialiser les états visuels des champs
        contactForm.querySelectorAll('.valid, .invalid').forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
      }
    });
  }

});