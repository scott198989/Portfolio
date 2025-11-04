import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Journey from '@/components/journey';
import Projects from '@/components/projects';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Contact />
    </main>
  );
}
