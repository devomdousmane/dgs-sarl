'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import PageShell from '@/components/PageShell'

const services = [
  {
    num: '01', title: 'Promotion Immobilière',
    desc: 'Des programmes résidentiels modernes conçus pour durer, de la conception à la livraison — avec des équipes dédiées à chaque étape.',
  },
  {
    num: '02', title: 'Résidences Modernes',
    desc: 'Architecture contemporaine, matériaux premium et finitions soignées pour un habitat d\'exception, adapté aux standards de vie actuels.',
  },
  {
    num: '03', title: 'Investissements Sécurisés',
    desc: 'Valorisez votre patrimoine avec des projets solides, transparents et rentables. DGS vous guide à chaque étape de votre investissement.',
  },
  {
    num: '04', title: 'Terrains & Villas',
    desc: 'Une sélection exclusive de terrains viabilisés et de villas sur mesure à Conakry et dans les grandes villes de Guinée.',
  },
  {
    num: '05', title: 'Espaces Commerciaux',
    desc: 'Bureaux, locaux commerciaux, espaces mixtes — DGS conçoit des environnements de travail modernes, fonctionnels et humains.',
  },
]

const projets = [
  { title: 'Mini Cité Nongo Conteyah', type: 'Résidentiel — Logements collectifs', annee: '2024', statut: 'En cours', img: '/images/render.webp' },
  { title: 'Immeuble R+2 — Kindia', type: 'Résidentiel — Construction neuve', annee: '2024', statut: 'En cours', img: '/images/dgs-site-1.webp' },
  { title: 'Immeuble R+6 — Belle Vue', type: 'Résidentiel haut de gamme', annee: '2025', statut: 'En cours', img: '/images/render.webp' },
  { title: 'Immeuble R+5 — Lambagni', type: 'Résidentiel — Promotion immobilière', annee: '2025', statut: 'En cours', img: '/images/dgs-site-1.webp' },
  { title: 'Annexes & Parking — Belle Vue', type: 'Aménagement & Génie civil', annee: '2024', statut: 'Livré', img: '/images/partenariat.webp' },
]

const clients = ['Particuliers', 'Promoteurs immobiliers', 'Architectes', 'Entreprises privées', 'Collectivités locales']

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

/* ── HERO ── */
function HeroSection() {
  const ref = useRef(null)
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
          fill sizes="100vw" priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/75 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="absolute bottom-0 inset-x-0 z-10 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-14">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-[10px] tracking-[0.5em] uppercase text-[#B8966E] mb-6">
            DGS SARL · Nos activités — Immobilier
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold uppercase leading-[0.82] text-[#F4F1EB] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}>
            L'art de<br />
            <span className="text-[#CC1418]">bâtir</span><br />
            l'avenir.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-[#F4F1EB]/45 text-sm md:text-base tracking-widest uppercase">
            Résidentiel · Commercial · Investissement · Promotion
          </motion.p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-14 bg-gradient-to-b from-[#B8966E] to-transparent" />
      </motion.div>
    </section>
  )
}

/* ── INTRO ── */
function IntroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Notre vision immobilière</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.88] text-[#F4F1EB] tracking-tight mb-8">
              Créer des<br /><span className="text-[#CC1418]">cadres de vie</span><br />d'exception.
            </h2>
            <div className="w-14 h-px bg-[#CC1418] mb-8" />
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85] mb-5">
              DGS ne se contente pas de construire. Nous imaginons, concevons et commercialisons des projets immobiliers qui redéfinissent les standards de vie en Guinée.
            </p>
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85]">
              De l'immobilier résidentiel aux espaces de bureaux, chaque projet est une invitation à vivre autrement, à repenser l'habitat et contribuer à bâtir des villes plus modernes, plus humaines.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-[#CC1418] hover:bg-[#A50F12] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-8 py-4 min-h-[50px] transition-colors duration-300 cursor-none">
                Devis gratuit
              </Link>
              <Link href="/about"
                className="inline-flex items-center justify-center gap-3 border border-[#F4F1EB]/18 hover:border-[#B8966E]/50 text-[#F4F1EB]/60 hover:text-[#B8966E] font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-8 py-4 min-h-[50px] transition-all duration-300 cursor-none">
                Notre histoire
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image src="/images/dgs-site-1.webp" alt="Résidence DGS SARL"
                  fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover scale-110" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-[#CC1418] px-6 py-4">
              <p className="font-heading font-extrabold text-2xl text-white leading-none">5+</p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/70 mt-1">Projets actifs</p>
            </div>
            <div className="absolute -top-4 -right-4 md:-right-6 border border-[#B8966E]/30 bg-[#0A0A0A] px-5 py-3">
              <p className="font-heading font-extrabold text-lg text-[#B8966E] leading-none">2023</p>
              <p className="font-body text-[9px] tracking-[0.28em] uppercase text-[#F4F1EB]/40 mt-1">Fondation</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── SERVICES ── */
function ServicesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[#CC1418]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Ce que nous faisons</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Nos Services
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {services.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.75, delay: i * 0.07 }}
              className="group flex gap-8 py-8 border-b border-[#F4F1EB]/8 last:border-0 items-start">
              <span className="font-body font-light text-[10px] tracking-[0.3em] text-[#B8966E] mt-1 shrink-0 w-8">{s.num}</span>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg md:text-xl uppercase text-[#F4F1EB] tracking-wide mb-2.5
                  group-hover:text-[#B8966E] transition-colors duration-300">{s.title}</h3>
                <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-[1.85] max-w-xl">{s.desc}</p>
              </div>
              <svg className="hidden md:block w-5 h-5 text-[#F4F1EB]/15 group-hover:text-[#B8966E]/50 transition-colors duration-300 mt-1 shrink-0"
                viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PROJETS ── */
function ProjetsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none opacity-12" style={{ y: bgY }}>
        <Image src="/images/render.webp" alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Portfolio 2024–2025</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Projets en cours
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projets.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.85, delay: i * 0.1 }}
              className={`group relative overflow-hidden ${i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <Image src={p.img} alt={p.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`font-body text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 ${
                    p.statut === 'Livré' ? 'bg-[#B8966E] text-[#0A0A0A]' : 'bg-[#CC1418] text-white'
                  }`}>{p.statut}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#B8966E] mb-1.5">{p.type} · {p.annee}</p>
                  <h3 className="font-heading font-bold text-base md:text-lg uppercase text-[#F4F1EB] tracking-wide leading-tight">{p.title}</h3>
                  <div className="mt-3 w-0 h-px bg-[#CC1418] group-hover:w-10 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clients */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-20 md:mt-28 pt-12 border-t border-[#F4F1EB]/8">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-8">Nos clients</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {clients.map((c, i) => (
              <span key={c} className="font-heading font-semibold text-sm md:text-base uppercase text-[#F4F1EB]/35 tracking-wide">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection() {
  return (
    <section className="relative py-36 md:py-52 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[45vh] bg-[#CC1418]/4 blur-[140px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Démarrons ensemble</p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
            Votre projet<br /><span className="text-[#CC1418]">nous attend.</span>
          </h2>
          <p className="font-body text-[15px] text-[#F4F1EB]/40 max-w-md mx-auto leading-relaxed mb-12">
            Devis gratuit sous 48 heures. Nos experts vous accompagnent de la conception à la livraison.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact"
              className="inline-flex items-center gap-3 bg-[#CC1418] hover:bg-[#A50F12] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-colors duration-300 cursor-none">
              Nous contacter
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-3 border border-[#F4F1EB]/18 hover:border-[#B8966E]/50 text-[#F4F1EB]/55 hover:text-[#B8966E] font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-all duration-300 cursor-none">
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
