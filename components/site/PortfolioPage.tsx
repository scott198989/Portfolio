'use client';

import Navigation from '@/components/layout/Navigation';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ContactSection from '@/components/sections/ContactSection';

export default function PortfolioPage() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />
      <Navigation />

      <main className="lg:pl-16">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <TechStackSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
