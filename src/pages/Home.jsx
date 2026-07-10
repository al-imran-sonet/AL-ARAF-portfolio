import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, FlaskConical, Zap, BookOpen, Microscope, Trophy } from 'lucide-react';

/* --- Quantum Particle Canvas Background --- */
function QuantumCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 97, 255, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 97, 255, ${p.alpha})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}

/* --- Animated Hero Text --- */
function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 150);
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-20 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,97,255,0.18) 0%, transparent 70%), #0A0A14',
      }}
    >
      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&fit=crop"
          alt="Quantum computing visualization"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
      </div>

      {/* Particle canvas */}
      <div className="absolute inset-0 z-[1]">
        <QuantumCanvas />
      </div>

      {/* Floating geometric orbs */}
      <div className="absolute top-32 right-16 w-64 h-64 rounded-full z-[1] animate-float"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)', animationDuration: '8s' }}
      />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(165,148,255,0.08) 0%, transparent 70%)', filter: 'blur(20px)', animation: 'float 12s ease-in-out infinite reverse' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full" ref={sectionRef}>
        {/* Badge */}
        <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full border border-plasma/30 bg-plasma/10 mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plasma-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-plasma-light"></span>
          </span>
          <span className="font-fira text-xs text-plasma-light tracking-widest uppercase">Portfolio — Scholarship Application 2024</span>
        </div>

        {/* Main headline */}
        <div className="hero-animate mb-4">
          <p className="font-heading font-bold text-muted-light text-xl md:text-2xl tracking-tight uppercase">
            Computing beyond
          </p>
        </div>
        <div className="hero-animate mb-8">
          <h1
            className="font-drama italic text-ghost leading-none plasma-glow-text"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
          >
            Boundaries.
          </h1>
        </div>

        {/* Sub-info */}
        <div className="hero-animate mb-10 text-color:white ">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
            <div>
              <p className="font-heading text-ghost text-2xl md:text-3xl font-semibold tracking-tight">
                AL ARAF APURBO
              </p>
              <p className="font-fira text-plasma-light text-sm mt-1">
                B.Sc. Artifitial intelligence Science &amp; Engineering
              </p>
            </div>
            <div className="md:mb-1">
              <p className="font-heading text-muted text-sm leading-relaxed max-w-md">
                Aspiring researcher at the frontier of machine learning and quantum computing.
                Driven by curiosity, shaped by data, quantified by impact.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation cards */}
        <div className="hero-animate grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              to: '/studies',
              icon: BookOpen,
              label: 'Undergraduate',
              desc: 'Coursework, GPA & academic milestones',
              color: '#7B61FF',
            },
            {
              to: '/research',
              icon: Microscope,
              label: 'Research',
              desc: 'ML, Quantum & published work',
              color: '#A594FF',
            },
            {
              to: '/extracurricular',
              icon: Trophy,
              label: 'Extracurricular',
              desc: 'Leadership, competitions & community',
              color: '#C4B5FD',
            },
          ].map(({ to, icon: Icon, label, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="portfolio-card glass-surface rounded-3xl p-6 group block"
            >
              <div className="flex flex-col h-full gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: `${color}22`, border: `1px solid ${color}44` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-semibold text-ghost text-sm mb-1">{label}</p>
                  <p className="font-heading text-muted text-xs leading-relaxed">{desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-fira" style={{ color }}>
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-plasma/60 to-transparent" />
        <span className="font-fira text-xs text-muted">scroll</span>
      </div>
    </section>
  );
}

/* --- About / Quick Intro --- */
function AboutSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('section-visible');
                el.classList.remove('section-hidden');
              }, i * 120);
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-24">
      {/* Label */}
      <p className="reveal-item section-hidden font-fira text-xs text-plasma uppercase tracking-widest mb-6">
        About Me
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="reveal-item section-hidden font-heading font-bold text-ghost text-3xl md:text-4xl leading-tight">
            Where <span className="text-plasma-light font-drama italic">quantum mechanics</span>{' '}
            meets machine intelligence
          </h2>
          <p className="reveal-item section-hidden font-heading text-muted leading-relaxed">
            I am AL ARAF AMAN, a final-year Computer Science &amp; Engineering student passionate
            about harnessing the power of quantum computing and machine learning to solve
            problems that classical computation cannot. My academic journey spans deep
            coursework, hands-on research, and a commitment to the scientific community.
          </p>
          <p className="reveal-item section-hidden font-heading text-muted leading-relaxed">
            I am applying for a Master's scholarship to deepen my expertise and contribute
            cutting-edge research at the intersection of quantum algorithms and neural networks.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal-item section-hidden grid grid-cols-2 gap-4">
          {[
            { label: 'CGPA', value: '3.85', unit: '/ 4.00', color: '#7B61FF' },
            { label: 'Projects', value: '12+', unit: 'completed', color: '#A594FF' },
            { label: 'Publications', value: '2', unit: 'papers', color: '#C4B5FD' },
            { label: 'Awards', value: '6', unit: 'received', color: '#7B61FF' },
          ].map(({ label, value, unit, color }) => (
            <div
              key={label}
              className="glass-surface rounded-3xl p-6 portfolio-card"
            >
              <p className="font-fira text-xs text-muted uppercase tracking-widest mb-2">{label}</p>
              <p
                className="font-heading font-bold text-4xl leading-none"
                style={{ color }}
              >
                {value}
              </p>
              <p className="font-fira text-xs text-muted mt-1">{unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Philosophy / Manifesto Section --- */
function ManifestoSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('section-visible');
                el.classList.remove('section-hidden');
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden my-12 rounded-[3rem] mx-4"
      style={{ background: '#12121F' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1600&q=60&fit=crop"
          alt="Bioluminescence"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      {/* Glowing orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="reveal-item section-hidden font-fira text-xs text-muted-light uppercase tracking-widest mb-12">
          My Research Philosophy
        </p>

        <p className="reveal-item section-hidden font-heading text-muted text-lg md:text-xl mb-8 leading-relaxed">
          Most computer scientists focus on:{' '}
          <span className="text-ghost font-medium">classical computation at scale.</span>
        </p>

        <p
          className="reveal-item section-hidden font-drama italic text-ghost leading-tight"
          style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}
        >
          I focus on:{' '}
          <span className="text-plasma-light plasma-glow-text">quantum-native</span> algorithms.
        </p>

        <p className="reveal-item section-hidden font-heading text-muted text-base mt-10 max-w-2xl mx-auto">
          With a belief that the next decade's breakthroughs lie at the convergence of quantum
          mechanics and neural computation — I study both, bridge them, and push what's computable.
        </p>
      </div>
    </section>
  );
}

/* --- Skills Overview --- */
function SkillsSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('section-visible');
                el.classList.remove('section-hidden');
              }, i * 100);
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { category: 'Programming', items: ['Python', 'C++', 'Julia', 'MATLAB', 'JavaScript'] },
    { category: 'ML / AI', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'JAX'] },
    { category: 'Quantum', items: ['Qiskit', 'Cirq', 'PennyLane', 'Q#', 'QuTiP'] },
    { category: 'Tools', items: ['Git', 'Docker', 'LaTeX', 'Linux', 'Jupyter'] },
  ];

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-24">
      <p className="reveal-item section-hidden font-fira text-xs text-plasma uppercase tracking-widest mb-4">
        Technical Skills
      </p>
      <h2 className="reveal-item section-hidden font-heading font-bold text-ghost text-3xl md:text-4xl mb-12">
        Tools of the trade
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {skills.map(({ category, items }) => (
          <div key={category} className="reveal-item section-hidden glass-surface rounded-3xl p-6 portfolio-card">
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs font-fira text-ghost bg-plasma/10 border border-plasma/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- Home Page export --- */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ManifestoSection />
      <SkillsSection />
    </div>
  );
}
