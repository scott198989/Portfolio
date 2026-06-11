export interface Capability {
  code: string;
  title: string;
  description: string;
  highlights: string[];
  icon: 'cpu' | 'factory' | 'code' | 'shield';
}

export const capabilities: Capability[] = [
  {
    code: 'CAP-01',
    title: 'AI Systems for Manufacturing',
    description:
      'Production-oriented AI built for operators, engineers, and quality teams — predictive maintenance, expert systems, and natural-language data access that survive contact with a real plant.',
    highlights: [
      'Predictive maintenance & anomaly detection',
      'NL-to-SQL and decision-support interfaces',
      'Explainable, rules-based logic where safety matters',
    ],
    icon: 'cpu',
  },
  {
    code: 'CAP-02',
    title: 'Mechatronics & Process Engineering',
    description:
      'Cross-functional execution spanning controls, process optimization, and plant-floor integration — grounded in nearly a decade of running the machines myself.',
    highlights: [
      'PLCs, controls & instrumentation',
      'Blown film extrusion process expertise',
      'Root-cause analysis & constraint-aware optimization',
    ],
    icon: 'factory',
  },
  {
    code: 'CAP-03',
    title: 'Full-Stack Product Delivery',
    description:
      'Typed, componentized, maintainable software — fast iteration without sacrificing engineering standards. From C++ signal processing to React dashboards.',
    highlights: [
      'Next.js + TypeScript + React',
      'Python, C++, SQL, Cloudflare Workers',
      'CI/CD, Git, Linux tooling',
    ],
    icon: 'code',
  },
  {
    code: 'CAP-04',
    title: 'Leadership Under Pressure',
    description:
      'Squad leader in hostile combat zones. Shift trainer on production lines. Calm execution, clear communication, and ownership when the stakes are real.',
    highlights: [
      'U.S. Army NCO leadership certification',
      'Team training & mentorship',
      '$1M+ network infrastructure deployments',
    ],
    icon: 'shield',
  },
];

export interface StackGroup {
  code: string;
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    code: 'SW',
    title: 'Software & Web',
    items: ['TypeScript', 'React / Next.js', 'Python', 'C++', 'SQL', 'Ruby on Rails', 'Tailwind CSS'],
  },
  {
    code: 'AI',
    title: 'AI & Data',
    items: ['Multi-agent architectures', 'NL-to-SQL interfaces', 'Statistical anomaly detection', 'Rules-based expert systems', 'Custom LLM training (PyTorch)'],
  },
  {
    code: 'OT',
    title: 'Plant Floor & Controls',
    items: ['PLC programming', 'Machine operation', 'Process optimization', 'Quality control & lab testing', 'Light electrical & hydraulics', 'CAD / technical drawing'],
  },
  {
    code: 'OPS',
    title: 'Infrastructure & Ops',
    items: ['Git / GitHub Actions', 'Linux / CLI', 'Cloudflare Workers + D1', 'Vercel', 'Power Automate / SharePoint', 'LAN/WAN networking'],
  },
];

export const marqueeItems = [
  'TypeScript',
  'React',
  'Next.js',
  'Python',
  'C++',
  'SQL',
  'PyTorch',
  'PLC Programming',
  'Predictive Maintenance',
  'NL-to-SQL',
  'Expert Systems',
  'Multi-Agent AI',
  'Cloudflare Workers',
  'Blown Film Extrusion',
  'Process Optimization',
  'Quality Systems',
];
