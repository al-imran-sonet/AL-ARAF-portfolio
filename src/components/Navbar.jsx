import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Atom } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/studies', label: 'Studies' },
  { path: '/research', label: 'Research' },
  { path: '/extracurricular', label: 'Activities' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-500`}
      >
        <div
          className={`flex items-center justify-between gap-8 px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass-surface plasma-glow'
              : 'bg-transparent'
          }`}
          style={{ width: 'min(760px, 90vw)' }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 font-heading font-bold text-ghost tracking-tight link-lift"
          >
            <div className="w-7 h-7 rounded-full bg-plasma flex items-center justify-center plasma-glow">
              <Atom size={14} className="text-ghost" />
            </div>
            <span className="text-sm font-fira text-plasma-light">AA</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-300 link-lift ${
                    isActive
                      ? 'bg-plasma text-ghost plasma-glow'
                      : 'text-muted-light hover:text-ghost hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-ghost hover:text-plasma transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div
            className="absolute top-full mt-2 glass-surface rounded-3xl p-4 flex flex-col gap-2"
            style={{ width: 'min(760px, 90vw)', left: '50%', transform: 'translateX(-50%)' }}
          >
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-sm font-heading font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-plasma text-ghost'
                      : 'text-muted-light hover:text-ghost hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
