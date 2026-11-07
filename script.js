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
  'Técnico en Desarrollo de Software · Analista Funcional': 'Software Development Technician · Functional Analyst',
  'Combino relevamiento funcional, documentación técnica y análisis de datos para traducir necesidades de negocio en requerimientos claros e implementaciones trazables.':
    'I combine requirements gathering, technical documentation and data analysis to turn business needs into clear requirements and traceable implementations.',
  'Análisis Funcional': 'Functional Analysis',
  'Ver proyectos': 'View projects',
  'Descargar CV': 'Download CV',

  // Sobre mí
  'Técnico en Desarrollo de Software con experiencia en análisis funcional, desarrollo de soluciones orientadas a datos e integración de sistemas. Actualmente participo en la modernización del Sistema de Gestión de Laboratorios Graffigna desde Disei SRL, donde lidero relevamientos funcionales, documentación de casos de uso y validación de módulos. Combino mi perfil técnico con habilidades de relevamiento y comunicación con usuarios clave, lo que me permite traducir necesidades de negocio en requerimientos funcionales claros y en implementaciones trazables.':
    'Software Development Technician with experience in functional analysis, data-driven solutions and systems integration. I am currently working on the modernization of the Laboratorios Graffigna Management System at Disei SRL, where I lead requirements gathering, use case documentation and module validation. I combine my technical background with strong communication with key users, which lets me turn business needs into clear functional requirements and traceable implementations.',
  'Relevamiento funcional y documentación de casos de uso': 'Requirements gathering and use case documentation',
  'Análisis de datos e integración de sistemas con SQL, Python y Power BI': 'Data analysis and systems integration with SQL, Python and Power BI',
  'Comunicación con usuarios clave y trazabilidad de proyectos': 'Communication with key users and project traceability',

  // Experiencia
  'Enero 2025 — Presente': 'January 2025 — Present',
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
  'Universidad Católica de Cuyo · 2024 — Actualidad': 'Universidad Católica de Cuyo · 2024 — Present',
  'Cursos y certificaciones': 'Courses & certifications',
  'C# (en curso)': 'C# (in progress)',
  'Idiomas': 'Languages',
  'Español (nativo) · Inglés B1': 'Spanish (native) · English B1',
  'Comprensión oral y escrita avanzada · Instituto Saint Paul': 'Advanced listening and reading comprehension · Instituto Saint Paul',

  // Contacto
  '¿Tenés un proyecto en mente o una oportunidad para conversar? Escribime.':
    'Have a project in mind or an opportunity to talk about? Get in touch.',
  'Abierto a oportunidades como': 'Open to opportunities as',
  'Analista Funcional': 'Functional Analyst',
  'Full Stack Ssr': 'Mid-level Full Stack Developer',
  'Consultor BI': 'BI Consultant',
  'o': 'or',
  '— remoto, híbrido en San Juan o con relocación a Mendoza.': '— remote, hybrid in San Juan, or relocating to Mendoza.',
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
