'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Cpu, Database, Globe, Clock, CheckCircle } from 'lucide-react';
import ProjectCarousel from '@/components/ui/ProjectCarousel';

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

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
  images?: ProjectImage[];
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
    images: [
      { src: '/projects/multi-agent/Dashboard.png.png', alt: 'Multi-Agent Dashboard', caption: 'Agent orchestration interface' },
      { src: '/projects/multi-agent/ConductAna.png.png', alt: 'Conductor Analysis', caption: 'Problem analysis by conductor agent' },
      { src: '/projects/multi-agent/CondComp.png.png', alt: 'Component View', caption: 'Agent component architecture' },
      { src: '/projects/multi-agent/Synthesis.png.png', alt: 'Response Synthesis', caption: 'Synthesized multi-agent response' },
      { src: '/projects/multi-agent/Synthe.png.png', alt: 'Synthesis Details', caption: 'Response synthesis breakdown' },
      { src: '/projects/multi-agent/DI.png.png', alt: 'Domain Integration', caption: 'Domain-specific agent integration' },
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
    images: [
      { src: '/projects/plainspeak/Dashboard.png.png', alt: 'PlainSpeak Dashboard', caption: 'Manufacturing data overview' },
      { src: '/projects/plainspeak/Query.png.png', alt: 'Query Interface', caption: 'Natural language query input' },
      { src: '/projects/plainspeak/OEE.png.png', alt: 'OEE Metrics', caption: 'Overall Equipment Effectiveness' },
      { src: '/projects/plainspeak/Scrap.png.png', alt: 'Scrap Analysis', caption: 'Scrap rate tracking' },
      { src: '/projects/plainspeak/Downtime.png.png', alt: 'Downtime Analysis', caption: 'Equipment downtime metrics' },
      { src: '/projects/plainspeak/ProdMetrics.png.png', alt: 'Production Metrics', caption: 'Production performance data' },
      { src: '/projects/plainspeak/Howitworks.png.png', alt: 'How It Works', caption: 'System architecture overview' },
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
    images: [
      { src: '/projects/sensorsim/Dashboard.png.png', alt: 'Sensor Dashboard', caption: 'Real-time sensor monitoring' },
      { src: '/projects/sensorsim/AnomDetec.png.png', alt: 'Anomaly Detection', caption: 'Z-score anomaly detection' },
      { src: '/projects/sensorsim/BearingWear.png.png', alt: 'Bearing Wear', caption: 'Bearing wear prediction' },
      { src: '/projects/sensorsim/MotorOverload.png.png', alt: 'Motor Overload', caption: 'Motor overload detection' },
      { src: '/projects/sensorsim/HeaterFail.png.png', alt: 'Heater Failure', caption: 'Heater failure prediction' },
      { src: '/projects/sensorsim/HowItWorks.png.png', alt: 'How It Works', caption: 'System architecture' },
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
    images: [
      { src: '/projects/parameterpath/Dashboard.png.png', alt: 'Parameter Dashboard', caption: 'Expert system dashboard' },
      { src: '/projects/parameterpath/ProInputs.png.png', alt: 'Process Inputs', caption: 'Material and target input' },
      { src: '/projects/parameterpath/OpParms.png.png', alt: 'Operating Parameters', caption: 'Recommended parameters' },
      { src: '/projects/parameterpath/DiagDef.png.png', alt: 'Defect Diagnosis', caption: 'Defect diagnosis interface' },
      { src: '/projects/parameterpath/ProbCause.png.png', alt: 'Probable Causes', caption: 'Ranked probable causes' },
      { src: '/projects/parameterpath/Howitworks.png.png', alt: 'How It Works', caption: 'Rules engine architecture' },
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
      live: 'https://iso-flex-dashboard-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'Live manufacturing data sync',
      'Real-time filtering & trends',
      'Defect distribution analysis',
      'Daily use by QA teams',
    ],
    images: [
      { src: '/projects/ncm/dashboard.png.png', alt: 'NCM Dashboard', caption: 'Quality management overview' },
      { src: '/projects/ncm/login.png.png', alt: 'Login Screen', caption: 'Secure authentication' },
      { src: '/projects/ncm/Cal.png.png', alt: 'Calendar View', caption: 'NCM calendar tracking' },
      { src: '/projects/ncm/silo.png.png', alt: 'Data Silos', caption: 'Data organization view' },
      { src: '/projects/ncm/shqron.png.png', alt: 'Chevron View', caption: 'Process flow visualization' },
      { src: '/projects/ncm/screens.ang.png', alt: 'Analytics', caption: 'Non-conformance analytics' },
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
    images: [
      { src: '/projects/cpm/screenshot1.png', alt: 'CPM Dashboard', caption: 'Real-time equipment monitoring' },
      { src: '/projects/cpm/screenshot2.png', alt: 'Signal Analysis', caption: 'C++ signal processing engine' },
      { src: '/projects/cpm/screenshot3.png', alt: 'Causal Analysis', caption: 'Causal inference visualization' },
      { src: '/projects/cpm/screenshot4.png', alt: 'Predictive Analytics', caption: 'AI-powered failure prediction' },
      { src: '/projects/cpm/screenshot5.png', alt: '3D Visualization', caption: 'Equipment health visualization' },
      { src: '/projects/cpm/screenshot6.png', alt: 'Alert System', caption: 'Intelligent alert management' },
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
    images: [
      { src: '/projects/virtual-metrology/Dashboard.png.png', alt: 'Virtual Metrology Dashboard', caption: 'Quality prediction interface' },
      { src: '/projects/virtual-metrology/VM.png.png', alt: 'Virtual Metrology', caption: 'AI prediction engine' },
      { src: '/projects/virtual-metrology/3d.png.png', alt: '3D Visualization', caption: 'Coating thickness visualization' },
      { src: '/projects/virtual-metrology/Drift.png.png', alt: 'Drift Analysis', caption: 'Process drift monitoring' },
      { src: '/projects/virtual-metrology/ProductRuns.png.png', alt: 'Product Runs', caption: 'Production run tracking' },
      { src: '/projects/virtual-metrology/Reports.png.png', alt: 'Reports', caption: 'Quality reports generation' },
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
      className="group relative crystal-card crystal-shine bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,212,255,0.15)]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Top light edge */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Image area - Carousel or Placeholder */}
      <div className="relative h-48 overflow-hidden">
        {project.images && project.images.length > 0 ? (
          /* Carousel for projects with images */
          <ProjectCarousel images={project.images} projectTitle={project.title} />
        ) : (
          /* Default gradient placeholder */
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.08),transparent_70%)]" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20 drop-shadow-lg">
                {project.category === 'automation' && '🤖'}
                {project.category === 'software' && '💻'}
                {project.category === 'engineering' && '🔧'}
              </span>
            </div>

            {/* Overlay on hover (only for non-carousel) */}
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
        )}

        {/* Status badge - always visible */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-md ${
            project.status === 'production'
              ? 'bg-green-500/10 text-green-400 border border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]'
              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]'
          }`}>
            {project.status === 'production' ? <CheckCircle size={12} /> : <Clock size={12} />}
            {project.statusText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white/95 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300"
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
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300"
                aria-label="View Live"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400/90 text-sm mb-4 line-clamp-2 leading-relaxed">{project.longDescription}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300/90 hover:border-white/20 transition-colors"
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
          <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-sm mb-4 shadow-[0_0_15px_rgba(0,212,255,0.08)]">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400/90 max-w-2xl mx-auto leading-relaxed">
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm ${
                activeCategory === id
                  ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,212,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300 hover:bg-white/[0.07]'
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
            className="inline-flex items-center gap-2 px-6 py-3 text-cyan-400 border border-cyan-400/20 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all duration-300 bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,212,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
