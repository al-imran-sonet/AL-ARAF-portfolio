import { useEffect, useRef, useState } from 'react';
import {
  FlaskConical, ExternalLink, FileText,
  Calendar, Users, ChevronRight, Atom, Brain, Zap,
  ArrowUpRight, BookOpen
} from 'lucide-react';
import { Github } from '../components/Icons';

/* --- Shared Page Header --- */
function PageHeader({ title, subtitle, badge }) {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.hero-animate');
    els?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 120);
    });
  }, []);

  return (
    <div
      ref={ref}
      className="relative pt-36 pb-20 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 70% 0%, rgba(123,97,255,0.15) 0%, transparent 70%), #0A0A14',
      }}
    >
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full border border-plasma/30 bg-plasma/10 mb-6">
          <span className="font-fira text-xs text-plasma-light tracking-widest uppercase">{badge}</span>
        </div>
        <h1 className="hero-animate font-heading font-bold text-ghost text-4xl md:text-6xl mb-4 leading-tight">
          {title}
        </h1>
        <p className="hero-animate font-heading text-muted text-lg max-w-xl">{subtitle}</p>
      </div>
      <div className="plasma-divider mt-16" />
    </div>
  );
}

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add('section-visible');
              e.target.classList.remove('section-hidden');
            }, delay);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className="section-hidden">{children}</div>;
}

/* --- Scanning Waveform SVG --- */
function WaveformAnimation() {
  const pathRef = useRef(null);
  useEffect(() => {
    let offset = 0;
    let animId;
    const animate = () => {
      offset -= 1;
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = offset;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const points = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 400;
    const y = 30 + Math.sin(i * 0.5) * 15 + Math.sin(i * 0.15) * 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
      <polyline
        ref={pathRef}
        points={points}
        fill="none"
        stroke="#7B61FF"
        strokeWidth="1.5"
        strokeDasharray="600"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --- Research Paper Card --- */
function PaperCard({ title, journal, year, abstract, tags, status, doi }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="portfolio-card glass-surface rounded-3xl p-6 md:p-8 border border-plasma/15">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(123,97,255,0.15)', border: '1px solid rgba(123,97,255,0.3)' }}>
          <FileText size={20} className="text-plasma-light" />
        </div>

        <div className="flex-1">
          {/* Status + Year */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-fira"
              style={{
                background: status === 'Published' ? 'rgba(34,197,94,0.15)' : status === 'Under Review' ? 'rgba(251,191,36,0.15)' : 'rgba(123,97,255,0.15)',
                color: status === 'Published' ? '#4ade80' : status === 'Under Review' ? '#fbbf24' : '#A594FF',
                border: `1px solid ${status === 'Published' ? 'rgba(34,197,94,0.3)' : status === 'Under Review' ? 'rgba(251,191,36,0.3)' : 'rgba(123,97,255,0.3)'}`,
              }}
            >
              {status}
            </span>
            <span className="font-fira text-xs text-muted">{year}</span>
            <span className="font-fira text-xs text-muted">·</span>
            <span className="font-fira text-xs text-plasma-light">{journal}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-ghost text-lg md:text-xl mb-3 leading-tight">
            {title}
          </h3>

          {/* Abstract toggle */}
          <button
            className="flex items-center gap-1 text-xs font-fira text-muted hover:text-plasma-light transition-colors mb-3 link-lift"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
            {expanded ? 'Hide abstract' : 'Show abstract'}
          </button>

          {expanded && (
            <p className="font-heading text-muted text-sm leading-relaxed mb-4">
              {abstract}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-fira text-ghost bg-plasma/10 border border-plasma/20">
                {tag}
              </span>
            ))}
          </div>

          {/* DOI link */}
          {doi && (
            <a
              href={doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-fira text-plasma-light hover:text-ghost transition-colors link-lift"
            >
              <ExternalLink size={12} />
              View Publication
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Project Card --- */
function ProjectCard({ title, description, tags, image, github, icon: Icon, color }) {
  return (
    <div className="portfolio-card glass-surface rounded-3xl overflow-hidden border border-plasma/15">
      {/* Header band */}
      <div
        className="h-24 flex items-center justify-center relative overflow-hidden scanning-line"
        style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-30" />
        <Icon size={32} style={{ color }} className="relative z-10 animate-float" />
      </div>

      <div className="p-6">
        <h3 className="font-heading font-bold text-ghost text-lg mb-2">{title}</h3>
        <p className="font-heading text-muted text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-full text-xs font-fira text-ghost bg-plasma/10 border border-plasma/20">
              {tag}
            </span>
          ))}
        </div>

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-fira text-muted hover:text-plasma-light transition-colors link-lift"
          >
            <Github size={12} />
            View Code
          </a>
        )}
      </div>
    </div>
  );
}

/* --- Single interest bar (extracted to respect hooks rules) --- */
function InterestBar({ label, percent, icon: Icon, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-plasma-light" />
          <span className="font-heading text-sm text-ghost">{label}</span>
        </div>
        <span className="font-fira text-xs text-plasma-light">{percent}%</span>
      </div>
      <div className="h-1.5 bg-void-3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: animated ? `${percent}%` : '0%',
            background: 'linear-gradient(90deg, #7B61FF, #C4B5FD)',
            transition: `width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

/* --- Research Interests display --- */
function ResearchInterests() {
  const interests = [
    { label: 'Quantum Machine Learning', percent: 90, icon: Atom },
    { label: 'Variational Quantum Algorithms', percent: 82, icon: Zap },
    { label: 'Neural Architecture Search', percent: 75, icon: Brain },
    { label: 'Quantum Error Correction', percent: 68, icon: FlaskConical },
  ];

  return (
    <div className="glass-surface rounded-3xl p-6 portfolio-card">
      <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-6">Research Focus Areas</p>
      <div className="space-y-5">
        {interests.map(({ label, percent, icon }, i) => (
          <InterestBar key={label} label={label} percent={percent} icon={icon} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
}

export default function Research() {
  const papers = [
    {
      title: 'Hybrid Quantum-Classical Convolutional Neural Networks for Image Classification on NISQ Devices',
      journal: 'arXiv / IEEE Quantum',
      year: '2024',
      status: 'Under Review',
      abstract:
        'This paper presents a novel hybrid quantum-classical architecture for image classification that significantly reduces the number of parameters while maintaining competitive accuracy on standard benchmarks. Our method uses parameterized quantum circuits as convolutional feature extractors combined with classical fully-connected layers. On CIFAR-10, we achieve 87.3% accuracy with 65% fewer parameters than comparable classical CNNs.',
      tags: ['Quantum ML', 'PQC', 'PyTorch', 'Qiskit', 'Computer Vision'],
      doi: '#',
    },
    {
      title: 'Noise Mitigation Strategies for Variational Quantum Eigensolvers in Molecular Simulation',
      journal: 'Physical Review Applied',
      year: '2024',
      status: 'Published',
      abstract:
        'We investigate multiple error mitigation protocols for variational quantum eigensolvers (VQE) applied to molecular ground-state energy calculations. Zero-noise extrapolation combined with probabilistic error cancellation reduces mean absolute error from 12.3 mHa to 1.8 mHa on current IBMQ hardware. We benchmark across H₂, LiH, and BeH₂ molecules using both statevector and hardware backends.',
      tags: ['VQE', 'Quantum Chemistry', 'Error Mitigation', 'IBM Quantum', 'Qiskit'],
      doi: '#',
    },
  ];

  const projects = [
    {
      title: 'QuantumBench',
      description:
        'An open-source benchmarking suite for quantum ML models, supporting Qiskit, Cirq, and PennyLane backends with real-device and noisy-simulation modes.',
      tags: ['Python', 'Qiskit', 'PennyLane', 'Benchmarking'],
      github: '#',
      icon: Atom,
      color: '#7B61FF',
    },
    {
      title: 'NeuralODE-QC',
      description:
        'Implementation of Neural Ordinary Differential Equations for quantum state tomography, reducing measurement overhead by 35% compared to standard approaches.',
      tags: ['JAX', 'Quantum Tomography', 'Neural ODE', 'Cirq'],
      github: '#',
      icon: Brain,
      color: '#A594FF',
    },
    {
      title: 'QML-Datasets',
      description:
        'A curated dataset repository specifically optimized for quantum machine learning experiments — including pre-processed molecular data and spin-chain configurations.',
      tags: ['Python', 'HDF5', 'Quantum Data', 'Open Source'],
      github: '#',
      icon: FlaskConical,
      color: '#C4B5FD',
    },
    {
      title: 'Entanglement Detector CNN',
      description:
        'A convolutional neural network trained to detect quantum entanglement patterns from density matrices, achieving 94.7% accuracy on Bell states and GHZ states.',
      tags: ['PyTorch', 'Quantum Information', 'CNN', 'NumPy'],
      github: '#',
      icon: Zap,
      color: '#7B61FF',
    },
  ];

  const mentors = [
    {
      name: 'Prof. Dr. Rafiqul Islam',
      role: 'Thesis Supervisor',
      affiliation: 'Dept. of CSE, BUET',
      area: 'Quantum Algorithms & Complexity',
    },
    {
      name: 'Dr. Md. Shahriar Ahmed',
      role: 'Research Co-supervisor',
      affiliation: 'Dept. of Physics, BUET',
      area: 'Quantum Optics & Entanglement',
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Scientific Work"
        title="Research"
        subtitle="Exploring the boundary between classical computation and quantum mechanics — through rigorous experimentation and publication."
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* Live waveform + summary stats */}
        <section className="py-16">
          <RevealSection>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { label: 'Publications', value: '2', sub: '1 Published · 1 Under Review', color: '#7B61FF' },
                { label: 'Research Projects', value: '4+', sub: 'Open Source Contributions', color: '#A594FF' },
                { label: 'Research Hours', value: '2000+', sub: 'Dedicated Lab Hours', color: '#C4B5FD' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="glass-surface rounded-3xl p-6 portfolio-card text-center">
                  <p className="font-fira text-xs text-muted uppercase tracking-widest mb-2">{label}</p>
                  <p className="font-drama italic plasma-glow-text" style={{ fontSize: '3rem', color, lineHeight: 1 }}>{value}</p>
                  <p className="font-heading text-muted text-xs mt-2">{sub}</p>
                </div>
              ))}
            </div>

            {/* Waveform signal */}
            <div className="glass-surface rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plasma opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-plasma-light" />
                </span>
                <span className="font-fira text-xs text-plasma-light uppercase tracking-widest">Research Activity Signal</span>
              </div>
              <WaveformAnimation />
            </div>
          </RevealSection>
        </section>

        {/* Research focus + interests */}
        <section className="py-8">
          <RevealSection>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <ResearchInterests />
              <div className="glass-surface rounded-3xl p-6 portfolio-card">
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Research Statement</p>
                <p className="font-drama italic text-ghost text-2xl leading-snug mb-4">
                  "Quantum computers won't replace classical ones — they'll{' '}
                  <span className="text-plasma-light">complete them.</span>"
                </p>
                <p className="font-heading text-muted text-sm leading-relaxed">
                  My research focuses on designing quantum algorithms that are practical for
                  near-term noisy intermediate-scale quantum (NISQ) devices. I believe the most
                  impactful breakthroughs will come from <em className="text-ghost">hybrid architectures</em> — where
                  quantum circuits handle exponentially-hard subproblems and classical networks
                  handle the rest.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-plasma-light" />
                    <span className="font-heading text-sm text-muted">Quantum-Classical Hybrid Models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-plasma-light" />
                    <span className="font-heading text-sm text-muted">NISQ-Era Algorithm Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-plasma-light" />
                    <span className="font-heading text-sm text-muted">Quantum Error Mitigation</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Publications */}
        <section className="py-16">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Publications</p>
            <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-8">Academic Papers</h2>
            <div className="space-y-6">
              {papers.map((p) => (
                <PaperCard key={p.title} {...p} />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Projects */}
        <section className="py-8">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Open Source</p>
            <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-8">Research Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Mentors */}
        <section className="py-16 pb-24">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Supervision</p>
            <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-8">Research Mentors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mentors.map(({ name, role, affiliation, area }) => (
                <div key={name} className="glass-surface rounded-3xl p-6 portfolio-card flex gap-4">
                  <div
                    className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-heading font-bold text-plasma-light text-lg"
                    style={{ background: 'rgba(123,97,255,0.15)', border: '1px solid rgba(123,97,255,0.3)' }}
                  >
                    {name.split(' ').pop()[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-ghost">{name}</p>
                    <p className="font-fira text-xs text-plasma-light mb-1">{role}</p>
                    <p className="font-heading text-muted text-xs mb-1">{affiliation}</p>
                    <p className="font-heading text-muted text-xs">{area}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}
