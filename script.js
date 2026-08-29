/* =========================================================
   Kai Salvador Portfolio — plain JavaScript (no framework)
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     THEME TOGGLE (dark / light, persisted in localStorage)
     --------------------------------------------------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var iconMoon = themeToggle.querySelector('.icon-moon');
  var iconSun = themeToggle.querySelector('.icon-sun');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    iconMoon.hidden = theme === 'light';
    iconSun.hidden = theme !== 'light';
    localStorage.setItem('kai-theme', theme);
  }

  var savedTheme = localStorage.getItem('kai-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------------------------------------------------------
     MOBILE MENU
     --------------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var iconMenu = menuToggle.querySelector('.icon-menu');
  var iconClose = menuToggle.querySelector('.icon-close');

  function setMenuOpen(open) {
    mobileMenu.classList.toggle('is-open', open);
    iconMenu.hidden = open;
    iconClose.hidden = !open;
  }

  menuToggle.addEventListener('click', function () {
    setMenuOpen(!mobileMenu.classList.contains('is-open'));
  });

  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  /* ---------------------------------------------------------
     NAVBAR SCROLL STATE + ACTIVE LINK (scroll-spy)
     --------------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  var navLinks = document.querySelectorAll('[data-nav]');
  var sections = ['hero', 'about', 'projects', 'services', 'skills']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------------------------------------------------------
     HERO TYPEWRITER
     --------------------------------------------------------- */
  var GREETINGS = ["Hi, I\u2019m", "Hello, I\u2019m", "Hai, I\u2019m"];
  var twEl = document.getElementById('typewriterText');
  var twIndex = 0;
  var twChar = 0;
  var twDeleting = false;

  function typeStep() {
    var current = GREETINGS[twIndex];
    if (twDeleting) {
      twChar--;
      twEl.textContent = current.substring(0, twChar);
      if (twChar <= 0) {
        twDeleting = false;
        twIndex = (twIndex + 1) % GREETINGS.length;
        setTimeout(typeStep, 300);
        return;
      }
      setTimeout(typeStep, 45);
    } else {
      twChar++;
      twEl.textContent = current.substring(0, twChar);
      if (twChar >= current.length) {
        twDeleting = true;
        setTimeout(typeStep, 1400);
        return;
      }
      setTimeout(typeStep, 90);
    }
  }
  typeStep();

  /* ---------------------------------------------------------
     ABOUT — file explorer tabs
     --------------------------------------------------------- */
  var ABOUT_FILES = {
    bio: {
      fileName: 'bio.md',
      title: 'Hello, Guys.',
      text: "I'm a developer who bridges creative visual design with solid software engineering. I like building things that live on the web \u2014 clean interfaces backed by logic that actually holds up.",
      image: 'images/Miles.jpg',
      imageAlt: 'Dev-Arl',
      details: [
        { label: 'File type:', value: 'Markdown Document' },
        { label: 'Role:', value: 'Full-Stack Developer & UI/UX Designer' },
        { label: 'Status:', value: '\u25CF Available for hire / collaboration', accent: true }
      ]
    },
    location: {
      fileName: 'location.md',
      title: 'Geographic Node.',
      text: 'Operating locally from Kudus City, with full availability for remote collaboration across timezones, globally.',
      image: 'images/Mylocation.jpg',
      imageAlt: 'Location map',
      details: [
        { label: 'Base:', value: 'Kudus City, Indonesian' },
        { label: 'Timezone:', value: 'UTC+8 (Indonesian Standard Time)' },
        { label: 'Status:', value: '\u25CF Active', accent: true }
      ]
    }
  };

  var explorerBody = document.getElementById('explorerBody');
  var activeFileName = document.getElementById('activeFileName');
  var fileButtons = document.querySelectorAll('.file-btn');

  function renderAboutFile(key) {
    var file = ABOUT_FILES[key];
    activeFileName.textContent = file.fileName;

    var rowsHtml = file.details.map(function (d) {
      var valueHtml = d.accent
        ? '<span class="status">' + d.value + '</span>'
        : d.value;
      return '<tr><td>' + d.label + '</td><td>' + valueHtml + '</td></tr>';
    }).join('');

    explorerBody.innerHTML =
      '<div>' +
      '<h3 class="file-title">' + file.title + '</h3>' +
      '<p class="file-text">' + file.text + '</p>' +
      '<table class="file-table"><tbody>' + rowsHtml + '</tbody></table>' +
      '</div>' +
      '<div class="file-image"><img src="' + file.image + '" alt="' + file.imageAlt + '" /></div>';

    explorerBody.style.opacity = 0;
    requestAnimationFrame(function () {
      explorerBody.style.transition = 'opacity 0.35s ease';
      explorerBody.style.opacity = 1;
    });
  }

  fileButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      fileButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      renderAboutFile(btn.getAttribute('data-file'));
    });
  });

  renderAboutFile('bio');

  /* ---------------------------------------------------------
     PROJECTS
     --------------------------------------------------------- */
  var PROJECTS = [
    {
      title: 'News for a School Assignment',
      url: 'https://kyxiinez.github.io/berita.menarik/',
      image: 'images/ss berita menarik.png',
      description: 'Small web articles for school assignments',
      longDescription: 'This article website is for a small scale, because it was for my school assignment during high school. This website is also the first I created \u2014 Uwok',
      techStack: ['HTML', 'CSS3', 'JavaScript', ' - ', ' - ']
    },
    {
      title: 'Foto kita Blur',
      url: 'https://kyxiinez.github.io/ftt/',
      image: 'images/Foto-blur.png',
      description: 'Website for making photos in a cool style',
      longDescription: 'A casual website I built just for fun, inspired by trends like the "blurry photo" craze.',
      techStack: ['HTML', 'CSS', 'Java Script', '-', '-']
    },
    {
      title: 'Rental Platform',
      url: '',
      image: 'images/project-rental.jpg',
      description: 'Property Rental Management Platform',
      longDescription: 'An end-to-end property rental tool connecting owners and tenants with listing filters, scheduling, and booking status tracking.',
      techStack: ['Laravel', 'CSS3', 'Bootstrap', 'JavaScript', 'MySQL']
    }
  ];

  var projectGrid = document.getElementById('projectGrid');
  var projectDots = document.getElementById('projectDots');
  var projectPrevBtn = document.querySelector('.project-arrow--prev');
  var projectNextBtn = document.querySelector('.project-arrow--next');

  projectGrid.innerHTML = PROJECTS.map(function (p, index) {
    var tags = p.techStack.map(function (t) {
      return '<span class="tag-chip">' + t + '</span>';
    }).join('');

    var projectImage = p.url
      ? '<a href="' + p.url + '" target="_blank" rel="noreferrer" class="project-card__image-link">'
        + '<img src="' + p.image + '" alt="' + p.title + '" />'
        + '</a>'
      : '<div class="project-card__image-link"><img src="' + p.image + '" alt="' + p.title + '" /></div>';

    var visitAction = p.url
      ? '<a href="' + p.url + '" target="_blank" rel="noreferrer" class="btn btn--solid visit-site">Visit Site'
        + '<svg viewBox="0 0 24 24" class="icon"><path d="M7 7h10v10M7 17L17 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        + '</a>'
      : '<button class="btn btn--solid visit-site" type="button" disabled>Visit Site'
        + '<svg viewBox="0 0 24 24" class="icon"><path d="M7 7h10v10M7 17L17 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        + '</button>';

    return (
      '<div class="project-card reveal' + (index === 0 ? ' is-selected' : '') + '" data-index="' + index + '">' +
      '<div class="project-card__image">' +
      '<span class="project-card__tag">' + p.title + '</span>' +
      projectImage +
      '</div>' +
      '<div class="project-card__body">' +
      '<h3 class="project-card__title">' + p.description + '</h3>' +
      '<p class="project-card__desc">' + p.longDescription + '</p>' +
      '<div class="tag-list">' + tags + '</div>' +
      '<div class="project-card__actions">' +
      '<button class="btn btn--outline view-details" type="button">View Details</button>' +
      visitAction +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }).join('');

  Array.from(projectGrid.querySelectorAll('.project-card')).forEach(function (card, idx) {
    card.dataset.index = String(idx);
  });

  function selectProject(index) {
    var cards = Array.from(projectGrid.querySelectorAll('.project-card'));
    var safeIndex = Math.max(0, Math.min(index, cards.length - 1));
    var targetCard = cards[safeIndex];
    if (!targetCard) return;

    cards.forEach(function (item, i) {
      item.classList.toggle('is-selected', i === safeIndex);
    });

    projectGrid.scrollTo({
      left: targetCard.offsetLeft - (projectGrid.clientWidth - targetCard.offsetWidth) / 2,
      behavior: 'smooth'
    });

    var dotEls = projectDots.querySelectorAll('span');
    dotEls.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === safeIndex);
    });
  }

  function syncSelectedCardFromScroll() {
    if (window.innerWidth >= 768) return;

    var cards = Array.from(projectGrid.querySelectorAll('.project-card'));
    if (!cards.length) return;

    var currentIndex = 0;
    var minDistance = Number.POSITIVE_INFINITY;

    cards.forEach(function (card, i) {
      var distance = Math.abs(card.offsetLeft - projectGrid.scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = i;
      }
    });

    cards.forEach(function (card, i) {
      card.classList.toggle('is-selected', i === currentIndex);
    });

    projectDots.querySelectorAll('span').forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  var dragState = {
    active: false,
    startX: 0,
    lastX: 0,
    deltaX: 0
  };

  projectGrid.addEventListener('pointerdown', function (event) {
    // If the press starts on a button/link (Visit Site, View Details, etc.),
    // skip drag capture entirely so the click/tap reaches it normally.
    if (event.target.closest('a, button')) {
      dragState.active = false;
      return;
    }
    dragState.active = true;
    dragState.startX = event.clientX;
    dragState.lastX = event.clientX;
    dragState.deltaX = 0;
    projectGrid.setPointerCapture(event.pointerId);
  });

  projectGrid.addEventListener('pointermove', function (event) {
    if (!dragState.active) return;
    dragState.deltaX = event.clientX - dragState.startX;
    dragState.lastX = event.clientX;
  });

  projectGrid.addEventListener('pointerup', function (event) {
    if (!dragState.active) return;

    if (window.innerWidth < 768) {
      var threshold = 50;
      if (dragState.deltaX < -threshold) {
        var current = Number(document.querySelector('.project-card.is-selected')?.dataset.index || 0);
        selectProject(current + 1);
      } else if (dragState.deltaX > threshold) {
        var current = Number(document.querySelector('.project-card.is-selected')?.dataset.index || 0);
        selectProject(current - 1);
      }
    }

    dragState.active = false;
    dragState.startX = 0;
    dragState.lastX = 0;
    dragState.deltaX = 0;
    projectGrid.releasePointerCapture?.(event.pointerId);
  });

  projectGrid.addEventListener('pointerleave', function () {
    dragState.active = false;
  });

  var projectModalOverlay = document.getElementById('projectModalOverlay');
  var projectModalImage = document.getElementById('projectModalImage');
  var projectModalEyebrow = document.getElementById('projectModalEyebrow');
  var projectModalTitle = document.getElementById('projectModalTitle');
  var projectModalSummary = document.getElementById('projectModalSummary');
  var projectModalTags = document.getElementById('projectModalTags');
  var projectModalCta = document.getElementById('projectModalCta');
  var projectModalClose = document.getElementById('projectModalClose');

  function openProjectModal(index) {
    var project = PROJECTS[index];
    if (!project) return;

    projectModalEyebrow.textContent = 'Project ' + String(index + 1).padStart(2, '0');
    projectModalTitle.textContent = project.title;
    projectModalSummary.textContent = project.longDescription;
    projectModalImage.src = project.image;
    projectModalImage.alt = project.title;
    projectModalTags.innerHTML = project.techStack.map(function (tag) {
      return '<span class="tag-chip">' + tag + '</span>';
    }).join('');

    if (project.url) {
      projectModalCta.href = project.url;
      projectModalCta.removeAttribute('aria-disabled');
      projectModalCta.setAttribute('target', '_blank');
      projectModalCta.setAttribute('rel', 'noreferrer');
      projectModalCta.style.pointerEvents = 'auto';
      projectModalCta.style.opacity = '1';
    } else {
      projectModalCta.removeAttribute('href');
      projectModalCta.setAttribute('aria-disabled', 'true');
      projectModalCta.style.pointerEvents = 'none';
      projectModalCta.style.opacity = '0.6';
    }

    projectModalOverlay.classList.add('is-open');
  }

  function closeProjectModal() {
    projectModalOverlay.classList.remove('is-open');
  }

  projectGrid.addEventListener('click', function (event) {
    var viewDetailsBtn = event.target.closest('.view-details');
    if (viewDetailsBtn) {
      event.preventDefault();
      event.stopPropagation();
      var card = viewDetailsBtn.closest('.project-card');
      var index = Number(card ? card.dataset.index : 0);
      openProjectModal(index);
      return;
    }

    var visitBtn = event.target.closest('.visit-site');
    if (visitBtn) {
      if (visitBtn.hasAttribute('disabled')) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      event.stopPropagation();
    }

    var card = event.target.closest('.project-card');
    if (!card) return;

    var index = Number(card.dataset.index || 0);
    selectProject(index);
  });

  projectGrid.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.innerWidth >= 768) {
        projectGrid.querySelectorAll('.project-card').forEach(function (item) {
          item.classList.remove('is-selected');
        });
        card.classList.add('is-selected');
        projectDots.querySelectorAll('span').forEach(function (dot, i) {
          dot.classList.toggle('is-active', Number(card.dataset.index) === i);
        });
      }
    });
  });

  projectModalClose.addEventListener('click', closeProjectModal);
  projectModalOverlay.addEventListener('click', function (event) {
    if (event.target === projectModalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && projectModalOverlay.classList.contains('is-open')) closeProjectModal();
  });

  document.querySelectorAll('#projectGrid .reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  projectDots.innerHTML = PROJECTS.map(function (_, i) {
    return '<span class="' + (i === 0 ? 'is-active' : '') + '" data-index="' + i + '"></span>';
  }).join('');

  projectDots.addEventListener('click', function (event) {
    var dot = event.target.closest('span[data-index]');
    if (!dot) return;
    selectProject(Number(dot.dataset.index));
  });

  if (projectPrevBtn) {
    projectPrevBtn.addEventListener('click', function () {
      var current = projectGrid.querySelector('.project-card.is-selected');
      var currentIndex = current ? Number(current.dataset.index || 0) : 0;
      selectProject(currentIndex - 1);
    });
  }

  if (projectNextBtn) {
    projectNextBtn.addEventListener('click', function () {
      var current = projectGrid.querySelector('.project-card.is-selected');
      var currentIndex = current ? Number(current.dataset.index || 0) : 0;
      selectProject(currentIndex + 1);
    });
  }

  var dotEls = projectDots.querySelectorAll('span');
  projectGrid.addEventListener('scroll', function () {
    syncSelectedCardFromScroll();
  });

  /* ---------------------------------------------------------
     SERVICES + MODAL
     --------------------------------------------------------- */
  var SERVICES = [
    {
      number: '01',
      title: 'Static Website',
      description: 'Lightning-fast, ultra-secure landing pages and portfolios built with modern technologies, tailored for optimal conversion.',
      details: 'Perfect for personal portfolios, landing pages, and small business sites. Optimized for maximum search-engine performance, lightning-fast load times, and top-tier security standards.',
      likes: '1,248',
      bgImage: 'images/service-static.jpg'
    },
    {
      number: '02',
      title: 'Dynamic Website',
      description: 'Interactive web applications featuring real-time database integration, secure authentication, and seamless third-party APIs.',
      details: 'Ideal for web apps, SaaS platforms, and e-commerce stores. Features secure backend integration, real-time database syncing, authentication pipelines, and robust third-party API connections.',
      likes: '3,892',
      bgImage: 'images/service-dynamic.jpg'
    },
    {
      number: '03',
      title: 'Deployment & Maintenance',
      description: 'Seamless Git-based deployment, cloud hosting setup, continuous security updates, and dependable performance monitoring.',
      details: 'Ensures your apps stay online without a hitch \u2014 Git-based deployment workflows, cloud hosting setup (Cloudflare, Vercel, Hostinger), continuous security patching, and performance tracking.',
      likes: '845',
      bgImage: 'images/service-deploy.jpg'
    },
    {
      number: '04',
      title: 'UI/UX & Optimization',
      description: 'Performance tuning, SEO enhancements, and bespoke responsive design to keep your digital products running at top speed.',
      details: 'Turns visitors into long-term users through deep code refactoring, Core Web Vitals optimization, on-page SEO, and responsive, mobile-first layouts.',
      likes: '2,156',
      bgImage: 'images/service-uiux.jpg'
    }
  ];

  var serviceGrid = document.getElementById('serviceGrid');

  serviceGrid.innerHTML = SERVICES.map(function (s, i) {
    return (
      '<button class="service-card reveal" data-service="' + i + '">' +
      '<img src="' + s.bgImage + '" alt="' + s.title + '" />' +
      '<div class="service-card__top">' +
      '<span class="service-card__number">' + s.number + '</span>' +
      '<span class="service-card__likes">' +
      '<svg viewBox="0 0 24 24" class="icon"><path d="M12 21s-7-4.35-9.5-8.5C.9 9.2 2.4 6 5.6 6c1.7 0 3 1 3.9 2.3C10.4 7 11.7 6 13.4 6c3.2 0 4.7 3.2 3.1 6.5C19 16.65 12 21 12 21z" fill="currentColor"/></svg>' +
      s.likes +
      '</span>' +
      '</div>' +
      '<div>' +
      '<h3 class="service-card__title">' + s.title + '</h3>' +
      '<p class="service-card__desc">' + s.description + '</p>' +
      '<span class="service-card__more">Learn more' +
      '<svg viewBox="0 0 24 24" class="icon"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</span>' +
      '</div>' +
      '</button>'
    );
  }).join('');

  document.querySelectorAll('#serviceGrid .reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  var modalOverlay = document.getElementById('serviceModalOverlay');
  var modalEyebrow = document.getElementById('modalEyebrow');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalClose = document.getElementById('modalClose');

  function openModal(idx) {
    var s = SERVICES[idx];
    modalEyebrow.textContent = 'Service ' + s.number;
    modalTitle.textContent = s.title;
    modalDesc.textContent = s.details;
    modalOverlay.classList.add('is-open');
  }
  function closeModal() {
    modalOverlay.classList.remove('is-open');
  }

  serviceGrid.addEventListener('click', function (e) {
    var card = e.target.closest('[data-service]');
    if (card) openModal(Number(card.getAttribute('data-service')));
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------------------------------------------------------
     SKILLS (Devicon-based logos)
     --------------------------------------------------------- */
  var SKILLS = [
    { name: 'HTML5', devicon: 'devicon-html5-plain colored' },
    { name: 'CSS3', devicon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', devicon: 'devicon-javascript-plain colored' },
    { name: 'TypeScript', devicon: 'devicon-typescript-plain colored' },
    { name: 'React.js', devicon: 'devicon-react-original colored' },
    { name: 'Next.js', devicon: 'devicon-nextjs-plain' },
    { name: 'Vue.js', devicon: 'devicon-vuejs-plain colored' },
    { name: 'Vite', devicon: 'devicon-vitejs-plain colored' },
    { name: 'Tailwind CSS', devicon: 'devicon-tailwindcss-plain colored' },
    { name: 'Bootstrap', devicon: 'devicon-bootstrap-plain colored' },
    { name: 'PHP', devicon: 'devicon-php-plain colored' },
    { name: 'Laravel', devicon: 'devicon-laravel-plain colored' },
    { name: 'Supabase', devicon: 'devicon-supabase-plain colored' },
    { name: 'MySQL', devicon: 'devicon-mysql-plain colored' },
    { name: 'PostgreSQL', devicon: 'devicon-postgresql-plain colored' },
    { name: 'Java', devicon: 'devicon-java-plain colored' },
    { name: 'C Language', devicon: 'devicon-c-plain colored' },
    { name: 'Figma', devicon: 'devicon-figma-plain colored' },
    { name: 'Canva', devicon: 'devicon-canva-original colored' },
    { name: 'VS Code', devicon: 'devicon-vscode-plain colored' },
    { name: 'Git', devicon: 'devicon-git-plain colored' },
    { name: 'GitHub', devicon: 'devicon-github-original' },
    { name: 'Vercel', devicon: 'devicon-vercel-original' },
    { name: 'Cloudflare', devicon: 'devicon-cloudflare-plain colored' }
  ];

  var skillGrid = document.getElementById('skillGrid');
  skillGrid.innerHTML = SKILLS.map(function (s) {
    return (
      '<div class="skill-card reveal">' +
      '<i class="' + s.devicon + '"></i>' +
      '<span>' + s.name + '</span>' +
      '</div>'
    );
  }).join('');
  document.querySelectorAll('#skillGrid .reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------------------------------------------------------
     FOOTER YEAR
     --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
