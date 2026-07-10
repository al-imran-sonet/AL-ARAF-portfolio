import { useEffect, useRef, useState } from 'react';
import {
  Trophy, Users, Code2, Music, Heart, Star,
  Globe, BookOpen, Mic, Cpu, ChevronRight, Award,
  Calendar, MapPin
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
          'radial-gradient(ellipse 60% 50% at 80% 0%, rgba(123,97,255,0.12) 0%, transparent 70%), #0A0A14',
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

/* --- Activity Card (stacking / featured) --- */
function ActivityCard({ icon: Icon, color, category, title, role, period, location, description, achievements }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="portfolio-card glass-surface rounded-3xl overflow-hidden">
      {/* Top color band */}
      <div
        className="h-2 w-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
      />
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}44` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div className="flex-1">
            <p className="font-fira text-xs uppercase tracking-widest mb-1" style={{ color }}>{category}</p>
            <h3 className="font-heading font-bold text-ghost text-xl leading-tight mb-0.5">{title}</h3>
            <p className="font-heading text-plasma-light text-sm font-semibold mb-3">{role}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-fira text-muted">
                <Calendar size={11} />
                {period}
              </div>
              {location && (
                <div className="flex items-center gap-1.5 text-xs font-fira text-muted">
                  <MapPin size={11} />
                  {location}
                </div>
              )}
            </div>

            <p className="font-heading text-muted text-sm leading-relaxed mb-4">{description}</p>

            {achievements && achievements.length > 0 && (
              <>
                <button
                  className="flex items-center gap-1 text-xs font-fira text-muted hover:text-plasma-light transition-colors link-lift mb-3"
                  onClick={() => setExpanded(!expanded)}
                >
                  <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
                  {expanded ? 'Hide details' : 'Key achievements'}
                </button>
                {expanded && (
                  <ul className="space-y-2">
                    {achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                        <span className="font-heading text-muted">{a}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Competition / Award Badge Card --- */
function AwardCard({ title, event, year, position, type }) {
  const colors = {
    Gold: ['#F59E0B', '#FDE68A'],
    Silver: ['#9CA3AF', '#E5E7EB'],
    Bronze: ['#B45309', '#FDE68A'],
    Winner: ['#7B61FF', '#C4B5FD'],
    Finalist: ['#06B6D4', '#A5F3FC'],
    Participant: ['#6B7280', '#D1D5DB'],
  };
  const [bg, text] = colors[position] || colors.Participant;

  return (
    <div className="portfolio-card glass-surface rounded-3xl p-5 flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs"
        style={{ background: `${bg}22`, color: bg, border: `1px solid ${bg}55` }}
      >
        {position === 'Gold' ? '🥇' : position === 'Silver' ? '🥈' : position === 'Bronze' ? '🥉' : position === 'Winner' ? '🏆' : '🎖️'}
      </div>
      <div>
        <p className="font-fira text-xs uppercase tracking-widest mb-1" style={{ color: bg }}>{type}</p>
        <p className="font-heading font-semibold text-ghost text-sm">{title}</p>
        <p className="font-heading text-muted text-xs mt-1">{event} · {year}</p>
      </div>
    </div>
  );
}

/* --- Hobby Card --- */
function HobbyCard({ icon: Icon, label, desc, color }) {
  return (
    <div className="portfolio-card glass-surface rounded-3xl p-5 text-center">
      <div
        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}44` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <p className="font-heading font-semibold text-ghost text-sm mb-1">{label}</p>
      <p className="font-heading text-muted text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

/* --- Timeline Entry --- */
function TimelineEntry({ year, title, sub, color, last }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        {!last && <div className="w-px flex-1 mt-1" style={{ background: `${color}30` }} />}
      </div>
      <div className="pb-6">
        <p className="font-fira text-xs text-muted mb-1">{year}</p>
        <p className="font-heading font-semibold text-ghost text-sm mb-0.5">{title}</p>
        <p className="font-heading text-muted text-xs">{sub}</p>
      </div>
    </div>
  );
}

export default function Extracurricular() {
  const activities = [
    {
      icon: Cpu,
      color: '#7B61FF',
      category: 'Technical Club',
      title: 'IEEE Computer Society',
      role: 'Vice President — Technical Division',
      period: 'Jan 2023 – Present',
      location: 'BUET Campus',
      description:
        'Leading a team of 40+ engineers in organizing technical workshops, seminars, and hackathons. Responsible for curriculum design for the club\'s ML and quantum computing bootcamp series, which has trained over 200 students.',
      achievements: [
        'Organized "QuantumHack 2024" — Bangladesh\'s first quantum computing hackathon with 150+ participants',
        'Launched a 12-week ML study group attended by 80+ members',
        'Secured partnership with IBM Quantum for club access to real quantum hardware',
        'Increased club membership by 60% in one academic year',
      ],
    },
    {
      icon: Code2,
      color: '#A594FF',
      category: 'Competitive Programming',
      title: 'BUET Programming Team',
      role: 'Team Captain',
      period: 'Sep 2021 – Dec 2023',
      location: 'National & International',
      description:
        'Represented BUET in ICPC regional and national contests. Developed a systematic training program for junior programmers focusing on graph theory, dynamic programming, and computational geometry.',
      achievements: [
        'Qualified for ICPC Asia Dhaka Regional 2022 and 2023',
        'Ranked 3rd nationally in Inter-University Programming Contest 2023',
        'Solved 1200+ competitive programming problems on Codeforces and AtCoder',
        'Mentored 15 junior programmers, 8 of whom later qualified for ICPC regionals',
      ],
    },
    {
      icon: Globe,
      color: '#C4B5FD',
      category: 'Community',
      title: 'Bangladesh Open Source Network',
      role: 'Core Contributor & Chapter Lead',
      period: 'Mar 2022 – Present',
      location: 'Dhaka, Bangladesh & Remote',
      description:
        'Contributing to open-source quantum computing tools and leading the Dhaka chapter of a national initiative to promote STEM education in underserved communities. Organized Python workshops for 300+ students in rural areas.',
      achievements: [
        'Contributed 1200+ lines of code to open-source quantum ML libraries',
        'Organized 5 free Python workshops reaching 300+ students outside Dhaka',
        'Created free Bangla-language quantum computing learning resources',
        'Partnered with 3 NGOs for free coding education in rural schools',
      ],
    },
    {
      icon: Mic,
      color: '#7B61FF',
      category: 'Science Communication',
      title: 'BUET Science & Tech Blog',
      role: 'Lead Writer — Quantum & AI',
      period: 'Jun 2022 – Present',
      location: 'Online',
      description:
        'Writing accessible long-form articles on quantum computing and AI research for a general science audience. The blog reaches 5000+ monthly readers and has been featured in national technology media outlets.',
      achievements: [
        'Published 24 articles with a total of 150,000+ page views',
        'Featured in The Daily Star Technology section (2023)',
        '"Introduction to Quantum Gates" became the most-read article with 12,000 views',
        'Invited as a guest science communicator on Bangladesh Science Podcast',
      ],
    },
  ];

  const awards = [
    { title: '1st Place — Quantum Computing Track', event: 'National Tech Olympiad', year: '2024', position: 'Gold', type: 'Competition' },
    { title: '3rd Place — ICPC Asia Dhaka Regional', event: 'ICPC', year: '2023', position: 'Bronze', type: 'Programming' },
    { title: 'Best Research Poster', event: 'BUET Research Symposium', year: '2024', position: 'Winner', type: 'Research' },
    { title: 'National STEM Scholar Award', event: 'Ministry of Science, BD', year: '2023', position: 'Winner', type: 'Scholarship' },
    { title: 'Best Paper Presenter', event: 'ICCCIT Conference', year: '2024', position: 'Winner', type: 'Academic' },
    { title: 'Dean\'s List Recognition', event: 'BUET', year: '2021–2024', position: 'Finalist', type: 'Academic' },
  ];

  const hobbies = [
    { icon: Music, label: 'Classical Guitar', desc: 'Playing since age 12, exploring jazz theory and composition', color: '#7B61FF' },
    { icon: BookOpen, label: 'Philosophy of Science', desc: 'Fascinated by Kuhn, Popper & the foundations of physics', color: '#A594FF' },
    { icon: Globe, label: 'Language Learning', desc: 'Fluent in Bengali & English, studying Mandarin', color: '#C4B5FD' },
    { icon: Heart, label: 'Science Fiction', desc: 'Asimov, Liu Cixin & the speculative futures of computing', color: '#7B61FF' },
  ];

  const timeline = [
    { year: '2021', title: 'Entered BUET CSE Program', sub: 'Scholarship recipient — National Merit', color: '#7B61FF' },
    { year: '2022', title: 'Joined IEEE CS & Programming Team', sub: 'First ICPC participation', color: '#A594FF' },
    { year: '2023', title: 'Led QuantumHack 2023', sub: 'Became VP of IEEE CS Chapter', color: '#C4B5FD' },
    { year: '2023', title: 'First Research Publication Submitted', sub: 'Hybrid QML paper to IEEE Quantum', color: '#7B61FF' },
    { year: '2024', title: 'National STEM Scholar Award', sub: 'Recognized for quantum research excellence', color: '#A594FF' },
    { year: '2024', title: 'Graduating & Applying for Masters', sub: 'Seeking scholarship to advance QML research', color: '#C4B5FD', last: true },
  ];

  return (
    <div>
      <PageHeader
        badge="Beyond the Classroom"
        title="Extracurricular Activities"
        subtitle="Leadership, competitions, science communication, and community work that define who I am beyond my GPA."
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* Impact Summary */}
        <section className="py-16">
          <RevealSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: '200+', label: 'Students Mentored', color: '#7B61FF' },
                { value: '6', label: 'Awards & Prizes', color: '#A594FF' },
                { value: '4', label: 'Leadership Roles', color: '#C4B5FD' },
                { value: '150K+', label: 'Article Readers', color: '#7B61FF' },
              ].map(({ value, label, color }) => (
                <div key={label} className="glass-surface rounded-3xl p-5 text-center portfolio-card">
                  <p className="font-drama italic" style={{ fontSize: '2.5rem', color, lineHeight: 1 }}>{value}</p>
                  <p className="font-fira text-xs text-muted uppercase tracking-widest mt-2">{label}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Activities */}
        <section className="py-8">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Involvement</p>
            <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-8">Leadership & Organizations</h2>
            <div className="space-y-6">
              {activities.map((a) => (
                <ActivityCard key={a.title} {...a} />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Awards + Timeline */}
        <section className="py-16">
          <RevealSection>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Awards */}
              <div>
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Recognition</p>
                <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-6">Awards & Honors</h2>
                <div className="space-y-3">
                  {awards.map((a) => (
                    <AwardCard key={a.title} {...a} />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">Journey</p>
                <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-6">My Timeline</h2>
                <div className="glass-surface rounded-3xl p-6">
                  {timeline.map((t) => (
                    <TimelineEntry key={t.title} {...t} />
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Interests & Hobbies */}
        <section className="py-8 pb-24">
          <RevealSection>
            <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-4">The Human Side</p>
            <h2 className="font-heading font-bold text-ghost text-2xl md:text-3xl mb-8">Interests & Hobbies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {hobbies.map((h) => (
                <HobbyCard key={h.label} {...h} />
              ))}
            </div>

            {/* Personal statement */}
            <div
              className="rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'rgba(18,18,31,0.8)', border: '1px solid rgba(123,97,255,0.2)' }}
            >
              <div className="absolute inset-0 dot-grid opacity-10" />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <p className="font-fira text-xs text-plasma uppercase tracking-widest mb-6">Personal Statement</p>
                <p className="font-drama italic text-ghost text-2xl md:text-3xl leading-snug">
                  "I believe the best researchers are those who stay{' '}
                  <span className="text-plasma-light">perpetually curious</span> — in the lab,
                  in the classroom, and in life."
                </p>
                <p className="font-heading text-muted mt-6 leading-relaxed">
                  Science communication, open-source contribution, and community service are not
                  distractions from my research — they sharpen it. Teaching others quantum computing
                  forces me to understand it more deeply. Competing in programming contests has honed
                  my algorithmic instincts. Every extracurricular has made me a better scientist.
                </p>
                <p className="font-fira text-xs text-plasma-light mt-6">— AL ARAF AMAN</p>
              </div>
            </div>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}
