import styles from './Ticker.module.css';

const ITEMS = [
  'INTERIORISMO ARQUITECTÓNICO',
  'LUZ',
  'MATERIALES',
  'ESPACIOS A MEDIDA',
  'REFORMA INTEGRAL',
  'DETALLE',
  'IDENTIDAD ESPACIAL',
  'ANDALUCÍA',
];

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.ticker} aria-hidden>
      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
