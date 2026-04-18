import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Brand icons ────────────────────────────────────────────────────────────
const ICONS = {
  HTML:         { color: '#E34F26', bg: 'rgba(227,79,38,0.08)',   svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#E34F26"/><path d="M6 4l2 22 8 2.5 8-2.5 2-22H6zm14.5 6H11l.3 3h8.9l-.9 9.5-3.3.9-3.3-.9-.2-2.5h3l.1 1.3 2.4.6 2.4-.6.3-3.3H10.5l-.8-9h12.6l-.3 3z" fill="white"/></svg> },
  CSS:          { color: '#1572B6', bg: 'rgba(21,114,182,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#1572B6"/><path d="M6 4l2 22 8 2.5 8-2.5 2-22H6zm14.8 6l-.3 3H11.5l.3 3h8.4l-.9 9.5-3.3.9-3.3-.9-.2-2.5h3l.1 1.3 2.4.6 2.4-.6.3-3.3H10.8l-.8-9h12.6l-.3 3z" fill="white"/></svg> },
  JavaScript:   { color: '#F7DF1E', bg: 'rgba(247,223,30,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#F7DF1E"/><path d="M9 25.5l2.3-1.4c.45.8.86 1.47 1.84 1.47.94 0 1.53-.37 1.53-1.8V15h2.83v8.8c0 2.97-1.74 4.32-4.28 4.32-2.3 0-3.63-1.19-4.22-2.62zM19.5 25.2l2.3-1.33c.6 1 1.38 1.73 2.76 1.73 1.16 0 1.9-.58 1.9-1.38 0-.96-.76-1.3-2.04-1.86l-.7-.3c-2.02-.86-3.36-1.94-3.36-4.22 0-2.1 1.6-3.7 4.1-3.7 1.78 0 3.06.62 3.98 2.24l-2.18 1.4c-.48-.86-1-1.2-1.8-1.2-.82 0-1.34.52-1.34 1.2 0 .84.52 1.18 1.72 1.7l.7.3c2.38 1.02 3.72 2.06 3.72 4.4 0 2.52-1.98 3.9-4.64 3.9-2.6 0-4.28-1.24-5.12-2.88z" fill="#000"/></svg> },
  React:        { color: '#61DAFB', bg: 'rgba(97,218,251,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/></svg> },
  'Tailwind CSS': { color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', svg: <svg viewBox="0 0 32 32" width="24" height="24"><path d="M16 7c-3.6 0-5.8 1.8-6.8 5.4 1.4-1.8 2.9-2.5 4.7-2.1.9.2 1.6.9 2.3 1.7 1.2 1.3 2.6 2.7 5.6 2.7 3.6 0 5.8-1.8 6.8-5.4-1.4 1.8-2.9 2.5-4.7 2.1-.9-.2-1.6-.9-2.3-1.7C20.4 8.4 19 7 16 7zm-6.8 8.1C5.6 15.1 3.4 16.9 2.4 20.5c1.4-1.8 2.9-2.5 4.7-2.1.9.2 1.6.9 2.3 1.7 1.2 1.3 2.6 2.7 5.6 2.7 3.6 0 5.8-1.8 6.8-5.4-1.4 1.8-2.9 2.5-4.7 2.1-.9-.2-1.6-.9-2.3-1.7-1.2-1.3-2.6-2.7-5.6-2.7z" fill="#06B6D4"/></svg> },
  'Node.js':    { color: '#339933', bg: 'rgba(51,153,51,0.08)',   svg: <svg viewBox="0 0 32 32" width="24" height="24"><path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#339933"/><text x="16" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">Node</text></svg> },
  'Express.js': { color: '#aaaaaa', bg: 'rgba(170,170,170,0.06)', svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#111"/><text x="16" y="20" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">expr</text></svg> },
  MongoDB:      { color: '#47A248', bg: 'rgba(71,162,72,0.08)',   svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#001E2B"/><path d="M16 4s-7 8.5-7 14a7 7 0 0014 0C23 12.5 16 4 16 4z" fill="#47A248"/><path d="M16 4v24" stroke="#fff" strokeWidth="1" opacity=".25"/></svg> },
  MySQL:        { color: '#4479A1', bg: 'rgba(68,121,161,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#00546B"/><text x="16" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">MySQL</text></svg> },
  Python:       { color: '#4B8BBE', bg: 'rgba(75,139,190,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><defs><linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#387EB8"/><stop offset="100%" stopColor="#366994"/></linearGradient><linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE052"/><stop offset="100%" stopColor="#FFC331"/></linearGradient></defs><path d="M15.9 3C11.1 3 11.4 5.1 11.4 5.1V7.2h4.6v.6H8.8S6 7.5 6 12.4s2.4 4.7 2.4 4.7h1.4v-2.3s-.1-2.4 2.3-2.4h4c0 0 2.2.04 2.2-2.1V5.5S18.7 3 15.9 3zm-2.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="url(#pg1)"/><path d="M16.1 29c4.8 0 4.5-2.1 4.5-2.1v-2.1h-4.6v-.6h7.2s2.8.3 2.8-4.6-2.4-4.7-2.4-4.7h-1.4v2.3s.1 2.4-2.3 2.4h-4c0 0-2.2-.04-2.2 2.1v4.1S13.3 29 16.1 29zm2.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="url(#pg2)"/></svg> },
  C:            { color: '#A8B9CC', bg: 'rgba(168,185,204,0.08)', svg: <svg viewBox="0 0 32 32" width="24" height="24"><circle cx="16" cy="16" r="14" fill="#A8B9CC"/><text x="16" y="21" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#000">C</text></svg> },
  Git:          { color: '#F05032', bg: 'rgba(240,80,50,0.08)',   svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#F05032"/><path d="M29 14.6L17.4 3a1.4 1.4 0 00-2 0l-2.8 2.8 3.5 3.5a1.7 1.7 0 012.1 2.1l3.4 3.4a1.7 1.7 0 11-1 1l-3.2-3.2v8.4a1.7 1.7 0 11-2 0V12.5a1.7 1.7 0 01-.9-2.2L11 6.8 3 14.8a1.4 1.4 0 000 2L14.6 29a1.4 1.4 0 002 0L29 16.6a1.4 1.4 0 000-2z" fill="white"/></svg> },
  GitHub:       { color: '#d0d0d0', bg: 'rgba(208,208,208,0.06)', svg: <svg viewBox="0 0 32 32" width="24" height="24" fill="white"><path d="M16 2C8.27 2 2 8.27 2 16c0 6.19 4.01 11.43 9.57 13.29.7.13.96-.3.96-.67v-2.37c-3.9.85-4.72-1.88-4.72-1.88-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.27 1.52 4.07 1.16.13-.9.49-1.52.89-1.87-3.1-.35-6.37-1.55-6.37-6.9 0-1.52.54-2.77 1.43-3.74-.14-.36-.62-1.77.14-3.68 0 0 1.17-.37 3.83 1.43a13.3 13.3 0 013.49-.47c1.18.01 2.37.16 3.49.47 2.65-1.8 3.82-1.43 3.82-1.43.76 1.91.28 3.32.14 3.68.89.97 1.43 2.22 1.43 3.74 0 5.36-3.27 6.54-6.39 6.88.5.43.95 1.29.95 2.6v3.85c0 .37.25.81.96.67C25.99 27.43 30 22.19 30 16 30 8.27 23.73 2 16 2z"/></svg> },
  'VS Code':    { color: '#007ACC', bg: 'rgba(0,122,204,0.08)',   svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#007ACC"/><path d="M23 4l-9 9-4-3-3 2v12l3 2 4-3 9 9 6-3V7l-6-3zM23 22l-7-6 7-6v12z" fill="white"/></svg> },
  'REST APIs':  { color: '#FF6C37', bg: 'rgba(255,108,55,0.08)',  svg: <svg viewBox="0 0 32 32" width="24" height="24"><rect width="32" height="32" rx="5" fill="#FF6C37"/><path d="M8 16h16M20 11l5 5-5 5M12 11l-5 5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
}

const CATEGORIES = [
  { label: 'Frontend',              skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { label: 'Backend',               skills: ['Node.js', 'Express.js'] },
  { label: 'Databases',             skills: ['MongoDB', 'MySQL'] },
  { label: 'Programming Languages', skills: ['Python', 'C'] },
  { label: 'Tools',                 skills: ['Git', 'GitHub', 'VS Code', 'REST APIs'] },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── Compact inline skill row item ──────────────────────────────────────────
function SkillItem({ name, delay, inView }) {
  const info = ICONS[name] || { color: '#c9a227', bg: 'rgba(201,162,39,0.08)', svg: null }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.14 } }}
      whileTap={{ scale: 0.96 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        borderRadius: '10px',
        cursor: 'default',
        background: info.bg,
        border: `1px solid ${info.color}22`,
        transition: 'box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease',
        flex: '1 1 auto',
        minWidth: '110px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 24px ${info.color}22`
        e.currentTarget.style.borderColor = `${info.color}44`
        e.currentTarget.style.background = info.bg.replace('0.08', '0.14').replace('0.06', '0.1')
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${info.color}22`
        e.currentTarget.style.background = info.bg
      }}
    >
      {/* Icon */}
      <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {info.svg || (
          <div style={{
            width: '24px', height: '24px', borderRadius: '5px',
            background: info.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '9px', fontWeight: 700, color: info.color,
          }}>
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      {/* Name */}
      <span style={{
        fontSize: '12.5px', fontWeight: 500,
        color: 'var(--text-secondary)',
        lineHeight: 1.2, whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </motion.div>
  )
}

// ── Category panel ─────────────────────────────────────────────────────────
function CategoryPanel({ cat, catIdx, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={catIdx * 0.25 + 2}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      style={{
        background: 'rgba(13,17,23,0.65)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '18px',
        padding: '24px 22px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,162,39,0.18)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Category header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{
          width: '3px', height: '16px', borderRadius: '2px',
          background: 'linear-gradient(180deg, var(--gold-light), var(--gold))',
          flexShrink: 0,
        }} />
        <p style={{
          fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--gold)',
          fontFamily: "'Space Grotesk', sans-serif",
          margin: 0,
        }}>
          {cat.label}
        </p>
      </div>

      {/* Skills — wrapping flex row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {cat.skills.map((skill, si) => (
          <SkillItem
            key={skill}
            name={skill}
            delay={catIdx * 0.05 + si * 0.045 + 0.08}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-24 px-6" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 60% at 15% 50%, rgba(201,162,39,0.03) 0%, transparent 70%)',
      }} />

      <div className="section-container">
        {/* ── Section header ── */}
        <div style={{ marginBottom: '52px' }}>
          <motion.p
            className="section-label"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
          >
            Technical Skills
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.05, margin: '0 0 14px' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>SKILLS </span>
            <span style={{ color: 'rgba(255,255,255,0.14)' }}>&amp; EXPERTISE</span>
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
            style={{ color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.75, fontSize: '0.96rem' }}
          >
            Full-stack focused — from responsive UIs to backend APIs and databases.
          </motion.p>
        </div>

        {/* ── Responsive 3-column grid ── */}
        {/*
          Desktop  ≥1024px : 3 columns
          Tablet   ≥640px  : 2 columns
          Mobile   <640px  : 1 column
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
          className="skills-grid"
        >
          {CATEGORIES.map((cat, ci) => (
            <CategoryPanel key={cat.label} cat={cat} catIdx={ci} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
