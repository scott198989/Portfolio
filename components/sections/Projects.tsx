'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Cpu, Database, Globe, Clock, CheckCircle } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'engineering' | 'software' | 'automation';
  status: 'development' | 'production';
  statusText: string;
  links?: {
    live?: string;
    github?: string;
  };
  features: string[];
}

const projects: Project[] = [
  {
    title: 'Multi-Agent Orchestrator',
    description: 'AI agent coordination framework',
    longDescription: 'Framework demonstrating AI agent coordination for complex engineering problems. A conductor agent analyzes problems, routes to specialized agents (Controls, Process, Systems, Pragmatist), and synthesizes responses. Includes token tracking and cost estimation.',
    tags: ['AI/ML', 'Multi-Agent', 'React', 'Architecture'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://multi-agent-orchestrator-framework.vercel.app/',
    },
    features: [
      'Multi-agent architecture design',
      'Specialized domain agents',
      'Token tracking & cost estimation',
      'Practical orchestration patterns',
    ],
  },
  {
    title: 'PlainSpeak Query Interface',
    description: 'Natural language to SQL for manufacturing',
    longDescription: 'Natural language interface for manufacturing data. Ask questions in plain English, get answers with the generated SQL visible. Built on a simulated 30-day production database covering scrap rates, downtime, OEE, and quality metrics.',
    tags: ['NL-to-SQL', 'AI/ML', 'Manufacturing', 'React'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://plain-speak-query-interface.vercel.app/',
    },
    features: [
      'Natural language queries',
      'Transparent SQL generation',
      'Manufacturing KPI database',
      'Data democratization',
    ],
  },
  {
    title: 'SensorSim Anomaly Detector',
    description: 'Predictive maintenance dashboard',
    longDescription: 'Real-time predictive maintenance dashboard using simulated industrial sensor data. Detects equipment anomalies through statistical analysis (Z-score), predicts failure timelines, and allows fault injection for training scenarios.',
    tags: ['Predictive Maintenance', 'React', 'Analytics', 'HMI'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://sensor-sim-anomaly-detector.vercel.app/',
    },
    features: [
      'Real-time sensor simulation',
      'Z-score anomaly detection',
      'Failure prediction',
      'Industrial HMI design',
    ],
  },
  {
    title: 'ParameterPath Optimizer',
    description: 'Blown film extrusion expert system',
    longDescription: 'Expert system for blown film extrusion parameter recommendations and defect diagnosis. Input material and targets, get processing parameters. Input a defect, get ranked probable causes with corrective actions. Rules-based for explainability and safety.',
    tags: ['Expert System', 'Manufacturing', 'React', 'Rules Engine'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://parameter-path-optimizer.vercel.app/',
    },
    features: [
      'Parameter recommendations',
      'Defect diagnosis',
      'Explainable rules-based AI',
      'Manufacturing safety focus',
    ],
  },
  {
    title: 'ISOFlex Assistant',
    description: 'AI-powered assistant for manufacturers',
    longDescription: 'An AI-powered assistant system designed for mid-size manufacturers who need custom AI solutions but lack dedicated technical teams. Integrates with existing manufacturing workflows to provide intelligent automation and decision support.',
    tags: ['Python', 'AI/ML', 'Manufacturing', 'Automation'],
    category: 'automation',
    status: 'development',
    statusText: 'In Development (80%)',
    features: [
      'Custom AI for manufacturing workflows',
      'Integration with existing systems',
      'Intelligent decision support',
      'Automated process optimization',
    ],
  },
  {
    title: 'HAVOC',
    description: 'Custom 7B parameter language model',
    longDescription: 'A custom 7B parameter language model built from scratch using novel reasoning architectures. Currently in active training with promising convergence metrics.',
    tags: ['Python', 'Machine Learning', 'LLM', 'PyTorch'],
    category: 'automation',
    status: 'development',
    statusText: 'In Development',
    features: [
      'Novel reasoning architecture',
      '7B parameter scale',
      'Custom training pipeline',
      'Active convergence optimization',
    ],
  },
  {
    title: 'NCM Analytics Dashboard',
    description: 'Production quality management system',
    longDescription: 'Production-deployed quality management dashboard tracking non-conformance data from a live manufacturing environment. Syncs with SharePoint via Power Automate, stores in Cloudflare D1, serves through Workers backend. Built for actual daily use by quality and operations teams.',
    tags: ['React', 'Cloudflare Workers', 'D1 Database', 'Power Automate'],
    category: 'software',
    status: 'production',
    statusText: 'Production',
    links: {
      live: 'https://iso-flex-dashboard.vercel.app/login',
    },
    features: [
      'Live manufacturing data sync',
      'Real-time filtering & trends',
      'Defect distribution analysis',
      'Daily use by QA teams',
    ],
  },
  {
    title: 'CPM - Predictive Maintenance',
    description: 'High-credibility predictive maintenance platform',
    longDescription: 'A high-credibility predictive maintenance platform with C++ signal processing, causal inference, and a premium React dashboard. Enterprise-grade architecture for industrial equipment monitoring.',
    tags: ['C++', 'React', 'Signal Processing', 'Causal Inference'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://cpm-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'C++ signal processing engine',
      'Causal inference models',
      'Premium React dashboard',
      'Enterprise-grade architecture',
    ],
  },
  {
    title: 'AI Virtual Metrology',
    description: 'AI-powered coating quality prediction',
    longDescription: 'AI-powered quality prediction for thermal spray coating processes. Predict coating thickness, porosity, and defects in real-time without physical inspection. Eliminates destructive testing.',
    tags: ['AI/ML', 'Manufacturing', 'Quality Prediction', 'React'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://ai-virtual-metrology-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'Real-time quality prediction',
      'Thermal spray coating analysis',
      'Non-destructive testing',
      'Porosity & thickness prediction',
    ],
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Globe },
  { id: 'automation', label: 'AI & Automation', icon: Cpu },
  { id: 'software', label: 'Software', icon: Database },
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
            {project.category === 'automation' && '🤖'}
            {project.category === 'software' && '💻'}
            {project.category === 'engineering' && '🔧'}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
            project.status === 'production'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {project.status === 'production' ? <CheckCircle size={12} /> : <Clock size={12} />}
            {project.statusText}
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
            Real projects spanning AI/ML systems, manufacturing automation, and full-stack development.
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
