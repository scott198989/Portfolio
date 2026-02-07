export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  skills?: string[];
}

export const workExperience: ExperienceItem[] = [
  {
    title: 'Lab Technician',
    organization: 'Blown Film Extrusion Plant',
    period: 'Current',
    description: [
      'Conduct quality control testing and analysis on film products',
      'Operate and maintain laboratory equipment for material testing',
      'Collaborate with process engineers to optimize production parameters',
    ],
    skills: ['Quality Control', 'Lab Equipment', 'Process Analysis'],
  },
  {
    title: 'Machine Operator',
    organization: 'Sonoco Protective Packaging',
    period: 'Feb 2020 - Apr 2023',
    description: [
      'Top performer achieving 95%+ uptime and 100% efficiency',
      'Trained and mentored junior operators on production lines',
      'Reduced scrap by 10% through consistent adjustments',
    ],
    skills: ['Machine Operation', 'Training', 'Process Improvement'],
  },
  {
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
    title: 'Squad Leader',
    organization: 'United States Army',
    period: 'Jan 2008 - Jan 2014',
    description: [
      'Led and mentored soldiers in hostile combat zones',
      'Installed and maintained LAN/WAN networks valued over $1M',
    ],
    skills: ['Leadership', 'Signal Corps', 'Team Management'],
  },
];

export const education: ExperienceItem[] = [
  {
    title: 'B.S. Mechatronics Engineering Technology',
    organization: 'Austin Peay State University',
    period: '2024 - Present',
    description: [
      'Current GPA: 3.71',
      'Focus on automation, robotics, and control systems',
      'Coursework in electronics, mechanical systems, and programming',
    ],
    skills: ['PLCs', 'Robotics', 'Control Systems', 'Electronics'],
  },
  {
    title: 'Full Stack Web Development',
    organization: 'LEARN Academy',
    period: 'Apr 2023 - Aug 2023',
    description: [
      'Intensive coding bootcamp',
      'Built responsive web applications with React and Ruby on Rails',
    ],
    skills: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Python', 'C++', 'SQL', 'Ruby on Rails'],
  },
  {
    title: 'LAN/WAN Network Installation',
    organization: 'US Army Signal Corps',
    period: 'Military Training',
    description: [
      'Network infrastructure installation and maintenance',
      'Telecommunications systems operation',
    ],
    skills: ['Networking', 'Infrastructure', 'Telecommunications'],
  },
  {
    title: 'NCO Leadership Certification',
    organization: 'US Army',
    period: 'Military Training',
    description: [
      'Advanced leadership and team management training',
      'Strategic planning and execution',
    ],
    skills: ['Leadership', 'Team Management', 'Strategic Planning'],
  },
];
