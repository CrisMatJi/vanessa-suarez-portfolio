import Panel from './Panel';
import styles from './ServiciosPanel.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    num: '01',
    title: 'Proyectos de Interiorismo',
    tags: ['Distribución', 'Mobiliario', 'Iluminación'],
    description:
      'Diseño integral del espacio con definición de la distribución, selección de mobiliario y propuesta de iluminación adaptada a cada ambiente y uso.',
  },
  {
    num: '02',
    title: 'Planos Técnicos y Render',
    tags: [],
    description:
      'Documentación técnica detallada y visualizaciones de alta calidad para anticipar el resultado final y facilitar la toma de decisiones durante el proceso.',
  },
  {
    num: '03',
    title: 'Asesoramiento y Selección de Materiales',
    tags: [],
    description: null,
  },
  {
    num: '04',
    title: 'Asesoramiento y Gestión de Compra en Mobiliario',
    tags: [],
    description: null,
  },
  {
    num: '05',
    title: 'Estudio de Necesidades',
    tags: [],
    description: null,
  },
  {
    num: '06',
    title: 'Coordinación y Ejecución de Obra',
    tags: [],
    description:
      'Gestión integral con todos los gremios implicados: albañilería, electricidad, fontanería, carpintería, pintura y acabados.',
  },
];

export default function ServiciosPanel({ isOpen, onClose }: Props) {
  return (
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.backArrow}>←</span>
            <span className="label">Inicio</span>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className="label">Servicios</span>
            <h2 className={styles.headline}>
              ¿Qué<br /><em>necesitas?</em>
            </h2>
          </div>

          <div className={styles.list}>
            {services.map(s => (
              <div key={s.num} className={styles.item}>
                <span className={styles.num}>{s.num}</span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{s.title}</h3>
                  {s.tags.length > 0 && (
                    <div className={styles.tags}>
                      {s.tags.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  )}
                  {s.description && (
                    <p className={styles.desc}>{s.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
