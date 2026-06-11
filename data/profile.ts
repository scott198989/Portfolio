export const profile = {
  name: 'Scott Tuschl',
  firstName: 'Scott',
  lastName: 'Tuschl',
  tagline: 'Mechatronics engineer building AI systems for the plant floor.',
  summary:
    'Nine years on manufacturing floors. Six years in the U.S. Army. Now engineering the software layer factories actually need — predictive maintenance, expert systems, and natural-language interfaces that operators use, not just demos.',
  email: 'scott.tuschl@gmail.com',
  site: 'https://scott-tuschl.com',
  github: 'https://github.com/scott198989',
  githubUser: 'scott198989',
  linkedin: 'https://linkedin.com/in/scott-tuschl',
  roles: [
    'MECHATRONICS ENGINEERING',
    'INDUSTRIAL AI SYSTEMS',
    'PROCESS AUTOMATION',
    'U.S. ARMY VETERAN',
  ],
  stats: [
    { value: '9+', label: 'Years on the plant floor' },
    { value: '6', label: 'Years U.S. Army service' },
    { value: '10+', label: 'Systems designed & shipped' },
    { value: '3.71', label: 'Engineering GPA · APSU' },
  ],
  bootSequence: [
    { label: 'POWER BUS', status: 'OK', tone: 'ok' },
    { label: 'SENSOR ARRAY', status: '14/14', tone: 'ok' },
    { label: 'CONTROL LOOP', status: 'STABLE', tone: 'ok' },
    { label: 'AI SUBSYSTEM', status: 'ACTIVE', tone: 'signal' },
    { label: 'SAFETY INTERLOCK', status: 'ARMED', tone: 'amber' },
    { label: 'COMMS UPLINK', status: 'ONLINE', tone: 'ok' },
  ] as const,
} as const;

export type BootTone = (typeof profile.bootSequence)[number]['tone'];
