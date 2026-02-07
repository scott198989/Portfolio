'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { stackGroups } from '@/data/stack';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TechStackSection() {
  return (
    <motion.section
      id="stack"
      className="relative py-20 md:py-28 scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Stack & Practices"
          title="Frontier frameworks with"
          titleAccent="production discipline"
          description="This rebuild combines modern frontend tooling, 3D experiences, strict typing, and practical deployment constraints."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackGroups.map((group) => (
            <motion.article
              key={group.title}
              variants={fadeUp}
              className="rounded-xl border border-stone-800 bg-stone-900/40 p-5 hover:border-stone-700 transition-colors"
            >
              <h3 className="font-display text-sm font-semibold text-stone-200 mb-3">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-medium rounded-full border border-stone-700 bg-stone-800/50 text-stone-400 hover:text-accent hover:border-accent/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
