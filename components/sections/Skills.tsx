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
      className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-sm"
      initial={{ opacity: 0, x: color === 'cyan' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
    >
      <div
        className="w-2 h-2 rounded-full group-hover:scale-150 transition-all duration-300 group-hover:shadow-[0_0_8px_currentColor]"
        style={{ backgroundColor: color === 'cyan' ? '#22d3ee' : '#60a5fa' }}
      />
      <span className="text-gray-300/90 group-hover:text-white transition-colors">{skill}</span>
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
            <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-sm mb-4 shadow-[0_0_15px_rgba(0,212,255,0.08)]">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-6">
              Skills &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* What I Operate Column */}
            <motion.div
              variants={itemVariants}
              className="relative p-8 crystal-card bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Top light edge */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/10 rounded-xl border border-cyan-400/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                  <Wrench className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white/95">What I Operate</h3>
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
              className="relative p-8 crystal-card bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Top light edge */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-400/10 rounded-xl border border-blue-400/20 shadow-[0_0_15px_rgba(96,165,250,0.1)]">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white/95">What I Build</h3>
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
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,212,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Cog className="w-10 h-10 text-cyan-400/70 animate-spin-very-slow" />
              </div>
              <div className="absolute -inset-4 border border-white/5 rounded-full animate-pulse" />
              <div className="absolute -inset-8 border border-white/[0.03] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
