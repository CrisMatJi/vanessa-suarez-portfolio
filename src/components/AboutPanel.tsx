import Panel from './Panel';
import styles from './AboutPanel.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutPanel({ isOpen, onClose }: Props) {
  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.backArrow}>←</span>
            <span className="label">Inicio</span>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.imageCol}>
            <div className={styles.imgWrap}>
              <img src={`${import.meta.env.BASE_URL}vanessa.jpeg`} alt="Vanessa Suárez" className={styles.photo} />
            </div>
            <div className={styles.deco} aria-hidden />
          </div>

          <div className={styles.textCol}>
            <span className="label">Sobre mí</span>

            <h2 className={styles.headline}>
              Espacio,<br />
              <em>sensibilidad</em><br />
              y oficio.
            </h2>

            <div className={styles.body}>
              <p>
                Entiendo el interiorismo como una forma de pensar el espacio.
              </p>
              <p>
                Cada proyecto comienza con el análisis del lugar: cómo funciona,
                cómo se recorre y qué necesita realmente. A partir de ahí, el diseño
                se construye de manera ordenada, tomando decisiones que responden
                tanto a la función como al carácter del espacio.
              </p>
              <p>
                Trabajo desde un enfoque técnico donde distribución, usos,
                materialidad e iluminación forman parte de una misma lógica.
                Me interesa que el proyecto tenga coherencia y que cada elemento
                encuentre su lugar dentro del conjunto.
              </p>
              <p>
                Al mismo tiempo, presto especial atención al detalle: ese gesto
                o material que aporta identidad y hace que el espacio deje de
                ser genérico.
              </p>
              <p>
                Mi manera de trabajar busca precisamente eso: crear espacios
                claros, funcionales y con carácter propio.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Panel>
  );
}
