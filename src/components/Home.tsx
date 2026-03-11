import Ticker from './Ticker';
import { projects } from '../data/projects';
import styles from './Home.module.css';

interface HomeProps {
  onProjectClick: (id: string) => void;
}

export default function Home({ onProjectClick }: HomeProps) {
  return (
    <main className={styles.home}>
      {/* Background photo */}
      <div className={styles.heroBg} aria-hidden>
        <img src={`${import.meta.env.BASE_URL}vanessa.jpeg`} alt="" />
        <div className={styles.heroBgOverlay} />
      </div>
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
            href="mailto:vanessa_cal_sua@gmail.com"
            className={styles.email}
          >
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
          >
            <span className={styles.num}>0{i + 1}</span>
            <span className={styles.ptitle}>{p.title}</span>
            <span className={`${styles.pmeta} label`}>{p.subtitle}</span>
            <span className={`${styles.pyear} label`}>{p.year}</span>
            <span className={styles.arrow}>→</span>
          </button>
        ))}
      </div>

      {/* Ticker */}
      <Ticker />
    </main>
  );
}
