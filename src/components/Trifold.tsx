import { useEffect } from 'react';
import { projects } from '../data/projects';
import styles from './Trifold.module.css';
import HomePanel from './HomePanel';
import PortraitPanel from './PortraitPanel';
import ProjectDetail from './ProjectDetail';

interface Props {
  activeProjectId: string | null;
  onProjectOpen: (id: string) => void;
  onProjectClose: () => void;
  onThemeChange: (key: string) => void;
  onOpenProyectos: () => void;
}

const themeMap: Record<string, string> = {
  cea: 'cea',
  ajibe: 'ajibe',
};

export default function Trifold({ activeProjectId, onProjectOpen, onProjectClose, onThemeChange, onOpenProyectos }: Props) {
  const activeProject = projects.find(p => p.id === activeProjectId) ?? null;
  const isOpen = activeProjectId !== null;

  useEffect(() => {
    onThemeChange(activeProjectId ? (themeMap[activeProjectId] ?? 'default') : 'default');
  }, [activeProjectId]);

  return (
    <div className={styles.viewport}>
      <div className={`${styles.track} ${isOpen ? styles.shifted : ''}`}>
        <HomePanel />
        <PortraitPanel />
        <ProjectDetail
          project={activeProject}
          onClose={onProjectClose}
          onProjectClick={onProjectOpen}
          onOpenProyectos={onOpenProyectos}
        />
      </div>
    </div>
  );
}
