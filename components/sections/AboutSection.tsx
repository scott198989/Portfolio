'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';

const interests = [
  'Industrial Automation',
  'Robotics & AI',
  'Process Optimization',
  'Manufacturing Analytics',
  'Signal Processing',
  'Custom LLMs',
];

const quickFacts = [
  { value: '3.71', label: 'GPA' },
  { value: 'Lab Tech', label: 'Current Role' },
  { value: 'Process Eng', label: 'Career Goal' },
];

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="relative py-20 md:py-28 scroll-mt-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Bridging the gap between"
          titleAccent="machines and intelligence"
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Profile Image */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border-2 border-accent/20">
              <Image
                src="/assets/profilepic.png"
                alt="Scott Tuschl"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-5">
            <p className="text-stone-300 text-base leading-relaxed">
              I&apos;m a Mechatronics Engineering Technology student at Austin Peay State University
              with a 3.71 GPA, currently working as a Lab Technician at a blown film extrusion plant.
              This combination of academic knowledge and hands-on manufacturing experience gives me a
              unique perspective on building real systems.
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              My vision is to leverage AI and modern automation technologies to optimize manufacturing
              processes. I build tools that operators, engineers, and quality teams actually use &mdash;
              not just demo prototypes. Every project in this portfolio represents a real workflow need
              I&apos;ve observed on the plant floor.
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              Career goal: become a Process Engineer who bridges mechanical systems, electronics,
              and intelligent software to drive operational excellence.
            </p>

            {/* Interest tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-stone-700 text-stone-400 bg-stone-900/50"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-lg border border-stone-800 bg-stone-900/40 px-4 py-3 text-center"
                >
                  <p className="text-xl font-bold text-accent">{fact.value}</p>
                  <p className="text-xs text-stone-500 mt-1">{fact.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
