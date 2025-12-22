'use client';

import dynamic from 'next/dynamic';
import GlobalErrorBoundary from '@/components/GlobalErrorBoundary';
import { Navigation } from '@/components/sections';

// Dynamically import all sections that use Three.js or heavy animations
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const About = dynamic(() => import('@/components/sections/About'), {
  ssr: false,
});

const Skills = dynamic(() => import('@/components/sections/Skills'), {
  ssr: false,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  ssr: false,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  ssr: false,
});

function HeroFallback() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-background">
      <div className="text-center px-4">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-800 rounded-full mx-auto mb-6" />
          <div className="h-16 w-96 bg-gray-800 rounded-lg mx-auto mb-4" />
          <div className="h-6 w-80 bg-gray-800 rounded mx-auto" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <GlobalErrorBoundary>
      <main className="relative min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </GlobalErrorBoundary>
  );
}
