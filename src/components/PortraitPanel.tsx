import styles from './PortraitPanel.module.css';

export default function PortraitPanel() {
  return (
    <aside className={styles.panel}>
      <img src={`${import.meta.env.BASE_URL}vanessa.jpeg`} alt="Vanessa Suárez" className={styles.photo} />
      <div className={styles.caption}>
        <span className="label"></span>
        <p className={styles.captionSub}>Espacios que inspiran,<br />interiores que perduran.</p>
      </div>
    </aside>
  );
}
