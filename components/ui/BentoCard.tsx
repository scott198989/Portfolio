'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

interface BentoCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BentoCard({
  icon: Icon,
  title,
  description,
  children,
  className = '',
}: BentoCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className={`group relative rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900/80 to-stone-950/60 p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] ${className}`}
    >
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />

      {Icon && (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
      )}

      <h3 className="text-lg font-bold text-stone-100 mb-2">{title}</h3>

      {description && (
        <p className="text-stone-400 text-sm leading-relaxed mb-4">{description}</p>
      )}

      {children}
    </motion.article>
  );
}
