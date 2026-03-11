import { useState, useEffect } from 'react';
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
}

const themeMap: Record<string, string> = {
  cea: 'cea',
  sopon: 'sopon',
};

export default function Trifold({ activeProjectId, onProjectOpen, onProjectClose, onThemeChange }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId) ?? null;
  const isOpen = activeProjectId !== null;

  // Notify parent of theme changes
  const themeKey = activeProjectId ?? hoveredId;
  useEffect(() => {
    onThemeChange(themeKey ? (themeMap[themeKey] ?? 'default') : 'default');
  }, [themeKey]);

  return (
    <div className={styles.viewport}>
      <div className={`${styles.track} ${isOpen ? styles.shifted : ''}`}>
        <HomePanel onProjectClick={onProjectOpen} onHover={setHoveredId} />
        <PortraitPanel />
        <ProjectDetail
          project={activeProject}
          onClose={onProjectClose}
          onProjectClick={onProjectOpen}
        />
      </div>
    </div>
  );
}
