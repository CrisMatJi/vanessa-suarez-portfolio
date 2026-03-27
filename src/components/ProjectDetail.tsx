import { useRef, useEffect } from 'react';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import styles from './ProjectDetail.module.css';

interface Props {
  project: Project | null;
  onClose: () => void;
  onProjectClick: (id: string) => void;
  onOpenProyectos: () => void;
}

export default function ProjectDetail({ project, onClose, onProjectClick, onOpenProyectos }: Props) {
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
              <div className={styles.topBarLeft}>
                <button className={styles.backBtn} onClick={onClose}>
                  <span className={styles.backArrow}>←</span>
                  <span className="label">Inicio</span>
                </button>
                <span className={styles.topBarDivider} />
                <button className={styles.proyectosBtn} onClick={onOpenProyectos}>
                  Proyectos ↗
                </button>
              </div>
              <span className="label">{project.category}</span>
            </div>

            {/* ── Hero text ── */}
            <header className={styles.hero}>
              {project.location && (
                <div className={styles.heroMeta}>
                  <span className="label">{project.location}</span>
                </div>
              )}
              <h2 className={styles.title}>{project.title}</h2>
              <p className={styles.subtitle}>{project.subtitle}</p>
            </header>

            {project.imageDescriptions ? (
              /* ── Editorial layout: full-width images with captions ── */
              <>
                {/* ── Intro description ── */}
                <div className={styles.intro}>
                  <p>{project.description}</p>
                </div>

                {project.imageDescriptions.map((desc, i) => (
                  <div key={i} className={styles.imageSection}>
                    <div className={styles.imageFull}>
                      <img src={project.images[i]} alt={`${project.title} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
                    </div>
                    <div className={styles.imageCaption}>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}

                {/* ── Duo: next 2 images side by side ── */}
                {project.images.length > project.imageDescriptions.length + 1 && (
                  <div className={styles.duo}>
                    {project.images
                      .slice(project.imageDescriptions.length, project.imageDescriptions.length + 2)
                      .map((src, i) => (
                        <div key={i} className={styles.duoItem}>
                          <img
                            src={src}
                            alt={`${project.title} ${project.imageDescriptions!.length + i + 1}`}
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                )}

                {/* ── Remaining images in standard gallery ── */}
                {project.images.slice(project.imageDescriptions.length + 2).length > 0 && (
                  <div className={styles.gallery}>
                    {project.images.slice(project.imageDescriptions.length + 2).map((src, i) => (
                      <div key={i} className={styles.galleryItem}>
                        <img
                          src={src}
                          alt={`${project.title} ${project.imageDescriptions!.length + 2 + i + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* ── Standard layout ── */
              <>
                <div className={styles.cover}>
                  <img src={project.images[0]} alt={project.title} />
                </div>

                <div className={styles.description}>
                  <p>{project.description}</p>
                </div>

                <div className={styles.gallery}>
                  {project.images.slice(1).map((src, i) => (
                    <div key={i} className={styles.galleryItem}>
                      <img src={src} alt={`${project.title} ${i + 2}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </>
            )}

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
