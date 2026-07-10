import { NavLink } from 'react-router-dom';
import { Mail, Atom } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-void-4 rounded-t-[4rem] mt-24 border-t border-plasma/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-plasma flex items-center justify-center plasma-glow">
                <Atom size={18} className="text-ghost" />
              </div>
              <div>
                <p className="font-heading font-bold text-ghost text-lg leading-tight">AL ARAF AMAN</p>
                <p className="font-fira text-xs text-plasma-light">CSE — ML & Quantum</p>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed font-heading">
              Aspiring researcher at the intersection of machine learning and quantum computing.
              Building tomorrow's algorithms.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-fira text-xs text-plasma uppercase tracking-widest">Navigate</p>
            <nav className="flex flex-col gap-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/studies', label: 'Undergraduate Studies' },
                { path: '/research', label: 'Research' },
                { path: '/extracurricular', label: 'Extracurricular Activities' },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className="text-muted hover:text-plasma-light transition-colors text-sm font-heading link-lift"
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact & Status */}
          <div className="space-y-4">
            <p className="font-fira text-xs text-plasma uppercase tracking-widest">Connect</p>
            <div className="flex gap-3">
              <a
                href="mailto:alarafaman@email.com"
                className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-muted hover:text-plasma hover:border-plasma/40 transition-all btn-magnetic"
                aria-label="Email"
              >
                <span className="btn-slide" />
                <Mail size={16} className="relative z-10" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-muted hover:text-plasma hover:border-plasma/40 transition-all btn-magnetic"
                aria-label="LinkedIn"
              >
                <span className="btn-slide" />
                <Linkedin size={16} className="relative z-10" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-muted hover:text-plasma hover:border-plasma/40 transition-all btn-magnetic"
                aria-label="GitHub"
              >
                <span className="btn-slide" />
                <Github size={16} className="relative z-10" />
              </a>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-2 mt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-fira text-xs text-green-400">SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="plasma-divider mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-fira text-xs text-muted">
            © 2024 AL ARAF AMAN. All rights reserved.
          </p>
          <p className="font-fira text-xs text-muted">
            Built for Academic Excellence & Scholarship Consideration
          </p>
        </div>
      </div>
    </footer>
  );
}
