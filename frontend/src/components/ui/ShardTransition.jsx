import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Shards defined as % of container width so they never overflow on mobile
const SHARDS = [
  { xPct: -5,  yPct: 38, wPct: 55, h: 10, rot: -18, skew: 14,  dir:  1, speed: 1.0, peak: 0.80 },
  { xPct:  55, yPct: 55, wPct: 48, h:  8, rot:  22, skew: -12, dir: -1, speed: 0.8, peak: 0.75 },
  { xPct:   5, yPct: 62, wPct: 60, h:  6, rot: -12, skew:  8,  dir:  1, speed: 1.1, peak: 0.65 },
  { xPct:  40, yPct: 32, wPct: 42, h: 12, rot:  16, skew: -16, dir: -1, speed: 0.9, peak: 0.85 },
  { xPct:  -5, yPct: 70, wPct: 36, h:  7, rot: -26, skew:  18, dir:  1, speed: 0.7, peak: 0.60 },
  { xPct:  60, yPct: 28, wPct: 32, h:  9, rot:  28, skew: -10, dir: -1, speed: 1.0, peak: 0.70 },
  { xPct:  20, yPct: 48, wPct: 44, h:  5, rot: -10, skew:   6, dir:  1, speed: 1.2, peak: 0.55 },
]

function Shard({ shard, scrollYProgress }) {
  const { xPct, yPct, wPct, h, rot, skew, dir, speed, peak } = shard

  const xMove = useTransform(
    scrollYProgress,
    [0, 1],
    [`${xPct + dir * -12 * speed}%`, `${xPct + dir * 12 * speed}%`]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, peak * 0.5, peak, peak * 0.5, 0]
  )

  const yDrift = useTransform(scrollYProgress, [0, 1], ['-6px', '6px'])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: `${wPct}%`,
        height: `${h}px`,
        x: xMove,
        y: yDrift,
        opacity,
        rotate: rot,
        skewX: skew,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        background: `linear-gradient(
          ${95 + rot * 0.5}deg,
          rgba(5,7,10,0.95)   0%,
          rgba(14,18,28,0.9)  30%,
          rgba(201,162,39,0.2) 50%,
          rgba(14,18,28,0.9)  70%,
          rgba(5,7,10,0.95)   100%
        )`,
        boxShadow: `inset 0 1px 0 rgba(201,162,39,0.18)`,
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

  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.5, 0.9, 0.5, 0]
  )

  return (
    <div
      ref={ref}
      id={id}
      aria-hidden="true"
      style={{
        position: 'relative',
        height: '120px',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent 0%, rgba(5,7,10,0.2) 50%, transparent 100%)',
      }}
    >
      {SHARDS.map((s, i) => (
        <Shard key={i} shard={s} scrollYProgress={scrollYProgress} />
      ))}

      {/* Center glow line */}
      <motion.div
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: '50%',
          height: '1px',
          translateY: '-50%',
          opacity: lineOpacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.2) 15%, rgba(232,201,122,0.7) 50%, rgba(201,162,39,0.2) 85%, transparent 100%)',
          boxShadow: '0 0 8px rgba(201,162,39,0.25)',
        }}
      />
    </div>
  )
}
