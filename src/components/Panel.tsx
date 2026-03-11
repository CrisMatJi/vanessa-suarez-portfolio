import { useEffect, useRef, ReactNode } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Panel({ isOpen, onClose, children }: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll to top on open
  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className={`${styles.panel} ${isOpen ? styles.open : ''}`}
      aria-modal={isOpen}
      role="dialog"
    >
      {children}
    </div>
  );
}
