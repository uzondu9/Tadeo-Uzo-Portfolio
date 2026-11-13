/* ==========================================================================
   Tadeo Uzo — Consolidated Website JavaScript (main.js)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Data Definitions
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: 'zond-studio',
    title: 'Zond Studio',
    subtitle: 'Landing Page Funnel Agency',
    description: 'A funnel agency focused on building landing page funnels.',
    longDescription:
      'Zond Studio is a funnel agency focused on building landing page funnels with clear positioning, structured layouts, and direct call-to-action flows.',
    image: './assets/Zond.png',
  },
  {
    id: 'heutagogix',
    title: 'HeutagogiX',
    subtitle: 'Learning & Educational Brand',
    description: 'A learning and educational brand currently being developed.',
    longDescription:
      'HeutagogiX is a learning and educational brand currently being developed around self-determined learning principles and practical study workflows.',
    image: './assets/Heutagogix.jpg',
  },
  {
    id: 'yourz',
    title: 'Yourz',
    subtitle: 'UGC Advertising & Media App',
    description: 'A UGC advertising media platform and media app.',
    longDescription:
      'Yourz is a user-generated content (UGC) advertising media platform and media app designed to connect brands and creators around short-form campaign media.',
    image: './assets/yourz.jpg',
  },
  {
    id: 'phew',
    title: 'Phew',
    subtitle: 'AI Shopping Selection App',
    description: 'An AI-powered shopping selection app.',
    longDescription:
      'Phew is an AI-powered shopping selection app built to simplify product discovery and help shoppers narrow down relevant choices.',
    image: './assets/phew.jpg',
  },
];

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Review COS 106 Web Technologies coursework notes',
    completed: true,
    createdAt: '2026-11-10',
  },
  {
    id: 'task-2',
    title: 'Complete COS 101 logic gates and architecture reading',
    completed: false,
    createdAt: '2026-11-11',
  },
  {
    id: 'task-3',
    title: 'Solve MTH 101 set theory practice problems',
    completed: false,
    createdAt: '2026-11-12',
  },
];

const PLANNER_STORAGE_KEY = 'miva_tadeo_tasks_v2';
const CONTACT_STORAGE_KEY = 'miva_tadeo_messages_v1';

/* --------------------------------------------------------------------------
   2. Legacy Hash Route Redirect (Home Page)
   -------------------------------------------------------------------------- */
(function handleLegacyHashRoute() {
  const path = window.location.pathname;
  const isHome = path === '/' || path.endsWith('/index.html');
  if (!isHome) return;

  const hash = window.location.hash.replace('#', '');
  const hashMap = {
    about: '/about.html',
    projects: '/projects.html',
    planner: '/planner.html',
    contact: '/contact.html',
  };

  if (hashMap[hash]) {
    window.location.replace(hashMap[hash]);
  }
})();

/* --------------------------------------------------------------------------
   3. Shared Navigation & Project Modal
   -------------------------------------------------------------------------- */
function initSharedNavigationAndModal() {
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  const setDrawerState = (open) => {
    if (!mobileDrawer || !menuToggleBtn) return;
    mobileDrawer.classList.toggle('is-open', open);
    menuToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (iconMenu && iconClose) {
      iconMenu.style.display = open ? 'none' : 'block';
      iconClose.style.display = open ? 'block' : 'none';
    }
  };

  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      setDrawerState(!isOpen);
    });
  }

  const modal = document.getElementById('project-modal');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTitle = document.getElementById('modal-title');
  const modalMedia = document.getElementById('modal-media');
  const modalDescription = document.getElementById('modal-description');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterCloseBtn = document.getElementById('modal-footer-close');

  const openProjectModal = (projectId) => {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project || !modal) return;

    if (modalSubtitle) modalSubtitle.textContent = project.subtitle;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.longDescription;

    if (modalMedia) {
      modalMedia.innerHTML = '';
      if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.referrerPolicy = 'no-referrer';
        modalMedia.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'modal-media-placeholder';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'modal-media-placeholder-title';
        titleSpan.textContent = project.title;

        const subSpan = document.createElement('span');
        subSpan.className = 'modal-media-placeholder-sub';
        subSpan.textContent = 'Image Placeholder';

        placeholder.appendChild(titleSpan);
        placeholder.appendChild(subSpan);
        modalMedia.appendChild(placeholder);
      }
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const projectCards = document.querySelectorAll('[data-project-id]');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      if (id) openProjectModal(id);
    });

    const arrowBtn = card.querySelector('.project-card-btn');
    if (arrowBtn) {
      arrowBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = card.getAttribute('data-project-id');
        if (id) openProjectModal(id);
      });
    }
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalFooterCloseBtn) {
    modalFooterCloseBtn.addEventListener('click', closeProjectModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      setDrawerState(false);
    }
    if (modal && modal.classList.contains('is-open')) {
      closeProjectModal();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Quick Inquiry Form (Home Page)
   -------------------------------------------------------------------------- */
function initQuickInquiry() {
  const quickForm = document.getElementById('quick-inquiry-form');
  const quickInput = document.getElementById('quick-inquiry-email');
  const quickFeedback = document.getElementById('quick-inquiry-feedback');
  if (!quickForm || !quickInput || !quickFeedback) return;

  let feedbackTimer = null;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = quickInput.value.trim();
    if (!val || !val.includes('@')) return;

    quickFeedback.classList.add('is-visible');
    if (feedbackTimer) window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      quickInput.value = '';
      quickFeedback.classList.remove('is-visible');
    }, 4000);
  });
}

/* --------------------------------------------------------------------------
   5. Academic Planner (Planner Page)
   -------------------------------------------------------------------------- */
function loadPlannerTasks() {
  try {
    const saved = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore storage errors
  }
  return INITIAL_TASKS.map((t) => ({ ...t }));
}

function savePlannerTasks(tasks) {
  try {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore storage errors
  }
}

function createCheckCircleSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
}

function createCircleSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>`;
}

function createTrashSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
}

function initAcademicPlanner() {
  const form = document.getElementById('planner-form');
  const input = document.getElementById('task-input');
  const listEl = document.getElementById('planner-list');
  if (!form || !input || !listEl) return;

  let tasks = loadPlannerTasks();

  const renderTasks = () => {
    listEl.innerHTML = '';

    if (tasks.length === 0) {
      const emptyBox = document.createElement('div');
      emptyBox.className = 'planner-empty';
      const msg = document.createElement('p');
      msg.textContent = 'No tasks yet. Type a task above and click Add.';
      emptyBox.appendChild(msg);
      listEl.appendChild(emptyBox);
      return;
    }

    tasks.forEach((task) => {
      const item = document.createElement('div');
      item.className = task.completed ? 'task-item is-completed' : 'task-item';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'task-toggle-btn';
      toggleBtn.setAttribute(
        'aria-label',
        task.completed
          ? `Mark "${task.title}" as active`
          : `Mark "${task.title}" as completed`
      );
      toggleBtn.addEventListener('click', () => {
        tasks = tasks.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        );
        savePlannerTasks(tasks);
        renderTasks();
      });

      const iconSpan = document.createElement('span');
      iconSpan.className = 'task-check-icon';
      iconSpan.innerHTML = task.completed ? createCheckCircleSvg() : createCircleSvg();

      const titleSpan = document.createElement('span');
      titleSpan.className = 'task-title';
      titleSpan.textContent = task.title;

      toggleBtn.appendChild(iconSpan);
      toggleBtn.appendChild(titleSpan);

      const rightDiv = document.createElement('div');
      rightDiv.className = 'task-right';

      if (task.completed) {
        const completedLabel = document.createElement('span');
        completedLabel.className = 'task-completed-label';
        completedLabel.textContent = 'Completed';
        rightDiv.appendChild(completedLabel);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'task-delete-btn';
      deleteBtn.setAttribute('aria-label', `Delete "${task.title}"`);
      deleteBtn.innerHTML = createTrashSvg();
      deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        savePlannerTasks(tasks);
        renderTasks();
      });

      rightDiv.appendChild(deleteBtn);

      item.appendChild(toggleBtn);
      item.appendChild(rightDiv);
      listEl.appendChild(item);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trimmed = input.value.trim();
    if (!trimmed) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks = [newTask, ...tasks];
    savePlannerTasks(tasks);
    input.value = '';
    renderTasks();
  });

  renderTasks();
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Submission (Contact Page)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-success');
  const successText = document.getElementById('contact-success-text');
  const resetBtn = document.getElementById('contact-reset-btn');

  const nameInput = document.getElementById('contact-form-name');
  const emailInput = document.getElementById('contact-form-email');
  const phoneInput = document.getElementById('contact-form-phone');
  const topicSelect = document.getElementById('contact-form-topic');
  const messageInput = document.getElementById('contact-form-message');

  if (!form || !successBox || !nameInput || !emailInput || !phoneInput || !topicSelect || !messageInput) {
    return;
  }

  const touched = {
    name: false,
    email: false,
    phone: false,
    message: false,
  };

  const getErrors = () => {
    const errors = {};
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (!nameVal) {
      errors.name = 'Full name is required.';
    }

    if (!emailVal) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!phoneVal) {
      errors.phone = 'Phone number is required.';
    } else {
      const phoneClean = phoneVal.replace(/^\+/, '');
      if (!/^\d+$/.test(phoneClean)) {
        errors.phone = 'Phone number must contain digits only.';
      } else if (phoneClean.length < 8 || phoneClean.length > 15) {
        errors.phone = 'Phone number must be between 8 and 15 digits.';
      }
    }

    if (!messageVal) {
      errors.message = 'Message is required.';
    } else if (messageVal.length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    return errors;
  };

  const renderFieldError = (field, inputEl, errorMsg) => {
    const errorEl = document.getElementById(`error-${field}`);
    const textEl = document.getElementById(`error-${field}-text`);
    const show = Boolean(touched[field] && errorMsg);

    inputEl.classList.toggle('is-error', show);
    if (errorEl && textEl) {
      textEl.textContent = errorMsg || '';
      errorEl.classList.toggle('is-visible', show);
    }
  };

  const updateValidationUI = () => {
    const errors = getErrors();
    renderFieldError('name', nameInput, errors.name);
    renderFieldError('email', emailInput, errors.email);
    renderFieldError('phone', phoneInput, errors.phone);
    renderFieldError('message', messageInput, errors.message);
    return errors;
  };

  const fieldMap = [
    ['name', nameInput],
    ['email', emailInput],
    ['phone', phoneInput],
    ['message', messageInput],
  ];

  fieldMap.forEach(([field, el]) => {
    el.addEventListener('blur', () => {
      touched[field] = true;
      updateValidationUI();
    });
    el.addEventListener('input', () => {
      if (touched[field]) {
        updateValidationUI();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    touched.name = true;
    touched.email = true;
    touched.phone = true;
    touched.message = true;

    const errors = updateValidationUI();
    if (Object.keys(errors).length > 0) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      inquiryType: topicSelect.value,
      message: messageInput.value.trim(),
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      const existing = localStorage.getItem(CONTACT_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newMessage);
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore storage errors
    }

    if (successText) {
      successText.textContent = `Thank you, ${newMessage.name}. Your message has been recorded.`;
    }

    form.classList.add('is-hidden');
    successBox.classList.add('is-visible');

    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    messageInput.value = '';
    touched.name = false;
    touched.email = false;
    touched.phone = false;
    touched.message = false;
    updateValidationUI();
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      successBox.classList.remove('is-visible');
      form.classList.remove('is-hidden');
    });
  }
}

/* --------------------------------------------------------------------------
   7. Bootstrap Application on DOMContentLoaded
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initSharedNavigationAndModal();
  initQuickInquiry();
  initAcademicPlanner();
  initContactForm();
});
