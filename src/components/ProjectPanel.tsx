import { useRef, useEffect } from 'react';
import Panel from './Panel';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
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
                <img src={src} alt={`${project.title} ${i + 2}`} loading="lazy" />
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
