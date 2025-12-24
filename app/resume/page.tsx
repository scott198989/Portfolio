'use client';

import { motion } from 'framer-motion';
import { FileText, Linkedin, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-cyan-400/10 rounded-2xl">
          <FileText className="w-10 h-10 text-cyan-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Resume</h1>

        <p className="text-gray-400 mb-8">
          My full resume is available upon request. Connect with me on LinkedIn or use the contact form to request a copy.
        </p>

        <div className="space-y-3">
          <a
            href="https://linkedin.com/in/scott-tuschl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <Linkedin size={20} />
            View LinkedIn Profile
          </a>

          <Link
            href="/#contact"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
          >
            <Mail size={20} />
            Request via Contact Form
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
