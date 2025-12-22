'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const SkillsCanvas = dynamic(() => import('./SkillsCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 min-h-[300px] bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-lg" />
  ),
});

const technicalSkills = [
  { name: 'Machine Operation', level: 95 },
  { name: 'Troubleshooting', level: 90 },
  { name: 'Process Optimization', level: 85 },
  { name: 'Quality Control', level: 90 },
  { name: 'Light Electrical', level: 80 },
  { name: 'Light Hydraulics', level: 80 },
  { name: 'PLC Programming', level: 70 },
  { name: 'CAD/Technical Drawing', level: 75 },
];

const softwareSkills = [
  { name: 'Python', level: 70 },
  { name: 'JavaScript/React', level: 75 },
  { name: 'Ruby on Rails', level: 70 },
  { name: 'SQL/Databases', level: 65 },
  { name: 'Git/Version Control', level: 80 },
  { name: 'Linux/CLI', level: 75 },
];

const certifications = [
  'Full Stack Web Development - LEARN Academy',
  'LAN/WAN Network Installation - US Army Signal Corps',
  'NCO Leadership Certification - US Army',
  '5S Methodology',
  'Lock Out Tag Out (LOTO)',
  'Forklift Certified',
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm text-cyan-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/5 mb-4">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Skills &{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* 3D Visualization */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl flex flex-col"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Engineering Focus
              </h3>
              <div className="flex-1 min-h-[300px]">
                <SkillsCanvas />
              </div>
              <p className="text-sm text-gray-400 text-center mt-4">
                Precision engineering meets modern automation
              </p>
            </motion.div>

            {/* Software Skills */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full" />
                Software & Programming
              </h3>
              <div className="space-y-4 mb-8">
                {softwareSkills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Certifications & Training
            </h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
