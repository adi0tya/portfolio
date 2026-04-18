import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ── Abstract cinematic blade shards — original geometry, not copyrighted ──
// Dark metallic angular forms with gold edges, inspired by cinematic mood
const SHARDS = [
  // { x%, y%, w, h, rot, skewX, dir, speed, opacity }
  // Large sweeping blades
  { x: -15, y: 38, w: 340, h: 14, rot: -18, skew: 14,  dir:  1, speed: 1.0, peak: 0.85 },
  { x:  80, y: 55, w: 300, h: 11, rot:  22, skew: -12, dir: -1, speed: 0.8, peak: 0.80 },
  { x:  10, y: 62, w: 380, h: 8,  rot: -12, skew:  8,  dir:  1, speed: 1.2, peak: 0.70 },
  { x:  55, y: 32, w: 260, h: 16, rot:  16, skew: -16, dir: -1, speed: 0.9, peak: 0.90 },
  // Medium blades
  { x: -10, y: 70, w: 220, h: 10, rot: -26, skew:  18, dir:  1, speed: 0.7, peak: 0.65 },
  { x:  70, y: 28, w: 200, h: 12, rot:  28, skew: -10, dir: -1, speed: 1.1, peak: 0.75 },
  { x:  30, y: 48, w: 280, h: 7,  rot: -10, skew:   6, dir:  1, speed: 1.3, peak: 0.60 },
  { x:  45, y: 75, w: 180, h: 9,  rot:  32, skew: -20, dir: -1, speed: 0.65, peak: 0.55 },
  // Fine accent shards
  { x:   5, y: 44, w: 160, h: 5,  rot: -20, skew:  10, dir:  1, speed: 1.5, peak: 0.50 },
  { x:  85, y: 65, w: 140, h: 6,  rot:  24, skew:  -8, dir: -1, speed: 0.6, peak: 0.45 },
  { x:  25, y: 82, w: 200, h: 4,  rot: -14, skew:  12, dir:  1, speed: 1.0, peak: 0.40 },
]

function Shard({ shard, scrollYProgress }) {
  const { x, y, w, h, rot, skew, dir, speed, peak } = shard

  // Horizontal travel — shards sweep across as you scroll
  const xPx = useTransform(
    scrollYProgress,
    [0, 1],
    [dir * -160 * speed, dir * 160 * speed]
  )
  const springX = useSpring(xPx, { stiffness: 55, damping: 22, mass: 0.8 })

  // Opacity — fade in, peak at center, fade out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.45, 0.72, 1],
    [0, peak * 0.6, peak, peak * 0.6, 0]
  )

  // Blur — sharp at center, blurry at edges
  const blurPx = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [8, 1.5, 0, 1.5, 8]
  )

  // Slight vertical drift for parallax depth
  const yDrift = useTransform(scrollYProgress, [0, 1], [-8 * speed, 8 * speed])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}px`,
        height: `${h}px`,
        x: springX,
        y: yDrift,
        opacity,
        filter: blurPx,
        rotate: rot,
        skewX: skew,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        // Matte black metallic core with gold shimmer edge
        background: `linear-gradient(
          ${95 + rot * 0.5}deg,
          rgba(5,7,10,0.98)   0%,
          rgba(14,18,28,0.92) 30%,
          rgba(201,162,39,0.18) 48%,
          rgba(232,201,122,0.22) 50%,
          rgba(201,162,39,0.18) 52%,
          rgba(14,18,28,0.92) 70%,
          rgba(5,7,10,0.98)   100%
        )`,
        boxShadow: `
          0 0 ${h * 2}px rgba(201,162,39,0.06),
          0 0 ${h}px rgba(201,162,39,0.04),
          inset 0 1px 0 rgba(201,162,39,0.2),
          inset 0 -1px 0 rgba(0,0,0,0.6)
        `,
        borderRadius: '1px',
      }}
    />
  )
}

export default function ShardTransition({ id = 'shard-transition' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Center glow line opacity
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.6, 1, 0.6, 0]
  )
  // Glow pulse width
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <div
      ref={ref}
      id={id}
      aria-hidden="true"
      style={{
        position: 'relative',
        height: '140px',
        overflow: 'hidden',
        pointerEvents: 'none',
        // Very subtle dark gradient so shards read against it
        background: 'linear-gradient(180deg, transparent 0%, rgba(5,7,10,0.25) 40%, rgba(5,7,10,0.25) 60%, transparent 100%)',
      }}
    >
      {/* All shards */}
      {SHARDS.map((s, i) => (
        <Shard key={i} shard={s} scrollYProgress={scrollYProgress} />
      ))}

      {/* Center horizontal glow line */}
      <motion.div
        style={{
          position: 'absolute',
          left: '5%',
          right: '5%',
          top: '50%',
          height: '1px',
          translateY: '-50%',
          scaleX: lineScale,
          opacity: lineOpacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.2) 15%, rgba(201,162,39,0.55) 35%, rgba(232,201,122,0.8) 50%, rgba(201,162,39,0.55) 65%, rgba(201,162,39,0.2) 85%, transparent 100%)',
          transformOrigin: 'center',
          boxShadow: '0 0 8px rgba(201,162,39,0.3), 0 0 20px rgba(201,162,39,0.12)',
        }}
      />

      {/* Secondary faint line above */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20%',
          right: '20%',
          top: 'calc(50% - 12px)',
          height: '1px',
          translateY: '-50%',
          opacity: useTransform(lineOpacity, (v) => v * 0.3),
          background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.25) 40%, rgba(201,162,39,0.25) 60%, transparent)',
        }}
      />

      {/* Secondary faint line below */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20%',
          right: '20%',
          top: 'calc(50% + 12px)',
          height: '1px',
          translateY: '-50%',
          opacity: useTransform(lineOpacity, (v) => v * 0.3),
          background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.25) 40%, rgba(201,162,39,0.25) 60%, transparent)',
        }}
      />
    </div>
  )
}
