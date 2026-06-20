'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import PageShell from '@/components/PageShell'

interface ServiceBTP {
  num: string
  title: string
  desc: string
}

interface Phase {
  num: string
  phase: string
  desc: string
}

interface Valeur {
  title: string
  desc: string
}

const services: ServiceBTP[] = [
  {
    num: '01',
    title: 'Gros Œuvre',
    desc: 'Fondations solides, structures béton armé et charpentes conçues pour résister au temps et aux conditions du terrain.',
  },
  {
    num: '02',
    title: 'Second Œuvre',
    desc: 'Électricité, plomberie, isolation thermique et acoustique, menuiseries intérieures et extérieures — chaque détail compte.',
  },
  {
    num: '03',
    title: 'Rénovation',
    desc: "Nous redonnons vie à vos bâtiments anciens ou dégradés avec expertise et soin, dans le respect de l'existant.",
  },
  {
    num: '04',
    title: 'Construction Clé en Main',
    desc: 'Gestion intégrale de votre projet : études, travaux, suivi, livraison. Une seule interlocution, une seule responsabilité.',
  },
  {
    num: '05',
    title: 'Aménagement Intérieur & Extérieur',
    desc: 'Décoration, voirie, terrassement, clôtures, espaces verts — nous sublimons vos espaces de vie et de travail.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    phase: 'Conception',
    desc: 'Étude de faisabilité, plans architecturaux et ingénierie structurelle approfondie.',
  },
  {
    num: '02',
    phase: 'Planification',
    desc: 'Gestion de projet rigoureuse, approvisionnement et programmation des travaux.',
  },
  {
    num: '03',
    phase: 'Construction',
    desc: 'Exécution avec les meilleures équipes et matériaux rigoureusement sélectionnés.',
  },
  {
    num: '04',
    phase: 'Livraison',
    desc: 'Contrôle qualité final et remise des clés dans les délais contractuels.',
  },
]

const valeurs: Valeur[] = [
  {
    title: 'Qualité',
    desc: 'Matériaux rigoureusement sélectionnés, équipes qualifiées, contrôle exigeant à chaque étape.',
  },
  {
    title: 'Sécurité',
    desc: 'Chaque chantier encadré selon les normes les plus strictes. La sécurité des équipes et des clients est non négociable.',
  },
  {
    title: 'Réactivité',
    desc: 'Organisation agile, équipes disponibles. Nous répondons vite et agissons juste — votre temps a de la valeur.',
  },
  {
    title: 'Durabilité',
    desc: 'Pratiques écoresponsables, gestion des déchets et choix durables guident chacune de nos interventions.',
  },
]

export default function BTPPage() {
  return (
    <PageShell>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <ProcessSection />
      <ValeursSection />
      <CTASection />
    </PageShell>
  )
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/dgs-site-2.webp"
          alt="DGS SARL — chantier BTP"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
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
            DGS SARL · Nos activités — BTP & Génie Civil
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading mb-6 leading-[0.82] font-extrabold tracking-tight text-white uppercase"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
          >
            Bâtir
            <br />
            avec
            <br />
            <span className="text-[#CC1418]">rigueur.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-sm tracking-widest text-white/45 uppercase md:text-base"
          >
            Gros Œuvre · Second Œuvre · Rénovation · Clé en Main
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

function MissionSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textX = useTransform(scrollYProgress, [0.1, 0.5], ['-24px', '0px'])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-center gap-16 md:gap-24 lg:grid-cols-[1.1fr_1fr]">
          <motion.div style={{ x: textX, opacity: textOpacity }}>
            <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
              Notre mission
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Construire
              <br />
              <span className="text-[#CC1418]">durablement</span>
              <br />
              la Guinée.
            </h2>
            <div className="mb-8 h-px w-14 bg-[#CC1418]" />
            <p
              className="font-body mb-5 text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Chez DGS, chaque chantier est mené avec des solutions techniques innovantes, une
              gestion rigoureuse et un engagement inébranlable envers la qualité, la sécurité et le
              respect des délais.
            </p>
            <p
              className="font-body text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Chaque projet que nous prenons en charge est une promesse tenue — de la fondation
              jusqu&apos;à la remise des clés.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { val: '100%', label: 'Projets livrés à temps' },
                { val: '5+', label: 'Chantiers actifs' },
                { val: '2023', label: 'Fondée à Conakry' },
                { val: '∞', label: 'Engagement qualité' },
              ].map(({ val, label }) => (
                <div key={label} className="p-5" style={{ border: '1px solid var(--border)' }}>
                  <p className="font-heading mb-1 text-3xl leading-none font-extrabold text-[#CC1418]">
                    {val}
                  </p>
                  <p
                    className="font-body text-[11px] tracking-wider uppercase"
                    style={{ color: 'var(--fg-subtle)' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="/images/dgs-site-4.webp"
                  alt="DGS SARL — casque chantier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="scale-110 object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="glass-rouge absolute -right-3 -bottom-5 max-w-[160px] p-5 md:-right-8"
            >
              <p className="font-body mb-1 text-[9px] tracking-[0.3em] text-[#CC1418] uppercase">
                Sécurité
              </p>
              <p
                className="font-heading text-sm leading-tight font-bold uppercase"
                style={{ color: 'var(--fg)' }}
              >
                Norme stricte sur chaque site
              </p>
            </motion.div>
          </div>
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
      <div className="pointer-events-none absolute top-1/3 right-0 h-[50vh] w-[40vw] bg-[#CC1418]/3 blur-[100px]" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Expertise complète
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Nos Services BTP
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`glass group p-7 ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <p className="font-display mb-5 text-2xl tracking-wider text-[#CC1418]">{s.num}</p>
              <h3
                className="font-heading mb-3 text-lg leading-tight font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E]"
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
              <div className="mt-6 h-px w-0 bg-[#CC1418] transition-all duration-500 group-hover:w-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Notre méthode
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Notre Processus
          </h2>
        </motion.div>

        <div className="relative hidden grid-cols-4 gap-0 md:grid">
          <div className="absolute top-7 right-[12.5%] left-[12.5%] z-0 h-px bg-gradient-to-r from-[#CC1418]/60 via-[#B8966E]/40 to-[#CC1418]/30" />
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative flex flex-col items-center px-4 text-center"
            >
              <div
                className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center border-2 border-[#CC1418]"
                style={{ background: 'var(--bg)' }}
              >
                <span className="font-heading text-sm font-bold text-[#CC1418]">{p.num}</span>
              </div>
              <h3
                className="font-heading mb-3 text-base font-bold tracking-wide uppercase"
                style={{ color: 'var(--fg)' }}
              >
                {p.phase}
              </h3>
              <p
                className="font-body text-[12px] leading-relaxed"
                style={{ color: 'var(--fg-muted)' }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className="flex flex-col gap-10 pl-6 md:hidden"
          style={{ borderLeft: '1px solid rgba(204,20,24,0.25)' }}
        >
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative -ml-[calc(1.5rem+1px)]"
            >
              <div className="mb-3 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#CC1418]"
                  style={{ background: 'var(--bg)' }}
                >
                  <span className="font-heading text-sm font-bold text-[#CC1418]">{p.num}</span>
                </div>
                <h3
                  className="font-heading text-base font-bold tracking-wide uppercase"
                  style={{ color: 'var(--fg)' }}
                >
                  {p.phase}
                </h3>
              </div>
              <p
                className="font-body ml-16 text-[13px] leading-relaxed"
                style={{ color: 'var(--fg-muted)' }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValeursSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
              Ce qui nous distingue
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Nos
              <br />
              Valeurs
            </h2>
            <p
              className="font-body text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Ce qui nous distingue, ce n&apos;est pas seulement ce que nous construisons —
              c&apos;est la façon dont nous le faisons. Chaque valeur est une promesse faite à nos
              clients et à nos équipes.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/images/equipe.webp"
                alt="Équipe DGS SARL"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {valeurs.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group flex gap-6 p-6 transition-colors duration-400 hover:border-[#B8966E]/25"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#CC1418]/40 transition-colors duration-300 group-hover:border-[#CC1418]">
                  <span className="font-body text-[10px] tracking-widest text-[#CC1418]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-heading mb-2 text-base font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E]"
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
            Construisons ensemble
          </p>
          <h2
            className="font-heading mb-8 text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Votre chantier,
            <br />
            <span className="text-[#CC1418]">notre expertise.</span>
          </h2>
          <p
            className="font-body mx-auto mb-12 max-w-md text-[15px] leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            Devis gratuit, étude de faisabilité et première rencontre sous 48 heures.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="font-body inline-flex min-h-[52px] cursor-none items-center gap-3 bg-[#CC1418] px-10 py-4 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-300 hover:bg-[#A50F12]"
            >
              Obtenir un devis
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
