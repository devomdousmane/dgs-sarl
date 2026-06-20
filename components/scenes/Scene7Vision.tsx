'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Image from 'next/image'

const words = ['Construire', "aujourd'hui,", 'bâtir', 'durablement', 'demain.']

export default function Scene7Vision() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['-6%', '6%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], shouldReduce ? [1, 1] : [1.08, 1.02])

  return (
    <section
      ref={containerRef}
      className="bg-theme relative z-10 flex min-h-[130vh] items-center overflow-hidden py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/equipe.webp"
          alt="L'équipe DGS SARL"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="bg-gradient-section absolute inset-0" />
      </motion.div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CC1418]/3 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-body mb-16 text-[10px] tracking-[0.4em] text-[#B8966E] uppercase"
        >
          Notre vision
        </motion.p>

        <div className="mb-20 flex flex-wrap gap-x-5 gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`font-display text-[clamp(2.5rem,6vw,6.5rem)] font-light italic leading-[1.05] ${
                i >= 3 ? 'text-[#B8966E]' : 'text-fg'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mb-16 origin-left"
        >
          <div className="hr-luxury" />
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-fg-muted text-base leading-relaxed md:text-lg"
          >
            Devenir le groupe de référence en BTP, immobilier et automobile en Guinée — en intégrant
            l'ensemble de la chaîne de valeur.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-fg-muted text-base leading-relaxed md:text-lg"
          >
            DGS ambitionne de se structurer en holding multi-métiers, avec des filiales spécialisées,
            agiles et complémentaires.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
