'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Calendar, ChevronRight } from 'lucide-react';
import type { ExperienceItem } from '@/data/experience';

interface TimelineItemProps {
  item: ExperienceItem;
  color: 'accent' | 'steel';
}

export default function TimelineItem({ item, color }: TimelineItemProps) {
  const dotColor = color === 'accent' ? 'bg-accent' : 'bg-steel-accent';
  const dotGlow =
    color === 'accent'
      ? 'shadow-[0_0_8px_rgba(249,115,22,0.5)]'
      : 'shadow-[0_0_8px_rgba(56,189,248,0.5)]';
  const orgColor = color === 'accent' ? 'text-accent' : 'text-steel-accent';

  return (
    <motion.div variants={fadeUp} className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-stone-800" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-stone-950 ${dotColor} ${dotGlow}`}
      />

      {/* Card */}
      <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-4 hover:border-stone-700 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="text-base font-bold text-stone-100">{item.title}</h4>
            <p className={`text-sm font-medium ${orgColor}`}>{item.organization}</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Calendar className="w-3 h-3" />
            {item.period}
          </span>
        </div>

        <ul className="space-y-1 mb-3">
          {item.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
              <ChevronRight className="w-3.5 h-3.5 text-stone-600 mt-0.5 flex-shrink-0" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {item.skills && (
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs font-medium bg-stone-800 border border-stone-700 rounded-full text-stone-400"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
