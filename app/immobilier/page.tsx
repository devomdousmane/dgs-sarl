'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import PageShell from '@/components/PageShell'

interface ServiceImmo {
  num: string
  title: string
  desc: string
}

interface Projet {
  title: string
  type: string
  annee: string
  statut: string
  img: string
}

const services: ServiceImmo[] = [
  {
    num: '01',
    title: 'Promotion Immobilière',
    desc: 'Des programmes résidentiels modernes conçus pour durer, de la conception à la livraison — avec des équipes dédiées à chaque étape.',
  },
  {
    num: '02',
    title: 'Résidences Modernes',
    desc: "Architecture contemporaine, matériaux premium et finitions soignées pour un habitat d'exception, adapté aux standards de vie actuels.",
  },
  {
    num: '03',
    title: 'Investissements Sécurisés',
    desc: 'Valorisez votre patrimoine avec des projets solides, transparents et rentables. DGS vous guide à chaque étape de votre investissement.',
  },
  {
    num: '04',
    title: 'Terrains & Villas',
    desc: 'Une sélection exclusive de terrains viabilisés et de villas sur mesure à Conakry et dans les grandes villes de Guinée.',
  },
  {
    num: '05',
    title: 'Espaces Commerciaux',
    desc: 'Bureaux, locaux commerciaux, espaces mixtes — DGS conçoit des environnements de travail modernes, fonctionnels et humains.',
  },
]

const projets: Projet[] = [
  {
    title: 'Mini Cité Nongo Conteyah',
    type: 'Résidentiel — Logements collectifs',
    annee: '2024',
    statut: 'En cours',
    img: '/images/render.webp',
  },
  {
    title: 'Immeuble R+2 — Kindia',
    type: 'Résidentiel — Construction neuve',
    annee: '2024',
    statut: 'En cours',
    img: '/images/dgs-site-1.webp',
  },
  {
    title: 'Immeuble R+6 — Belle Vue',
    type: 'Résidentiel haut de gamme',
    annee: '2025',
    statut: 'En cours',
    img: '/images/render.webp',
  },
  {
    title: 'Immeuble R+5 — Lambagni',
    type: 'Résidentiel — Promotion immobilière',
    annee: '2025',
    statut: 'En cours',
    img: '/images/dgs-site-1.webp',
  },
  {
    title: 'Annexes & Parking — Belle Vue',
    type: 'Aménagement & Génie civil',
    annee: '2024',
    statut: 'Livré',
    img: '/images/partenariat.webp',
  },
]

const clients = [
  'Particuliers',
  'Promoteurs immobiliers',
  'Architectes',
  'Entreprises privées',
  'Collectivités locales',
]

export default function ImmobilierPage() {
  return (
    <PageShell>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <ProjetsSection />
      <CTASection />
    </PageShell>
  )
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/render.webp"
          alt="DGS SARL — immobilier Conakry"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-x-0 bottom-0 z-10 pb-20 md:pb-28"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body mb-6 text-[10px] tracking-[0.5em] text-[#B8966E] uppercase"
          >
            DGS SARL · Nos activités — Immobilier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading mb-6 leading-[0.82] font-extrabold tracking-tight text-white uppercase"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
          >
            L&apos;art de
            <br />
            <span className="text-[#CC1418]">bâtir</span>
            <br />
            l&apos;avenir.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-sm tracking-widest text-white/45 uppercase md:text-base"
          >
            Résidentiel · Commercial · Investissement · Promotion
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 bottom-8 z-10 flex flex-col items-center gap-2 md:right-14"
      >
        <div className="h-14 w-px bg-gradient-to-b from-[#B8966E] to-transparent" />
      </motion.div>
    </section>
  )
}

function IntroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
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
              Notre vision immobilière
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Créer des
              <br />
              <span className="text-[#CC1418]">cadres de vie</span>
              <br />
              d&apos;exception.
            </h2>
            <div className="mb-8 h-px w-14 bg-[#CC1418]" />
            <p
              className="font-body mb-5 text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              DGS ne se contente pas de construire. Nous imaginons, concevons et commercialisons des
              projets immobiliers qui redéfinissent les standards de vie en Guinée.
            </p>
            <p
              className="font-body text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              De l&apos;immobilier résidentiel aux espaces de bureaux, chaque projet est une
              invitation à vivre autrement, à repenser l&apos;habitat et contribuer à bâtir des
              villes plus modernes, plus humaines.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="font-body inline-flex min-h-[50px] cursor-none items-center justify-center gap-3 bg-[#CC1418] px-8 py-4 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-300 hover:bg-[#A50F12]"
              >
                Devis gratuit
              </Link>
              <Link
                href="/about"
                className="font-body inline-flex min-h-[50px] cursor-none items-center justify-center gap-3 px-8 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase transition-all duration-300 hover:text-[#B8966E]"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                Notre histoire
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="/images/dgs-site-1.webp"
                  alt="Résidence DGS SARL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-110 object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#CC1418] px-6 py-4 md:-left-8">
              <p className="font-heading text-2xl leading-none font-extrabold text-white">5+</p>
              <p className="font-body mt-1 text-[10px] tracking-[0.3em] text-white/70 uppercase">
                Projets actifs
              </p>
            </div>
            <div
              className="absolute -top-4 -right-4 px-5 py-3 md:-right-6"
              style={{ border: '1px solid rgba(184,150,110,0.3)', background: 'var(--bg)' }}
            >
              <p className="font-heading text-lg leading-none font-extrabold text-[#B8966E]">
                2023
              </p>
              <p
                className="font-body mt-1 text-[9px] tracking-[0.28em] uppercase"
                style={{ color: 'var(--fg-subtle)' }}
              >
                Fondation
              </p>
            </div>
          </motion.div>
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
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CC1418]/3 blur-[120px]" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Ce que nous faisons
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Nos Services
          </h2>
        </motion.div>
        <div className="flex flex-col gap-0">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: i * 0.07 }}
              className="group flex items-start gap-8 py-8 last:border-0"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span className="font-body mt-1 w-8 shrink-0 text-[10px] font-light tracking-[0.3em] text-[#B8966E]">
                {s.num}
              </span>
              <div className="flex-1">
                <h3
                  className="font-heading mb-2.5 text-lg font-semibold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E] md:text-xl"
                  style={{ color: 'var(--fg)' }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body max-w-xl text-[13px] leading-[1.85]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {s.desc}
                </p>
              </div>
              <svg
                className="mt-1 hidden h-5 w-5 shrink-0 transition-colors duration-300 group-hover:text-[#B8966E]/50 md:block"
                style={{ color: 'var(--border)' }}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjetsSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/render.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Portfolio 2024–2025
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Projets en cours
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {projets.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: i * 0.1 }}
              className={`group relative overflow-hidden ${i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
            >
              <div
                className={`relative overflow-hidden ${i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span
                    className={`font-body px-3 py-1.5 text-[9px] tracking-[0.3em] uppercase ${
                      p.statut === 'Livré' ? 'bg-[#B8966E] text-black' : 'bg-[#CC1418] text-white'
                    }`}
                  >
                    {p.statut}
                  </span>
                </div>
                <div className="absolute right-0 bottom-0 left-0 translate-y-1 p-5 transition-transform duration-400 group-hover:translate-y-0">
                  <p className="font-body mb-1.5 text-[9px] tracking-[0.3em] text-[#B8966E] uppercase">
                    {p.type} · {p.annee}
                  </p>
                  <h3
                    className="font-heading text-base leading-tight font-bold tracking-wide uppercase md:text-lg"
                    style={{ color: 'var(--fg)' }}
                  >
                    {p.title}
                  </h3>
                  <div className="mt-3 h-px w-0 bg-[#CC1418] transition-all duration-500 group-hover:w-10" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-20 pt-12 md:mt-28"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-body mb-8 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Nos clients
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {clients.map((c) => (
              <span
                key={c}
                className="font-heading text-sm font-semibold tracking-wide uppercase md:text-base"
                style={{ color: 'var(--fg-subtle)' }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-36 md:py-52"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[45vh] w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CC1418]/4 blur-[140px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Démarrons ensemble
          </p>
          <h2
            className="font-heading mb-8 text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Votre projet
            <br />
            <span className="text-[#CC1418]">nous attend.</span>
          </h2>
          <p
            className="font-body mx-auto mb-12 max-w-md text-[15px] leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            Devis gratuit sous 48 heures. Nos experts vous accompagnent de la conception à la
            livraison.
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
              Retour à l&apos;accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
