import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Panel from './Panel';
import styles from './ContactPanel.module.css';

// ── Configure these with your EmailJS credentials ────────────────────────────
const SERVICE_ID  = 'service_fu6s5ou';
const TEMPLATE_ID = 'template_eezjrti';
const PUBLIC_KEY  = '1JgEPD0mQL9idQIIo';
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPanel({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

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
          <div className={styles.left}>
            <span className="label">Contacto</span>
            <h2 className={styles.headline}>
              Cuéntame tu<br /><em>proyecto.</em>
            </h2>
            <p className={styles.sub}>
              ¿Tienes un espacio que quieres transformar?
              Escríbeme y hablamos sin compromiso sobre
              tus ideas y necesidades.
            </p>
            <div className={styles.info}>
              <a href="mailto:vanessa_cal_sua@gmail.com" className={styles.emailLink}>
                vanessa_cal_sua@gmail.com
              </a>
              <div className={styles.socials}>
                <a href="https://www.instagram.com/vanessa_suarez_interiorismo/" target="_blank" rel="noopener noreferrer" className="label">Instagram</a>
                <a href="https://www.linkedin.com/in/vanessa-calvente-suarez-932b14371/" target="_blank" rel="noopener noreferrer" className="label">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className="label">Nombre</span>
                  <input type="text" name="from_name" placeholder="Tu nombre" required disabled={status === 'sending'} />
                </label>
                <label className={styles.field}>
                  <span className="label">Email</span>
                  <input type="email" name="reply_to" placeholder="tu@email.com" required disabled={status === 'sending'} />
                </label>
              </div>

              <label className={styles.field}>
                <span className="label">Tipo de proyecto</span>
                <input type="text" name="subject" placeholder="Reforma integral, interiorismo corporativo..." disabled={status === 'sending'} />
              </label>

              <label className={styles.field}>
                <span className="label">Mensaje</span>
                <textarea name="message" rows={5}
                  placeholder="Cuéntame sobre tu espacio, tus ideas, el presupuesto aproximado..."
                  required disabled={status === 'sending'}
                />
              </label>

              <div className={styles.footer}>
                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
                {status === 'success' && (
                  <p className={styles.ok}>¡Mensaje enviado! Te respondo en breve.</p>
                )}
                {status === 'error' && (
                  <p className={styles.err}>Algo salió mal. Escríbeme directamente.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Panel>
  );
}
