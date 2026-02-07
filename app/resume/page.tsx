'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export default function ResumePage() {
  return (
    <main className="section-block">
      <div className="layout-container" style={{ maxWidth: '920px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="surface-card"
          style={{ padding: 'clamp(18px, 3vw, 30px)' }}
        >
          <p className="section-eyebrow">Resume Access</p>
          <h1 className="section-title">Scott Tuschl Resume</h1>
          <p className="section-description" style={{ marginTop: '12px' }}>
            The latest resume is shared directly so I can provide the most current version for your role or project context.
            Use any option below.
          </p>

          <div
            style={{
              marginTop: '16px',
              border: '1px solid rgba(137, 179, 202, 0.24)',
              borderRadius: '14px',
              background: 'rgba(11, 26, 36, 0.72)',
              padding: '14px',
              color: '#cddde7',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#bafef2' }}>
              <ShieldCheck className="h-4 w-4" />
              <strong>Fast response preferred channels</strong>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, color: '#9fb2bf' }}>
              Email requests are best for resume delivery and role-specific notes. LinkedIn is best for networking and introductions.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '18px' }}>
            <a href="mailto:scott.tuschl@gmail.com?subject=Resume%20Request" className="button-primary">
              <Mail className="h-4 w-4" />
              Request via Email
            </a>

            <a
              href="https://linkedin.com/in/scott-tuschl"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              <Linkedin className="h-4 w-4" />
              Open LinkedIn
            </a>

            <Link href="/#contact" className="button-secondary">
              <Download className="h-4 w-4" />
              Go to Contact Section
            </Link>
          </div>

          <div style={{ marginTop: '14px' }}>
            <Link href="/" className="button-secondary compact">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
