'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChevronDown, Github, Linkedin, Download } from 'lucide-react';

// Dynamically import the 3D scene to prevent SSR issues
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
  ),
});

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-5 py-2.5 mb-6 text-sm font-medium text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,212,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]">
            Mechatronics Engineering Technology
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white">Scott</span>{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Tuschl
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Manufacturing meets machine learning. I build intelligent systems for the shop floor.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,212,255,0.4)] hover:scale-105 shadow-[0_4px_20px_-4px_rgba(0,212,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="/resume"
            className="flex items-center gap-2 px-8 py-4 border border-white/10 rounded-xl font-semibold text-gray-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-300 bg-white/[0.03] backdrop-blur-sm hover:bg-cyan-400/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
          >
            <Download size={20} />
            View Resume
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="https://linkedin.com/in/scott-tuschl"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://github.com/scott198989"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a href="#about" className="flex flex-col items-center text-gray-500 hover:text-cyan-400 transition-colors">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
