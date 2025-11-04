'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Cog, Users, TrendingUp, Award, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const expertise = [
  {
    icon: Cog,
    title: 'Automation Strategy',
    description: 'Designing intelligent systems that optimize manufacturing processes and reduce operational costs.',
    skills: ['PLC Programming', 'SCADA Systems', 'Industrial IoT', 'Robotics'],
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven Engineering',
    description: 'Leveraging analytics and machine learning to predict failures and improve system performance.',
    skills: ['Python', 'Data Analysis', 'Predictive Modeling', 'Process Optimization'],
  },
  {
    icon: Users,
    title: 'Operational Leadership',
    description: 'Leading cross-functional teams to deliver high-impact projects and foster continuous improvement.',
    skills: ['Lean Six Sigma', 'Project Management', 'Team Building', 'Change Management'],
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Building robust applications and tools to support engineering workflows and automation.',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
  },
];

const certifications = [
  'Lean Six Sigma Yellow Belt',
  'OSHA 30-Hour Safety',
  'Fanuc Robotics Certified',
  'IPC/WHMA-A-620 Certified',
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              I'm a mechatronics engineering student passionate about bridging the gap between hardware and software
              to create intelligent, efficient manufacturing systems.
            </p>
          </motion.div>

          {/* Philosophy Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Systems Thinking</CardTitle>
                <CardDescription className="text-base">
                  Every component in a manufacturing process is interconnected. I approach problems holistically,
                  understanding how changes in one area ripple through the entire system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Human-First Automation</CardTitle>
                <CardDescription className="text-base">
                  Technology should empower people, not replace them. I design systems that enhance human capabilities
                  and create safer, more fulfilling work environments.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Expertise Grid */}
          <div className="space-y-8">
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-center gradient-text"
            >
              Core Expertise
            </motion.h3>
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {expertise.map((item, index) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <Card className="h-full glass hover:glass-strong transition-all duration-300 group hover:scale-105">
                    <CardHeader>
                      <item.icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="glow" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Certifications & Training</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
