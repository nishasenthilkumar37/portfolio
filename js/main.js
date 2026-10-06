/**
 * Main Application Script for Nisha Portfolio
 * Clean, lightweight, professional interactive logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects();
  initResumeModal();
  initContactForm();
  initNavScrollspy();
  initBackToTop();
  initCopyHelpers();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

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

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Render Genuine Projects
   -------------------------------------------------------------------------- */
function renderProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container || typeof portfolioProjects === 'undefined') return;

  container.innerHTML = '';

  portfolioProjects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-showcase-card';

    const tagsHtml = project.technologies.map(tag => 
      `<span class="project-tech-tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
      <div class="project-showcase-img-box">
        <span class="project-showcase-badge">${project.badge}</span>
        <img src="${project.image}" alt="${project.title} Preview" class="project-showcase-img" loading="lazy">
      </div>
      <div class="project-showcase-body">
        <h3 class="project-showcase-title">${project.title}</h3>
        <p class="project-showcase-desc">${project.shortDesc}</p>
        <div class="project-tech-tags">
          ${tagsHtml}
        </div>
        <div class="project-card-actions">
          <a href="${project.demoUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
            <span>Live Demo</span>
            <span class="btn-icon" aria-hidden="true">↗</span>
          </a>
          <a href="${project.githubUrl}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">
            <span>GitHub</span>
            <span class="btn-icon" aria-hidden="true">&lt;/&gt;</span>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   3. Resume Modal Viewer
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) resumeModal.showModal();
    });
  });

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
   4. Contact Form Validation & Submission
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
        showFeedback("Please fill out all required fields.", "error");
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
        showFeedback(`Thank you ${name}! Your message has been received. I will get back to you shortly!`, "success");
        form.reset();
        if (charCount) charCount.textContent = '0 / 500';
      }, 1000);
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
   5. Navigation ScrollSpy & Mobile Drawer
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
   6. Back to Top Button
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
   7. Copy Email Clipboard Helper
   -------------------------------------------------------------------------- */
function initCopyHelpers() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (!copyEmailBtn) return;

  copyEmailBtn.addEventListener('click', () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'nishaofficial137@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = copyEmailBtn.textContent;
      copyEmailBtn.textContent = '✓ Copied!';
      copyEmailBtn.style.backgroundColor = 'var(--color-accent)';
      copyEmailBtn.style.color = '#ffffff';

      setTimeout(() => {
        copyEmailBtn.textContent = originalText;
        copyEmailBtn.style.backgroundColor = '';
        copyEmailBtn.style.color = '';
      }, 2000);
    }).catch(() => {
      prompt("Copy email address:", email);
    });
  });
}
