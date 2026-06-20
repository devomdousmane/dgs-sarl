'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

interface Card {
  title: string
  desc: string
  icon: string
}

interface CardRevealProps {
  card: Card
  index: number
}

const cards: Card[] = [
  {
    title: 'Promotion Immobilière',
    desc: 'Des programmes résidentiels modernes conçus pour durer, de la conception à la livraison.',
    icon: '01',
  },
  {
    title: 'Résidences Modernes',
    desc: "Architecture contemporaine, matériaux premium et finitions soignées pour un habitat d'exception.",
    icon: '02',
  },
  {
    title: 'Investissements Sécurisés',
    desc: 'Valorisez votre patrimoine avec des projets solides, transparents et rentables.',
    icon: '03',
  },
  {
    title: 'Terrains & Villas',
    desc: 'Une sélection exclusive de terrains viabilisés et de villas sur mesure à Conakry.',
    icon: '04',
  },
]

export default function Scene2Immobilier() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1.12])
  const titleX = useTransform(scrollYProgress, [0.08, 0.38], ['-60px', '0px'])
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.38], [0, 1])

  return (
    <section
      id="immobilier"
      ref={containerRef}
      className="bg-theme relative z-10 min-h-screen overflow-hidden py-32 md:py-44"
    >
      {/* Gradient de transition depuis Scene1 — couvre le haut de section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/render.webp"
          alt="Résidence DGS SARL"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20"
        />
        <div className="bg-gradient-section absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div style={{ x: titleX, opacity: titleOpacity }} className="mb-20 md:mb-32">
          <p className="font-body mb-4 text-[10px] tracking-[0.4em] text-[#B8966E] uppercase">
            Nos activités — 01
          </p>
          <h2 className="font-heading text-fg text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] font-extrabold tracking-tight uppercase">
            IMMOBILIER
          </h2>
          <div className="mt-6 h-px w-20 bg-[#CC1418]" />
          <p className="font-body text-fg-muted mt-8 max-w-lg text-base leading-relaxed md:text-lg">
            De la promotion immobilière aux résidences sur mesure, DGS SARL construit la Guinée de
            demain, logement par logement.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {cards.map((card, i) => (
            <CardReveal key={card.title} card={card} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20"
        >
          <div className="relative aspect-[16/7] overflow-hidden">
            <Image
              src="/images/render.webp"
              alt="Immeuble résidentiel DGS SARL"
              fill
              sizes="100vw"
              className="object-cover object-top transition-transform duration-[1400ms] hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-body mb-2 text-[10px] tracking-[0.3em] text-[#B8966E] uppercase">
                Réalisation DGS SARL
              </p>
              <p className="font-heading text-fg text-2xl font-bold tracking-wide uppercase md:text-3xl">
                Résidence Moderne — Conakry
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CardReveal({ card, index }: CardRevealProps) {
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
      className="glass group cursor-none p-6 md:p-8"
    >
      <p className="font-display mb-6 text-3xl tracking-wider text-[#CC1418]">{card.icon}</p>
      <h3 className="font-heading text-fg mb-3 text-lg font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E] md:text-xl">
        {card.title}
      </h3>
      <p className="font-body text-fg-muted text-sm leading-relaxed">{card.desc}</p>
      <div className="mt-6 h-px w-8 bg-[#CC1418] transition-all duration-500 group-hover:w-16" />
    </motion.div>
  )
}
