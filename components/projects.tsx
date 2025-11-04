'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap, TrendingUp, Network, Clock, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Image from 'next/image';

const projects = [
  {
    title: 'Smart Changeover Playbooks',
    category: 'Process Optimization',
    description: 'Developed intelligent digital playbooks that reduced machine changeover time by 32%, significantly improving production efficiency and reducing downtime.',
    impact: [
      { icon: Clock, label: '32% faster changeovers', color: 'text-green-400' },
      { icon: DollarSign, label: '$180K annual savings', color: 'text-blue-400' },
      { icon: Zap, label: '15% throughput increase', color: 'text-purple-400' },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Data Analytics'],
    image: '/assets/tictactoe.png',
    featured: true,
  },
  {
    title: 'Predictive Extrusion Analytics',
    category: 'Machine Learning',
    description: 'Built a predictive analytics system using machine learning to forecast extrusion defects, enabling proactive maintenance and quality control.',
    impact: [
      { icon: Activity, label: '40% defect reduction', color: 'text-green-400' },
      { icon: TrendingUp, label: '99.2% quality rate', color: 'text-blue-400' },
      { icon: DollarSign, label: '$240K cost avoidance', color: 'text-purple-400' },
    ],
    technologies: ['Python', 'TensorFlow', 'Pandas', 'SQL', 'Power BI'],
    image: '/assets/travelogue.png',
    featured: true,
  },
  {
    title: 'Field Network Overhaul',
    category: 'Infrastructure',
    description: 'Led the complete redesign of field communication network, achieving 99.97% uptime and enabling real-time data collection from 50+ machines.',
    impact: [
      { icon: Network, label: '99.97% uptime', color: 'text-green-400' },
      { icon: Zap, label: 'Real-time monitoring', color: 'text-blue-400' },
      { icon: Activity, label: '50+ machines connected', color: 'text-purple-400' },
    ],
    technologies: ['Industrial IoT', 'Networking', 'SCADA', 'PLC'],
    featured: true,
  },
  {
    title: 'Automated Quality Control System',
    category: 'Automation',
    description: 'Designed and implemented an automated quality inspection system using computer vision, reducing manual inspection time by 60%.',
    impact: [
      { icon: Clock, label: '60% time saved', color: 'text-green-400' },
      { icon: Activity, label: '98% accuracy', color: 'text-blue-400' },
    ],
    technologies: ['OpenCV', 'Python', 'ROS', 'Machine Vision'],
  },
  {
    title: 'Energy Monitoring Dashboard',
    category: 'Sustainability',
    description: 'Created a real-time energy monitoring dashboard that identified $50K in annual energy savings opportunities through data-driven insights.',
    impact: [
      { icon: DollarSign, label: '$50K savings', color: 'text-green-400' },
      { icon: TrendingUp, label: '25% efficiency gain', color: 'text-blue-400' },
    ],
    technologies: ['React', 'Chart.js', 'REST API', 'PostgreSQL'],
  },
  {
    title: 'Maintenance Prediction Model',
    category: 'Predictive Analytics',
    description: 'Developed a machine learning model to predict equipment failures, reducing unplanned downtime by 45%.',
    impact: [
      { icon: Clock, label: '45% less downtime', color: 'text-green-400' },
      { icon: DollarSign, label: '$120K savings', color: 'text-blue-400' },
    ],
    technologies: ['Python', 'Scikit-learn', 'Time Series', 'SQL'],
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={project.featured ? 'lg:col-span-2' : ''}
    >
      <Card className="h-full glass-strong hover:glass transition-all duration-300 group hover:scale-105 overflow-hidden">
        {project.image && project.featured && (
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="space-y-2">
            <Badge variant="glow" className="w-fit">
              {project.category}
            </Badge>
            <CardTitle className="text-2xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-base">
              {project.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Impact Metrics */}
          <div className="grid grid-cols-1 gap-3">
            {project.impact.map((metric, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-world engineering solutions that delivered measurable impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Want to learn more about these projects?
          </p>
          <Button
            variant="glow"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
