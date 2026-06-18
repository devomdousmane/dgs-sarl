'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

const stats = [
  { value: 500, suffix: '+', label: 'Logements construits' },
  { value: 12, suffix: '+', label: 'Projets livrés' },
  { value: 200, suffix: '+', label: 'Clients satisfaits' },
  { value: 2023, suffix: '', label: 'Fondée à Conakry' },
]

export default function Scene3Interior() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Camera zoom effect
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.0, 1.18])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6])

  // Foreground parallax (faster)
  const fgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Full-screen background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imgScale, opacity: imgOpacity }}
      >
        <Image
          src="/images/partenariat.webp"
          alt="DGS SARL — partenariat et conception"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
      </motion.div>

      {/* Foreground parallax layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/80 pointer-events-none z-10"
        style={{ y: fgY }}
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center px-6 md:px-14 py-36 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-6">
            Notre engagement
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] italic font-light text-[#F4F1EB] leading-tight">
            Des espaces conçus<br />
            <span className="text-[#B8966E]">pour durer.</span>
          </h2>
          <p className="mt-6 font-body text-base text-[#F4F1EB]/55 leading-relaxed">
            Chaque projet que nous prenons en charge est une promesse tenue, celle de la qualité, de la rigueur et de l'excellence — de la fondation jusqu'à la remise des clés.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-left"
            >
              <div className="font-heading font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-[#F4F1EB] tracking-tight mb-2">
                <AnimatedCount target={s.value} suffix={s.suffix} />
              </div>
              <p className="font-body text-xs text-[#F4F1EB]/45 tracking-widest uppercase">
                {s.label}
              </p>
              <div className="mt-3 w-6 h-px bg-[#CC1418]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCount({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
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
