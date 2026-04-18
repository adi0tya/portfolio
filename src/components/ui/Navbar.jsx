import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // Auto-detect active section
      const sections = navLinks.map((l) => l.href)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: '20px', paddingLeft: '16px', paddingRight: '16px' }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 8px',
          borderRadius: '50px',
          background: scrolled ? 'rgba(8,10,16,0.92)' : 'rgba(8,10,16,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(201,168,76,0.14)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1)'
            : '0 4px 24px rgba(0,0,0,0.5)',
          transition: 'all 0.4s ease',
          maxWidth: '640px',
          width: '100%',
        }}
      >
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 w-full justify-center">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} active={active === link.href} onClick={() => handleNav(link.href)} />
          ))}
        </div>

        {/* Mobile: logo + hamburger */}
        <div className="flex md:hidden items-center justify-between w-full px-2">
          <button
            onClick={() => handleNav('#hero')}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            AD
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <>
                  <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', top: '72px', left: '16px', right: '16px',
              background: 'rgba(8,10,16,0.96)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(201,168,76,0.14)', borderRadius: '20px',
              padding: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '12px 16px', borderRadius: '12px',
                  fontSize: '0.9rem', fontWeight: 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: active === link.href ? 'var(--gold)' : 'var(--text-secondary)',
                  background: active === link.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ link, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        padding: '8px 18px',
        borderRadius: '50px',
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        fontFamily: "'Space Grotesk', sans-serif",
        color: active ? '#0a0a0a' : 'var(--text-secondary)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        letterSpacing: '0.01em',
        zIndex: 1,
      }}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          style={{
            position: 'absolute', inset: 0, borderRadius: '50px',
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            zIndex: -1,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {link.label}
    </button>
  )
}
