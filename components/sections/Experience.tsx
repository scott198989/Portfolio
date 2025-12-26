'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  skills?: string[];
}

const workExperience: ExperienceItem[] = [
  {
    title: 'Lab Technician',
    organization: 'Blown Film Extrusion Plant',
    period: 'Current',
    description: [
      'Conduct quality control testing and analysis on film products',
      'Operate and maintain laboratory equipment for material testing',
      'Collaborate with process engineers to optimize production parameters',
    ],
    skills: ['Quality Control', 'Lab Equipment', 'Process Analysis'],
  },
  {
    title: 'Machine Operator',
    organization: 'Sonoco Protective Packaging',
    period: 'Feb 2020 - Apr 2023',
    description: [
      'Top performer achieving 95%+ uptime and 100% efficiency',
      'Trained and mentored junior operators on production lines',
      'Reduced scrap by 10% through consistent adjustments',
    ],
    skills: ['Machine Operation', 'Training', 'Process Improvement'],
  },
  {
    title: 'Machine Operator',
    organization: 'ISOFlex Packaging',
    period: 'Jan 2017 - Jan 2020',
    description: [
      'Managed 2 large-scale packaging projects',
      'Promoted to shift trainer for incoming packers',
      'Operated all lines in the plant as valued team member',
    ],
    skills: ['Leadership', 'Training', 'Manufacturing'],
  },
  {
    title: 'Squad Leader',
    organization: 'United States Army',
    period: 'Jan 2008 - Jan 2014',
    description: [
      'Led and mentored soldiers in hostile combat zones',
      'Installed and maintained LAN/WAN networks valued over $1M',
    ],
    skills: ['Leadership', 'Signal Corps', 'Team Management'],
  },
];

const education: ExperienceItem[] = [
  {
    title: 'B.S. Mechatronics Engineering Technology',
    organization: 'Austin Peay State University',
    period: '2024 - Present',
    description: [
      'Current GPA: 3.71',
      'Focus on automation, robotics, and control systems',
      'Coursework in electronics, mechanical systems, and programming',
    ],
    skills: ['PLCs', 'Robotics', 'Control Systems', 'Electronics'],
  },
  {
    title: 'Full Stack Web Development',
    organization: 'LEARN Academy',
    period: 'Apr 2023 - Aug 2023',
    description: [
      'Intensive coding bootcamp',
      'Built responsive web applications with React and Ruby on Rails',
    ],
    skills: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Python', 'C++', 'SQL', 'Ruby on Rails'],
  },
  {
    title: 'LAN/WAN Network Installation',
    organization: 'US Army Signal Corps',
    period: 'Military Training',
    description: [
      'Network infrastructure installation and maintenance',
      'Telecommunications systems operation',
    ],
    skills: ['Networking', 'Infrastructure', 'Telecommunications'],
  },
  {
    title: 'NCO Leadership Certification',
    organization: 'US Army',
    period: 'Military Training',
    description: [
      'Advanced leadership and team management training',
      'Strategic planning and execution',
    ],
    skills: ['Leadership', 'Team Management', 'Strategic Planning'],
  },
];

function ExperienceCard({ item, index, color }: { item: ExperienceItem; index: number; color: 'cyan' | 'blue' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className={`text-lg font-bold text-white group-hover:text-${color}-400 transition-colors`}>
            {item.title}
          </h3>
          <p className={`text-${color}-400 text-sm font-medium`}>{item.organization}</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} />
          {item.period}
        </span>
      </div>

      <ul className="space-y-1.5 mb-3">
        {item.description.map((desc, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <ChevronRight size={14} className={`text-${color}-400 mt-0.5 flex-shrink-0`} />
            <span>{desc}</span>
          </li>
        ))}
      </ul>

      {item.skills && (
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-xs font-medium bg-gray-800 border border-gray-700 rounded-full text-gray-400"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/5 mb-4">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience &{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From military service to manufacturing excellence, every step has prepared me
            for a career in process engineering and automation.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Work Experience Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-cyan-400/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {workExperience.map((item, index) => (
                <ExperienceCard key={item.organization} item={item} index={index} color="cyan" />
              ))}
            </div>
          </motion.div>

          {/* Education & Training Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-400/10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education & Training</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <ExperienceCard key={item.title} item={item} index={index} color="blue" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
