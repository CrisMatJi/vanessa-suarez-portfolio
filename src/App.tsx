import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Trifold from './components/Trifold';
import AboutPanel from './components/AboutPanel';
import ContactPanel from './components/ContactPanel';
import CustomCursor from './components/CustomCursor';

type Overlay = null | 'about' | 'contact';

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [themeKey, setThemeKey] = useState('default');

  // Apply theme to <html> so every element on the page inherits it
  useEffect(() => {
    document.documentElement.dataset.theme = themeKey;
  }, [themeKey]);

  return (
    <>
      <CustomCursor />
      <Navbar
        onAbout={() => setOverlay('about')}
        onContact={() => setOverlay('contact')}
        onHome={() => setActiveProjectId(null)}
      />
      <Trifold
        activeProjectId={activeProjectId}
        onProjectOpen={setActiveProjectId}
        onProjectClose={() => setActiveProjectId(null)}
        onThemeChange={setThemeKey}
      />
      <AboutPanel
        isOpen={overlay === 'about'}
        onClose={() => setOverlay(null)}
      />
      <ContactPanel
        isOpen={overlay === 'contact'}
        onClose={() => setOverlay(null)}
      />
    </>
  );
}
