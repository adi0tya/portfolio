import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Skill categories ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Frontend',
    color: '#61DAFB',
    skills: [
      { name: 'HTML',         color: '#E34F26' },
      { name: 'CSS',          color: '#1572B6' },
      { name: 'JavaScript',   color: '#F7DF1E' },
      { name: 'React',        color: '#61DAFB' },
      { name: 'Tailwind CSS', color: '#06B6D4' },
    ],
  },
  {
    label: 'Backend',
    color: '#339933',
    skills: [
      { name: 'Node.js',    color: '#339933' },
      { name: 'Express.js', color: '#aaaaaa' },
      { name: 'REST APIs',  color: '#FF6C37' },
    ],
  },
  {
    label: 'Databases',
    color: '#47A248',
    skills: [
      { name: 'MongoDB', color: '#47A248' },
      { name: 'MySQL',   color: '#4479A1' },
    ],
  },
  {
    label: 'Languages',
    color: '#4B8BBE',
    skills: [
      { name: 'Python', color: '#4B8BBE' },
      { name: 'C',      color: '#A8B9CC' },
    ],
  },
  {
    label: 'Tools',
    color: '#F05032',
    skills: [
      { name: 'Git',     color: '#F05032' },
      { name: 'GitHub',  color: '#d0d0d0' },
      { name: 'VS Code', color: '#007ACC' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

function SkillChip({ name, color, delay, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.06, transition: { duration: 0.12 } }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        borderRadius: '6px',
        fontSize: '12.5px',
        fontWeight: 500,
        background: color + '12',
        border: `1px solid ${color}28`,
        color: 'var(--text-secondary)',
        cursor: 'default',
        whiteSpace: 'nowrap',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color + '55'
        e.currentTarget.style.background = color + '1e'
        e.currentTarget.style.color = 'var(--text-primary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = color + '28'
        e.currentTarget.style.background = color + '12'
        e.currentTarget.style.color = 'var(--text-secondary)'
      }}
    >
      {/* Color dot */}
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: color, flexShrink: 0, opacity: 0.85,
      }} />
      {name}
    </motion.span>
  )
}

function CategoryCard({ cat, catIdx, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={catIdx * 0.2 + 1}
      style={{
        background: 'rgba(13,17,23,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        padding: '20px',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cat.color}30`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{
          width: '3px', height: '14px', borderRadius: '2px',
          background: cat.color, flexShrink: 0, opacity: 0.8,
        }} />
        <span style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: cat.color,
          fontFamily: "'Space Grotesk', sans-serif",
          opacity: 0.9,
        }}>
          {cat.label}
        </span>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {cat.skills.map((skill, si) => (
          <SkillChip
            key={skill.name}
            name={skill.name}
            color={skill.color}
            delay={catIdx * 0.04 + si * 0.04 + 0.1}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="relative py-20 px-4" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <motion.p
            className="section-label"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
          >
            Technical Skills
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.5}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, lineHeight: 1.05, margin: '0 0 10px' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>SKILLS </span>
            <span style={{ color: 'rgba(255,255,255,0.14)' }}>&amp; STACK</span>
          </motion.h2>
          <motion.div className="gold-divider"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1} />
        </div>

        {/* Grid — 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="skills-grid" style={{ display: 'grid', gap: '14px' }}>
          {CATEGORIES.map((cat, ci) => (
            <CategoryCard key={cat.label} cat={cat} catIdx={ci} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
