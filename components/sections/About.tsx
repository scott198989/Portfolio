'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Target, Zap, Cog, Bot, Factory, Brain } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: '3.71 GPA',
    description: 'Mechatronics Engineering Technology',
  },
  {
    icon: Factory,
    title: 'Lab Technician',
    description: 'Blown Film Extrusion Plant',
  },
  {
    icon: Target,
    title: 'Process Engineer',
    description: 'Career Aspiration',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Future Focus Area',
  },
];

const interests = [
  { icon: Cog, label: 'Industrial Automation' },
  { icon: Bot, label: 'Robotics & AI' },
  { icon: Zap, label: 'Process Optimization' },
  { icon: Factory, label: 'Manufacturing Systems' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Engineering the{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Future
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Text content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                As a <span className="text-cyan-400 font-semibold">Mechatronics Engineering Technology</span> student
                with a strong academic record, I&apos;m passionate about bridging the gap between mechanical systems,
                electronics, and intelligent automation.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Currently working as a <span className="text-cyan-400">Lab Technician</span> at a blown film
                extrusion plant, I gain hands-on experience with industrial manufacturing processes while
                pursuing my degree. This unique combination of academic knowledge and real-world application
                drives my ambition to become a <span className="text-cyan-400">Process Engineer</span>.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                My vision is to leverage <span className="text-cyan-400">artificial intelligence</span> and
                modern automation technologies to optimize manufacturing processes, improve efficiency, and
                push the boundaries of what&apos;s possible in industrial engineering.
              </p>

              {/* Interest tags */}
              <div className="flex flex-wrap gap-3 pt-4">
                {interests.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column - Highlight cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-400/30 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/10 rounded-xl mb-4 group-hover:bg-cyan-400/20 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
