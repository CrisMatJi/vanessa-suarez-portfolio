import styles from './PortraitPanel.module.css';

interface Props {
  onBack?: () => void;
}

export default function PortraitPanel({ onBack }: Props) {
  return (
    <aside className={styles.panel}>
      <img src={`${import.meta.env.BASE_URL}vanessa.jpeg`} alt="Vanessa Suárez" className={styles.photo} />
      {onBack && (
        <button className={styles.backBtn} onClick={onBack}>
          ← Volver
        </button>
      )}
      <div className={styles.caption}>
        <span className="label"></span>
        <p className={styles.captionSub}>Espacios que inspiran,<br />interiores que perduran.</p>
      </div>
    </aside>
  );
}
