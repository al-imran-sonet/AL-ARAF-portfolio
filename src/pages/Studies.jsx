import { useEffect, useRef, useState } from 'react';
import {
  BookOpen, Star, Clock, Award, ChevronRight, GraduationCap,
  Code2, Brain, Cpu, Database, Layers, GitBranch
} from 'lucide-react';

/* --- Page Header --- */
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
          'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(123,97,255,0.15) 0%, transparent 70%), #0A0A14',
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

/* --- Reveal wrapper --- */
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
  return (
    <div ref={ref} className="section-hidden">
      {children}
    </div>
  );
}

/* --- Animated Progress Bar --- */
function ProgressBar({ label, value, color = '#7B61FF' }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-heading text-sm text-ghost">{label}</span>
        <span className="font-fira text-xs text-plasma-light">{value}%</span>
      </div>
      <div className="h-1.5 bg-void-3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{
            width: animated ? `${value}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>
    </div>
  );
}

/* --- Typewriter Card --- */
function TypewriterCard() {
  const messages = [
    '> Studying quantum coherence...',
    '> Running neural network on 8 qubits...',
    '> Loss: 0.0031 | Epoch: 847/1000',
    '> Convergence achieved ✓',
    '> Simulating entanglement...',
    '> CGPA: 3.85 | Rank: Top 5%',
    '> Thesis: Quantum ML Algorithms...',
  ];
  const [displayText, setDisplayText] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const msg = messages[msgIdx];
    const delay = deleting ? 30 : 60;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < msg.length) {
          setDisplayText(msg.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(msg.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setMsgIdx((m) => (m + 1) % messages.length);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, msgIdx]);

  return (
    <div className="glass-surface rounded-3xl p-6 portfolio-card h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plasma-light opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-plasma-light" />
        </span>
        <span className="font-fira text-xs text-plasma-light uppercase tracking-widest">Live Academic Feed</span>
      </div>
      <div className="font-fira text-sm text-ghost min-h-[2em]">
        {displayText}
        <span className="cursor-blink text-plasma-light">|</span>
      </div>
    </div>
  );
}

/* --- Course Card --- */
function CourseCard({ code, name, grade, credits, semester, highlight, outline }) {
  const [showOutline, setShowOutline] = useState(false);

  return (
    <div
      onClick={() => setShowOutline(true)}
      className={`group relative portfolio-card rounded-3xl p-5 border transition-all duration-300 cursor-pointer select-none overflow-hidden flex flex-col justify-between min-h-[160px] ${
        highlight 
          ? 'bg-plasma/10 border-plasma/30 hover:border-plasma-light/50 hover:bg-plasma/15' 
          : 'glass-surface border-plasma/10 hover:border-plasma-light/35 hover:bg-void-3'
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <span className="font-fira text-xs text-plasma uppercase tracking-widest">{code}</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-fira font-bold"
              style={{
                background: grade.startsWith('A') ? 'rgba(123,97,255,0.2)' : 'rgba(255,255,255,0.06)',
                color: grade.startsWith('A') ? '#A594FF' : '#9898B8'
              }}
            >
              {grade}
            </span>
          </div>
          <p className="font-heading font-semibold text-ghost text-sm mb-2 leading-snug">{name}</p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted font-fira pt-2 mt-auto">
          <div className="flex gap-2">
            <span>{credits} Cr</span>
            <span>·</span>
            <span>{semester}</span>
          </div>
          <span className="text-[10px] text-plasma-light/60 uppercase tracking-widest group-hover:text-plasma-light transition-colors duration-300">Syllabus ↗</span>
        </div>
      </div>

      {/* Course Outline Overlay (Hovers / floats at exact same point) */}
      {showOutline && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowOutline(false);
          }}
          className="absolute inset-0 bg-void-4/95 backdrop-blur-xl p-5 flex flex-col justify-between z-20 border border-plasma-light/30 rounded-3xl animate-fadeIn"
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-fira text-xs text-plasma-light uppercase tracking-widest">{code} Syllabus</span>
              <button 
                className="w-5 h-5 rounded-full bg-void-3 hover:bg-plasma/20 flex items-center justify-center text-muted hover:text-ghost transition-colors"
                aria-label="Close outline"
              >
                ✕
              </button>
            </div>
            <p className="font-heading text-xs text-ghost leading-relaxed">
              {outline}
            </p>
          </div>
          <p className="font-fira text-[9px] text-muted-dark uppercase tracking-wider text-right">
            Click to close
          </p>
        </div>
      )}
    </div>
  );
}

export default function Studies() {
  const courses = [
    { 
      code: 'CSE-301', 
      name: 'Algorithm Design & Analysis', 
      grade: 'A+', 
      credits: 3, 
      semester: 'Year 3 Sem 1', 
      highlight: true, 
      outline: 'Divide & conquer paradigms, greedy strategies, DP optimizations, graph flows, NP-completeness proofs, and algorithmic complexity bounds.' 
    },
    { 
      code: 'CSE-420', 
      name: 'Machine Learning Fundamentals', 
      grade: 'A+', 
      credits: 3, 
      semester: 'Year 3 Sem 2', 
      highlight: true, 
      outline: 'Linear models, support vector machines, kernels, decision trees, bias-variance trade-off, optimization solvers, and unsupervised clustering.' 
    },
    { 
      code: 'CSE-445', 
      name: 'Deep Learning & Neural Networks', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 4 Sem 1', 
      highlight: true, 
      outline: 'Backpropagation mechanisms, CNNs for computer vision, Recurrent networks, self-attention, Transformers, Autoencoders, and GAN synthesis.' 
    },
    { 
      code: 'PHY-310', 
      name: 'Quantum Mechanics for Engineers', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 3 Sem 2', 
      highlight: true, 
      outline: 'Schrödinger wave mechanics, state vector space representation, operators, quantum measurement axioms, entanglement, and quantum tunneling.' 
    },
    { 
      code: 'CSE-311', 
      name: 'Data Structures & Complexity', 
      grade: 'A+', 
      credits: 4, 
      semester: 'Year 2 Sem 1', 
      highlight: false, 
      outline: 'Advanced trees (AVL, Red-Black), heap systems, hashing collisions, asymptotic notation bounds, sorting limits, and graph representations.' 
    },
    { 
      code: 'MATH-305', 
      name: 'Linear Algebra & Optimization', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 2 Sem 2', 
      highlight: false, 
      outline: 'Vector subspaces, spectral decomp, SVD, dual spaces, gradient optimization steps, KKT conditions, and convex programming.' 
    },
    { 
      code: 'CSE-432', 
      name: 'Natural Language Processing', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 4 Sem 1', 
      highlight: false, 
      outline: 'Language modeling, syntactic parsing, TF-IDF, Word2Vec, Seq2Seq transformers, attention mechanics, and downstream task adaptation.' 
    },
    { 
      code: 'CSE-350', 
      name: 'Computer Architecture', 
      grade: 'A-', 
      credits: 3, 
      semester: 'Year 3 Sem 1', 
      highlight: false, 
      outline: 'Instruction pipeline hazards, cache mapping, virtual memory tables, out-of-order execution, superscalar designs, and multithreading.' 
    },
    { 
      code: 'CSE-401', 
      name: 'Operating Systems', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 3 Sem 1', 
      highlight: false, 
      outline: 'Process lifecycle, scheduler models, deadlocks, semaphores, paging, TLB caches, virtual filesystem nodes, and I/O buffer management.' 
    },
    { 
      code: 'CSE-460', 
      name: 'Theory of Computation', 
      grade: 'A', 
      credits: 3, 
      semester: 'Year 3 Sem 2', 
      highlight: false, 
      outline: 'DFAs/NFAs, pumping lemmas, CFGs, pushdown automata, Turing computation models, decidability proofs, and halting problem reductions.' 
    },
    { 
      code: 'MATH-401', 
      name: 'Numerical Methods', 
      grade: 'A-', 
      credits: 3, 
      semester: 'Year 3 Sem 2', 
      highlight: false, 
      outline: 'Roots of equations, matrix solvers, spline polynomial interpolation, numerical integration formulas, and Runge-Kutta ODE solvers.' 
    },
    { 
      code: 'CSE-490', 
      name: 'Quantum Computing Intro', 
      grade: 'A+', 
      credits: 2, 
      semester: 'Year 4 Sem 2', 
      highlight: true, 
      outline: 'Bloch sphere geometry, quantum circuits, Shor\'s factorization, Grover\'s database query search, quantum error correction protocols.' 
    },
  ];

  const coreSkills = [
    { label: 'Machine Learning', value: 92 },
    { label: 'Quantum Computing', value: 78 },
    { label: 'Python / PyTorch', value: 95 },
    { label: 'Mathematical Foundations', value: 88 },
    { label: 'Algorithm Design', value: 90 },
    { label: 'Data Analysis', value: 85 },
  ];

  const yearSummary = [
    { year: 'Year 1', gpa: '3.72', highlight: 'Foundation — Calculus, Programming, Physics' },
    { year: 'Year 2', gpa: '3.80', highlight: 'Core CSE — Data Structures, Algorithms, Networks' },
    { year: 'Year 3', gpa: '3.90', highlight: 'Advanced — ML, Quantum, OS, Theory' },
    { year: 'Year 4', gpa: '3.95', highlight: 'Research Focus — DL, NLP, Quantum ML' },
  ];

  return (
    <div>
      <PageHeader
        badge="Academic Journey"
        title="Undergraduate Studies"
        subtitle="4 years of rigorous Computer Science & Engineering education, with a focus on machine learning and quantum computing."
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* CGPA Banner */}
        <section className="py-16">
          <RevealSection>
            <div
              className="rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(123,97,255,0.15) 0%, rgba(10,10,20,0.9) 100%)', border: '1px solid rgba(123,97,255,0.25)' }}
            >
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="font-fira text-xs text-plasma-light uppercase tracking-widest mb-3">Cumulative GPA</p>
                  <div className="flex items-end gap-3">
                    <span className="font-drama italic text-plasma-light plasma-glow-text" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1 }}>3.85</span>
                    <span className="font-heading text-muted text-xl mb-2">/ 4.00</span>
                  </div>
                  <p className="font-heading text-muted mt-2">Department Rank: <span className="text-ghost font-semibold">Top 5%</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                  {[
                    { label: 'Total Credits', value: '130+' },
                    { label: 'Dean\'s List', value: '6×' },
                    { label: 'Study Duration', value: '4 years' },
                    { label: 'Specialization', value: 'ML & QC' },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass-surface rounded-2xl p-4 text-center">
                      <p className="font-fira text-xs text-muted uppercase tracking-wider mb-1">{label}</p>
                      <p className="font-heading font-bold text-ghost text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Year-by-Year Progress */}
        <section className="py-8">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-6">Academic Progress</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {yearSummary.map(({ year, gpa, highlight }) => (
                <div key={year} className="glass-surface rounded-3xl p-6 portfolio-card">
                  <p className="font-fira text-xs text-muted uppercase tracking-widest mb-2">{year}</p>
                  <p className="font-heading font-bold text-plasma-light text-3xl mb-2">{gpa}</p>
                  <p className="font-heading text-muted text-xs leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Live Academic Feed + Skills */}
        <section className="py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <RevealSection delay={0}>
              <TypewriterCard />
            </RevealSection>
            <RevealSection delay={100}>
              <div className="glass-surface rounded-3xl p-6 portfolio-card">
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-6">Core Competencies</p>
                <div className="space-y-4">
                  {coreSkills.map(({ label, value }) => (
                    <ProgressBar key={label} label={label} value={value} />
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <RevealSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-2">Coursework</p>
                <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl">Selected Courses</h2>
              </div>
              <div className="flex items-center gap-2 glass-surface px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-plasma-light" />
                <span className="font-fira text-xs text-plasma-light">Highlight</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map((c) => (
                <CourseCard key={c.code} {...c} />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Thesis project */}
        <section className="py-8 pb-24">
          <RevealSection>
            <div
              className="rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'rgba(18,18,31,0.8)', border: '1px solid rgba(123,97,255,0.2)' }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-14 h-14 rounded-3xl flex items-center justify-center shrink-0" style={{ background: 'rgba(123,97,255,0.15)', border: '1px solid rgba(123,97,255,0.3)' }}>
                  <GraduationCap size={24} className="text-plasma-light" />
                </div>
                <div className="flex-1">
                  <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-3">Final Year Thesis</p>
                  <h3 className="font-heading font-bold text-ghost text-xl md:text-2xl mb-4 leading-tight">
                    Variational Quantum Eigensolver with Classical Neural Network Preprocessing
                    for Molecular Energy Estimation
                  </h3>
                  <p className="font-heading text-muted leading-relaxed mb-6">
                    This thesis investigates the hybridization of variational quantum circuits with
                    classical deep neural networks to improve convergence speed and accuracy in
                    quantum chemistry simulations. The approach reduces circuit depth by 40% while
                    maintaining ground-state energy accuracy within 0.001 Hartree.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Qiskit', 'PyTorch', 'VQE', 'Quantum Chemistry', 'Hybrid Algorithms'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-fira text-ghost bg-plasma/10 border border-plasma/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}
