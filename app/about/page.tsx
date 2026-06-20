'use client'
import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'

interface Milestone {
  year: string
  period: string
  title: string
  desc: string
  detail: string
  tag: string
  img: string | null
  side: 'left' | 'right'
  color: string
}

interface Value {
  title: string
  desc: string
  icon: ReactNode
}

interface Service {
  num: string
  title: string
  desc: string
}

interface TimelineCardProps {
  m: Milestone
  i: number
}

const milestones: Milestone[] = [
  {
    year: '2023',
    period: 'Fondation',
    title: 'La naissance de DGS SARL',
    desc: 'D Global Services est fondée à Almamya, Commune de Kaloum, Conakry. SARL au capital de 50 000 000 GNF. Une ambition claire : devenir le partenaire de confiance au cœur du développement de la Guinée.',
    detail: 'BTP · Génie Civil · Immobilier · Automobile',
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
    detail: 'Gros œuvre · Second œuvre · Construction clé en main',
    tag: 'BTP',
    img: '/images/dgs-site-2.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '2023',
    period: 'T4',
    title: 'Partenariats stratégiques',
    desc: 'DGS noue ses premiers partenariats avec des architectes, promoteurs immobiliers, collectivités locales et entreprises privées. La réputation se construit chantier après chantier, promesse après promesse.',
    detail: 'Architectes · Promoteurs · Collectivités · Particuliers',
    tag: 'Partenariats',
    img: '/images/dgs-site-3.webp',
    side: 'right',
    color: '#CC1418',
  },
  {
    year: '2024',
    period: 'T1 – T2',
    title: 'Expansion immobilière',
    desc: 'Lancement de la mini cité à Nongo Conteyah, bâtiment R+2 résidentiel à Kindia, construction des annexes et parking moderne à Belle Vue. DGS imagine et conçoit des projets qui redéfinissent les standards de vie en Guinée.',
    detail: 'Nongo Conteyah · Kindia R+2 · Belle Vue',
    tag: 'Immobilier',
    img: '/images/dgs-site-1.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '2024',
    period: 'T3 – T4',
    title: 'Division automobile',
    desc: 'Lancement de la branche vente de véhicules. Berlines, SUV, utilitaires — DGS propose une sélection rigoureuse de véhicules fiables et accessibles, adaptés aux réalités du marché guinéen. Toyota Hilux, Land Cruiser, RAYA SUV.',
    detail: 'Toyota · SUV · Berlines · Utilitaires · Flottes entreprises',
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
    detail: 'Petit Simbayah · Lambagni R+5 · Belle Vue R+6',
    tag: 'Expansion',
    img: '/images/chantier.webp',
    side: 'left',
    color: '#B8966E',
  },
  {
    year: '∞',
    period: 'Vision',
    title: 'Groupe de référence en Guinée',
    desc: 'DGS ambitionne de devenir le holding multi-métiers de référence en BTP, immobilier et automobile en Guinée — avec des filiales spécialisées, agiles et complémentaires, pour offrir une solution globale à chaque besoin.',
    detail: 'Bâtir · Aménager · Se déplacer',
    tag: 'Vision',
    img: null,
    side: 'right',
    color: '#CC1418',
  },
]

const values: Value[] = [
  {
    title: 'Qualité',
    desc: 'Matériaux rigoureusement sélectionnés, équipes qualifiées et contrôle exigeant à chaque étape.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Sécurité',
    desc: 'Chaque chantier encadré selon les normes les plus strictes. La sécurité des équipes et des clients, sans compromis.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Réactivité',
    desc: 'Organisation agile, équipes disponibles. Nous répondons vite et agissons juste — parce que votre temps a de la valeur.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Environnement',
    desc: "Pratiques écoresponsables, gestion des déchets et choix durables guident chacune de nos interventions. Nous construisons aujourd'hui en pensant à demain.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M12 8V6m0 12v-2" />
      </svg>
    ),
  },
]

const services: Service[] = [
  {
    num: '01',
    title: 'Gros Œuvre',
    desc: 'Fondations solides, structures béton et charpentes conçues pour durer.',
  },
  {
    num: '02',
    title: 'Second Œuvre',
    desc: 'Électricité, plomberie, isolation, menuiseries — chaque détail compte.',
  },
  {
    num: '03',
    title: 'Rénovation',
    desc: 'Nous redonnons vie à vos bâtiments anciens ou dégradés avec expertise et soin.',
  },
  {
    num: '04',
    title: 'Construction Clé en Main',
    desc: 'Gestion intégrale de votre projet, de la conception à la livraison, en toute sérénité.',
  },
  {
    num: '05',
    title: 'Aménagement Intérieur & Extérieur',
    desc: 'Décoration, voirie, terrassement, clôtures — nous sublimons vos espaces de vie.',
  },
]

export default function AboutPage() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="overflow-x-hidden" style={{ background: 'var(--bg)' }}>
          <HeroSection />
          <IdentitySection />
          <TimelineSection />
          <ValuesSection />
          <ServicesSection />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative flex h-screen items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/dgs-site-4.webp"
          alt="DGS SARL — chantier Conakry"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-14 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body mb-6 text-[10px] tracking-[0.5em] text-[#B8966E] uppercase"
        >
          D Global Services · Conakry, Guinée · Est. 2023
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading mb-8 leading-[0.82] font-extrabold tracking-tight text-white uppercase"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Notre
          <br />
          <span className="text-[#CC1418]">Histoire.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="font-body max-w-sm text-base leading-relaxed text-white/50 italic md:text-lg"
        >
          « Construire aujourd&apos;hui, bâtir durablement demain. »
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute right-8 bottom-8 z-10 flex flex-col items-center gap-2 md:right-14"
      >
        <div className="h-14 w-px bg-gradient-to-b from-[#B8966E] to-transparent" />
        <p className="font-body mt-4 origin-center rotate-90 text-[9px] tracking-[0.35em] text-white/30 uppercase">
          Défiler
        </p>
      </motion.div>
    </section>
  )
}

function IdentitySection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-center gap-16 md:gap-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
              Qui sommes-nous ?
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Un partenaire
              <br />
              <span className="text-[#CC1418]">de confiance</span>
              <br />
              en Guinée.
            </h2>
            <div className="mb-8 h-px w-16 bg-[#CC1418]" />
            <p
              className="font-body mb-6 text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              D Global Services est bien plus qu&apos;une entreprise — c&apos;est un partenaire au
              cœur du développement de la Guinée. Fondée en 2023 à Conakry, DGS s&apos;est imposée
              rapidement sur deux marchés clés : le BTP et la vente automobile.
            </p>
            <p
              className="font-body text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              De la construction de bâtiments modernes à la livraison de véhicules fiables, nous
              accompagnons particuliers et professionnels avec une seule ambition : bâtir mieux,
              ensemble.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: 'Forme juridique', value: 'SARL' },
                { label: 'Capital social', value: '50 000 000 GNF' },
                { label: 'Fondée en', value: '2023' },
                { label: 'Siège social', value: 'Almamya, Kaloum — Conakry' },
              ].map((item) => (
                <div key={item.label} className="p-4" style={{ border: '1px solid var(--border)' }}>
                  <p className="font-body mb-1.5 text-[9px] tracking-[0.32em] text-[#B8966E] uppercase">
                    {item.label}
                  </p>
                  <p
                    className="font-heading text-sm font-semibold uppercase"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[#CC1418] px-6 py-4 md:-left-8">
              <p className="font-heading text-3xl leading-none font-extrabold text-white">2023</p>
              <p className="font-body mt-1 text-[10px] tracking-[0.3em] text-white/70 uppercase">
                Fondation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-[#CC1418]/3 blur-[140px]" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center md:mb-28"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Notre parcours
          </p>
          <h2
            className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Chronologie
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
            <div className="h-full bg-gradient-to-b from-[#CC1418]/80 via-[#B8966E]/40 to-transparent" />
          </div>
          <div className="absolute top-0 bottom-0 left-4 w-px md:hidden">
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

function TimelineCard({ m, i }: TimelineCardProps) {
  const isLeft = m.side === 'left'
  const isVision = m.year === '∞'

  return (
    <div
      className={`relative flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8 md:items-center md:gap-0`}
    >
      <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center md:flex">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex h-5 w-5 items-center justify-center rounded-full border-2"
          style={{ borderColor: m.color, background: 'var(--bg-2)' }}
        >
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
        </motion.div>
      </div>

      <div className="absolute top-6 left-4 z-10 flex -translate-x-1/2 items-center justify-center md:hidden">
        <div
          className="flex h-4 w-4 items-center justify-center rounded-full border-2"
          style={{ borderColor: m.color, background: 'var(--bg-2)' }}
        >
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.color }} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full pl-10 md:w-[45%] md:pl-0 ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}
      >
        <div className="mb-5 flex items-center gap-3">
          <span
            className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-none font-extrabold tracking-tight"
            style={{ color: m.color }}
          >
            {m.year}
          </span>
          <span
            className="font-body px-2 py-1 text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'var(--fg-subtle)', border: '1px solid var(--border)' }}
          >
            {m.period}
          </span>
        </div>
        <h3
          className="font-heading mb-3 text-xl leading-tight font-bold tracking-wide uppercase md:text-2xl"
          style={{ color: 'var(--fg)' }}
        >
          {m.title}
        </h3>
        <p
          className="font-body mb-4 text-[14px] leading-[1.85]"
          style={{ color: 'var(--fg-muted)' }}
        >
          {m.desc}
        </p>
        <p className="font-body mb-5 text-[10px] tracking-[0.3em] text-[#B8966E]/70 uppercase">
          {m.detail}
        </p>
        <div className="flex items-center gap-3">
          <div className="h-px max-w-[40px] flex-1" style={{ backgroundColor: m.color }} />
          <span
            className="font-body text-[9px] tracking-[0.35em] uppercase"
            style={{ color: m.color }}
          >
            {m.tag}
          </span>
        </div>
      </motion.div>

      {m.img && (
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden w-[45%] md:block ${isLeft ? 'pl-14' : 'pr-14'}`}
        >
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image src={m.img} alt={m.title} fill sizes="40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div
              className="absolute right-0 bottom-0 left-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
            />
          </div>
        </motion.div>
      )}

      {isVision && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden w-[45%] pl-14 md:block"
        >
          <div
            className="p-8"
            style={{ border: '1px solid rgba(204,20,24,0.2)', background: 'rgba(204,20,24,0.04)' }}
          >
            <p className="font-body mb-4 text-[10px] tracking-[0.4em] text-[#CC1418] uppercase">
              Ambition
            </p>
            <p
              className="font-display text-lg leading-relaxed font-light italic md:text-xl"
              style={{ color: 'var(--fg-muted)' }}
            >
              « Devenir le groupe de référence en BTP, immobilier et automobile en Guinée — en
              intégrant l&apos;ensemble de la chaîne de valeur. »
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function ValuesSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[#B8966E]/10 to-transparent"
          style={{ left: '12%' }}
        />
        <div
          className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#CC1418]/10 to-transparent"
          style={{ right: '12%' }}
        />
      </div>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Ce qui nous distingue
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Nos Valeurs
          </h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass group p-7"
            >
              <div className="mb-6 text-[#CC1418] transition-colors duration-300 group-hover:text-[#B8966E]">
                {v.icon}
              </div>
              <h3
                className="font-heading mb-3 text-lg font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E]"
                style={{ color: 'var(--fg)' }}
              >
                {v.title}
              </h3>
              <p
                className="font-body text-[13px] leading-[1.85]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {v.desc}
              </p>
              <div className="mt-6 h-px w-0 bg-[#CC1418] transition-all duration-500 group-hover:w-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-start gap-16 md:gap-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
              BTP & Génie Civil
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Nos
              <br />
              Services
            </h2>
            <p
              className="font-body mb-10 text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              De la fondation jusqu&apos;à la remise des clés, DGS prend en charge
              l&apos;intégralité de votre projet de construction avec expertise et rigueur.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/dgs-site-2.webp"
                alt="DGS SARL — chantier BTP"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-0">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex gap-6 py-7 last:border-b-0"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span className="font-body mt-1 w-8 shrink-0 text-[10px] font-light tracking-[0.3em] text-[#B8966E]">
                  {s.num}
                </span>
                <div>
                  <h3
                    className="font-heading mb-2 text-base font-semibold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E] md:text-lg"
                    style={{ color: 'var(--fg)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-[1.85]"
                    style={{ color: 'var(--fg-muted)' }}
                  >
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

function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-36 md:py-52"
      style={{ background: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CC1418]/4 blur-[150px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Démarrons ensemble
          </p>
          <h2
            className="font-heading mb-8 text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Votre projet,
            <br />
            <span className="text-[#CC1418]">notre mission.</span>
          </h2>
          <p
            className="font-body mx-auto mb-12 max-w-md text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--fg-muted)' }}
          >
            Chaque projet est une promesse tenue. Contactez nos équipes pour un devis gratuit.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="font-body inline-flex min-h-[52px] cursor-none items-center gap-3 bg-[#CC1418] px-10 py-4 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-300 hover:bg-[#A50F12]"
            >
              Nous contacter
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/"
              className="font-body inline-flex min-h-[52px] cursor-none items-center gap-3 px-10 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase transition-all duration-300 hover:text-[#B8966E]"
              style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
            >
              Retour au site
            </Link>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row md:gap-10">
            {[
              { text: '+224 611 26 26 26', href: 'tel:+22461126262' },
              { text: '+224 611 55 55 92', href: 'tel:+22461155559' },
              {
                text: 'd.globalservices224@gmail.com',
                href: 'mailto:d.globalservices224@gmail.com',
              },
            ].map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="font-body cursor-none text-[12px] tracking-wide transition-colors duration-300 hover:text-[#B8966E]"
                style={{ color: 'var(--fg-subtle)' }}
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
