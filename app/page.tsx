'use client';

import { Navigation, Hero, About, Skills, Experience, Projects, Contact } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
