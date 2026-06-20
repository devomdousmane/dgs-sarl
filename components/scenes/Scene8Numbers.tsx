'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface Metric {
  value: number
  suffix: string
  label: string
  unit: string
}

interface CountUpProps {
  target: number
  suffix: string
}

const metrics: Metric[] = [
  { value: 500, suffix: '+', label: 'Logements construits', unit: 'unités' },
  { value: 12, suffix: '+', label: 'Projets livrés', unit: 'projets' },
  { value: 200, suffix: '+', label: 'Clients satisfaits', unit: 'clients' },
  { value: 100, suffix: '%', label: 'Satisfaction garantie', unit: 'qualité' },
]

const floatingNums = ['873', '500+', '2023', '12+', '∞', '100%', '04']

export default function Scene8Numbers() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="bg-theme-2 relative z-10 min-h-screen overflow-hidden py-36 md:py-48"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-[var(--bg-2)] to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-0 select-none"
        style={{ opacity: bgOpacity }}
      >
        {floatingNums.map((num, i) => (
          <div
            key={i}
            className="font-heading text-fg absolute select-none font-extrabold"
            style={{
              opacity: 0.03,
              fontSize: `clamp(4rem, ${8 + i * 2}vw, 14rem)`,
              left: `${(i * 17) % 90}%`,
              top: `${(i * 23) % 80}%`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {num}
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CC1418]/4 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.4em] text-[#B8966E] uppercase">
            L'impact DGS SARL
          </p>
          <h2 className="font-heading text-fg text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-extrabold tracking-tight uppercase">
            EN CHIFFRES
          </h2>
        </motion.div>

        <div className="bg-border grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-theme-2 group p-10 md:p-12"
            >
              <p className="font-body mb-6 text-[9px] tracking-[0.35em] text-[#B8966E] uppercase">
                {m.unit}
              </p>
              <div className="font-heading text-fg mb-4 text-[clamp(3.5rem,6vw,6rem)] leading-none font-extrabold tracking-tight">
                <CountUp target={m.value} suffix={m.suffix} />
              </div>
              <p className="font-body text-fg-muted text-sm leading-relaxed">{m.label}</p>
              <div className="mt-6 h-px w-0 bg-[#CC1418] transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-fg-subtle text-[clamp(1.2rem,2.5vw,2rem)] font-light italic">
            « Chaque projet est une promesse tenue. »
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function CountUp({ target, suffix }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const dur = 2200
          const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 4)
            setCount(Math.floor(ease * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
