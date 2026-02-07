'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { projects, projectCategories } from '@/data/projects';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <motion.section
      id="projects"
      className="relative py-20 md:py-28 scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Selected Work"
          title="Live projects with real"
          titleAccent="operational relevance"
          description="Every demo below points to a working deployment. Project framing emphasizes practical outcomes, not surface-level prototypes."
        />

        {/* Filter bar */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === cat.id
                  ? 'bg-accent text-stone-950'
                  : 'bg-stone-900/50 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div variants={fadeUp} className="text-center mt-12">
          <a
            href="https://github.com/scott198989"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
