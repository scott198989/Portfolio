'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wrench, Code, Cog } from 'lucide-react';

const operateSkills = [
  'Machine Operation',
  'Troubleshooting & Diagnostics',
  'Process Optimization',
  'Quality Control',
  'PLC Programming',
  'Light Electrical',
  'Light Hydraulics',
  'CAD/Technical Drawing',
];

const buildSkills = [
  'Python',
  'JavaScript/React',
  'Ruby on Rails',
  'SQL/Databases',
  'Git/Version Control',
  'Linux/CLI',
  'AI/ML Systems',
  'Custom LLMs',
];

function SkillItem({ skill, index, color }: { skill: string; index: number; color: 'cyan' | 'blue' }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group"
      initial={{ opacity: 0, x: color === 'cyan' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
        style={{ backgroundColor: color === 'cyan' ? '#22d3ee' : '#60a5fa' }}
      />
      <span className="text-gray-300 group-hover:text-white transition-colors">{skill}</span>
    </motion.div>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What I Operate Column */}
            <motion.div
              variants={itemVariants}
              className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/10 rounded-xl">
                  <Wrench className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">What I Operate</h3>
              </div>
              <div className="grid gap-3">
                {operateSkills.map((skill, index) => (
                  <SkillItem key={skill} skill={skill} index={index} color="cyan" />
                ))}
              </div>
            </motion.div>

            {/* What I Build Column */}
            <motion.div
              variants={itemVariants}
              className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-400/10 rounded-xl">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">What I Build</h3>
              </div>
              <div className="grid gap-3">
                {buildSkills.map((skill, index) => (
                  <SkillItem key={skill} skill={skill} index={index} color="blue" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center Gear Graphic */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-12"
          >
            <div className="relative">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full border border-gray-800">
                <Cog className="w-10 h-10 text-cyan-400/60 animate-spin-very-slow" />
              </div>
              <div className="absolute -inset-4 border border-gray-800 rounded-full animate-pulse opacity-30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
