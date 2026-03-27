import { projects } from '../data/projects';
import Panel from './Panel';
import styles from './ProyectosPanel.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProjectClick: (id: string) => void;
}

export default function ProyectosPanel({ isOpen, onClose, onProjectClick }: Props) {
  const handleProject = (id: string) => {
    onClose();
    onProjectClick(id);
  };

  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.backArrow}>←</span>
            <span className="label">Inicio</span>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className="label">Proyectos</span>
            <h2 className={styles.headline}>
              Espacios que<br /><em>perduran.</em>
            </h2>
          </div>

          <div className={styles.grid}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                className={styles.card}
                onClick={() => handleProject(p.id)}
              >
                <div className={styles.imgWrap}>
                  <img src={p.coverImage} alt={p.title} className={styles.img} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardNum}>0{i + 1}</span>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <p className={styles.cardSub}>{p.subtitle}</p>
                  </div>
                  <span className={styles.arrow}>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
