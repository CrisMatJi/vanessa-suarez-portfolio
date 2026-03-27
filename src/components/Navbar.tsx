import styles from './Navbar.module.css';

interface NavbarProps {
  onAbout: () => void;
  onContact: () => void;
  onHome: () => void;
  onServices: () => void;
  onProjects: () => void;
}

export default function Navbar({ onAbout, onContact, onHome, onServices, onProjects }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={onHome}>
        <span className={styles.initials}>VS</span>
        <span className={styles.brand}>Interiorismo Arquitéctonico</span>
      </button>
      <ul className={styles.links}>
        <li><button onClick={onServices}>Servicios</button></li>
        <li><button onClick={onProjects}>Proyectos</button></li>
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
