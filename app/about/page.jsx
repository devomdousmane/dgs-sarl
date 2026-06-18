'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'

/* ── Timeline data ── */
const milestones = [
  {
    year: '2023',
    period: 'Fondation',
    title: 'La naissance de DGS SARL',
    desc: "D Global Services est fondée à Almamya, Commune de Kaloum, Conakry. SARL au capital de 50 000 000 GNF. Une ambition claire : devenir le partenaire de confiance au cœur du développement de la Guinée.",
    detail: "BTP · Génie Civil · Immobilier · Automobile",
    tag: 'Fondation',
    img: '/images/dgs-site-4.webp',
    side: 'right',
    color: '#CC1418',
  },
  {
    year: '2023',
    period: 'T2 – T3',
    title: 'Premiers chantiers, premières promesses',
    desc: "DGS s'impose rapidement sur le marché du BTP guinéen. Gros œuvre, fondations solides, structures béton — chaque chantier est mené avec rigueur et un engagement inébranlable envers la qualité.",
    detail: "Gros œuvre · Second œuvre · Construction clé en main",
    tag: 'BTP',
    img: '/images/dgs-site-2.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '2023',
    period: 'T4',
    title: 'Partenariats stratégiques',
    desc: "DGS noue ses premiers partenariats avec des architectes, promoteurs immobiliers, collectivités locales et entreprises privées. La réputation se construit chantier après chantier, promesse après promesse.",
    detail: "Architectes · Promoteurs · Collectivités · Particuliers",
    tag: 'Partenariats',
    img: '/images/dgs-site-3.webp',
    side: 'right',
    color: '#CC1418',
  },
  {
    year: '2024',
    period: 'T1 – T2',
    title: 'Expansion immobilière',
    desc: "Lancement de la mini cité à Nongo Conteyah, bâtiment R+2 résidentiel à Kindia, construction des annexes et parking moderne à Belle Vue. DGS imagine et conçoit des projets qui redéfinissent les standards de vie en Guinée.",
    detail: "Nongo Conteyah · Kindia R+2 · Belle Vue",
    tag: 'Immobilier',
    img: '/images/dgs-site-1.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '2024',
    period: 'T3 – T4',
    title: 'Division automobile',
    desc: "Lancement de la branche vente de véhicules. Berlines, SUV, utilitaires — DGS propose une sélection rigoureuse de véhicules fiables et accessibles, adaptés aux réalités du marché guinéen. Toyota Hilux, Land Cruiser, RAYA SUV.",
    detail: "Toyota · SUV · Berlines · Utilitaires · Flottes entreprises",
    tag: 'Automobile',
    img: '/images/dgs-site-5.webp',
    side: 'right',
    color: '#CC1418',
  },
  {
    year: '2025',
    period: 'En cours',
    title: 'Projets structurants',
    desc: "Rénovation de l'école primaire de Petit Simbayah, construction d'un immeuble R+6 à Belle Vue, R+5 à Lambagni. DGS élargit son empreinte à travers tout le territoire national avec des projets toujours plus ambitieux.",
    detail: "Petit Simbayah · Lambagni R+5 · Belle Vue R+6",
    tag: 'Expansion',
    img: '/images/chantier.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '∞',
    period: 'Vision',
    title: 'Groupe de référence en Guinée',
    desc: "DGS ambitionne de devenir le holding multi-métiers de référence en BTP, immobilier et automobile en Guinée — avec des filiales spécialisées, agiles et complémentaires, pour offrir une solution globale à chaque besoin.",
    detail: "Bâtir · Aménager · Se déplacer",
    tag: 'Vision',
    img: null,
    side: 'right',
    color: '#CC1418',
  },
]

const values = [
  {
    title: 'Qualité',
    desc: 'Matériaux rigoureusement sélectionnés, équipes qualifiées et contrôle exigeant à chaque étape.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    title: 'Sécurité',
    desc: 'Chaque chantier encadré selon les normes les plus strictes. La sécurité des équipes et des clients, sans compromis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    title: 'Réactivité',
    desc: 'Organisation agile, équipes disponibles. Nous répondons vite et agissons juste — parce que votre temps a de la valeur.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    ),
  },
  {
    title: 'Environnement',
    desc: "Pratiques écoresponsables, gestion des déchets et choix durables guident chacune de nos interventions. Nous construisons aujourd'hui en pensant à demain.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path d="M12 8V6m0 12v-2"/>
      </svg>
    ),
  },
]

const services = [
  { num: '01', title: 'Gros Œuvre', desc: 'Fondations solides, structures béton et charpentes conçues pour durer.' },
  { num: '02', title: 'Second Œuvre', desc: 'Électricité, plomberie, isolation, menuiseries — chaque détail compte.' },
  { num: '03', title: 'Rénovation', desc: 'Nous redonnons vie à vos bâtiments anciens ou dégradés avec expertise et soin.' },
  { num: '04', title: 'Construction Clé en Main', desc: 'Gestion intégrale de votre projet, de la conception à la livraison, en toute sérénité.' },
  { num: '05', title: 'Aménagement Intérieur & Extérieur', desc: 'Décoration, voirie, terrassement, clôtures — nous sublimons vos espaces de vie.' },
]

export default function AboutPage() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="bg-[#0A0A0A] overflow-x-hidden">

          {/* ── HERO ── */}
          <HeroSection />

          {/* ── QUI SOMMES-NOUS ── */}
          <IdentitySection />

          {/* ── TIMELINE ── */}
          <TimelineSection />

          {/* ── VALEURS ── */}
          <ValuesSection />

          {/* ── SERVICES ── */}
          <ServicesSection />

          {/* ── CTA ── */}
          <CTASection />

        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}

/* ─────────── HERO ─────────── */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/dgs-site-4.webp"
          alt="DGS SARL — chantier Conakry"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 pb-20 md:pb-28 w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-[10px] tracking-[0.5em] uppercase text-[#B8966E] mb-6"
        >
          D Global Services · Conakry, Guinée · Est. 2023
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold uppercase leading-[0.82] text-[#F4F1EB] tracking-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Notre<br />
          <span className="text-[#CC1418]">Histoire.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="font-body italic text-[#F4F1EB]/50 text-base md:text-lg max-w-sm leading-relaxed"
        >
          « Construire aujourd'hui, bâtir durablement demain. »
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-14 bg-gradient-to-b from-[#B8966E] to-transparent" />
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#F4F1EB]/30 rotate-90 origin-center mt-4">Défiler</p>
      </motion.div>
    </section>
  )
}

/* ─────────── IDENTITY ─────────── */
function IdentitySection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#0A0A0A]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Qui sommes-nous ?</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.88] text-[#F4F1EB] tracking-tight mb-8">
              Un partenaire<br />
              <span className="text-[#CC1418]">de confiance</span><br />
              en Guinée.
            </h2>
            <div className="w-16 h-px bg-[#CC1418] mb-8" />
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85] mb-6">
              D Global Services est bien plus qu'une entreprise — c'est un partenaire au cœur du développement de la Guinée. Fondée en 2023 à Conakry, DGS s'est imposée rapidement sur deux marchés clés : le BTP et la vente automobile.
            </p>
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85]">
              De la construction de bâtiments modernes à la livraison de véhicules fiables, nous accompagnons particuliers et professionnels avec une seule ambition : bâtir mieux, ensemble.
            </p>

            {/* Legal info */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: 'Forme juridique', value: 'SARL' },
                { label: 'Capital social', value: '50 000 000 GNF' },
                { label: 'Fondée en', value: '2023' },
                { label: 'Siège social', value: 'Almamya, Kaloum — Conakry' },
              ].map((item) => (
                <div key={item.label} className="border border-[#F4F1EB]/8 p-4">
                  <p className="font-body text-[9px] tracking-[0.32em] uppercase text-[#B8966E] mb-1.5">{item.label}</p>
                  <p className="font-heading font-semibold text-sm uppercase text-[#F4F1EB]/80">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/dgs-site-3.webp"
                alt="DGS SARL — partenariat"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 md:-left-8 bg-[#CC1418] px-6 py-4">
              <p className="font-heading font-extrabold text-3xl text-white leading-none">2023</p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/70 mt-1">Fondation</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── TIMELINE ─────────── */
function TimelineSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-[#CC1418]/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Notre parcours</p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Chronologie
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full bg-gradient-to-b from-[#CC1418]/80 via-[#B8966E]/40 to-transparent" />
          </div>
          {/* Vertical line — mobile */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px">
            <div className="h-full bg-gradient-to-b from-[#CC1418]/80 via-[#B8966E]/40 to-transparent" />
          </div>

          <div className="flex flex-col gap-16 md:gap-20">
            {milestones.map((m, i) => (
              <TimelineCard key={m.title} m={m} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ m, i }) {
  const isLeft = m.side === 'left'
  const isVision = m.year === '∞'

  return (
    <div className={`relative flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0 items-start md:items-center`}>

      {/* Node on the central line — desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: m.color, backgroundColor: '#111111' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
        </motion.div>
      </div>

      {/* Node — mobile */}
      <div className="md:hidden absolute left-4 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: m.color, backgroundColor: '#111111' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
        </div>
      </div>

      {/* Card — takes half width on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[45%] pl-10 md:pl-0 ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}
      >
        {/* Year badge */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-heading font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-tight"
            style={{ color: m.color }}
          >
            {m.year}
          </span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#F4F1EB]/30 border border-[#F4F1EB]/10 px-2 py-1">
            {m.period}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl md:text-2xl uppercase text-[#F4F1EB] tracking-wide mb-3 leading-tight">
          {m.title}
        </h3>

        <p className="font-body text-[14px] text-[#F4F1EB]/50 leading-[1.85] mb-4">
          {m.desc}
        </p>

        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#B8966E]/70 mb-5">
          {m.detail}
        </p>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: m.color }} />
          <span className="font-body text-[9px] tracking-[0.35em] uppercase" style={{ color: m.color }}>
            {m.tag}
          </span>
        </div>
      </motion.div>

      {/* Image — opposite side */}
      {m.img && (
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden md:block w-[45%] ${isLeft ? 'pl-14' : 'pr-14'}`}
        >
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={m.img}
              alt={m.title}
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
            />
          </div>
        </motion.div>
      )}

      {/* Vision card (no image — centered full-width) */}
      {isVision && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden md:block w-[45%] pl-14"
        >
          <div className="border border-[#CC1418]/20 bg-[#CC1418]/4 p-8">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#CC1418] mb-4">Ambition</p>
            <p className="font-display text-lg md:text-xl italic font-light text-[#F4F1EB]/70 leading-relaxed">
              « Devenir le groupe de référence en BTP, immobilier et automobile en Guinée — en intégrant l'ensemble de la chaîne de valeur. »
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ─────────── VALUES ─────────── */
function ValuesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#B8966E]/10 to-transparent" style={{ left: '12%' }} />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#CC1418]/10 to-transparent" style={{ right: '12%' }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Ce qui nous distingue</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Nos Valeurs
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-7 group"
            >
              <div className="text-[#CC1418] mb-6 group-hover:text-[#B8966E] transition-colors duration-300">
                {v.icon}
              </div>
              <h3 className="font-heading font-bold text-lg uppercase text-[#F4F1EB] tracking-wide mb-3 group-hover:text-[#B8966E] transition-colors duration-300">
                {v.title}
              </h3>
              <p className="font-body text-[13px] text-[#F4F1EB]/45 leading-[1.85]">
                {v.desc}
              </p>
              <div className="mt-6 w-0 h-px bg-[#CC1418] group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── SERVICES ─────────── */
function ServicesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — header + image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">BTP & Génie Civil</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
              Nos<br />Services
            </h2>
            <p className="font-body text-[15px] text-[#F4F1EB]/45 leading-[1.85] mb-10">
              De la fondation jusqu'à la remise des clés, DGS prend en charge l'intégralité de votre projet de construction avec expertise et rigueur.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/dgs-site-2.webp"
                alt="DGS SARL — chantier BTP"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
            </div>
          </motion.div>

          {/* Right — services list */}
          <div className="flex flex-col gap-0">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex gap-6 py-7 border-b border-[#F4F1EB]/8 last:border-b-0"
              >
                <span className="font-body font-light text-[10px] tracking-[0.3em] text-[#B8966E] mt-1 shrink-0 w-8">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-base md:text-lg uppercase text-[#F4F1EB] tracking-wide mb-2 group-hover:text-[#B8966E] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-[1.85]">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── CTA ─────────── */
function CTASection() {
  return (
    <section className="relative py-36 md:py-52 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-[#CC1418]/4 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Démarrons ensemble</p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
            Votre projet,<br />
            <span className="text-[#CC1418]">notre mission.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-[#F4F1EB]/40 max-w-md mx-auto leading-relaxed mb-12">
            Chaque projet est une promesse tenue. Contactez nos équipes pour un devis gratuit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-[#CC1418] hover:bg-[#A50F12] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-colors duration-300 cursor-none"
            >
              Nous contacter
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-[#F4F1EB]/20 hover:border-[#B8966E]/60 text-[#F4F1EB]/60 hover:text-[#B8966E] font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-all duration-300 cursor-none"
            >
              Retour au site
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            {[
              { icon: 'phone', text: '+224 611 26 26 26', href: 'tel:+22461126262' },
              { icon: 'phone', text: '+224 611 55 55 92', href: 'tel:+22461155559' },
              { icon: 'email', text: 'd.globalservices224@gmail.com', href: 'mailto:d.globalservices224@gmail.com' },
            ].map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="font-body text-[12px] text-[#F4F1EB]/35 hover:text-[#B8966E] transition-colors duration-300 tracking-wide cursor-none"
              >
                {item.text}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
