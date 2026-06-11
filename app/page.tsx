import { CommandPalette } from '@/components/CommandPalette';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/hero/Hero';
import { Nav } from '@/components/Nav';
import { Projects } from '@/components/projects/Projects';
import { ScrollProgress } from '@/components/ScrollProgress';
import { About } from '@/components/sections/About';
import { Capabilities } from '@/components/sections/Capabilities';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Stack } from '@/components/sections/Stack';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <CommandPalette />
      <main id="main-content">
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
