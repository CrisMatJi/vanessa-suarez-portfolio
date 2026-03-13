import { useRef, useEffect } from 'react';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import styles from './ProjectDetail.module.css';

interface Props {
  project: Project | null;
  onClose: () => void;
  onProjectClick: (id: string) => void;
}

export default function ProjectDetail({ project, onClose, onProjectClick }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll position each time we switch project
  useEffect(() => {
    if (project && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  const others = projects.filter(p => p.id !== project?.id);

  return (
    <div className={styles.panel}>
      <div ref={scrollRef} className={styles.scroll}>
        {project ? (
          <>
            {/* ── Top bar ── */}
            <div className={styles.topBar}>
              <button className={styles.backBtn} onClick={onClose}>
                <span className={styles.backArrow}>←</span>
                <span className="label">Inicio</span>
              </button>
              <span className="label">{project.category}</span>
            </div>

            {/* ── Hero text ── */}
            <header className={styles.hero}>
              <div className={styles.heroMeta}>
                <span className="label">{project.location}</span>
              </div>
              <h2 className={styles.title}>{project.title}</h2>
              <p className={styles.subtitle}>{project.subtitle}</p>
            </header>

            {/* ── Cover image ── */}
            <div className={styles.cover}>
              <img src={project.images[0]} alt={project.title} />
              <button className={styles.coverBack} onClick={onClose}>
                ← Volver
              </button>
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
          </>
        ) : null}
      </div>
    </div>
  );
}
