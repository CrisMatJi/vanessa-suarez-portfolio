import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { dirname } from 'path';

const BASE = '/Users/cmateos/Desktop/vanePortfolio/vanessa-suarez-interiorismov2/vanessa-suarez-interiorismo/src';

function write(relPath, content) {
  const full = `${BASE}/${relPath}`;
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log('✓ wrote', relPath);
}

function del(relPath) {
  const full = `${BASE}/${relPath}`;
  if (existsSync(full)) {
    rmSync(full, { recursive: true, force: true });
    console.log('✗ deleted', relPath);
  }
}

// ─── Delete old files ────────────────────────────────────────────────────────
[
  'components/Hero.tsx', 'components/Hero.module.css',
  'components/Projects.tsx', 'components/Projects.module.css',
  'components/About.tsx', 'components/About.module.css',
  'components/Contact.tsx', 'components/Contact.module.css',
  'components/Footer.tsx', 'components/Footer.module.css',
  'pages',
].forEach(del);

// ─── index.css ───────────────────────────────────────────────────────────────
write('index.css', `/* === Design tokens === */
:root {
  --bg: #0a0a0a;
  --bg-surface: #111111;
  --text-primary: #ede8e0;
  --text-secondary: #6e6b65;
  --text-muted: #3a3a38;
  --accent: #c4aa8a;
  --accent-hover: #d9c5a8;
  --border: #1e1e1c;
  --border-soft: #2a2a28;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
}

/* === Reset === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  height: 100vh;
}
#root { height: 100vh; overflow: hidden; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }

/* === Utilities === */
.label {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`);

// ─── App.css ─────────────────────────────────────────────────────────────────
write('App.css', `/* intentionally blank — styles live in *.module.css */\n`);

// ─── data/projects.ts ────────────────────────────────────────────────────────
write('data/projects.ts', `export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  description: string;
  images: string[];
  coverImage: string;
}

const ceaImages = Array.from({ length: 8 }, (_, i) =>
  \`/projects/cea/cea-\${String(i + 1).padStart(2, '0')}.jpeg\`
);

const soponImages = Array.from({ length: 12 }, (_, i) =>
  \`/projects/sopon/sopon-\${String(i + 1).padStart(2, '0')}.jpg\`
);

export const projects: Project[] = [
  {
    id: 'cea',
    title: 'CEA',
    subtitle: 'Interiorismo Corporativo',
    category: 'Arquitectura Interior',
    year: '2025',
    location: 'Sevilla, España',
    description:
      'Reforma integral de las instalaciones corporativas de CEA Empresas Andaluzas. El proyecto parte de una paleta de soluciones de lujo contenido: mármol blanco, terciopelo rojo burdeos y detalles en latón dorado definen la recepción y las salas de reunión. La luz indirecta y la volumetría suave de los falsos techos crean una experiencia espacial que transmite solidez, confianza e identidad institucional.',
    images: ceaImages,
    coverImage: ceaImages[0],
  },
  {
    id: 'sopon',
    title: 'SOPÓN',
    subtitle: 'Espacio Gastronómico',
    category: 'Interiorismo Gastronómico',
    year: '2020',
    location: 'Andalucía, España',
    description:
      'SOPÓN es un proyecto de diseño integral para un espacio gastronómico de inspiración andaluza. El concepto parte de la tradición culinaria y cultural del sur: los tablaos, los taberneos, la cerámica artesanal y la luz rasante del atardecer. Se propone una separación de espacios mediante elementos textiles, iluminación escultórica en corten y piezas únicas que dotan al local de carácter y memoria.',
    images: soponImages,
    coverImage: soponImages[0],
  },
];
`);

// ─── components/Ticker.tsx ───────────────────────────────────────────────────
write('components/Ticker.tsx', `import styles from './Ticker.module.css';

const ITEMS = [
  'INTERIORISMO ARQUITECTÓNICO',
  'LUZ',
  'MATERIALES',
  'ESPACIOS A MEDIDA',
  'REFORMA INTEGRAL',
  'DETALLE',
  'IDENTIDAD ESPACIAL',
  'ANDALUCÍA',
];

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.ticker} aria-hidden>
      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
`);

write('components/Ticker.module.css', `.ticker {
  overflow: hidden;
  border-top: 1px solid var(--border);
  padding: 0.7rem 0;
  flex-shrink: 0;
  user-select: none;
  pointer-events: none;
}
.track {
  display: inline-flex;
  white-space: nowrap;
  animation: ticker 30s linear infinite;
}
.item {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0 1.5rem;
}
.sep {
  margin-left: 1.5rem;
  font-size: 0.35rem;
  color: var(--accent);
  vertical-align: middle;
  opacity: 0.6;
}
`);

// ─── components/Navbar.tsx ───────────────────────────────────────────────────
write('components/Navbar.tsx', `import styles from './Navbar.module.css';

interface NavbarProps {
  onAbout: () => void;
  onContact: () => void;
}

export default function Navbar({ onAbout, onContact }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.initials}>VS</span>
        <span className={styles.brand}>Interiorismo</span>
      </div>
      <ul className={styles.links}>
        <li><button onClick={onAbout}>Sobre mí</button></li>
        <li>
          <button onClick={onContact} className={styles.ctaBtn}>
            Contacto
          </button>
        </li>
      </ul>
    </nav>
  );
}
`);

write('components/Navbar.module.css', `.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.logo {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.initials {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--text-primary);
}
.brand {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.links {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 2rem;
}
.links button {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color 0.2s;
}
.links button:hover { color: var(--text-primary); }
.ctaBtn {
  color: var(--accent) !important;
  border: 1px solid var(--border-soft) !important;
  padding: 0.45rem 1.1rem !important;
  transition: border-color 0.2s, color 0.2s !important;
}
.ctaBtn:hover {
  color: var(--accent-hover) !important;
  border-color: var(--accent) !important;
}
@media (max-width: 480px) {
  .nav { padding: 0 1.25rem; }
  .brand { display: none; }
  .links { gap: 1.25rem; }
}
`);

// ─── components/Home.tsx ─────────────────────────────────────────────────────
write('components/Home.tsx', `import Ticker from './Ticker';
import { projects } from '../data/projects';
import styles from './Home.module.css';

interface HomeProps {
  onProjectClick: (id: string) => void;
}

export default function Home({ onProjectClick }: HomeProps) {
  return (
    <main className={styles.home}>
      {/* Eyebrow */}
      <div className={styles.eyebrow}>
        <span className="label">B A S A D A &nbsp; E N &nbsp; E S P A Ñ A</span>
        <span className="label">I N T E R I O R I S M O &nbsp; · &nbsp; A R Q U I T E C T U R A</span>
      </div>

      {/* Name block */}
      <div className={styles.nameBlock}>
        <h1 className={styles.name}>
          <span className={styles.line1}>Vanessa</span>
          <span className={styles.line2}>Suárez</span>
        </h1>
        <div className={styles.aside}>
          <p className={styles.tagline}>
            Diseño de interiores<br />
            con identidad,<br />
            sensibilidad y detalle.
          </p>
          <a
            href="mailto:vanessa.cal.sua@gmail.com"
            className={styles.email}
          >
            vanessa.cal.sua@gmail.com
          </a>
        </div>
      </div>

      {/* Project list */}
      <div className={styles.projectList}>
        {projects.map((p, i) => (
          <button
            key={p.id}
            className={styles.projectRow}
            onClick={() => onProjectClick(p.id)}
          >
            <span className={styles.num}>0{i + 1}</span>
            <span className={styles.ptitle}>{p.title}</span>
            <span className={styles.pmeta + ' label'}>{p.subtitle}</span>
            <span className={styles.pyear + ' label'}>{p.year}</span>
            <span className={styles.arrow}>→</span>
          </button>
        ))}
      </div>

      {/* Ticker */}
      <Ticker />
    </main>
  );
}
`);

write('components/Home.module.css', `.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 56px; /* navbar */
}

/* ── Eyebrow ── */
.eyebrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 2.5rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

/* ── Name block ── */
.nameBlock {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1.5rem 2.5rem 2rem;
  gap: 2rem;
}

.name {
  font-family: var(--font-serif);
  font-weight: 300;
  line-height: 0.88;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.line1 {
  font-size: clamp(4.5rem, 10.5vw, 10rem);
  color: var(--text-primary);
  display: block;
}

.line2 {
  font-size: clamp(4.5rem, 10.5vw, 10rem);
  color: transparent;
  -webkit-text-stroke: 1px var(--text-muted);
  display: block;
  transition: -webkit-text-stroke-color 0.5s;
}
.line2:hover { -webkit-text-stroke-color: var(--accent); }

.aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 1.25rem;
  max-width: 14rem;
  padding-bottom: 0.2rem;
}

.tagline {
  font-family: var(--font-serif);
  font-size: clamp(0.8125rem, 1.1vw, 1.0625rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.8;
  color: var(--text-secondary);
}

.email {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  line-height: 1.6;
  transition: color 0.2s;
}
.email:hover { color: var(--accent-hover); }

/* ── Project list ── */
.projectList {
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.projectRow {
  width: 100%;
  display: grid;
  grid-template-columns: 3rem 1fr auto auto 2.5rem;
  align-items: center;
  gap: 1.5rem;
  padding: 1.1rem 2.5rem;
  border-bottom: 1px solid var(--border);
  text-align: left;
  transition: background 0.25s;
}
.projectRow:hover { background: rgba(255,255,255,0.025); }
.projectRow:hover .ptitle { color: var(--accent); }
.projectRow:hover .arrow { transform: translateX(6px); color: var(--accent); }

.num {
  font-size: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
.ptitle {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  font-weight: 300;
  color: var(--text-primary);
  transition: color 0.3s;
  line-height: 1;
}
.pmeta { /* .label applied via className */ }
.pyear { /* .label applied via className */ }
.arrow {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: transform 0.3s, color 0.3s;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .eyebrow { flex-direction: column; align-items: flex-start; gap: 0.2rem; padding: 0.625rem 1.25rem; }
  .nameBlock { padding: 1.25rem 1.25rem 1.5rem; }
  .aside { align-items: flex-start; text-align: left; }
  .projectRow { grid-template-columns: 2.5rem 1fr 2rem; gap: 0.75rem; padding: 1rem 1.25rem; }
  .pmeta, .pyear { display: none; }
}

@media (max-height: 640px) {
  .line1, .line2 { font-size: clamp(3rem, 8vw, 6rem); }
  .nameBlock { padding-bottom: 1rem; }
  .projectRow { padding-top: 0.75rem; padding-bottom: 0.75rem; }
}
`);

// ─── components/Panel.tsx ────────────────────────────────────────────────────
write('components/Panel.tsx', `import { useEffect, useRef, ReactNode } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Panel({ isOpen, onClose, children }: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll to top on open
  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className={\`\${styles.panel} \${isOpen ? styles.open : ''}\`}
      aria-modal={isOpen}
      role="dialog"
    >
      {children}
    </div>
  );
}
`);

write('components/Panel.module.css', `.panel {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--bg);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  /* Closed state */
  transform: translateX(100%);
  visibility: hidden;
  transition:
    transform 0.6s cubic-bezier(0.7, 0, 0.84, 0),
    visibility 0s linear 0.6s;
}

.panel.open {
  transform: translateX(0);
  visibility: visible;
  transition:
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0s linear 0s;
}
`);

// ─── components/ProjectPanel.tsx ─────────────────────────────────────────────
write('components/ProjectPanel.tsx', `import { useRef, useEffect } from 'react';
import Panel from './Panel';
import { Project, projects } from '../data/projects';
import styles from './ProjectPanel.module.css';

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onProjectClick: (id: string) => void;
}

export default function ProjectPanel({ project, isOpen, onClose, onProjectClick }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  // Animate content swap when switching projects
  useEffect(() => {
    if (project && innerRef.current) {
      innerRef.current.style.opacity = '0';
      const t = setTimeout(() => {
        if (innerRef.current) innerRef.current.style.opacity = '1';
      }, 40);
      return () => clearTimeout(t);
    }
  }, [project?.id]);

  const others = projects.filter(p => p.id !== project?.id);

  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      {project && (
        <div
          ref={innerRef}
          className={styles.inner}
          style={{ transition: 'opacity 0.25s' }}
        >
          {/* ── Top bar ── */}
          <div className={styles.topBar}>
            <button className={styles.backBtn} onClick={onClose}>
              <span className={styles.backArrow}>←</span>
              <span className="label">Proyectos</span>
            </button>
            <span className={styles.topTitle + ' label'}>{project.category}</span>
          </div>

          {/* ── Hero text ── */}
          <header className={styles.hero}>
            <div className={styles.heroMeta}>
              <span className="label">{project.year}</span>
              <span className="label">{project.location}</span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </header>

          {/* ── Cover ── */}
          <div className={styles.cover}>
            <img src={project.images[0]} alt={project.title} />
          </div>

          {/* ── Description ── */}
          <div className={styles.description}>
            <p>{project.description}</p>
          </div>

          {/* ── Gallery ── */}
          <div className={styles.gallery}>
            {project.images.slice(1).map((src, i) => (
              <div key={i} className={styles.galleryItem}>
                <img src={src} alt={\`\${project.title} \${i + 2}\`} loading="lazy" />
              </div>
            ))}
          </div>

          {/* ── Next project ── */}
          {others.length > 0 && (
            <div className={styles.next}>
              <span className="label">Siguiente proyecto</span>
              <button
                className={styles.nextBtn}
                onClick={() => onProjectClick(others[0].id)}
              >
                <span className={styles.nextTitle}>{others[0].title}</span>
                <span className={styles.nextArrow}>→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
`);

write('components/ProjectPanel.module.css', `.inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top bar */
.topBar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.backBtn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: opacity 0.2s;
}
.backBtn:hover { opacity: 0.6; }
.backArrow {
  font-size: 0.875rem;
  color: var(--text-primary);
}
.topTitle { /* .label applied via className */ }

/* Hero */
.hero {
  padding: 4rem 2.5rem 3rem;
}
.heroMeta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.75rem;
}
.title {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(4rem, 10vw, 8.5rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
.subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.5vw, 1.1875rem);
  font-style: italic;
  font-weight: 300;
  color: var(--text-secondary);
}

/* Cover */
.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.cover img {
  width: 100%; height: 100%;
  object-fit: cover;
}

/* Description */
.description {
  max-width: 680px;
  margin: 5rem auto;
  padding: 0 2.5rem;
}
.description p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  font-weight: 300;
  line-height: 1.9;
  color: var(--text-secondary);
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--border);
}
.galleryItem {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg);
}
.galleryItem img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.galleryItem:hover img { transform: scale(1.05); }

/* Make odd last item full width */
.galleryItem:last-child:nth-child(odd) {
  grid-column: span 2;
  aspect-ratio: 16 / 7;
}

/* Next project */
.next {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 5rem 2.5rem 6rem;
  border-top: 1px solid var(--border);
  margin-top: auto;
}
.nextBtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  transition: border-color 0.3s;
}
.nextBtn:hover { border-bottom-color: var(--accent); }
.nextBtn:hover .nextTitle { color: var(--accent); }
.nextBtn:hover .nextArrow { transform: translateX(8px); color: var(--accent); }
.nextTitle {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  color: var(--text-primary);
  transition: color 0.3s;
}
.nextArrow {
  font-size: 1.5rem;
  color: var(--text-muted);
  transition: transform 0.3s, color 0.3s;
}

/* Responsive */
@media (max-width: 640px) {
  .topBar, .hero, .description, .next { padding-left: 1.25rem; padding-right: 1.25rem; }
  .gallery { grid-template-columns: 1fr; }
  .galleryItem:last-child:nth-child(odd) { grid-column: span 1; aspect-ratio: 4/3; }
}
`);

// ─── components/AboutPanel.tsx ───────────────────────────────────────────────
write('components/AboutPanel.tsx', `import Panel from './Panel';
import styles from './AboutPanel.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutPanel({ isOpen, onClose }: Props) {
  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.backArrow}>←</span>
            <span className="label">Inicio</span>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.imageCol}>
            <div className={styles.imgWrap}>
              <img src="/vanessa.jpeg" alt="Vanessa Suárez" className={styles.photo} />
            </div>
            <div className={styles.deco} aria-hidden />
          </div>

          <div className={styles.textCol}>
            <span className="label">Sobre mí</span>

            <h2 className={styles.headline}>
              Espacio,<br />
              <em>sensibilidad</em><br />
              y oficio.
            </h2>

            <div className={styles.body}>
              <p>
                Soy Vanessa Suárez, interiorista y arquitecta de interiores.
                Mi trabajo parte siempre de escuchar: cada proyecto comienza
                por entender cómo viven, trabajan y sienten mis clientes.
              </p>
              <p>
                Diseño espacios que tienen alma. Combino la funcionalidad
                estricta con una selección cuidada de materiales, texturas y
                luz para crear entornos que perduran en el tiempo y que se
                sienten genuinamente propios.
              </p>
              <p>
                Cada reforma, cada propuesta, es un diálogo entre el
                espacio existente y el que podría llegar a ser.
              </p>
            </div>

            <div className={styles.creds}>
              <div className={styles.credItem}>
                <span className={styles.credNum}>+5</span>
                <span className="label">años de experiencia</span>
              </div>
              <div className={styles.credItem}>
                <span className={styles.credNum}>10+</span>
                <span className="label">proyectos terminados</span>
              </div>
              <div className={styles.credItem}>
                <span className={styles.credNum}>2</span>
                <span className="label">en portfolio activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
`);

write('components/AboutPanel.module.css', `.inner { min-height: 100vh; display: flex; flex-direction: column; }

.topBar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center;
  padding: 0 2.5rem; height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(10,10,10,0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.backBtn { display: flex; align-items: center; gap: 0.75rem; transition: opacity 0.2s; }
.backBtn:hover { opacity: 0.6; }
.backArrow { font-size: 0.875rem; color: var(--text-primary); }

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  padding: 6rem 4rem 6rem 2.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.imageCol { position: relative; }
.imgWrap { aspect-ratio: 3/4; overflow: hidden; }
.photo {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.imgWrap:hover .photo { transform: scale(1.04); }
.deco {
  position: absolute;
  inset: -1.25rem -1.25rem -1.25rem 1.25rem;
  border: 1px solid var(--border);
  z-index: -1; pointer-events: none;
}

.textCol { display: flex; flex-direction: column; gap: 2rem; }
.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  font-weight: 300;
  line-height: 1.15;
}
.headline em { font-style: italic; color: var(--accent); }

.body { display: flex; flex-direction: column; gap: 1rem; }
.body p {
  font-size: 0.9375rem;
  line-height: 1.85;
  color: var(--text-secondary);
}

.creds {
  display: flex; gap: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}
.credItem { display: flex; flex-direction: column; gap: 0.3rem; }
.credNum {
  font-family: var(--font-serif);
  font-size: 2rem; font-weight: 300;
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .content { grid-template-columns: 1fr; gap: 3rem; padding: 3rem 1.25rem; }
  .imgWrap { max-width: 360px; }
  .deco { display: none; }
}
`);

// ─── components/ContactPanel.tsx ──────────────────────────────────────────────
write('components/ContactPanel.tsx', `import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Panel from './Panel';
import styles from './ContactPanel.module.css';

// ── Configure these with your EmailJS credentials ────────────────────────────
const SERVICE_ID  = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPanel({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.backArrow}>←</span>
            <span className="label">Inicio</span>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.left}>
            <span className="label">Contacto</span>
            <h2 className={styles.headline}>
              Cuéntame tu<br /><em>proyecto.</em>
            </h2>
            <p className={styles.sub}>
              ¿Tienes un espacio que quieres transformar?
              Escríbeme y hablamos sin compromiso sobre
              tus ideas y necesidades.
            </p>
            <div className={styles.info}>
              <a href="mailto:vanessa.cal.sua@gmail.com" className={styles.emailLink}>
                vanessa.cal.sua@gmail.com
              </a>
              <div className={styles.socials}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="label">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="label">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className="label">Nombre</span>
                  <input type="text" name="from_name" placeholder="Tu nombre" required disabled={status === 'sending'} />
                </label>
                <label className={styles.field}>
                  <span className="label">Email</span>
                  <input type="email" name="reply_to" placeholder="tu@email.com" required disabled={status === 'sending'} />
                </label>
              </div>

              <label className={styles.field}>
                <span className="label">Tipo de proyecto</span>
                <input type="text" name="subject" placeholder="Reforma integral, interiorismo corporativo..." disabled={status === 'sending'} />
              </label>

              <label className={styles.field}>
                <span className="label">Mensaje</span>
                <textarea name="message" rows={5}
                  placeholder="Cuéntame sobre tu espacio, tus ideas, el presupuesto aproximado..."
                  required disabled={status === 'sending'}
                />
              </label>

              <div className={styles.footer}>
                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
                {status === 'success' && (
                  <p className={styles.ok}>¡Mensaje enviado! Te respondo en breve.</p>
                )}
                {status === 'error' && (
                  <p className={styles.err}>Algo salió mal. Escríbeme directamente.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Panel>
  );
}
`);

write('components/ContactPanel.module.css', `.inner { min-height: 100vh; display: flex; flex-direction: column; }

.topBar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center;
  padding: 0 2.5rem; height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(10,10,10,0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.backBtn { display: flex; align-items: center; gap: 0.75rem; transition: opacity 0.2s; }
.backBtn:hover { opacity: 0.6; }
.backArrow { font-size: 0.875rem; color: var(--text-primary); }

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 6rem;
  padding: 6rem 4rem 6rem 2.5rem;
  max-width: 1200px; width: 100%; margin: 0 auto;
}

.left { display: flex; flex-direction: column; gap: 2rem; }
.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  font-weight: 300; line-height: 1.1;
}
.headline em { font-style: italic; color: var(--accent); }
.sub {
  font-size: 0.9375rem; line-height: 1.85;
  color: var(--text-secondary); max-width: 36ch;
}
.info {
  display: flex; flex-direction: column; gap: 1rem;
  padding-top: 2rem; border-top: 1px solid var(--border);
  margin-top: auto;
}
.emailLink {
  font-size: 0.8125rem; letter-spacing: 0.06em;
  color: var(--text-primary); transition: color 0.2s;
}
.emailLink:hover { color: var(--accent); }
.socials { display: flex; gap: 1.5rem; }
.socials a { transition: color 0.2s; }
.socials a:hover { color: var(--text-primary); }

/* Form */
.form { display: flex; flex-direction: column; gap: 1.75rem; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem; }
.field { display: flex; flex-direction: column; gap: 0.625rem; }
.field input, .field textarea {
  background: transparent;
  border: none; border-bottom: 1px solid var(--border);
  padding: 0.75rem 0;
  font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 300;
  color: var(--text-primary); outline: none;
  transition: border-bottom-color 0.3s;
  resize: none; width: 100%;
}
.field input::placeholder, .field textarea::placeholder { color: var(--text-muted); }
.field input:focus, .field textarea:focus { border-bottom-color: var(--accent); }
.field input:disabled, .field textarea:disabled { opacity: 0.5; cursor: not-allowed; }

.footer { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; padding-top: 0.25rem; }
.submit {
  padding: 0.875rem 2.5rem;
  background: var(--accent); color: var(--bg);
  font-size: 0.5625rem; font-weight: 500;
  letter-spacing: 0.2em; text-transform: uppercase;
  transition: background 0.3s, opacity 0.3s;
}
.submit:hover:not(:disabled) { background: var(--accent-hover); }
.submit:disabled { opacity: 0.5; cursor: not-allowed; }
.ok { font-size: 0.8125rem; color: #7dba7d; }
.err { font-size: 0.8125rem; color: #d97474; }

@media (max-width: 900px) {
  .content { grid-template-columns: 1fr; gap: 3rem; padding: 3rem 1.25rem; }
  .info { margin-top: 0; }
}
@media (max-width: 480px) {
  .row { grid-template-columns: 1fr; }
}
`);

// ─── App.tsx ─────────────────────────────────────────────────────────────────
write('App.tsx', `import { useState, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectPanel from './components/ProjectPanel';
import AboutPanel from './components/AboutPanel';
import ContactPanel from './components/ContactPanel';
import { projects } from './data/projects';

type ActivePanel = null | 'project' | 'about' | 'contact';

export default function App() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProject = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveProjectId(id);
    setActivePanel('project');
  }, []);

  const closePanel = useCallback(() => {
    setActivePanel(null);
    closeTimer.current = setTimeout(() => setActiveProjectId(null), 750);
  }, []);

  const currentProject = projects.find(p => p.id === activeProjectId) ?? null;

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Navbar
        onAbout={() => setActivePanel('about')}
        onContact={() => setActivePanel('contact')}
      />
      <Home onProjectClick={openProject} />

      <ProjectPanel
        project={currentProject}
        isOpen={activePanel === 'project'}
        onClose={closePanel}
        onProjectClick={openProject}
      />
      <AboutPanel
        isOpen={activePanel === 'about'}
        onClose={closePanel}
      />
      <ContactPanel
        isOpen={activePanel === 'contact'}
        onClose={closePanel}
      />
    </div>
  );
}
`);

console.log('\n✅ All files written successfully!');
