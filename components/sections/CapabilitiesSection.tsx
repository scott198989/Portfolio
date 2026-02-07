'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Code } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { capabilities, operateSkills, buildSkills } from '@/data/skills';
import SectionHeader from '@/components/ui/SectionHeader';
import BentoCard from '@/components/ui/BentoCard';

export default function CapabilitiesSection() {
  return (
    <motion.section
      id="capabilities"
      className="relative py-20 md:py-28 scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title="What this portfolio"
          titleAccent="demonstrates"
          description="A complete end-to-end replatform: visual identity, layout architecture, animated UX, responsive behavior, and production-ready component structure."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Capability cards */}
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <BentoCard key={cap.title} icon={Icon} title={cap.title} description={cap.description}>
                <ul className="space-y-2">
                  {cap.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-stone-300 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            );
          })}

          {/* Skills card - spans 2 columns on large */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900/80 to-stone-950/60 p-6"
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />

            <div className="grid sm:grid-cols-2 gap-6">
              {/* What I Operate */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg border border-accent/20 bg-accent/10 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-stone-100">What I Operate</h3>
                </div>
                <div className="grid gap-2">
                  {operateSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-stone-800/30 border border-stone-800 text-sm text-stone-300 hover:border-accent/20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* What I Build */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg border border-steel-accent/20 bg-steel-accent/10 flex items-center justify-center">
                    <Code className="w-4 h-4 text-steel-accent" />
                  </div>
                  <h3 className="text-base font-bold text-stone-100">What I Build</h3>
                </div>
                <div className="grid gap-2">
                  {buildSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-stone-800/30 border border-stone-800 text-sm text-stone-300 hover:border-steel-accent/20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-steel-accent" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
