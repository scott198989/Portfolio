'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Lightbox } from '@/components/projects/Lightbox';
import { projects, projectCategories, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

type CategoryId = (typeof projectCategories)[number]['id'];

export function Projects() {
  const [filter, setFilter] = useState<CategoryId>('all');
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>([['all', projects.length]]);
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <Section
      id="projects"
      index="03"
      code="Deployments"
      title="Projects"
      lead="Production systems for real manufacturing problems — predictive maintenance, expert systems, quality analytics. Most are live; click through and run them."
    >
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {projectCategories.map((cat) => {
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive ? 'true' : 'false'}
              onClick={() => setFilter(cat.id)}
              className={cn(
                'border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                isActive
                  ? 'border-amber bg-amber/10 text-amber'
                  : 'border-line text-ink-muted hover:border-line-bright hover:text-ink',
              )}
            >
              {cat.label}
              <span className={cn('ml-2', isActive ? 'text-amber/70' : 'text-ink-faint')}>
                {counts.get(cat.id) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={project}
                unit={projects.indexOf(project) + 1}
                onOpenLightbox={(p, i) => setLightbox({ project: p, index: i })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox && lightbox.project.images && (
          <Lightbox
            title={lightbox.project.title}
            images={lightbox.project.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
