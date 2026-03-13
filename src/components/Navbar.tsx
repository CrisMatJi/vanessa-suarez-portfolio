import styles from './Navbar.module.css';

interface NavbarProps {
  onAbout: () => void;
  onContact: () => void;
}

export default function Navbar({ onAbout, onContact }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.initials}>VS</span>
        <span className={styles.brand}>Interiorismo Arquitéctonico</span>
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
