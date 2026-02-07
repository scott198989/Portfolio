export interface StackGroup {
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    title: 'Core Platform',
    items: ['Next.js 15', 'React 18', 'TypeScript 5.9', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: '3D + Experience',
    items: ['Three.js', '@react-three/fiber', '@react-three/drei', 'WebGL Motion Systems'],
  },
  {
    title: 'AI + Data',
    items: ['Agent Architectures', 'Statistical Detection', 'NL-to-SQL Interfaces', 'Rules-Based Expert Logic'],
  },
  {
    title: 'Engineering Languages',
    items: ['TypeScript', 'Python', 'C++', 'SQL', 'Power Platform Integrations'],
  },
];

export const metrics = [
  { label: 'Production-Focused Projects', value: '10+' },
  { label: 'Automation + AI Implementations', value: '6' },
  { label: 'Disciplines Bridged', value: 'Mechatronics | Software | Ops' },
];
