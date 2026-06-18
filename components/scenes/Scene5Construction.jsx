'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

const timeline = [
  { phase: 'Conception', desc: 'Étude de faisabilité, plans architecturaux et ingénierie structurelle.' },
  { phase: 'Planification', desc: 'Gestion de projet rigoureuse, approvisionnement et programmation des travaux.' },
  { phase: 'Construction', desc: 'Exécution avec les meilleures équipes et matériaux rigoureusement sélectionnés.' },
  { phase: 'Livraison', desc: 'Contrôle qualité final et remise des clés dans les délais contractuels.' },
]

export default function Scene5Construction() {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.05])

  // Buildings rise from bottom
  const buildingY = useTransform(scrollYProgress, [0.1, 0.5], ['8%', '0%'])
  const buildingOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])

  // Timeline line grows
  const lineScaleY = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])

  return (
    <section id="construction" ref={containerRef} className="relative min-h-[140vh] overflow-hidden bg-[#0A0A0A] py-32 md:py-44">
      {/* Background construction site */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/chantier.webp"
          alt="Chantier DGS SARL"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]" />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 md:mb-32"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-4">
            Nos activités — 03
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(3.5rem,9vw,8rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            BTP &<br />GÉNIE CIVIL
          </h2>
          <div className="mt-6 w-20 h-px bg-[#CC1418]" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: image rising */}
          <motion.div
            style={{ y: buildingY, opacity: buildingOpacity }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-none">
              <Image
                src="/images/casque.webp"
                alt="DGS SARL — chantier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-4 right-4 glass-rouge p-5"
            >
              <p className="font-heading font-extrabold text-4xl text-[#F4F1EB]">100%</p>
              <p className="font-body text-xs text-[#F4F1EB]/60 tracking-widest uppercase mt-1">
                Projets livrés<br />dans les délais
              </p>
            </motion.div>
          </motion.div>

          {/* Right: timeline */}
          <div ref={timelineRef} className="relative pl-10">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#F4F1EB]/10 origin-top">
              <motion.div
                className="w-full bg-[#CC1418] origin-top"
                style={{ scaleY: lineScaleY, height: '100%' }}
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
                  {/* Dot */}
                  <div className="absolute -left-[42px] top-1.5 w-3 h-3 rounded-full border-2 border-[#CC1418] bg-[#0A0A0A]" />

                  <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#B8966E] mb-2">
                    Phase {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase text-[#F4F1EB] tracking-wide mb-3">
                    {item.phase}
                  </h3>
                  <p className="font-body text-sm text-[#F4F1EB]/50 leading-relaxed max-w-sm">
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
