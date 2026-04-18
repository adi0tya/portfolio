import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Resume() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="resume" className="relative py-16 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,162,39,0.04) 0%, transparent 70%)',
      }} />

      <div className="section-container">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
          style={{
            borderRadius: '18px', overflow: 'hidden',
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid rgba(201,162,39,0.14)',
            backdropFilter: 'blur(20px)',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,162,39,0.28)'
            e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.4), 0 0 24px rgba(201,162,39,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,162,39,0.14)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Gold line */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold-light) 50%, var(--gold) 60%, transparent)' }} />

          <div style={{
            padding: '24px 32px',
            display: 'flex', alignItems: 'center',
            gap: '24px', flexWrap: 'wrap',
          }}>
            {/* Icon */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              style={{
                flexShrink: 0, width: '52px', height: '52px', borderRadius: '13px',
                background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="3" y="2" width="20" height="22" rx="2.5" stroke="var(--gold)" strokeWidth="1.5" />
                <path d="M8 9h10M8 13h10M8 17h6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: '180px' }}>
              <motion.p className="section-label" style={{ marginBottom: '4px' }}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
                Resume
              </motion.p>
              <motion.h2
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, marginBottom: '4px' }}
              >
                Download My Resume
              </motion.h2>
              <motion.p
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
                style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}
              >
                Full overview of my education, skills, and projects — recruiter-ready.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '9px 18px' }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                View
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="btn-primary"
                style={{ fontSize: '12px', padding: '9px 18px' }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4.5 6.5L7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 11v.5a1 1 0 001 1h10a1 1 0 001-1V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Download
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
