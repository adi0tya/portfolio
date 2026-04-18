import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

// ── Volumetric light beam ──────────────────────────────────────────────────
function LightBeam({ position, rotation, color, opacity = 0.06 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.opacity = opacity + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.015
  })
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <coneGeometry args={[1.2, 22, 6, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

// ── Sweeping searchlight ───────────────────────────────────────────────────
function SearchLight({ x, speed, startAngle, color = '#c9a84c' }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + startAngle
    ref.current.rotation.z = Math.sin(t) * 0.55
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.08
  })
  return (
    <group ref={ref} position={[x, 6, -18]}>
      <mesh>
        <coneGeometry args={[0.6, 28, 6, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.045} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

// ── City skyline ───────────────────────────────────────────────────────────
function Building({ x, z, w, h, d, emissive = '#0d1525' }) {
  return (
    <mesh position={[x, h / 2 - 10, z]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color="#070910" roughness={1} metalness={0} emissive={emissive} emissiveIntensity={0.4} />
    </mesh>
  )
}

function Skyline() {
  const data = useMemo(() => [
    // front row — closer, taller, more dramatic
    { x: -20, z: -14, w: 2.5, h: 9,  d: 2.0 },
    { x: -16, z: -14, w: 1.8, h: 14, d: 1.8 },
    { x: -12, z: -14, w: 3.0, h: 7,  d: 2.5 },
    { x: -8,  z: -14, w: 2.0, h: 18, d: 2.0 },
    { x: -4,  z: -14, w: 1.5, h: 11, d: 1.5 },
    { x: 0,   z: -14, w: 2.8, h: 22, d: 2.2 },
    { x: 4,   z: -14, w: 1.6, h: 13, d: 1.6 },
    { x: 8,   z: -14, w: 2.2, h: 17, d: 2.0 },
    { x: 12,  z: -14, w: 1.9, h: 8,  d: 1.9 },
    { x: 16,  z: -14, w: 2.4, h: 15, d: 2.0 },
    { x: 20,  z: -14, w: 1.7, h: 10, d: 1.7 },
    // mid row
    { x: -18, z: -20, w: 1.5, h: 12, d: 1.5, emissive: '#0a1020' },
    { x: -10, z: -20, w: 2.0, h: 16, d: 2.0, emissive: '#0a1020' },
    { x: -2,  z: -20, w: 1.8, h: 10, d: 1.8, emissive: '#0a1020' },
    { x: 6,   z: -20, w: 2.5, h: 20, d: 2.5, emissive: '#0a1020' },
    { x: 14,  z: -20, w: 1.6, h: 13, d: 1.6, emissive: '#0a1020' },
    // back row
    { x: -14, z: -28, w: 1.2, h: 18, d: 1.2, emissive: '#080e1a' },
    { x: -4,  z: -28, w: 1.5, h: 14, d: 1.5, emissive: '#080e1a' },
    { x: 4,   z: -28, w: 1.8, h: 22, d: 1.8, emissive: '#080e1a' },
    { x: 12,  z: -28, w: 1.3, h: 16, d: 1.3, emissive: '#080e1a' },
  ], [])

  return (
    <group>
      {data.map((b, i) => <Building key={i} {...b} />)}
    </group>
  )
}

// ── Window lights on buildings ─────────────────────────────────────────────
function WindowLights() {
  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < 120; i++) {
      pts.push(
        (Math.random() - 0.5) * 42,
        (Math.random() - 0.5) * 18 - 2,
        -14 + (Math.random() - 0.5) * 2
      )
    }
    return new Float32Array(pts)
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#c9a84c" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── Floating angular shards ────────────────────────────────────────────────
function Shard({ pos, rot, scale, speed, phase }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = rot[0] + t * speed * 0.4
    ref.current.rotation.y = rot[1] + t * speed * 0.6
    ref.current.position.y = pos[1] + Math.sin(t * speed + phase) * 0.5
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#111520"
        roughness={0.15}
        metalness={0.95}
        emissive="#c9a84c"
        emissiveIntensity={0.12}
      />
    </mesh>
  )
}

function Shards() {
  const data = useMemo(() => [
    { pos: [-7, 1.5, -4],  rot: [0.5, 0.3, 0],   scale: 0.3,  speed: 0.35, phase: 0 },
    { pos: [8,  2,   -6],  rot: [0.2, 0.8, 0.1], scale: 0.22, speed: 0.28, phase: 1 },
    { pos: [-5, -1,  -3],  rot: [0.9, 0.1, 0.4], scale: 0.18, speed: 0.5,  phase: 2 },
    { pos: [6,  3,   -5],  rot: [0.1, 0.5, 0.7], scale: 0.26, speed: 0.32, phase: 3 },
    { pos: [-9, 0.5, -7],  rot: [0.3, 0.7, 0.2], scale: 0.2,  speed: 0.25, phase: 4 },
    { pos: [4,  -2,  -4],  rot: [0.6, 0.2, 0.3], scale: 0.15, speed: 0.45, phase: 5 },
  ], [])
  return <>{data.map((s, i) => <Shard key={i} {...s} />)}</>
}

// ── Abstract angular wing geometry (original, not logo) ────────────────────
function WingGeometry({ side }) {
  const ref = useRef()
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const s = side
    shape.moveTo(0, 0)
    shape.lineTo(s * 6, 2)
    shape.lineTo(s * 10, 0.5)
    shape.lineTo(s * 9, -1.5)
    shape.lineTo(s * 5, -0.8)
    shape.lineTo(s * 2, -2.5)
    shape.lineTo(0, -1)
    shape.closePath()
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 1,
    })
  }, [side])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = -0.5 + Math.sin(t * 0.4 + side) * 0.4
    ref.current.rotation.z = Math.sin(t * 0.25 + side * 0.5) * 0.06
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.04
  })

  return (
    <mesh ref={ref} position={[side * 2, -0.5, -4]} geometry={geo}>
      <meshStandardMaterial
        color="#0e1220"
        roughness={0.2}
        metalness={0.9}
        emissive="#c9a84c"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// ── Atmospheric dust ───────────────────────────────────────────────────────
function Dust({ count = 400 }) {
  const ref = useRef()
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 36
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      vel[i * 3]     = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = Math.random() * 0.001
      vel[i * 3 + 2] = 0
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = -8
      if (Math.abs(pos[i * 3]) > 18) velocities[i * 3] *= -1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#8090b0" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── Ground mist plane ──────────────────────────────────────────────────────
function Mist() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.opacity = 0.22 + Math.sin(state.clock.elapsedTime * 0.25) * 0.05
  })
  return (
    <mesh ref={ref} position={[0, -9, -12]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 60]} />
      <meshBasicMaterial color="#060810" transparent opacity={0.22} depthWrite={false} />
    </mesh>
  )
}

// ── Rim-lit central platform / rooftop ────────────────────────────────────
function Rooftop() {
  return (
    <group position={[0, -9.5, -2]}>
      {/* Main platform */}
      <mesh>
        <boxGeometry args={[12, 0.15, 8]} />
        <meshStandardMaterial color="#0a0c14" roughness={0.6} metalness={0.4} emissive="#0d1525" emissiveIntensity={0.5} />
      </mesh>
      {/* Edge glow strips */}
      <mesh position={[0, 0.1, 4]}>
        <boxGeometry args={[12, 0.04, 0.04]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.1, -4]}>
        <boxGeometry args={[12, 0.04, 0.04]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.4} />
      </mesh>
      <mesh position={[6, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.04, 8]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-6, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.04, 8]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// ── Mouse-reactive camera ──────────────────────────────────────────────────
function CameraRig({ mouse }) {
  const { camera } = useThree()
  const lerp = useRef({ x: 0, y: 0, z: 8 })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Slow cinematic drift
    const driftX = Math.sin(t * 0.12) * 0.3
    const driftY = Math.sin(t * 0.08) * 0.15

    // Mouse parallax
    lerp.current.x += (mouse.current.x * 2.0 + driftX - lerp.current.x) * 0.03
    lerp.current.y += (mouse.current.y * 1.0 + driftY - lerp.current.y) * 0.03

    camera.position.x = lerp.current.x
    camera.position.y = lerp.current.y + 0.5
    camera.position.z = 8 + Math.sin(t * 0.06) * 0.3
    camera.lookAt(0, -0.5, 0)
  })

  return null
}

// ── Scene ──────────────────────────────────────────────────────────────────
function Scene({ mouse }) {
  return (
    <>
      {/* Fog */}
      <fog attach="fog" args={['#050507', 12, 50]} />

      {/* Lighting — cinematic low-key */}
      <ambientLight intensity={0.05} color="#080c18" />
      {/* Key light — gold rim from above */}
      <directionalLight position={[0, 12, -5]} intensity={0.6} color="#c9a84c" />
      {/* Fill — cool blue from side */}
      <directionalLight position={[-15, 4, 5]} intensity={0.25} color="#1a2860" />
      {/* Back rim */}
      <directionalLight position={[0, -3, -20]} intensity={0.3} color="#0a1535" />
      {/* Point lights for drama */}
      <pointLight position={[0, 3, -2]} intensity={2.5} color="#c9a84c" distance={14} decay={2} />
      <pointLight position={[-12, 8, -16]} intensity={1.0} color="#1a3080" distance={30} decay={2} />
      <pointLight position={[12, 6, -14]} intensity={0.8} color="#c9a84c" distance={25} decay={2} />
      <pointLight position={[0, -8, -5]} intensity={0.4} color="#c9a84c" distance={10} decay={2} />

      {/* Stars */}
      <Stars radius={90} depth={60} count={1500} factor={2.5} saturation={0} fade speed={0.4} />

      {/* Gold sparkles */}
      <Sparkles count={60} scale={[18, 8, 12]} size={1.5} speed={0.25} opacity={0.6} color="#c9a84c" />

      {/* Scene geometry */}
      <Skyline />
      <WindowLights />
      <Rooftop />
      <WingGeometry side={1} />
      <WingGeometry side={-1} />
      <Shards />
      <Dust count={350} />
      <Mist />

      {/* Searchlights */}
      <SearchLight x={-10} speed={0.3}  startAngle={0}        color="#c9a84c" />
      <SearchLight x={10}  speed={0.22} startAngle={Math.PI}  color="#8090d0" />
      <SearchLight x={0}   speed={0.18} startAngle={1.5}      color="#c9a84c" />

      {/* Volumetric beams from above */}
      <LightBeam position={[-6, 8, -10]} rotation={[0.1, 0, 0.3]}  color="#c9a84c" opacity={0.04} />
      <LightBeam position={[6, 8, -12]}  rotation={[0.1, 0, -0.3]} color="#8090d0" opacity={0.03} />

      <CameraRig mouse={mouse} />
    </>
  )
}

// ── Canvas export ──────────────────────────────────────────────────────────
export default function GothamScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 8], fov: 58, near: 0.1, far: 120 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows={false}
      dpr={[1, 1.5]}
      style={{ background: '#050507' }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
