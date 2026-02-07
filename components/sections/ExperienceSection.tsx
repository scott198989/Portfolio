'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { workExperience, education } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineItem from '@/components/ui/TimelineItem';

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="relative py-20 md:py-28 scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Journey"
          title="Experience &"
          titleAccent="Education"
          description="From military service to manufacturing excellence, every step has prepared me for a career in process engineering and automation."
          center
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Work Experience */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center bg-accent/10 rounded-lg border border-accent/20">
                <Briefcase className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-stone-100">Work Experience</h3>
            </div>
            <div>
              {workExperience.map((item) => (
                <TimelineItem key={item.organization} item={item} color="accent" />
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center bg-steel-accent/10 rounded-lg border border-steel-accent/20">
                <GraduationCap className="w-4 h-4 text-steel-accent" />
              </div>
              <h3 className="text-xl font-bold text-stone-100">Education & Training</h3>
            </div>
            <div>
              {education.map((item) => (
                <TimelineItem key={item.title} item={item} color="steel" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
