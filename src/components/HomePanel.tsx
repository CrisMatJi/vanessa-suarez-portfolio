import Ticker from './Ticker';
import { projects } from '../data/projects';
import styles from './HomePanel.module.css';

interface Props {
  onProjectClick: (id: string) => void;
  onHover?: (id: string | null) => void;
}

export default function HomePanel({ onProjectClick, onHover }: Props) {
  return (
    <section className={styles.panel}>
      {/* Name block */}
      <div className={styles.nameBlock}>
        <h1 className={styles.name}>
          <span className={styles.line1}>Vanessa</span>
          <span className={styles.line2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suárez</span>
        </h1>
        <div className={styles.aside}>
          <p className={styles.tagline}>
            Diseño de interiores<br />
            con identidad,<br />
            sensibilidad y detalle.
          </p>
          <a href="mailto:vanessa_cal_sua@gmail.com" className={styles.email}>
            vanessa_cal_sua@gmail.com
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
            onMouseEnter={() => onHover?.(p.id)}
            onMouseLeave={() => onHover?.(null)}
          >
            <span className={styles.num}>0{i + 1}</span>
            <span className={styles.ptitle}>{p.title}</span>
            <span className={`${styles.pmeta} label`}>{p.subtitle}</span>
            <span className={styles.arrow}>→</span>
          </button>
        ))}
      </div>

      <Ticker />
    </section>
  );
}
