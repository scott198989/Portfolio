'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const education = [
  {
    school: 'Austin Peay State University',
    degree: 'Bachelor of Science in Mechatronics Engineering',
    period: '2024 - Present',
    location: 'Clarksville, TN',
    highlights: [
      'Focus on robotics, automation, and control systems',
      'Active member of engineering societies',
      'Pursuing process engineering specialization',
    ],
  },
  {
    school: 'LEARN Academy',
    degree: 'Full-Stack Web Development',
    period: '2023',
    location: 'San Diego, CA',
    highlights: [
      'Intensive 16-week bootcamp',
      'Mastered React, JavaScript, Ruby on Rails',
      'Built multiple full-stack applications',
    ],
  },
  {
    school: 'US Army Leadership Academy',
    degree: 'Advanced Leadership & Management',
    period: '2011',
    location: 'Fort Campbell, KY',
    highlights: [
      'Strategic decision-making training',
      'Team leadership and personnel management',
      'Crisis management and problem-solving',
    ],
  },
];

const experience = [
  {
    company: 'ISOFlex',
    role: 'Process Engineering Lead',
    period: '2020 - Present',
    location: 'Clarksville, TN',
    highlights: [
      'Led $420K cost-savings initiatives through process optimization',
      'Reduced machine changeover time by 32% with smart playbooks',
      'Implemented predictive analytics for extrusion processes',
      'Managed cross-functional teams of 15+ members',
    ],
    technologies: ['Python', 'PLC Programming', 'Data Analysis', 'Lean Six Sigma'],
  },
  {
    company: 'ISOFlex',
    role: 'Machine Operator & Team Lead',
    period: '2014 - 2020',
    location: 'Clarksville, TN',
    highlights: [
      'Operated advanced manufacturing equipment',
      'Trained 20+ operators on safety and efficiency',
      'Achieved 99.97% uptime through preventive maintenance',
      'Pioneered quality control improvements',
    ],
    technologies: ['Manufacturing', 'Quality Control', 'Team Leadership'],
  },
  {
    company: 'US Army',
    role: 'Operations Specialist',
    period: '2008 - 2014',
    location: 'Fort Campbell, KY',
    highlights: [
      'Coordinated complex logistics operations',
      'Led teams of 12+ personnel in high-pressure environments',
      'Earned multiple commendations for leadership',
      'Developed strategic planning skills',
    ],
    technologies: ['Leadership', 'Logistics', 'Strategic Planning'],
  },
];

interface TimelineItemProps {
  item: typeof education[0] | typeof experience[0];
  index: number;
  type: 'education' | 'experience';
}

function TimelineItem({ item, index, type }: TimelineItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isExperience = 'company' in item;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <Card className="glass-strong hover:glass transition-all duration-300 group hover:scale-105">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {isExperience ? item.company : item.school}
              </CardTitle>
              <CardDescription className="text-base font-semibold text-foreground mt-1">
                {isExperience ? item.role : item.degree}
              </CardDescription>
            </div>
            <Badge variant="glow">
              <Calendar className="h-3 w-3 mr-1" />
              {item.period}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{item.location}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {item.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {isExperience && item.technologies && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline connector */}
      {index < (type === 'education' ? education.length - 1 : experience.length - 1) && (
        <div className="absolute left-1/2 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
      )}
    </motion.div>
  );
}

export default function Journey() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="journey" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From military leadership to manufacturing excellence, every step has shaped my approach to engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Education Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            <div className="space-y-8">
              {education.map((item, index) => (
                <TimelineItem key={item.school} item={item} index={index} type="education" />
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <TimelineItem key={item.company} item={item} index={index} type="experience" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
