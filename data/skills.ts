import type { LucideIcon } from 'lucide-react';
import { Cpu, BriefcaseBusiness, Code2, ShieldCheck } from 'lucide-react';

export const operateSkills = [
  'Machine Operation',
  'Troubleshooting & Diagnostics',
  'Process Optimization',
  'Quality Control',
  'PLC Programming',
  'Light Electrical',
  'Light Hydraulics',
  'CAD/Technical Drawing',
];

export const buildSkills = [
  'Python',
  'JavaScript/React',
  'Ruby on Rails',
  'SQL/Databases',
  'Git/Version Control',
  'Linux/CLI',
  'AI/ML Systems',
  'Custom LLMs',
];

export interface Capability {
  title: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
}

export const capabilities: Capability[] = [
  {
    title: 'AI Systems for Manufacturing',
    description:
      'Production-oriented AI features designed for operators, engineers, and quality teams, not just demo environments.',
    highlights: ['Predictive maintenance', 'Natural language interfaces', 'Decision support architecture'],
    icon: Cpu,
  },
  {
    title: 'Mechatronics + Process Engineering',
    description:
      'Cross-functional execution spanning controls, process optimization, and plant-floor integration with safety and uptime in focus.',
    highlights: ['Root-cause thinking', 'Constraint-aware optimization', 'Operational reliability'],
    icon: BriefcaseBusiness,
  },
  {
    title: 'Modern Product Delivery',
    description:
      'Fast iteration with strong engineering standards: typed code, composable UI, robust state handling, and maintainable structure.',
    highlights: ['Next.js + TypeScript', 'Component systems', 'Progressive enhancement'],
    icon: Code2,
  },
  {
    title: 'Security + Quality Mindset',
    description:
      'Clear focus on practical quality: resilient UX, accessible interfaces, and operationally safe implementation choices.',
    highlights: ['Accessible interactions', 'Performance guardrails', 'Structured validation'],
    icon: ShieldCheck,
  },
];
