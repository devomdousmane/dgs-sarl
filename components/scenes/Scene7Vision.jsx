'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

const words = ['Construire', "aujourd’hui,", 'bâtir', 'durablement', 'demain.']

export default function Scene7Vision() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1.02])

  return (
    <section ref={containerRef} className="relative min-h-[130vh] overflow-hidden bg-[#0A0A0A] flex items-center py-32 md:py-40">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/equipe.webp"
          alt="L'équipe DGS SARL"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]" />
      </motion.div>

      {/* Ambient light orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#CC1418]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-body text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-16"
        >
          Notre vision
        </motion.p>

        {/* Word-by-word reveal */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-20">
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
              className={`font-display font-light text-[clamp(2.5rem,6vw,6.5rem)] leading-[1.05] italic ${
                i >= 3 ? 'text-[#B8966E]' : 'text-[#F4F1EB]'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="origin-left mb-16"
        >
          <div className="hr-luxury" />
        </motion.div>

        {/* Bottom context text */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-base md:text-lg text-[#F4F1EB]/50 leading-relaxed"
          >
            Devenir le groupe de référence en BTP, immobilier et automobile en Guinée — en intégrant l'ensemble de la chaîne de valeur.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body text-base md:text-lg text-[#F4F1EB]/50 leading-relaxed"
          >
            DGS ambitionne de se structurer en holding multi-métiers, avec des filiales spécialisées, agiles et complémentaires.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
