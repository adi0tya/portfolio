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
      <GoldDust count={120} />
      <AmbientDust count={50} />
      <LightBeam x={-5}  speed={0.18} startAngle={0}        color="#c9a227" opacity={0.025} />
      <LightBeam x={5}   speed={0.14} startAngle={Math.PI}  color="#8090d0" opacity={0.018} />
      <LightBeam x={0}   speed={0.1}  startAngle={1.2}      color="#c9a227" opacity={0.015} />
      <HazePlane />
    </Canvas>
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
