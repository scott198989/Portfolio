'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { ExternalLink, Github, CheckCircle, Clock } from 'lucide-react';
import type { Project } from '@/data/projects';
import ProjectCarousel from './ProjectCarousel';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative rounded-2xl border border-stone-800 bg-stone-900/60 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_40px_-12px_rgba(249,115,22,0.12)]"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden border-b border-stone-800">
        {project.images && project.images.length > 0 ? (
          <ProjectCarousel images={project.images} projectTitle={project.title} />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-accent/10 via-stone-800/30 to-stone-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="font-display text-accent text-xl font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
              project.status === 'production'
                ? 'bg-green-500/10 text-green-400 border border-green-400/20'
                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-400/20'
            }`}
          >
            {project.status === 'production' ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            {project.statusText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-display text-[11px] uppercase tracking-[0.12em] text-accent font-semibold mb-1.5">
          {project.category === 'automation'
            ? 'AI & Automation'
            : project.category === 'software'
              ? 'Software'
              : 'In Development'}
        </p>

        <h3 className="text-lg font-bold text-stone-100 group-hover:text-accent transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 mb-3">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium bg-stone-800 border border-stone-700 rounded-full text-stone-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent text-stone-950 hover:bg-accent-hover transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-700 text-stone-300 hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
