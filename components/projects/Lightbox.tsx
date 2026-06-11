'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectImage } from '@/data/projects';

interface LightboxProps {
  title: string;
  images: ProjectImage[];
  startIndex: number;
  onClose: () => void;
}

export function Lightbox({ title, images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const image = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — screenshot viewer`}
      className="fixed inset-0 z-[85] flex flex-col bg-void/95 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="min-w-0 truncate font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          {title}
          <span className="ml-3 text-ink-faint">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center border border-line-bright text-ink-muted transition-colors hover:border-amber hover:text-amber"
          aria-label="Close viewer"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          src={image.src}
          alt={image.alt}
          className="max-h-full max-w-full border border-line object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-line-bright bg-void/70 text-ink transition-colors hover:border-amber hover:text-amber sm:left-6"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-line-bright bg-void/70 text-ink transition-colors hover:border-amber hover:text-amber sm:right-6"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      <div className="border-t border-line px-5 py-3 text-center">
        <p className="font-mono text-xs text-ink-muted">{image.caption ?? image.alt}</p>
      </div>
    </motion.div>
  );
}
