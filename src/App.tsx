import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { useTheme } from './lib/theme';
import { Header } from './components/Header';
import { Hero, Marquee } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  const { theme, toggle } = useTheme();
  const [project, setProject] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);
  const close = useCallback(() => setProject(null), []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((v) => !v); }
      else if (e.key === '/' && !(e.target instanceof HTMLInputElement)) { e.preventDefault(); setPalette(true); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="absolute -left-[999px] top-2 z-[100] rounded-lg bg-ink px-3.5 py-2 text-bg focus:left-2">Saltar al contenido</a>
      <Header theme={theme} onTheme={toggle} onPalette={() => setPalette(true)} />
      <main id="main">
        <Hero />
        <Marquee />
        <Projects onOpen={setProject} />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <ProjectModal id={project} onClose={close} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} onOpenProject={setProject} onTheme={toggle} />
    </MotionConfig>
  );
}
