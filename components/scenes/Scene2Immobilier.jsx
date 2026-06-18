'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

const cards = [
  { title: 'Promotion Immobilière', desc: 'Des programmes résidentiels modernes conçus pour durer, de la conception à la livraison.', icon: '01' },
  { title: 'Résidences Modernes', desc: "Architecture contemporaine, matériaux premium et finitions soignées pour un habitat d'exception.", icon: '02' },
  { title: 'Investissements Sécurisés', desc: 'Valorisez votre patrimoine avec des projets solides, transparents et rentables.', icon: '03' },
  { title: 'Terrains & Villas', desc: 'Une sélection exclusive de terrains viabilisés et de villas sur mesure à Conakry.', icon: '04' },
]

export default function Scene2Immobilier() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1.12])

  // Section title reveal
  const titleX = useTransform(scrollYProgress, [0.08, 0.38], ['-60px', '0px'])
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.38], [0, 1])

  return (
    <section id="immobilier" ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] py-32 md:py-44 overflow-hidden">
      {/* Background building image with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/render.webp"
          alt="Résidence DGS SARL"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14">
        {/* Section header */}
        <motion.div style={{ x: titleX, opacity: titleOpacity }} className="mb-20 md:mb-32">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-4">
            Nos activités — 01
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(3.5rem,9vw,8rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            IMMOBILIER
          </h2>
          <div className="mt-6 w-20 h-px bg-[#CC1418]" />
          <p className="mt-8 font-body text-base md:text-lg text-[#F4F1EB]/50 max-w-lg leading-relaxed">
            De la promotion immobilière aux résidences sur mesure, DGS SARL construit la Guinée de demain, logement par logement.
          </p>
        </motion.div>

        {/* Cards grid — staggered depth reveal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {cards.map((card, i) => (
            <CardReveal key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Large image reveal */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative"
        >
          <div className="relative aspect-[16/7] overflow-hidden">
            <Image
              src="/images/render.webp"
              alt="Immeuble résidentiel DGS SARL"
              fill
              sizes="100vw"
              className="object-cover object-top hover:scale-[1.03] transition-transform duration-[1400ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#B8966E] mb-2">Réalisation DGS SARL</p>
              <p className="font-heading font-bold text-2xl md:text-3xl text-[#F4F1EB] uppercase tracking-wide">
                Résidence Moderne — Conakry
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CardReveal({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 1.1,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass p-6 md:p-8 group cursor-none"
    >
      <p className="font-display text-[#CC1418] text-3xl mb-6 tracking-wider">{card.icon}</p>
      <h3 className="font-heading font-bold text-lg md:text-xl uppercase text-[#F4F1EB] tracking-wide mb-3 group-hover:text-[#B8966E] transition-colors duration-300">
        {card.title}
      </h3>
      <p className="font-body text-sm text-[#F4F1EB]/50 leading-relaxed">{card.desc}</p>
      <div className="mt-6 w-8 h-px bg-[#CC1418] group-hover:w-16 transition-all duration-500" />
    </motion.div>
  )
}
