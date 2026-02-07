'use client';

import { motion } from 'framer-motion';
import { staggerContainer, viewportOnce } from '@/lib/animations';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`relative py-20 md:py-28 scroll-mt-24 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
