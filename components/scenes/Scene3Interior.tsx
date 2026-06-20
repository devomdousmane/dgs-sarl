'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Image from 'next/image'

interface Stat {
  value: number
  suffix: string
  label: string
}

interface AnimatedCountProps {
  target: number
  suffix: string
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Logements construits' },
  { value: 12, suffix: '+', label: 'Projets livrés' },
  { value: 200, suffix: '+', label: 'Clients satisfaits' },
  { value: 2023, suffix: '', label: 'Fondée à Conakry' },
]

export default function Scene3Interior() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imgScale = useTransform(scrollYProgress, [0, 0.6], shouldReduce ? [1, 1] : [1.0, 1.18])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6])
  const fgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['-5%', '5%'])

  return (
    <section ref={containerRef} className="bg-theme relative z-10 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-48 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      <motion.div
        className="absolute inset-0"
        style={{ scale: imgScale, opacity: imgOpacity }}
      >
        <Image
          src="/images/partenariat.webp"
          alt="DGS SARL — partenariat et conception"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div className="bg-theme absolute inset-0 opacity-70" />
      </motion.div>

      <motion.div
        className="bg-gradient-section pointer-events-none absolute inset-0 z-10"
        style={{ y: fgY }}
      />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-6 py-36 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl"
        >
          <p className="font-body mb-6 text-[10px] tracking-[0.4em] text-[#B8966E] uppercase">
            Notre engagement
          </p>
          <h2 className="font-display text-fg text-[clamp(2rem,5vw,4rem)] font-light italic leading-tight">
            Des espaces conçus<br />
            <span className="text-[#B8966E]">pour durer.</span>
          </h2>
          <p className="font-body text-fg-muted mt-6 text-base leading-relaxed">
            Chaque projet que nous prenons en charge est une promesse tenue, celle de la qualité, de
            la rigueur et de l'excellence — de la fondation jusqu'à la remise des clés.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-left"
            >
              <div className="font-heading text-fg mb-2 text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-extrabold tracking-tight">
                <AnimatedCount target={s.value} suffix={s.suffix} />
              </div>
              <p className="font-body text-fg-subtle text-xs uppercase tracking-widest">{s.label}</p>
              <div className="mt-3 h-px w-6 bg-[#CC1418]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCount({ target, suffix }: AnimatedCountProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const start = Date.now()
          const animate = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}
