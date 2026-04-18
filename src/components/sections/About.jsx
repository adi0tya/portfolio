import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal, about, education } from '../../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Stat card with hover lift
function StatCard({ value, sub, custom, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={custom}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.18 } }}
      style={{
        background: 'rgba(13,17,23,0.75)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '20px 16px',
        textAlign: 'center',
        backdropFilter: 'blur(16px)',
        cursor: 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        fontSize: '1.7rem', fontWeight: 700, marginBottom: '5px',
        fontFamily: "'Space Grotesk', sans-serif",
        background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {value}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.05em', lineHeight: 1.4 }}>
        {sub}
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 45% at 75% 50%, rgba(201,162,39,0.04) 0%, transparent 70%)',
      }} />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left ── */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0} style={{ marginBottom: '28px' }}>
              <h2 style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                fontWeight: 700, lineHeight: 1.0,
                letterSpacing: '-0.02em',
                fontFamily: "'Space Grotesk', sans-serif",
                margin: 0,
              }}>
                <span style={{ color: 'var(--text-primary)' }}>ABOUT </span>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>ME</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '18px' }}>
              I'm a{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Full-Stack Developer</strong>
              {' '}and a{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2nd-year BCA student</strong>
              {' '}at Birla Global University, Bhubaneswar. I'm still learning and improving my skills by building real projects and exploring modern web technologies.
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '28px' }}>
              I enjoy turning ideas into{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>real applications</strong>
              {' '}and focus on writing{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>clean code</strong>
              {' '}while creating smooth, user-friendly experiences.
            </motion.p>

            {/* Available */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="flex items-center gap-2 mb-8">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0,
                boxShadow: '0 0 8px rgba(74,222,128,0.6)', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#4ade80', fontSize: '0.88rem', fontWeight: 500 }}>
                Available For Internships
              </span>
            </motion.div>

            {/* Focus tags — extra bottom margin so Skills section has clear separation */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              style={{ paddingBottom: '8px' }}
            >
              <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif" }}>
                My Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {about.focus.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                    style={{
                      padding: '6px 14px', borderRadius: '7px',
                      fontSize: '12px', fontWeight: 500,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.02em', cursor: 'default',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'
                      e.currentTarget.style.background = 'rgba(201,162,39,0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right ── */}
          <div className="flex flex-col gap-4">
            {/* Education card */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="glass gradient-border rounded-2xl"
              style={{ padding: '20px 22px', boxShadow: '0 16px 50px rgba(0,0,0,0.35)', cursor: 'default' }}
            >
              <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif" }}>
                Currently
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0, width: '44px', height: '44px', borderRadius: '11px',
                  background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L2 7l8 4.5L18 7 10 2zM2 12l8 4.5L18 12M2 9.5l8 4.5 8-4.5"
                      stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '5px', lineHeight: 1.3 }}>
                    {education.degree}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '5px' }}>
                    @ {education.institution}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {education.location} · 2024 — Expected {education.expected}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="2nd"  sub="Year · BCA Program"       custom={2}   inView={inView} />
              <StatCard value="'27"  sub="Expected Graduation"       custom={2.3} inView={inView} />
              <StatCard value="15+"  sub="Languages & Tools"         custom={2.6} inView={inView} />
              <StatCard value="MERN" sub="Primary Stack"             custom={2.9} inView={inView} />
            </div>

            {/* Location */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3.5}
              className="glass rounded-xl"
              style={{ padding: '14px 18px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ color: 'var(--gold)', flexShrink: 0 }}>
                <path d="M8 1C5.79 1 4 2.79 4 5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4z"
                  stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                {personal.location}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
