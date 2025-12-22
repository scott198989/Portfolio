'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
  skills?: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'Lab Technician',
    organization: 'Blown Film Extrusion Plant',
    location: 'Tennessee',
    period: 'Current',
    description: [
      'Conduct quality control testing and analysis on film products',
      'Operate and maintain laboratory equipment for material testing',
      'Collaborate with process engineers to optimize production parameters',
      'Document and report test results following GMP standards',
    ],
    skills: ['Quality Control', 'Lab Equipment', 'Process Analysis', 'Documentation'],
  },
  {
    type: 'education',
    title: 'Mechatronics Engineering Technology',
    organization: 'Volunteer State Community College',
    period: '2024 - Present',
    description: [
      'Pursuing A.A.S. with current GPA of 3.71',
      'Focus on automation, robotics, and control systems',
      'Hands-on experience with PLCs, sensors, and actuators',
      'Coursework in electronics, mechanical systems, and programming',
    ],
    skills: ['PLCs', 'Robotics', 'Control Systems', 'Electronics'],
  },
  {
    type: 'work',
    title: 'Machine Operator',
    organization: 'Sonoco Protective Packaging',
    location: 'Tennessee',
    period: 'Feb 2020 - Apr 2023',
    description: [
      'Top performer achieving 95%+ uptime and 100% efficiency',
      'Trained and mentored junior operators on production lines',
      'Reduced scrap by 10% through consistent adjustments',
      'Implemented time-saving SOPs during changeovers',
    ],
    skills: ['Machine Operation', 'Training', 'Process Improvement', '5S'],
  },
  {
    type: 'education',
    title: 'Full Stack Web Development',
    organization: 'LEARN Academy',
    period: 'Apr 2023 - Aug 2023',
    description: [
      'Completed intensive coding bootcamp',
      'Built responsive web applications with React and Ruby on Rails',
      'Achieved 40% page load time improvement through optimization',
      'Collaborated in agile development environment',
    ],
    skills: ['React', 'Ruby on Rails', 'JavaScript', 'PostgreSQL'],
  },
  {
    type: 'work',
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
    type: 'achievement',
    title: 'Squad Leader',
    organization: 'United States Army',
    period: 'Jan 2008 - Jan 2014',
    description: [
      'Led and mentored soldiers during projects in hostile combat zones',
      'Installed and maintained LAN/WAN networks and infrastructure valued over $1M',
      'Earned NCO Leadership Certification',
    ],
    skills: ['Leadership', 'Networking', 'Signal Corps', 'Team Management'],
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return Briefcase;
    case 'education':
      return GraduationCap;
    case 'achievement':
      return Award;
  }
};

const getColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'cyan';
    case 'education':
      return 'blue';
    case 'achievement':
      return 'purple';
  }
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = getIcon(item.type);
  const color = getColor(item.type);

  return (
    <motion.div
      ref={ref}
      className={`relative pl-8 pb-12 ${index === timelineData.length - 1 ? 'pb-0' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      {index !== timelineData.length - 1 && (
        <div className="absolute left-[15px] top-10 bottom-0 w-px bg-gradient-to-b from-gray-700 to-transparent" />
      )}

      {/* Icon */}
      <div
        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center bg-${color}-400/10 border border-${color}-400/30`}
        style={{
          backgroundColor: `rgba(${color === 'cyan' ? '34, 211, 238' : color === 'blue' ? '59, 130, 246' : '168, 85, 247'}, 0.1)`,
          borderColor: `rgba(${color === 'cyan' ? '34, 211, 238' : color === 'blue' ? '59, 130, 246' : '168, 85, 247'}, 0.3)`,
        }}
      >
        <Icon
          size={16}
          style={{
            color: color === 'cyan' ? '#22d3ee' : color === 'blue' ? '#3b82f6' : '#a855f7',
          }}
        />
      </div>

      {/* Content */}
      <div className="ml-6 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300 group">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-cyan-400 font-medium">{item.organization}</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {item.period}
            </span>
            {item.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {item.location}
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {item.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-400">
              <ChevronRight size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {item.skills && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-gray-800 border border-gray-700 rounded-full text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Timeline */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineCard key={`${item.title}-${item.organization}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
