'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Cpu, Database, Globe, Wrench } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: 'engineering' | 'software' | 'automation';
  links?: {
    live?: string;
    github?: string;
  };
  features: string[];
}

const projects: Project[] = [
  {
    title: 'Process Monitoring Dashboard',
    description: 'Real-time manufacturing analytics platform',
    longDescription: 'A comprehensive dashboard for monitoring blown film extrusion processes, featuring real-time data visualization, anomaly detection, and predictive maintenance alerts.',
    image: '/projects/dashboard.png',
    tags: ['React', 'Python', 'PostgreSQL', 'Real-time Data'],
    category: 'automation',
    features: [
      'Live production metrics tracking',
      'Anomaly detection algorithms',
      'Predictive maintenance scheduling',
      'Export reports and analytics',
    ],
  },
  {
    title: 'Automated Quality Control System',
    description: 'Machine vision for defect detection',
    longDescription: 'An AI-powered quality control system that uses computer vision to detect defects in film products, reducing manual inspection time and improving accuracy.',
    image: '/projects/qc-system.png',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Raspberry Pi'],
    category: 'automation',
    features: [
      '95% defect detection accuracy',
      'Real-time image processing',
      'Automated reject system',
      'Statistical process control',
    ],
  },
  {
    title: 'Travelogue App',
    description: 'Full-stack travel planning application',
    longDescription: 'A responsive web application for planning and documenting travel experiences, built during my time at LEARN Academy.',
    image: '/travelogue.png',
    tags: ['React', 'Ruby on Rails', 'PostgreSQL', 'REST API'],
    category: 'software',
    links: {
      github: 'https://github.com/scott198989/travelogue',
    },
    features: [
      'User authentication system',
      'CRUD operations for trips',
      'Responsive design',
      'RESTful API backend',
    ],
  },
  {
    title: 'PLC Control Interface',
    description: 'Industrial automation HMI design',
    longDescription: 'A human-machine interface design for PLC-controlled manufacturing equipment, focusing on operator usability and safety.',
    image: '/projects/plc-hmi.png',
    tags: ['HMI Design', 'PLC Programming', 'SCADA', 'Industrial'],
    category: 'engineering',
    features: [
      'Intuitive operator interface',
      'Alarm management system',
      'Production data logging',
      'Safety interlock displays',
    ],
  },
  {
    title: 'Tic Tac Toe with AI',
    description: 'React game with minimax algorithm',
    longDescription: 'An interactive Tic Tac Toe game featuring an unbeatable AI opponent implemented using the minimax algorithm.',
    image: '/tictactoe.png',
    tags: ['React', 'JavaScript', 'Algorithms', 'Game Dev'],
    category: 'software',
    links: {
      github: 'https://github.com/scott198989/tictactoe',
    },
    features: [
      'Minimax AI algorithm',
      'Difficulty levels',
      'Score tracking',
      'Animated UI',
    ],
  },
  {
    title: 'Robotic Arm Controller',
    description: 'Arduino-based pick and place system',
    longDescription: 'A multi-axis robotic arm controlled via Arduino, designed for pick-and-place operations with precision positioning.',
    image: '/projects/robotic-arm.png',
    tags: ['Arduino', 'C++', 'Servo Motors', 'Kinematics'],
    category: 'engineering',
    features: [
      '4-axis movement control',
      'Position feedback system',
      'Programmable sequences',
      'Serial communication interface',
    ],
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Globe },
  { id: 'automation', label: 'Automation', icon: Cpu },
  { id: 'software', label: 'Software', icon: Database },
  { id: 'engineering', label: 'Engineering', icon: Wrench },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30">
            {project.category === 'automation' && '⚙️'}
            {project.category === 'software' && '💻'}
            {project.category === 'engineering' && '🔧'}
          </span>
        </div>

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all"
                aria-label="View GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all"
                aria-label="View Live"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.longDescription}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gray-800 border border-gray-700 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/5 mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects spanning automation, software development, and engineering solutions.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeCategory === id
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="https://github.com/scott198989"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
