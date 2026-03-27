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
                <a href="https://www.linkedin.com/in/vanessa-calvente-suarez-932b14371/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/vanessa_suarez_interiorismo/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </a>
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
