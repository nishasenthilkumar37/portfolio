/**
 * Main Interactive Application Script for Nisha S Portfolio
 * Features:
 * - Particle Background Canvas Engine
 * - Cyber Theme & Multi-Accent Palette Switcher
 * - Dynamic Typewriter Role Rotator (MBA, Front-End, Python, Java, SQL)
 * - Projects Filter & Dynamic Case Study Modal
 * - Interactive Resume Viewer Modal
 * - IntersectionObserver Scroll Animations & Skill Bar Fill
 * - Quick Stats Number Counters
 * - Contact Form Real-time Validation & Feedback
 * - One-Click Clipboard Copy for Email & Phone Number
 * - Navigation ScrollSpy & Mobile Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTheme();
  initRoleRotator();
  renderProjects('all');
  initProjectFilters();
  initProjectModal();
  initResumeModal();
  initScrollAnimations();
  initContactForm();
  initNavScrollspy();
  initBackToTop();
  initCopyHelpers();
});

/* --------------------------------------------------------------------------
   1. Interactive Particle Background Canvas
   -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const baseColor = isDark ? '168, 85, 247' : '99, 102, 241';

    // Draw lines between proximate particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${baseColor}, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   2. Theme & Accent Customization Engine
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const accentToggleBtn = document.getElementById('accent-toggle-btn');
  const accentDropdown = document.getElementById('accent-dropdown');
  const accentOptions = document.querySelectorAll('.accent-option');

  // Saved theme or default to dark
  const savedTheme = localStorage.getItem('nisha-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('nisha-portfolio-theme', newTheme);
    });
  }

  // Accent Colors Preset Map
  const accentMap = {
    violet: { hue: '275', sat: '85%', light: '62%' },
    rose: { hue: '338', sat: '88%', light: '58%' },
    emerald: { hue: '160', sat: '84%', light: '42%' },
    sapphire: { hue: '215', sat: '92%', light: '56%' },
    gold: { hue: '42', sat: '95%', light: '52%' }
  };

  const savedAccent = localStorage.getItem('nisha-portfolio-accent') || 'violet';
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
          localStorage.setItem('nisha-portfolio-accent', accent);
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
   3. Dynamic Role Rotator
   -------------------------------------------------------------------------- */
function initRoleRotator() {
  const rotatorElem = document.getElementById('role-rotator-text');
  if (!rotatorElem) return;

  const roles = [
    "MBA Candidate & Strategist",
    "Front-End Web Developer",
    "Python & Java Programmer",
    "UI/UX & Web Designer",
    "Data & SQL Analyst",
    "BSc. Information Technology"
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
      typingSpeed = 35;
    } else {
      rotatorElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1900; // Pause at end of role
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 350; // Pause before new role
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

/* --------------------------------------------------------------------------
   4. Projects Rendering & Filter Tabs
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
        <img src="${project.image}" alt="${project.title} Visual Preview" class="project-img" loading="lazy">
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
            View Case Study Details <span aria-hidden="true">→</span>
          </button>
          <div style="display: flex; gap: 0.5rem;">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="View Source Code" style="width:34px;height:34px;font-size:0.95rem;">&lt;/&gt;</a>` : ''}
            <a href="#contact" class="icon-btn" title="Discuss Project" style="width:34px;height:34px;font-size:0.95rem;">💬</a>
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
   5. Project Deep Dive Modal Dialog
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
        <span class="modal-meta-label">Role</span>
        <span class="modal-meta-value">${project.role}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">Project Type</span>
        <span class="modal-meta-value">${project.duration}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">Domain</span>
        <span class="modal-meta-value">${project.categoryLabel}</span>
      </div>
    </div>

    <div>
      <h4 class="modal-section-title">Project Overview & Purpose</h4>
      <p style="font-size: 0.98rem; color: var(--text-muted); line-height: 1.65;">${project.fullDesc}</p>
    </div>

    <div>
      <h4 class="modal-section-title">The Challenge Addressed</h4>
      <p style="font-size: 0.98rem; color: var(--text-muted); line-height: 1.65;">${project.challenge}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Key Solution & Technical Approach</h4>
      <p style="font-size: 0.98rem; color: var(--text-muted); line-height: 1.65;">${project.solution}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Impact & Key Highlights</h4>
      <p style="font-weight: 800; color: var(--color-primary); font-size: 1rem;">${project.metrics}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Technologies & Skills Utilized</h4>
      <div class="tag-cloud" style="margin-top: 0.5rem;">
        ${tagsHtml}
      </div>
    </div>
  `;

  footerElem.innerHTML = `
    <a href="#contact" onclick="document.getElementById('project-modal').close()" class="btn btn-secondary btn-sm">💬 Discuss with Nisha</a>
    <a href="https://www.linkedin.com/in/nisha-senthil-kumar-321440264" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Connect on LinkedIn</a>
  `;

  modal.showModal();
}

/* --------------------------------------------------------------------------
   6. Interactive Resume Viewer Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (openBtn && resumeModal) {
    openBtn.addEventListener('click', () => {
      resumeModal.showModal();
    });
  }

  if (closeBtn && resumeModal) {
    closeBtn.addEventListener('click', () => {
      resumeModal.close();
    });
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.close();
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Scroll Animations & Dynamic Stats Counters
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
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

  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const targetValue = parseFloat(item.getAttribute('data-count') || '0');
          const isDecimal = item.getAttribute('data-decimal') === 'true';
          const suffix = item.getAttribute('data-suffix') || '';
          animateCounter(item, targetValue, suffix, isDecimal);
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
  }

  function animateCounter(elem, target, suffix, isDecimal) {
    let start = 0;
    const duration = 1400;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        elem.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
        clearInterval(timer);
      } else {
        elem.textContent = (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
      }
    }, stepTime);
  }
}

/* --------------------------------------------------------------------------
   8. Contact Form Validation & Submission
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
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showFeedback("Please complete all required fields.", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFeedback("Please provide a valid email address.", "error");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Message...</span> ⏳`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <span class="btn-icon">✈</span>`;
        }
        showFeedback(`Thank you ${name}! Your message has been sent to Nisha (nishaofficial137@gmail.com). I will respond promptly!`, "success");
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
   9. Navigation ScrollSpy & Mobile Drawer
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

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

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
   10. Back to Top Floating Button
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
   11. One-Click Copy Clipboard Helpers (Email & Phone)
   -------------------------------------------------------------------------- */
function initCopyHelpers() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'nishaofficial137@gmail.com';
      copyToClipboard(email, copyEmailBtn, 'Email Copied!');
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = copyPhoneBtn.getAttribute('data-phone') || '9360241665';
      copyToClipboard(phone, copyPhoneBtn, 'Phone Copied!');
    });
  }

  function copyToClipboard(text, btnElem, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btnElem.textContent;
      btnElem.textContent = `✓ ${successMsg}`;
      btnElem.style.backgroundColor = 'var(--color-success)';
      btnElem.style.color = '#ffffff';

      setTimeout(() => {
        btnElem.textContent = originalText;
        btnElem.style.backgroundColor = '';
        btnElem.style.color = '';
      }, 2000);
    }).catch(() => {
      prompt("Copy to clipboard:", text);
    });
  }
}
