'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import PageShell from '@/components/PageShell'

const services = [
  {
    num: '01', icon: '🚗', title: 'Vente Automobile',
    desc: 'Une gamme sélectionnée de véhicules neufs et d\'occasion, rigoureusement choisis pour leur fiabilité et leur rapport qualité-prix sur les routes de Guinée.',
  },
  {
    num: '02', icon: '🌍', title: 'Importation Directe',
    desc: 'Accès à l\'international — DGS importe directement des marques référencées aux meilleures conditions du marché, pour vous garantir authenticité et prix compétitif.',
  },
  {
    num: '03', icon: '🏢', title: 'Flotte Entreprise',
    desc: 'Solutions dédiées aux professionnels, administrations et institutions. Gestion de flotte, entretien, renouvellement : une offre complète, un seul interlocuteur.',
  },
  {
    num: '04', icon: '⭐', title: 'Véhicules Premium',
    desc: 'Sélection exclusive haut de gamme pour ceux qui exigent le meilleur — confort, puissance, prestige. Disponible sur commande et livraison personnalisée.',
  },
]

const gamme = [
  {
    marque: 'Toyota', modele: 'Hilux', type: 'Pick-up 4×4',
    desc: 'Le pick-up de référence en Afrique. Robuste, puissant, adapté à tous les terrains de Guinée.',
    specs: ['Diesel 2.4L', '4×4 permanente', 'Charge utile 1 tonne', 'Cabine double'],
    img: '/sequences/auto/frame200.webp',
  },
  {
    marque: 'Toyota', modele: 'Land Cruiser 76', type: 'SUV Tout-terrain',
    desc: 'L\'icône de l\'endurance. Conçu pour conquérir les terrains les plus exigeants, sans compromis.',
    specs: ['V8 Diesel 4.5L', '4×4 premium', 'Sièges 8 places', 'Châssis blindé optionnel'],
    img: '/sequences/auto/frame300.webp',
  },
  {
    marque: 'Toyota', modele: 'Land Cruiser 300', type: 'SUV Haut de Gamme',
    desc: 'Le SUV de luxe par excellence — technologie de pointe, confort supérieur et puissance brute.',
    specs: ['V6 Twin-Turbo', 'Suspension adaptative', 'Système 4×4 avancé', 'Finition premium'],
    img: '/sequences/auto/frame400.webp',
  },
]

const avantages = [
  { title: 'Stock disponible', desc: 'Véhicules en stock pour une livraison rapide sur Conakry.' },
  { title: 'Financement', desc: 'Solutions de financement adaptées, avec partenaires bancaires locaux.' },
  { title: 'Garantie constructeur', desc: 'Tous nos véhicules neufs avec garantie constructeur officielle.' },
  { title: 'Livraison Guinée', desc: 'Livraison sur l\'ensemble du territoire guinéen selon disponibilité.' },
]

export default function AutomobilePage() {
  return (
    <PageShell>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <GammeSection />
      <AvantagesSection />
      <CTASection />
    </PageShell>
  )
}

/* ── HERO ── */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/sequences/auto/frame300.webp"
          alt="DGS SARL — automobiles Conakry"
          fill sizes="100vw" priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="absolute bottom-0 inset-x-0 z-10 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-14">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-[10px] tracking-[0.5em] uppercase text-[#B8966E] mb-6">
            DGS SARL · Nos activités — Automobile
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold uppercase leading-[0.82] text-[#F4F1EB] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}>
            La mobilité<br />
            sans<br />
            <span className="text-[#CC1418]">compromis.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-[#F4F1EB]/45 text-sm md:text-base tracking-widest uppercase">
            Vente · Importation · Flotte Entreprise · Premium
          </motion.p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2">
        <p className="font-body text-[9px] tracking-[0.4em] uppercase text-[#F4F1EB]/25" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Découvrir
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-[#B8966E] to-transparent" />
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

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Notre savoir-faire</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.88] text-[#F4F1EB] tracking-tight mb-8">
              Rouler<br />en toute<br /><span className="text-[#CC1418]">confiance.</span>
            </h2>
            <div className="w-14 h-px bg-[#CC1418] mb-8" />
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85] mb-5">
              Berlines, SUV, pick-ups, utilitaires — DGS propose une sélection de véhicules fiables et adaptés à vos besoins, pour rouler en toute confiance sur les routes de Guinée.
            </p>
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85]">
              Que vous soyez particulier ou entreprise, nous vous accompagnons dans le choix du véhicule idéal, son financement et sa livraison — de l'import jusqu'à votre porte.
            </p>
          </motion.div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image src="/sequences/auto/frame200.webp" alt="Véhicule DGS SARL"
                  fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover scale-105" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
            </div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-5 -left-3 md:-left-8 bg-[#CC1418] px-6 py-4">
              <p className="font-heading font-extrabold text-2xl text-white leading-none">4×4</p>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-white/70 mt-1">Tout-terrain</p>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-4 -right-3 md:-right-7 border border-[#B8966E]/30 bg-[#0A0A0A] px-5 py-3">
              <p className="font-heading font-extrabold text-lg text-[#B8966E] leading-none">Toyota</p>
              <p className="font-body text-[9px] tracking-[0.28em] uppercase text-[#F4F1EB]/40 mt-1">Distributeur</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SERVICES ── */
function ServicesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[50vw] h-[40vh] bg-[#CC1418]/3 blur-[100px] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Ce que nous offrons</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Nos Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {services.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group glass p-8 flex gap-6">
              <div className="shrink-0 w-14 h-14 border border-[#CC1418]/30 group-hover:border-[#CC1418] transition-colors duration-300 flex items-center justify-center">
                <span className="font-body text-[10px] text-[#CC1418] tracking-widest">{s.num}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg uppercase text-[#F4F1EB] tracking-wide mb-3 group-hover:text-[#B8966E] transition-colors duration-300 leading-tight">
                  {s.title}
                </h3>
                <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-[1.85]">{s.desc}</p>
                <div className="mt-5 w-0 h-px bg-[#CC1418] group-hover:w-10 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── GAMME ── */
function GammeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Sélection exclusive</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Notre Gamme
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-32">
          {gamme.map((v, i) => (
            <motion.div key={v.modele}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>

              <div className="relative aspect-[16/10] overflow-hidden">
                <VehicleParallaxImage src={v.img} alt={`${v.marque} ${v.modele}`} index={i} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {v.specs.slice(0, 2).map(sp => (
                    <span key={sp} className="font-body text-[9px] tracking-[0.2em] uppercase bg-[#0A0A0A]/75 text-[#B8966E] px-2.5 py-1.5 backdrop-blur-sm">{sp}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-4">{v.marque} · {v.type}</p>
                <h3 className="font-heading font-extrabold text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-6">
                  {v.modele}
                </h3>
                <div className="w-10 h-px bg-[#CC1418] mb-6" />
                <p className="font-body text-[14px] text-[#F4F1EB]/50 leading-[1.85] mb-8">{v.desc}</p>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {v.specs.map(sp => (
                    <span key={sp} className="font-body text-[10px] tracking-[0.2em] uppercase border border-[#F4F1EB]/12 text-[#F4F1EB]/50 px-3.5 py-2">
                      {sp}
                    </span>
                  ))}
                </div>
                <Link href="/#contact"
                  className="inline-flex items-center gap-3 border border-[#CC1418]/50 hover:bg-[#CC1418] text-[#CC1418] hover:text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-8 py-3.5 transition-all duration-300 cursor-none">
                  Renseignements
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VehicleParallaxImage({ src, alt, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.div ref={ref} className="absolute inset-0" style={{ y }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover scale-110" />
    </motion.div>
  )
}

/* ── AVANTAGES ── */
function AvantagesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Pourquoi choisir DGS</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Nos Avantages
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {avantages.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group p-6 border border-[#F4F1EB]/8 hover:border-[#B8966E]/25 transition-all duration-400">
              <div className="w-10 h-10 bg-[#CC1418]/10 group-hover:bg-[#CC1418]/20 flex items-center justify-center mb-5 transition-colors duration-300">
                <span className="font-body text-[10px] text-[#CC1418] tracking-widest">{String(i+1).padStart(2,'0')}</span>
              </div>
              <h3 className="font-heading font-bold text-sm uppercase text-[#F4F1EB] tracking-wide mb-2.5 group-hover:text-[#B8966E] transition-colors duration-300 leading-tight">
                {a.title}
              </h3>
              <p className="font-body text-[12px] text-[#F4F1EB]/40 leading-[1.85]">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection() {
  return (
    <section className="relative py-36 md:py-52 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[45vh] bg-[#CC1418]/4 blur-[140px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Trouvez votre véhicule</p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
            Votre prochaine<br /><span className="text-[#CC1418]">voiture vous attend.</span>
          </h2>
          <p className="font-body text-[15px] text-[#F4F1EB]/40 max-w-md mx-auto leading-relaxed mb-12">
            Contactez-nous pour disponibilité, tarifs et devis personnalisé. Réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/224000000000?text=Bonjour%20DGS%20SARL%2C%20je%20cherche%20un%20v%C3%A9hicule%20—%20pouvez-vous%20me%20renseigner%20%3F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA850] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-colors duration-300 cursor-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/#contact"
              className="inline-flex items-center gap-3 bg-[#CC1418] hover:bg-[#A50F12] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-colors duration-300 cursor-none">
              Nous contacter
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-3 border border-[#F4F1EB]/18 hover:border-[#B8966E]/50 text-[#F4F1EB]/55 hover:text-[#B8966E] font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-all duration-300 cursor-none">
              Accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
