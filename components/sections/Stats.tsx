'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calendar, Code, Briefcase, Award } from 'lucide-react';

interface StatItem {
  icon: typeof Calendar;
  value: number;
  suffix: string;
  label: string;
  duration: number;
}

const stats: StatItem[] = [
  {
    icon: Calendar,
    value: 7,
    suffix: '+',
    label: 'Years Manufacturing',
    duration: 2,
  },
  {
    icon: Briefcase,
    value: 6,
    suffix: '',
    label: 'Years Military Service',
    duration: 1.5,
  },
  {
    icon: Code,
    value: 15000,
    suffix: '+',
    label: 'Lines of Code',
    duration: 2.5,
  },
  {
    icon: Award,
    value: 3.71,
    suffix: '',
    label: 'Current GPA',
    duration: 2,
  },
];

function AnimatedCounter({ value, suffix, duration, isInView }: {
  value: number;
  suffix: string;
  duration: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * value;

      setCount(isDecimal ? parseFloat(currentValue.toFixed(2)) : Math.floor(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration, isDecimal]);

  const displayValue = isDecimal ? count.toFixed(2) : count.toLocaleString();

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

function StatCard({ stat, index, isInView }: { stat: StatItem; index: number; isInView: boolean }) {
  const Icon = stat.icon;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-400/30 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300" />

        <div className="relative z-10">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-cyan-400/10 rounded-xl group-hover:bg-cyan-400/20 transition-colors">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              duration={stat.duration}
              isInView={isInView}
            />
          </div>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-16 overflow-hidden" ref={ref}>
      {/* Background gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
