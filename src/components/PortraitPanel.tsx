import styles from './PortraitPanel.module.css';

export default function PortraitPanel() {
  return (
    <aside className={styles.panel}>
      <img src="/vanessa.jpeg" alt="Vanessa Suárez" className={styles.photo} />
      <div className={styles.caption}>
        <span className="label">Vanessa Suárez</span>
        <p className={styles.captionSub}>Interiorismo<br />Arquitectónico</p>
      </div>
    </aside>
  );
}
