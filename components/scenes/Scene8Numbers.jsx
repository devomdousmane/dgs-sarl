'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const metrics = [
  { value: 500, suffix: '+', label: 'Logements construits', unit: 'unités' },
  { value: 12, suffix: '+', label: 'Projets livrés', unit: 'projets' },
  { value: 200, suffix: '+', label: 'Clients satisfaits', unit: 'clients' },
  { value: 100, suffix: '%', label: 'Satisfaction garantie', unit: 'qualité' },
]

const floatingNums = ['873', '500+', '2023', '12+', '∞', '100%', '04']

export default function Scene8Numbers() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#111111] py-36 md:py-48 overflow-hidden">
      {/* Floating numbers background */}
      <motion.div className="absolute inset-0 pointer-events-none select-none" style={{ opacity: bgOpacity }}>
        {floatingNums.map((num, i) => (
          <div
            key={i}
            className="absolute font-heading font-extrabold text-[#F4F1EB]/[0.02] select-none"
            style={{
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

      {/* Ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-[#CC1418]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-5">
            L'impact DGS SARL
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            EN CHIFFRES
          </h2>
        </motion.div>

        {/* Metrics grid — luxury dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F4F1EB]/5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-[#111111] p-10 md:p-12 group"
            >
              <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#B8966E] mb-6">
                {m.unit}
              </p>
              <div className="font-heading font-extrabold text-[clamp(3.5rem,6vw,6rem)] leading-none tracking-tight text-[#F4F1EB] mb-4">
                <CountUp target={m.value} suffix={m.suffix} />
              </div>
              <p className="font-body text-sm text-[#F4F1EB]/45 leading-relaxed">
                {m.label}
              </p>
              <div className="mt-6 w-0 h-px bg-[#CC1418] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="font-display italic text-[clamp(1.2rem,2.5vw,2rem)] text-[#F4F1EB]/40 font-light">
            « Chaque projet est une promesse tenue. »
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
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

  return <span ref={ref}>{count}{suffix}</span>
}
