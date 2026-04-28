import { useRef, Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../../data/portfolio'

const GothamScene = lazy(() => import('../three/GothamScene'))

function HeroFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: [
          'radial-gradient(ellipse 100% 70% at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 55%)',
          'radial-gradient(ellipse 60% 80% at 15% 90%, rgba(20,35,80,0.5) 0%, transparent 60%)',
          'radial-gradient(ellipse 60% 80% at 85% 90%, rgba(20,35,80,0.4) 0%, transparent 60%)',
          'linear-gradient(180deg, #050507 0%, #07090f 60%, #050507 100%)',
        ].join(', '),
      }}
    />
  )
}

// Typewriter for role
function TypedRole({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(timer)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && (
        <span
          className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
          style={{ background: 'var(--gold)' }}
        />
      )}
    </span>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '640px' }}
      onMouseMove={onMouseMove}
    >
      {/* 3D canvas */}
      <div className="hero-canvas-wrapper absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={<HeroFallback />}>
          <GothamScene mouse={mouse} />
        </Suspense>
      </div>

      {/* Mobile fallback */}
      <div className="hero-fallback hidden absolute inset-0" style={{ zIndex: 0 }}>
        <HeroFallback />
      </div>

      {/* Cinematic vignette + bottom fade */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(5,7,10,0.6) 100%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(5,7,10,0.3) 0%, transparent 20%, transparent 60%, rgba(5,7,10,0.97) 100%)'
      }} />
      {/* Center text readability scrim */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
        background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(5,7,10,0.45) 0%, transparent 100%)'
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 10 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
          style={{ gap: '20px', maxWidth: '720px' }}
        >
          {/* Hello line */}
          <motion.p
            variants={item}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.12em',
              fontWeight: 400,
            }}
          >
            Hello, I'm
          </motion.p>

          {/* Name — massive */}
          <motion.h1
            variants={item}
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(160deg, #ffffff 0%, #e8c97a 40%, #c9a84c 70%, #8a6820 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {personal.name}
          </motion.h1>

          {/* Role with lines */}
          <motion.div variants={item} className="flex items-center gap-4">
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.5)' }} />
            <span style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--silver)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              <TypedRole text={personal.role} />
            </span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.5)' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '540px',
              fontWeight: 400,
            }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mt-1" style={{ maxWidth: '100%' }}>
            <button className="btn-primary" onClick={() => scrollTo('#projects')}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              See My Work
            </button>
            <a href="/Adi-cv.pdf" download className="btn-secondary">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1v9M5 7.5l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.5 11.5v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Resume
            </a>
            <button className="btn-secondary" onClick={() => scrollTo('#contact')}>
              Contact Me
            </button>
          </motion.div>

          {/* Available badge */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#4ade80',
                letterSpacing: '0.06em',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for Internships & Collaborations
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '24px', height: '38px',
            border: '1.5px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div style={{ width: '3px', height: '8px', borderRadius: '2px', background: 'var(--gold)', opacity: 0.7 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
