'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Image from 'next/image'

interface TimelineItem {
  phase: string
  desc: string
}

const timeline: TimelineItem[] = [
  { phase: 'Conception', desc: 'Étude de faisabilité, plans architecturaux et ingénierie structurelle.' },
  { phase: 'Planification', desc: 'Gestion de projet rigoureuse, approvisionnement et programmation des travaux.' },
  { phase: 'Construction', desc: 'Exécution avec les meilleures équipes et matériaux rigoureusement sélectionnés.' },
  { phase: 'Livraison', desc: 'Contrôle qualité final et remise des clés dans les délais contractuels.' },
]

export default function Scene5Construction() {
  const containerRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['-10%', '10%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], shouldReduce ? [1, 1] : [1.1, 1.05])
  const buildingY = useTransform(scrollYProgress, [0.1, 0.5], shouldReduce ? ['0%', '0%'] : ['8%', '0%'])
  const buildingOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const lineScaleY = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])

  return (
    <section
      id="construction"
      ref={containerRef}
      className="bg-theme relative z-10 min-h-[140vh] overflow-hidden py-32 md:py-44"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/chantier.webp"
          alt="Chantier DGS SARL"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="bg-gradient-section absolute inset-0" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 md:mb-32"
        >
          <p className="font-body mb-4 text-[10px] tracking-[0.4em] text-[#B8966E] uppercase">
            Nos activités — 03
          </p>
          <h2 className="font-heading text-fg text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] font-extrabold tracking-tight uppercase">
            BTP &amp;<br />GÉNIE CIVIL
          </h2>
          <div className="mt-6 h-px w-20 bg-[#CC1418]" />
        </motion.div>

        <div className="grid items-start gap-16 md:gap-24 lg:grid-cols-2">
          <motion.div style={{ y: buildingY, opacity: buildingOpacity }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/casque.webp"
                alt="DGS SARL — chantier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="glass-rouge absolute bottom-4 right-4 p-5"
            >
              <p className="font-heading text-fg text-4xl font-extrabold">100%</p>
              <p className="font-body text-fg-muted mt-1 text-xs uppercase tracking-widest">
                Projets livrés<br />dans les délais
              </p>
            </motion.div>
          </motion.div>

          <div ref={timelineRef} className="relative pl-10">
            <div className="border-theme absolute top-0 bottom-0 left-0 w-px origin-top">
              <motion.div
                className="h-full w-full origin-top bg-[#CC1418]"
                style={{ scaleY: lineScaleY }}
              />
            </div>

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.0, delay: i * 0.18 }}
                  className="relative"
                >
                  <div className="bg-theme absolute -left-[42px] top-1.5 h-3 w-3 rounded-full border-2 border-[#CC1418]" />
                  <p className="font-body mb-2 text-[9px] tracking-[0.35em] text-[#B8966E] uppercase">
                    Phase {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-heading text-fg mb-3 text-2xl font-bold uppercase tracking-wide md:text-3xl">
                    {item.phase}
                  </h3>
                  <p className="font-body text-fg-muted max-w-sm text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
