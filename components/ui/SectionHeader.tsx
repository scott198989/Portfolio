'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  center = false,
}: SectionHeaderProps) {
  return (
    <motion.div variants={fadeUp} className={`mb-12 md:mb-16 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="font-display text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {title}{' '}
        {titleAccent && (
          <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
            {titleAccent}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-stone-400 text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
