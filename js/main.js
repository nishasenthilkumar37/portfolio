/**
 * Main Interactive Application Script
 * Features:
 * - Theme Engine (Dark/Light + Accent Color Picker)
 * - Dynamic Role Rotator
 * - Filterable Projects & Dynamic Rendering
 * - Project Case Study Modal Dialog
 * - IntersectionObserver Scroll Animations & Skill Fill
 * - Number Counter Animations
 * - Interactive Form Validation & Feedback Toast
 * - Clipboard Copy Helper
 * - ScrollSpy Active Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRoleRotator();
  renderProjects('all');
  initProjectFilters();
  initProjectModal();
  initScrollAnimations();
  initContactForm();
  initNavScrollspy();
  initBackToTop();
  initCopyHelpers();
});

/* --------------------------------------------------------------------------
   1. Theme & Accent Customization Engine
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const accentToggleBtn = document.getElementById('accent-toggle-btn');
  const accentDropdown = document.getElementById('accent-dropdown');
  const accentOptions = document.querySelectorAll('.accent-option');

  // Saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // Accent Colors Preset Map
  const accentMap = {
    indigo: { hue: '243', sat: '75%', light: '59%' },
    emerald: { hue: '160', sat: '84%', light: '39%' },
    cyan: { hue: '190', sat: '95%', light: '39%' },
    violet: { hue: '262', sat: '83%', light: '58%' },
    rose: { hue: '346', sat: '87%', light: '53%' },
    amber: { hue: '38', sat: '92%', light: '50%' }
  };

  const savedAccent = localStorage.getItem('portfolio-accent') || 'indigo';
  applyAccent(savedAccent, accentMap);

  if (accentToggleBtn && accentDropdown) {
    accentToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accentDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!accentDropdown.contains(e.target) && e.target !== accentToggleBtn) {
        accentDropdown.classList.remove('active');
      }
    });

    accentOptions.forEach(option => {
      option.addEventListener('click', () => {
        const accent = option.getAttribute('data-accent');
        if (accent && accentMap[accent]) {
          applyAccent(accent, accentMap);
          localStorage.setItem('portfolio-accent', accent);
          accentDropdown.classList.remove('active');
        }
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  function applyAccent(accentKey, map) {
    const config = map[accentKey];
    if (config) {
      document.documentElement.style.setProperty('--accent-hue', config.hue);
      document.documentElement.style.setProperty('--accent-sat', config.sat);
      document.documentElement.style.setProperty('--accent-light', config.light);
    }
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Role Rotator
   -------------------------------------------------------------------------- */
function initRoleRotator() {
  const rotatorElem = document.getElementById('role-rotator-text');
  if (!rotatorElem) return;

  const roles = [
    "Front-End Developer",
    "UI/UX Web Designer",
    "Figma & Design Systems Builder",
    "Creative Problem Solver",
    "Accessible Web Advocate"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      rotatorElem.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      rotatorElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

/* --------------------------------------------------------------------------
   3. Projects Rendering & Filter Tabs
   -------------------------------------------------------------------------- */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid-container');
  if (!container || typeof portfolioProjects === 'undefined') return;

  container.innerHTML = '';

  const filtered = filter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === filter);

  filtered.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);

    const tagsHtml = project.tags.slice(0, 3).map(tag => 
      `<span class="project-tech-tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
      <div class="project-thumb-box">
        <span class="project-badge-pill">${project.badge}</span>
        <img src="${project.image}" alt="${project.title} Preview" class="project-img" loading="lazy">
      </div>
      <div class="project-content">
        <span class="project-category">${project.categoryLabel}</span>
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-desc">${project.shortDesc}</p>
        <div class="project-tech-tags">
          ${tagsHtml}
        </div>
        <div class="project-footer-actions">
          <button class="project-action-link view-case-study-btn" data-id="${project.id}">
            View Details & Case Study <span aria-hidden="true">→</span>
          </button>
          <div style="display: flex; gap: 0.5rem;">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="View Source Code" style="width:32px;height:32px;font-size:0.9rem;">&lt;/&gt;</a>` : ''}
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Live Preview" style="width:32px;height:32px;font-size:0.9rem;">↗</a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
      initModalTriggers();
    });
  });
}

/* --------------------------------------------------------------------------
   4. Project Deep Dive Modal Dialog
   -------------------------------------------------------------------------- */
function initProjectModal() {
  initModalTriggers();

  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

function initModalTriggers() {
  const triggers = document.querySelectorAll('.view-case-study-btn');
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-id');
      const project = portfolioProjects.find(p => p.id === projectId);
      if (project) {
        populateAndOpenModal(project);
      }
    });
  });
}

function populateAndOpenModal(project) {
  const modal = document.getElementById('project-modal');
  const titleElem = document.getElementById('modal-project-title');
  const bodyElem = document.getElementById('modal-project-body');
  const footerElem = document.getElementById('modal-project-footer');

  if (!modal || !titleElem || !bodyElem) return;

  titleElem.textContent = project.title;

  const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

  bodyElem.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-thumb" />

    <div class="modal-meta-grid">
      <div class="modal-meta-item">
        <span class="modal-meta-label">My Role</span>
        <span class="modal-meta-value">${project.role}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">Timeline</span>
        <span class="modal-meta-value">${project.duration}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">Category</span>
        <span class="modal-meta-value">${project.categoryLabel}</span>
      </div>
    </div>

    <div>
      <h4 class="modal-section-title">Overview</h4>
      <p class="section-description" style="font-size: 0.95rem; color: var(--text-muted);">${project.fullDesc}</p>
    </div>

    <div>
      <h4 class="modal-section-title">The Challenge</h4>
      <p style="font-size: 0.95rem; color: var(--text-muted);">${project.challenge}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Key Solution & Approach</h4>
      <p style="font-size: 0.95rem; color: var(--text-muted);">${project.solution}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Key Metrics & Highlights</h4>
      <p style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">${project.metrics}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Technologies & Tools Used</h4>
      <div class="tag-cloud" style="margin-top: 0.5rem;">
        ${tagsHtml}
      </div>
    </div>
  `;

  footerElem.innerHTML = `
    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">&lt;/&gt; GitHub Repo</a>` : ''}
    ${project.figmaUrl ? `<a href="${project.figmaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">🎨 Figma File</a>` : ''}
    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">🚀 Live Demo</a>
  `;

  modal.showModal();
}

/* --------------------------------------------------------------------------
   5. Scroll Animations & Dynamic Stats Counters
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  // Animate skill progress bars when in viewport
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width') || '85%';
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // Animate Stat Numbers counter
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const targetValue = parseInt(item.getAttribute('data-count') || '0', 10);
          const suffix = item.getAttribute('data-suffix') || '';
          animateCounter(item, targetValue, suffix);
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
  }

  function animateCounter(elem, target, suffix) {
    let start = 0;
    const duration = 1500;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        elem.textContent = target + suffix;
        clearInterval(timer);
      } else {
        elem.textContent = Math.floor(start) + suffix;
      }
    }, stepTime);
  }
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Interactive Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageInput = document.getElementById('contact-message');
  const charCount = document.getElementById('char-count');
  const feedbackElem = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = `${messageInput.value.length} / 500`;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = messageInput.value.trim();

      // Simple validation
      if (!name || !email || !message) {
        showFeedback("Please fill out all required fields.", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        return;
      }

      // Show sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Message...</span> ⏳`;
      }

      // Simulate asynchronous form delivery
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <span class="btn-icon">✈</span>`;
        }
        showFeedback(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you shortly!`, "success");
        form.reset();
        if (charCount) charCount.textContent = '0 / 500';
      }, 1200);
    });
  }

  function showFeedback(text, type) {
    if (!feedbackElem) return;
    feedbackElem.textContent = text;
    feedbackElem.className = `form-feedback ${type}`;
    feedbackElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* --------------------------------------------------------------------------
   7. Navigation ScrollSpy & Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initNavScrollspy() {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const isOpen = navLinks.classList.contains('mobile-active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // Scroll header shadow & Active link highlight
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   8. Back to Top Floating Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. One-Click Copy to Clipboard Helper
   -------------------------------------------------------------------------- */
function initCopyHelpers() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const emailToCopy = copyBtn.getAttribute('data-email') || 'alex.developer@example.com';
    navigator.clipboard.writeText(emailToCopy).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      copyBtn.style.backgroundColor = 'var(--color-success)';
      copyBtn.style.color = '#ffffff';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(() => {
      prompt("Copy email address:", emailToCopy);
    });
  });
}
