'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectCarouselProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  projectTitle: string;
}

export default function ProjectCarousel({ images, projectTitle }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isHovered || isFullscreen) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [isHovered, isFullscreen, goToNext]);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToNext, goToPrevious]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  };

  if (images.length === 0) return null;

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {images[currentIndex].caption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 left-4 right-4 text-center"
          >
            <p className="text-sm text-white/90 font-medium backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-lg inline-block">
              {images[currentIndex].caption}
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {isHovered && images.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/50 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/50 transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
              className="absolute top-3 right-3 p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/50 transition-all"
              aria-label="View fullscreen"
            >
              <Maximize2 size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent w-6 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {!isHovered && images.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-glow"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            key={currentIndex}
          />
        )}
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <div className="relative z-10 w-full max-w-6xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/90 text-lg font-medium">{projectTitle}</h3>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="relative aspect-video rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentIndex].src}
                      alt={images[currentIndex].alt}
                      fill
                      className="object-contain bg-black/50"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {images[currentIndex].caption && (
                <p className="text-center text-white/70 mt-4">{images[currentIndex].caption}</p>
              )}

              <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-black scale-105'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>

              <p className="text-center text-white/50 text-sm mt-3">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
