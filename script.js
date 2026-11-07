// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Modo oscuro con preferencia guardada
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  // En íconos SVG la propiedad .hidden no existe: hay que usar el atributo.
  const dark = theme === 'dark';
  if (dark) root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  iconSun.toggleAttribute('hidden', dark);
  iconMoon.toggleAttribute('hidden', !dark);
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Animación de aparición al hacer scroll
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// Traducción español / inglés
// Cada texto en español (sin espacios extra) se mapea a su versión en inglés.
// Lo que no está acá (nombres propios, tecnologías) queda igual en ambos idiomas.
const EN = {
  // Navegación y botones
  'Inicio': 'Home',
  'Sobre mí': 'About me',
  'Experiencia': 'Experience',
  'Habilidades': 'Skills',
  'Proyectos': 'Projects',
  'Formación': 'Education',
  'Contacto': 'Contact',
  'Abrir menú': 'Open menu',
  'Cambiar tema': 'Toggle theme',

  // Encabezado
  'Hola, soy': "Hi, I'm",
  'Bajar': 'Scroll down',
  'Combino relevamiento funcional, documentación técnica y análisis de datos para traducir necesidades de negocio en requerimientos claros e implementaciones trazables.':
    'I combine requirements gathering, technical documentation and data analysis to turn business needs into clear requirements and traceable implementations.',
  'Análisis Funcional': 'Functional Analysis',
  'Ver proyectos': 'View projects',
  'Descargar CV': 'Download CV',

  // Números destacados
  'Años de experiencia': 'Years of experience',
  'Herramientas': 'Tools',
  'Empresas IT': 'IT companies',

  // Sobre mí
  'Técnico en Desarrollo de Software con experiencia en desarrollo full stack, análisis funcional, soluciones orientadas a datos y gestión de automatizaciones de procesos mediadas por IA. Actualmente desarrollo SAL, el nuevo sistema de seguimiento de análisis del Laboratorio de Control de Calidad Dr. Alberto Graffigna (UCCuyo), con .NET, React y PostgreSQL. Combino mi perfil técnico con habilidades de relevamiento y comunicación con usuarios clave, lo que me permite traducir necesidades de negocio en requerimientos claros, implementaciones trazables y procesos automatizados.':
    'Software Development Technician with experience in full stack development, functional analysis, data-driven solutions and AI-driven process automation management. I am currently building SAL, the new analysis tracking system for the Dr. Alberto Graffigna Quality Control Laboratory (UCCuyo), with .NET, React and PostgreSQL. I combine my technical background with requirements gathering and strong communication with key users, which lets me turn business needs into clear requirements, traceable implementations and automated processes.',
  'Relevamiento funcional y documentación de casos de uso': 'Requirements gathering and use case documentation',
  'Análisis de datos e integración de sistemas con SQL, Python y Power BI': 'Data analysis and systems integration with SQL, Python and Power BI',
  'Comunicación con usuarios clave y trazabilidad de proyectos': 'Communication with key users and project traceability',
  'Gestión de automatizaciones de procesos mediadas por IA': 'AI-driven process automation management',

  // Experiencia
  'Enero 2025 — Diciembre 2025': 'January 2025 — December 2025',
  'Enero 2026 — Presente': 'January 2026 — Present',
  'Desarrollador Full Stack': 'Full Stack Developer',
  'Laboratorio de Control de Calidad Dr. Alberto Graffigna (UCCuyo) · San Juan — Proyecto: SAL, Sistema de Seguimiento de Análisis de Laboratorio':
    'Dr. Alberto Graffigna Quality Control Laboratory (UCCuyo) · San Juan — Project: SAL, Laboratory Analysis Tracking System',
  'Desarrollo SAL, el sistema que reemplaza al software anterior del laboratorio y cubre el circuito completo: consulta del cliente, presupuesto, recepción de muestras, carga de resultados e informe final.':
    "I develop SAL, the system replacing the laboratory's previous software, covering the full workflow: client inquiry, quote, sample intake, results entry and final report.",
  'Diseñé el backend con ASP.NET Core (.NET 10) y Clean Architecture en 4 capas, con Entity Framework Core sobre PostgreSQL y autenticación JWT con permisos por rol.':
    'Designed the backend with ASP.NET Core (.NET 10) and a 4-layer Clean Architecture, using Entity Framework Core on PostgreSQL and JWT authentication with role-based permissions.',
  'Construí el frontend con React 19, TypeScript, Vite y Mantine, con navegación por área y búsqueda global.':
    'Built the frontend with React 19, TypeScript, Vite and Mantine, with area-based navigation and global search.',
  'Automaticé la importación de consultas que llegan por correo (IMAP) y el envío de presupuestos e informes por email (SMTP).':
    'Automated the import of inquiries received by email (IMAP) and the delivery of quotes and reports by email (SMTP).',
  'Implementé la generación de presupuestos, solicitudes e informes en PDF con firma digital y doble validación.':
    'Implemented PDF generation for quotes, service requests and reports, with digital signatures and two-step approval.',
  'Desarrollé un portal para clientes donde consultan el estado de sus muestras y descargan los informes aprobados.':
    'Developed a client portal where customers track their samples and download approved reports.',
  'Relevé requerimientos con el personal del laboratorio y documenté requisitos, casos de uso y la matriz de permisos por rol.':
    'Gathered requirements with laboratory staff and documented requirements, use cases and the role permission matrix.',
  'Enero 2024 — Enero 2025': 'January 2024 — January 2025',
  'Desarrollador de Software – Analista Funcional': 'Software Developer – Functional Analyst',
  'Disei SRL · San Juan — Proyecto: Modernización del Sistema de Gestión de Laboratorios Graffigna':
    'Disei SRL · San Juan — Project: Modernization of the Laboratorios Graffigna Management System',
  'Participé en el relevamiento funcional y análisis de requerimientos para la actualización del sistema de monitoreo y gestión de laboratorios.':
    'Took part in requirements gathering and analysis for the upgrade of the laboratory monitoring and management system.',
  'Colaboré en el diseño y documentación de casos de uso orientados a los procesos internos del laboratorio.':
    "Helped design and document use cases for the laboratory's internal processes.",
  'Integré herramientas de análisis de datos (SQL, Power BI) para la gestión de información de centros de costo del laboratorio.':
    "Integrated data analysis tools (SQL, Power BI) to manage the laboratory's cost center information.",
  'Validé prototipos y módulos del sistema, garantizando su alineación con los requerimientos funcionales relevados.':
    'Validated system prototypes and modules, making sure they matched the gathered functional requirements.',
  'Documenté reuniones, actas y requerimientos en Active Collab, asegurando la trazabilidad del proyecto.':
    'Documented meetings, minutes and requirements in Active Collab, ensuring project traceability.',
  'Asistí en la definición de criterios de aceptación para nuevos módulos del sistema.':
    'Assisted in defining acceptance criteria for new system modules.',
  'Realicé relevamientos funcionales con usuarios clave para identificar necesidades del sistema.':
    'Gathered functional requirements with key users to identify system needs.',
  'Analicé procesos de centros de costos, mejorando la organización y trazabilidad de la información.':
    'Analyzed cost center processes, improving the organization and traceability of information.',
  'Participé en la creación de casos de uso para la validación de comportamientos del sistema.':
    'Took part in creating use cases to validate system behavior.',
  'Formé parte del Proyecto de Actualización del Sistema de Monitoreo de Disei: análisis funcional y validación de requerimientos.':
    "Worked on the upgrade project for Disei's Monitoring System: functional analysis and requirements validation.",
  'Documentación funcional': 'Functional Documentation',

  // Habilidades
  'Lenguajes': 'Programming languages',
  'Datos & BI': 'Data & BI',
  'Desarrollo web & backend': 'Web & backend development',
  'Bases de datos': 'Databases',
  'Gestión & Documentación': 'Management & Documentation',
  'Pruebas de software': 'Software Testing',
  'Inteligencia Artificial': 'Artificial Intelligence',
  'IA generativa': 'Generative AI',
  'Agentes de IA': 'AI Agents',
  'Desarrollo asistido por IA': 'AI-assisted development',
  'Automatización de procesos con IA': 'AI process automation',

  // Proyectos
  'Proyectos destacados': 'Featured projects',
  'Proyecto actual': 'Current project',
  'Sistema de Gestión — Laboratorios Graffigna': 'Management System — Laboratorios Graffigna',
  'Mi proyecto de trabajo actual: modernización del sistema de seguimiento de análisis del laboratorio. Participo en el relevamiento funcional, la validación de módulos y el desarrollo.':
    "My current work project: modernizing the laboratory's analysis tracking system. I take part in requirements gathering, module validation and development.",
  'App para empresa de transporte: trazabilidad de viajes de camiones y control del consumo de combustible por viaje, con reportes en Excel.':
    'App for a transport company: truck trip traceability and per-trip fuel consumption control, with Excel reports.',
  'App web instalable (PWA) para repartir gastos entre amigos. "Cuentas claras conservan amistades."':
    'Installable web app (PWA) to split expenses among friends. "Short accounts make long friends."',
  'Tienda online de botines de fútbol: API REST, sitio web y app móvil.':
    'Online store for football boots: REST API, website and mobile app.',
  'Sitio institucional con branding profesional para una empresa constructora.':
    'Corporate website with professional branding for a construction company.',
  'Landing visual con catálogo de productos.': 'Visual landing page with a product catalog.',
  'Diseño web para marca textil.': 'Web design for a clothing brand.',
  'Diseño visual': 'Visual Design',
  'Ver código': 'View code',
  'Ver app': 'View app',
  'Ver sitio': 'View site',

  // Formación
  'Educación': 'Academic background',
  'Tecnicatura en Desarrollo de Software': 'Associate Degree in Software Development',
  'Cursos y certificaciones': 'Courses & certifications',
  'Inteligencia Artificial · Anthropic Academy': 'Artificial Intelligence · Anthropic Academy',
  'Desarrollo de software con Claude Code': 'Software development with Claude Code',
  'Integración de Claude en aplicaciones': 'Integrating Claude into applications',
  'Conexión de la IA con herramientas externas': 'Connecting AI to external tools',
  'Uso eficaz y responsable de la IA': 'Effective and responsible use of AI',
  'Idiomas': 'Languages',
  'Español': 'Spanish',
  'Inglés': 'English',
  'Nativo': 'Native',
  'Comprensión oral y escrita avanzada': 'Advanced listening and reading comprehension',

  // Contacto
  '¿Tenés un proyecto en mente o una oportunidad para conversar? Escribime.':
    'Have a project in mind or an opportunity to talk about? Get in touch.',
  'Disponible para nuevos desafíos profesionales': 'Available for new professional opportunities',
  'Analista Funcional': 'Functional Analyst',
  'Full Stack Semi Senior': 'Mid-level Full Stack Developer',
  'Consultor BI': 'BI Consultant',
  'Remoto · Híbrido en San Juan · Disponibilidad para relocalización': 'Remote · Hybrid in San Juan · Open to relocation',
  'AI Engineer · Desarrollador de Software · Analista Funcional': 'AI Engineer · Software Developer · Functional Analyst',
  'Conectar en LinkedIn': 'Connect on LinkedIn',
  'Conectemos': "Let's connect",
};

const metaDescription = document.querySelector('meta[name="description"]');
const META = {
  es: { title: document.title, description: metaDescription.content },
  en: {
    title: 'Mathias Giménez | Portfolio',
    description: 'Mathias Giménez — Software Development Technician and Functional Analyst. Requirements gathering, technical documentation and data analysis with Python, SQL and Power BI.',
  },
};

const clean = (text) => text.replace(/\s+/g, ' ').trim();

// Guardamos cada texto traducible con su versión original y la traducida,
// respetando los espacios de alrededor para no romper el diseño.
const translatable = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const key = clean(node.nodeValue);
  if (key && EN[key]) {
    const [, before, , after] = node.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    translatable.push({ node, es: node.nodeValue, en: before + EN[key] + after });
  }
}

const labelled = [...document.querySelectorAll('[aria-label]')]
  .filter((el) => EN[el.getAttribute('aria-label')])
  .map((el) => ({ el, es: el.getAttribute('aria-label') }));

const langToggle = document.getElementById('langToggle');

function applyLang(lang) {
  const en = lang === 'en';
  translatable.forEach((t) => { t.node.nodeValue = en ? t.en : t.es; });
  labelled.forEach((l) => l.el.setAttribute('aria-label', en ? EN[l.es] : l.es));
  document.title = META[lang].title;
  metaDescription.content = META[lang].description;
  root.setAttribute('lang', lang);
  langToggle.textContent = en ? 'ES' : 'EN';
  langToggle.setAttribute('aria-label', en ? 'Cambiar a español' : 'Switch to English');
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

// Idioma inicial: ?lang=en en la URL, después la elección guardada,
// y si no hay nada, el idioma del navegador.
function readStoredLang() {
  try { return localStorage.getItem('lang'); } catch { return null; }
}
const urlLang = new URLSearchParams(location.search).get('lang');
const browserLang = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
let currentLang = ['es', 'en'].includes(urlLang) ? urlLang : readStoredLang() || browserLang;
if (!['es', 'en'].includes(currentLang)) currentLang = 'es';
applyLang(currentLang);

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  applyLang(currentLang);
  try { localStorage.setItem('lang', currentLang); } catch { /* sin almacenamiento: no pasa nada */ }
});

// ===================================================
// Movimiento
// ===================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rol que se escribe y se borra solo, en el idioma elegido
const ROLES = {
  es: ['Desarrollador de Software', 'AI Engineer', 'Analista Funcional', 'Analista de Datos'],
  en: ['Software Developer', 'AI Engineer', 'Functional Analyst', 'Data Analyst'],
};
const typedRole = document.getElementById('typedRole');
let typingTimer;

function startTyping() {
  clearTimeout(typingTimer);
  const roles = ROLES[currentLang];
  if (reduceMotion) {
    typedRole.textContent = roles[0];
    return;
  }
  let word = 0;
  let chars = roles[0].length;
  let deleting = true;
  typedRole.textContent = roles[0];

  function step() {
    if (deleting) {
      chars -= 1;
      if (chars === 0) {
        deleting = false;
        word = (word + 1) % roles.length;
      }
    } else {
      chars += 1;
    }
    typedRole.textContent = roles[word].slice(0, chars);

    let delay = deleting ? 45 : 85;
    if (!deleting && chars === roles[word].length) {
      deleting = true;
      delay = 2200; // pausa con la palabra completa
    } else if (!deleting && chars === 0) {
      delay = 300;
    }
    typingTimer = setTimeout(step, delay);
  }
  typingTimer = setTimeout(step, 2600);
}

startTyping();
document.addEventListener('langchange', startTyping);

// Las tarjetas de cada grilla aparecen una detrás de otra
document.querySelectorAll('.highlights, .skills-groups, .projects-grid, .formacion-grid, .stats')
  .forEach((grid) => {
    grid.classList.add('stagger');
    [...grid.children].forEach((child, i) => child.style.setProperty('--i', i));
  });

// Números que cuentan desde 0 al aparecer
function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduceMotion) return;
  const duration = 1400;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  el.textContent = '0' + suffix;
  requestAnimationFrame(frame);
}

const statsEl = document.querySelector('.stats');
if (statsEl && 'IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      statsEl.querySelectorAll('.stat-num').forEach(countUp);
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsEl);
}

// Barra de progreso, navbar al bajar y botón flotante de LinkedIn
const progressBar = document.getElementById('scrollProgress');
const navbar = document.querySelector('.navbar');
const liFab = document.getElementById('liFab');
const hero = document.getElementById('inicio');
let ticking = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  liFab.classList.toggle('visible', window.scrollY > hero.offsetHeight * 0.6);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });
onScroll();

// Marca en el menú la sección que se está viendo
const navAnchors = [...navLinks.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('header[id], section[id]').forEach((sec) => sectionObserver.observe(sec));
}

// Tarjetas de proyecto: se inclinan y se iluminan siguiendo el mouse
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
document.querySelectorAll('.project').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    if (reduceMotion || !finePointer) return;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 8;
    card.classList.add('tilting');
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('tilting');
    card.style.transform = '';
  });
});
