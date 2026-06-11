'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Corners } from '@/components/ui/Corners';
import { Led } from '@/components/ui/Led';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  unit: number;
  onOpenLightbox: (project: Project, imageIndex: number) => void;
}

export function ProjectCard({ project, unit, onOpenLightbox }: ProjectCardProps) {
  const [slide, setSlide] = useState(0);
  const images = project.images ?? [];
  const live = project.status === 'production';

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s + 1) % images.length);
  };

  return (
    <article className="group panel relative flex h-full flex-col transition-colors hover:border-line-bright">
      <Corners className="z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] tracking-[0.22em] text-ink-faint">
          UNIT-{String(unit).padStart(2, '0')}
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <Led tone={live ? 'ok' : 'amber'} />
          <span className={live ? 'text-ok' : 'text-amber'}>{project.statusText}</span>
        </span>
      </div>

      {images.length > 0 && (
        <div className="relative aspect-video overflow-hidden border-b border-line bg-raised">
          <button
            type="button"
            className="absolute inset-0 z-[1] block h-full w-full cursor-zoom-in"
            onClick={() => onOpenLightbox(project, slide)}
            aria-label={`Open ${project.title} screenshots fullscreen`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={images[slide].src}
                alt={images[slide].alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </AnimatePresence>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-transparent"
            />
            <span
              aria-hidden
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-line-bright bg-void/60 text-ink-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
            <span className="absolute bottom-2.5 left-3 z-[1] font-mono text-[10px] tracking-wider text-ink-muted">
              {images[slide].caption}
            </span>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 z-[2] grid h-8 w-8 -translate-y-1/2 place-items-center border border-line-bright bg-void/70 text-ink opacity-0 transition-opacity duration-200 hover:border-amber hover:text-amber focus-visible:opacity-100 group-hover:opacity-100"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-[2] grid h-8 w-8 -translate-y-1/2 place-items-center border border-line-bright bg-void/70 text-ink opacity-0 transition-opacity duration-200 hover:border-amber hover:text-amber focus-visible:opacity-100 group-hover:opacity-100"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
              <span className="absolute bottom-2.5 right-3 z-[1] flex gap-1.5" aria-hidden>
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 w-3 transition-colors',
                      i === slide ? 'bg-amber' : 'bg-line-bright',
                    )}
                  />
                ))}
              </span>
            </>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.longDescription}</p>

        <ul className="mt-4 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] text-ink-muted">
              <span className="mt-[2px] font-mono text-xs text-amber" aria-hidden>
                +
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          {project.links?.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-amber/40 pb-0.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-amber transition-colors hover:border-amber"
            >
              Launch Live System
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              {'// Deployment pending'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
