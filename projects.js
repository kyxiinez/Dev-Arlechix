(function () {
  'use strict';

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

  applyTheme(localStorage.getItem('kai-theme') || 'dark');
  themeToggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  var projects = [
    {
      title: 'News for a School Assignment',
      image: 'images/ss berita menarik.png',
      description: 'Small web articles for school assignments',
      longDescription: 'An article website built for a school assignment and focused on a simple, readable publishing experience.',
      techStack: ['HTML', 'CSS3', 'JavaScript'],
      url: 'https://kyxiinez.github.io/berita.menarik/'
    },
    {
      title: 'Foto kita Blur',
      image: 'images/Foto-blur.png',
      description: 'Website for making photos in a cool style',
      longDescription: 'A casual website I built just for fun, inspired by trends like the "blurry photo" craze.',
      techStack: ['HTML', 'CSS', 'JavaScript', '-', '-'],
      url: 'https://kyxiinez.github.io/ftt/'
    },
    {
      title: 'Rental Platform',
      image: 'images/project-rental.jpg',
      description: 'Property Rental Management Platform',
      longDescription: 'An end-to-end property rental tool connecting owners and tenants with listings, scheduling, and booking status tracking.',
      techStack: ['Laravel', 'Bootstrap', 'JavaScript', 'MySQL'],
      url: ''
    },
    {
      title: 'Portfolio Website',
      image: 'images/Arlecc.jpg',
      description: 'Personal Portfolio & Case Studies',
      longDescription: 'A responsive portfolio experience for presenting selected work, capabilities, and a direct contact path.',
      techStack: ['HTML', 'CSS3', 'JavaScript'],
      url: ''
    },
    {
      title: 'Deployment Toolkit',
      image: 'images/service-deploy.jpg',
      description: 'Website Deployment & Maintenance',
      longDescription: 'A practical workflow for publishing websites, keeping deployments reliable, and maintaining a clean production setup.',
      techStack: ['Git', 'Deployment', 'Maintenance'],
      url: ''
    }
  ];

  var archiveGrid = document.getElementById('archiveGrid');
  archiveGrid.innerHTML = projects.map(function (project) {
    var tags = project.techStack.map(function (tag) {
      return '<span class="tag-chip">' + tag + '</span>';
    }).join('');
    var visitAction = project.url
      ? '<a href="' + project.url + '" target="_blank" rel="noreferrer" class="btn btn--solid">Visit Site</a>'
      : '<button class="btn btn--solid" type="button" disabled>Coming Soon</button>';

    return '<article class="project-card reveal">'
      + '<div class="project-card__image"><span class="project-card__tag">' + project.title + '</span><img src="' + project.image + '" alt="' + project.title + '" /></div>'
      + '<div class="project-card__body"><h2 class="project-card__title">' + project.description + '</h2>'
      + '<p class="project-card__desc">' + project.longDescription + '</p>'
      + '<div class="tag-list">' + tags + '</div><div class="project-card__actions">' + visitAction + '</div></div></article>';
  }).join('');

  document.querySelectorAll('.reveal').forEach(function (element) {
    element.classList.add('in-view');
  });
}());
