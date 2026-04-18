import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { personal } from '../../data/portfolio'

// ── Gold dust particles ────────────────────────────────────────────────────
function GoldDust({ count = 200 }) {
  const ref = useRef()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
      vel[i * 3]     = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = Math.random() * 0.0015 + 0.0005
      vel[i * 3 + 2] = 0
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      // Wrap vertically
      if (pos[i * 3 + 1] > 4)  pos[i * 3 + 1] = -4
      // Bounce horizontally
      if (Math.abs(pos[i * 3]) > 12) vel[i * 3] *= -1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055} color="#c9a227" transparent opacity={0.55}
        sizeAttenuation depthWrite={false}
      />
    </points>
  )
}

// ── Silver/blue ambient dust ───────────────────────────────────────────────
function AmbientDust({ count = 80 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 28
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03} color="#8090b0" transparent opacity={0.3}
        sizeAttenuation depthWrite={false}
      />
    </points>
  )
}

// ── Sweeping light beam ────────────────────────────────────────────────────
function LightBeam({ x, speed, startAngle, color = '#c9a227', opacity = 0.022 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * speed + startAngle) * 0.35
    ref.current.rotation.x = Math.sin(t * speed * 0.4) * 0.06
  })
  return (
    <group ref={ref} position={[x, 4, -6]}>
      <mesh>
        <coneGeometry args={[0.6, 16, 6, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

// ── Ground haze plane ──────────────────────────────────────────────────────
function HazePlane() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03
  })
  return (
    <mesh ref={ref} position={[0, -4, -4]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 20]} />
      <meshBasicMaterial color="#060810" transparent opacity={0.12} depthWrite={false} />
    </mesh>
  )
}

// ── Footer 3D canvas ───────────────────────────────────────────────────────
function FooterCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 58 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <fog attach="fog" args={['#05070a', 6, 20]} />
      <ambientLight intensity={0.04} color="#080c18" />
      <pointLight position={[0, 2, 0]}   intensity={1.2} color="#c9a227" distance={12} decay={2} />
      <pointLight position={[-8, 4, -8]} intensity={0.5} color="#1a2860" distance={20} decay={2} />
      <pointLight position={[8, 3, -6]}  intensity={0.4} color="#c9a227" distance={16} decay={2} />
      <GoldDust count={200} />
      <AmbientDust count={80} />
      <LightBeam x={-5}  speed={0.18} startAngle={0}        color="#c9a227" opacity={0.025} />
      <LightBeam x={5}   speed={0.14} startAngle={Math.PI}  color="#8090d0" opacity={0.018} />
      <LightBeam x={0}   speed={0.1}  startAngle={1.2}      color="#c9a227" opacity={0.015} />
      <HazePlane />
    </Canvas>
  )
}

// ── Social icon ────────────────────────────────────────────────────────────
function SocialIcon({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.14, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.9 }}
      style={{
        color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '38px', height: '38px', borderRadius: '10px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'color 0.2s, background 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--gold)'
        e.currentTarget.style.background = 'rgba(201,162,39,0.1)'
        e.currentTarget.style.borderColor = 'rgba(201,162,39,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      {children}
    </motion.a>
  )
}

// ── Main footer ────────────────────────────────────────────────────────────
export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  const navLinks = [
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume',   href: '#resume' },
    { label: 'Contact',  href: '#contact' },
  ]

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        minHeight: '200px',
      }}
    >
      {/* 3D atmosphere — activates on scroll into view */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {inView && <FooterCanvas />}
      </motion.div>

      {/* Gradient overlay — keeps text readable */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(5,7,10,0.72) 0%, rgba(5,7,10,0.88) 100%)',
      }} />

      {/* Top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.2) 30%, rgba(201,162,39,0.35) 50%, rgba(201,162,39,0.2) 70%, transparent)',
      }} />

      {/* Content */}
      <div
        className="section-container"
        style={{ position: 'relative', zIndex: 2, paddingTop: '44px', paddingBottom: '36px' }}
      >
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '20px', marginBottom: '28px',
          }}
        >
          {/* Brand */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: '1.05rem', letterSpacing: '0.06em', color: 'var(--gold)',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            {personal.name}
          </motion.button>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '5px 11px', borderRadius: '6px',
                  fontSize: '0.8rem', color: 'var(--text-muted)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'color 0.18s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <SocialIcon href={personal.github} label="GitHub">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={personal.linkedin} label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={`mailto:${personal.email}`} label="Email">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M1 5.5l7 4 7-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </SocialIcon>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '18px',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '10px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
            © {new Date().getFullYear()} {personal.name} · {personal.location}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
            Built with React, Three.js &amp; Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
