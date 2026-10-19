/**
 * BeTheYou — Official JavaScript Application
 * Design: Light, Minimal, Editorial, Human-Centered, Premium
 * Brand: BETheYOU | BE. BUILD. BECOME.
 */

'use strict';

// ==========================================================================
// 1. Central Configuration
// All contact details, endpoints, and social links are centralized here
// for straightforward replacement without digging through layout files.
// ==========================================================================
const CONFIG = {
  brand: {
    name: 'BeTheYou',
    tagline: 'BE. BUILD. BECOME.',
    founder: 'Jishad Musthafa'
  },
  contact: {
    email: 'contact@betheyou.com',
    location: 'Cochin, India & Worldwide Virtual'
  },
  socials: {
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com'
  },
  // Backend Integration Hook:
  // Set to a live serverless function / webhook URL (e.g. Formspree, custom API)
  // When null or empty, it uses the built-in local validation simulation.
  apiEndpoint: null
};

// ==========================================================================
// 2. Program Data Repository
// Strictly matches the provided source material without fabricated curricula.
// ==========================================================================
const PROGRAMS_DATA = {
  'be-confident': {
    title: 'BE CONFIDENT',
    badge: 'Personal Effectiveness',
    headline: 'Build the confidence to show up, speak up and step forward.',
    description: 'Confidence, personal effectiveness and self-development experiences designed to help you become more comfortable with yourself and your abilities.',
    focusArea: 'Self-awareness, executive presence, overcoming hesitation, daily confidence habits, and authentic self-expression.',
    inquiryVal: 'Be Confident',
    defaultAudience: 'Individual'
  },
  'be-heard': {
    title: 'BE HEARD',
    badge: 'Communication Mastery',
    headline: 'Find your voice. Express your ideas. Make an impact.',
    description: 'Develop communication, public speaking, presentation, and professional expression through practical learning and guided practice.',
    focusArea: 'Idea structuring, conversational clarity, presentation confidence, voice modulation, and audience connection.',
    inquiryVal: 'Be Heard',
    defaultAudience: 'Individual'
  },
  'be-leader': {
    title: 'BE A LEADER',
    badge: 'Leadership & Influence',
    headline: 'Lead yourself. Lead others. Create an impact.',
    description: 'Build the mindset, communication and people skills required to lead with clarity, confidence and responsibility.',
    focusArea: 'Self-leadership principles, empathetic listening, guiding team dialogue, accountability, and decision clarity.',
    inquiryVal: 'Be a Leader',
    defaultAudience: 'Individual'
  },
  'be-future-ready': {
    title: 'BE FUTURE-READY',
    badge: 'Digital & Human Capabilities',
    headline: 'Learn to work with what comes next.',
    description: 'Develop practical AI awareness, digital capabilities, and future-focused skills while strengthening the human abilities that remain essential.',
    focusArea: 'Practical AI tools literacy, adaptability, critical thinking, ethical tech awareness, and irreplaceable human skills.',
    inquiryVal: 'Be Future-Ready',
    defaultAudience: 'Individual'
  },
  'be-your-best': {
    title: 'BE YOUR BEST',
    badge: 'Personal Mastery & Coaching',
    headline: 'Growth begins within.',
    description: 'Personal mastery, coaching and development experiences designed to help you build self-awareness, discipline, clarity and personal effectiveness.',
    focusArea: 'One-on-one guided reflection, personal habits, priority clarification, and continuous self-improvement framework.',
    inquiryVal: 'Be Your Best',
    defaultAudience: 'Individual'
  },
  'build-better-teams': {
    title: 'BUILD BETTER TEAMS',
    badge: 'Organizational Learning',
    headline: 'Stronger people. Stronger teams. Stronger organizations.',
    description: 'Practical corporate learning experiences focused on communication, confidence, leadership, teamwork, and performance.',
    focusArea: 'Team alignment workshops, constructive communication channels, cross-functional trust, and collaborative performance.',
    inquiryVal: 'Build Better Teams',
    defaultAudience: 'Organization'
  }
};

// ==========================================================================
// 3. Application State & DOM Ready Initialization
// ==========================================================================
function initApp() {
  initLightThemeLock();
  initDynamicYear();
  initStickyHeader();
  initMobileNavigation();
  initSmoothScrollAndActiveNav();
  initProgramFilters();
  initModals();
  initInquiryForm();
  initScrollAnimations();
  initBackToTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// --------------------------------------------------------------------------
// Dynamic Year in Footer
// --------------------------------------------------------------------------
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// --------------------------------------------------------------------------
// Sticky Header Scroll State
// --------------------------------------------------------------------------
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// --------------------------------------------------------------------------
// Mobile Navigation (Drawer, Hamburger, ARIA, Focus Management)
// --------------------------------------------------------------------------
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const links = drawer ? drawer.querySelectorAll('.mobile-nav-link, button') : [];

  if (!toggleBtn || !drawer) return;

  let isMenuOpen = false;

  const openMenu = () => {
    isMenuOpen = true;
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('hidden');
    // Force reflow before adding transition class
    void drawer.offsetWidth;
    drawer.classList.add('open');
    document.body.classList.add('modal-open');
  };

  const closeMenu = () => {
    isMenuOpen = false;
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      if (!isMenuOpen) {
        drawer.setAttribute('hidden', '');
      }
    }, 250);
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking mobile links
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Automatically close menu when resizing to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMenuOpen) {
      closeMenu();
    }
  });
}

// --------------------------------------------------------------------------
// Smooth Scrolling & Active Section Highlighting
// --------------------------------------------------------------------------
function initSmoothScrollAndActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('main > section[id]');

  // Smooth scroll handler for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')?.offsetHeight || 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Set focus to the section for screen readers
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });

  // Active section indicator using IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }
}

// --------------------------------------------------------------------------
// Reusable Modals (Program Detail, Inquiry, Founder Bio)
// --------------------------------------------------------------------------
function initModals() {
  const programModal = document.getElementById('program-modal-overlay');
  const inquiryModal = document.getElementById('inquiry-modal-overlay');
  const founderModal = document.getElementById('founder-modal-overlay');
  let lastFocusedElement = null;

  // Generic modal opening function
  const openModal = (modalEl) => {
    if (!modalEl) return;
    lastFocusedElement = document.activeElement;
    modalEl.classList.add('active', 'open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus close button inside modal
    const closeBtn = modalEl.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  };

  // Generic modal closing function
  const closeModal = (modalEl) => {
    if (!modalEl) return;
    modalEl.classList.remove('active', 'open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  // Close when clicking overlay backdrop or secondary close buttons
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.modal-close-btn') || e.target.closest('.modal-close-secondary')) {
        closeModal(overlay);
      }
    });
  });

  // Escape key closes any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active, .modal-overlay.open');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // Program Detail Trigger Buttons
  const programDetailButtons = document.querySelectorAll('.program-detail-btn');
  programDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const progId = btn.getAttribute('data-program');
      const data = PROGRAMS_DATA[progId];
      if (!data) return;

      // Populate Program Modal
      document.getElementById('program-modal-badge').textContent = data.badge;
      document.getElementById('program-modal-title').textContent = data.title;
      document.getElementById('program-modal-headline').textContent = data.headline;
      document.getElementById('program-modal-desc').textContent = data.description;
      document.getElementById('program-modal-meta-focus').textContent = data.focusArea;

      // Wire Inquire button inside modal
      const inquireBtn = document.getElementById('program-modal-inquire-btn');
      inquireBtn.onclick = () => {
        closeModal(programModal);
        openInquiryWithContext(data.defaultAudience, data.inquiryVal);
      };

      openModal(programModal);
    });
  });

  // Founder Profile Modal Trigger
  const founderTrigger = document.querySelector('.open-founder-modal-btn');
  if (founderTrigger) {
    founderTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(founderModal);
    });
  }

  // Inquiry Modal Trigger Buttons
  const inquiryButtons = document.querySelectorAll('.open-inquiry-btn');
  inquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const audience = btn.getAttribute('data-audience') || 'Individual';
      const program = btn.getAttribute('data-program') || 'General Inquiry';
      openInquiryWithContext(audience, program);
    });
  });

  // Helper to open inquiry modal with preset selections
  window.openInquiryWithContext = function(audience, program) {
    const audienceSelect = document.getElementById('inquiry-audience');
    const programSelect = document.getElementById('inquiry-program');

    if (audienceSelect && audience) {
      audienceSelect.value = audience;
    }
    if (programSelect && program) {
      programSelect.value = program;
    }

    // Reset status & success state if opened anew
    resetInquiryView();
    openModal(inquiryModal);
  };
}

// --------------------------------------------------------------------------
// Inquiry Form Validation & Submission
// --------------------------------------------------------------------------
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  const successView = document.getElementById('form-success-view');
  const resetBtn = document.getElementById('form-success-reset-btn');
  const submitBtn = document.getElementById('inquiry-submit-btn');
  const statusMsg = document.getElementById('form-general-status');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function
  const validateField = (input, group, validator) => {
    const isValid = validator(input.value.trim());
    if (!isValid) {
      group.classList.add('has-error');
      input.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
      input.classList.remove('has-error');
    }
    return isValid;
  };

  const nameInput = document.getElementById('inquiry-name');
  const nameGroup = document.getElementById('group-name');

  const emailInput = document.getElementById('inquiry-email');
  const emailGroup = document.getElementById('group-email');

  const messageInput = document.getElementById('inquiry-message');
  const messageGroup = document.getElementById('group-message');

  // Input listeners for immediate feedback on typing
  nameInput.addEventListener('input', () => validateField(nameInput, nameGroup, val => val.length >= 2));
  emailInput.addEventListener('input', () => validateField(emailInput, emailGroup, val => emailRegex.test(val)));
  messageInput.addEventListener('input', () => validateField(messageInput, messageGroup, val => val.length >= 5));

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameGroup, val => val.length >= 2);
    const isEmailValid = validateField(emailInput, emailGroup, val => emailRegex.test(val));
    const isMessageValid = validateField(messageInput, messageGroup, val => val.length >= 5);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      statusMsg.textContent = 'Please complete all required fields correctly before submitting.';
      statusMsg.className = 'form-status-msg error';
      return;
    }

    // Prepare payload
    const formData = {
      fullName: nameInput.value.trim(),
      email: emailInput.value.trim(),
      audienceType: document.getElementById('inquiry-audience').value,
      programArea: document.getElementById('inquiry-program').value,
      message: messageInput.value.trim(),
      submittedAt: new Date().toISOString()
    };

    // UI Loading State
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending...';
    statusMsg.textContent = '';
    statusMsg.className = 'form-status-msg';

    try {
      if (CONFIG.apiEndpoint) {
        // Live serverless backend dispatch
        const response = await fetch(CONFIG.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Server returned an error status.');
        }
      } else {
        // Simulated responsive network delay for prototype/client-side mode
        await new Promise(resolve => setTimeout(resolve, 850));
      }

      // Success Display
      form.style.display = 'none';
      if (successView) {
        successView.classList.add('active');
      }
    } catch (err) {
      statusMsg.textContent = 'Unable to send inquiry at this time. Please email us directly at ' + CONFIG.contact.email;
      statusMsg.className = 'form-status-msg error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });

  // Reset Button in Success View
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      resetInquiryView();
    });
  }
}

function resetInquiryView() {
  const form = document.getElementById('inquiry-form');
  const successView = document.getElementById('form-success-view');
  const statusMsg = document.getElementById('form-general-status');

  if (form) {
    form.style.display = 'flex';
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  }
  if (successView) {
    successView.classList.remove('active');
  }
  if (statusMsg) {
    statusMsg.textContent = '';
    statusMsg.className = 'form-status-msg';
  }
}

// --------------------------------------------------------------------------
// Subtle Scroll-Triggered Reveal Animations
// --------------------------------------------------------------------------
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const revealElement = (el) => {
    el.classList.add('is-revealed', 'revealed');
  };

  // Check user motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => revealElement(el));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '60px 0px 60px 0px',
    threshold: 0.05
  });

  elements.forEach(el => {
    // If element is already in viewport or above fold on page load, reveal immediately
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight) {
      revealElement(el);
    } else {
      observer.observe(el);
    }
  });
}

// --------------------------------------------------------------------------
// Back to Top Button
// --------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --------------------------------------------------------------------------
// Light Theme Only Lock
// --------------------------------------------------------------------------
function initLightThemeLock() {
  try {
    localStorage.removeItem('bthyou_creative_theme');
  } catch (e) {
    // Graceful fallback if storage is restricted
  }
  document.documentElement.setAttribute('data-theme', 'light');
}

// --------------------------------------------------------------------------
// Interactive Program Category Filters
// --------------------------------------------------------------------------
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (!filterBtns.length || !programCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on tab buttons
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.classList.remove('hidden');
          // Add micro-reveal animation
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = 'revealCard 350ms ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

