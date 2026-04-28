import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '../../data/portfolio'
import { submitContact } from '../../services/api'

// ── Shared animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── Contact card ───────────────────────────────────────────────────────────
function ContactCard({ href, icon, label, value, external, custom, inView }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={custom}
      whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '18px 22px',
        borderRadius: '14px',
        background: 'rgba(13,17,23,0.75)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,162,39,0.35)'
        e.currentTarget.style.background = 'rgba(13,17,23,0.9)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(201,162,39,0.07)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.background = 'rgba(13,17,23,0.75)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
      }}
    >
      {/* Icon box */}
      <div style={{
        width: '44px', height: '44px', borderRadius: '11px', flexShrink: 0,
        background: 'rgba(201,162,39,0.08)',
        border: '1px solid rgba(201,162,39,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--gold)',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
          marginBottom: '3px', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {label}
        </p>
        <p style={{
          fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {value}
        </p>
      </div>

      {/* Arrow */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
        style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.6 }}>
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Contact form state — wired to MongoDB via API
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [status,  setStatus]  = useState('idle') // idle | sending | success | error
  const [errMsg,  setErrMsg]  = useState('')

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setErrMsg('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
      setErrMsg('Could not send message. Please email me directly.')
    }
  }

  return (
    <section id="contact" className="relative py-28 px-4" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 50% at 50% 90%, rgba(201,162,39,0.05) 0%, transparent 70%)',
      }} />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: heading + CTA ── */}
          <div>
            <motion.p className="section-label"
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
              Get In Touch
            </motion.p>

            <motion.h2
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '20px' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>LET'S BUILD </span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>TOGETHER</span>
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', maxWidth: '400px', marginBottom: '32px' }}
            >
              I'm open to internships, collaborations, and interesting projects. Whether you have a question or just want to say hi — my inbox is always open.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href={`mailto:${personal.email}`}
                className="btn-primary"
                whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1 5l6.5 4L14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Say Hello
              </motion.a>

              <motion.a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </motion.a>
            </motion.div>

            {/* ── Contact form — saves to MongoDB ── */}
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {/* Name + Email row */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text" name="name" placeholder="Your name"
                  value={form.name} onChange={handleChange} required
                  style={{
                    flex: '1 1 140px', padding: '11px 16px', borderRadius: '10px',
                    background: 'rgba(13,17,23,0.75)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e)  => { e.target.style.borderColor = 'rgba(201,162,39,0.4)' }}
                  onBlur={(e)   => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                />
                <input
                  type="email" name="email" placeholder="Your email"
                  value={form.email} onChange={handleChange} required
                  style={{
                    flex: '1 1 140px', padding: '11px 16px', borderRadius: '10px',
                    background: 'rgba(13,17,23,0.75)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e)  => { e.target.style.borderColor = 'rgba(201,162,39,0.4)' }}
                  onBlur={(e)   => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                />
              </div>

              {/* Message */}
              <textarea
                name="message" placeholder="Your message" rows={4}
                value={form.message} onChange={handleChange} required
                style={{
                  padding: '11px 16px', borderRadius: '10px', resize: 'vertical',
                  background: 'rgba(13,17,23,0.75)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none',
                  fontFamily: 'inherit', transition: 'border-color 0.2s',
                }}
                onFocus={(e)  => { e.target.style.borderColor = 'rgba(201,162,39,0.4)' }}
                onBlur={(e)   => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
              />

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </motion.button>

                {status === 'success' && (
                  <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 500 }}>
                    ✓ Message sent!
                  </span>
                )}
                {status === 'error' && (
                  <span style={{ color: '#f87171', fontSize: '0.82rem' }}>{errMsg}</span>
                )}
              </div>
            </motion.form>
          </div>

          {/* ── Right: contact cards ── */}
          <div className="flex flex-col gap-3">
            <ContactCard
              href={`mailto:${personal.email}`}
              label="Email"
              value={personal.email}
              custom={2}
              inView={inView}
              icon={
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <rect x="1.5" y="3.5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1.5 6.5l8 5 8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              }
            />

            <ContactCard
              href={`tel:${personal.phone.replace(/\s/g, '')}`}
              label="Phone"
              value={personal.phone}
              custom={3}
              inView={inView}
              icon={
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M3.5 2.5h3.5l1.5 4-2 1.5a11 11 0 004.5 4.5L12.5 11l4 1.5v3.5a1.5 1.5 0 01-1.5 1.5C6.5 17.5 1.5 12.5 1.5 4A1.5 1.5 0 013 2.5h.5z"
                    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <ContactCard
              href={personal.github}
              label="GitHub"
              value="github.com/adi0tya"
              external
              custom={4}
              inView={inView}
              icon={
                <svg width="19" height="19" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                </svg>
              }
            />

            <ContactCard
              href={personal.linkedin}
              label="LinkedIn"
              value="linkedin.com/in/aditya-dash-421748311"
              external
              custom={5}
              inView={inView}
              icon={
                <svg width="19" height="19" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
