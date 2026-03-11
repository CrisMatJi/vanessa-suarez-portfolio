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
              <img src="/vanessa.jpeg" alt="Vanessa Suárez" className={styles.photo} />
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
                Soy Vanessa Suárez, interiorista y arquitecta de interiores.
                Mi trabajo parte siempre de escuchar: cada proyecto comienza
                por entender cómo viven, trabajan y sienten mis clientes.
              </p>
              <p>
                Diseño espacios que tienen alma. Combino la funcionalidad
                estricta con una selección cuidada de materiales, texturas y
                luz para crear entornos que perduran en el tiempo y que se
                sienten genuinamente propios.
              </p>
              <p>
                Cada reforma, cada propuesta, es un diálogo entre el
                espacio existente y el que podría llegar a ser.
              </p>
            </div>

            <div className={styles.creds}>
              <div className={styles.credItem}>
                <span className={styles.credNum}>+5</span>
                <span className="label">años de experiencia</span>
              </div>
              <div className={styles.credItem}>
                <span className={styles.credNum}>10+</span>
                <span className="label">proyectos terminados</span>
              </div>
              <div className={styles.credItem}>
                <span className={styles.credNum}>2</span>
                <span className="label">en portfolio activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
