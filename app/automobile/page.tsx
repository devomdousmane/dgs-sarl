'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import PageShell from '@/components/PageShell'

interface Service {
  num: string
  icon: string
  title: string
  desc: string
}

interface Vehicule {
  marque: string
  modele: string
  type: string
  desc: string
  specs: string[]
  img: string
  gallery?: { src: string; label: string }[]
}

interface Avantage {
  title: string
  desc: string
}

interface VehicleParallaxImageProps {
  src: string
  alt: string
  index: number
}

interface VehicleGalleryProps {
  images: { src: string; label: string }[]
  alt: string
  index: number
}

const services: Service[] = [
  {
    num: '01',
    icon: '01',
    title: 'Vente Automobile',
    desc: "Une gamme sélectionnée de véhicules neufs et d'occasion, rigoureusement choisis pour leur fiabilité et leur rapport qualité-prix sur les routes de Guinée.",
  },
  {
    num: '02',
    icon: '02',
    title: 'Importation Directe',
    desc: "Accès à l'international — DGS importe directement des marques référencées aux meilleures conditions du marché, pour vous garantir authenticité et prix compétitif.",
  },
  {
    num: '03',
    icon: '03',
    title: 'Flotte Entreprise',
    desc: 'Solutions dédiées aux professionnels, administrations et institutions. Gestion de flotte, entretien, renouvellement : une offre complète, un seul interlocuteur.',
  },
  {
    num: '04',
    icon: '04',
    title: 'Véhicules Premium',
    desc: 'Sélection exclusive haut de gamme pour ceux qui exigent le meilleur — confort, puissance, prestige. Disponible sur commande et livraison personnalisée.',
  },
]

const gamme: Vehicule[] = [
  {
    marque: 'Toyota',
    modele: 'Hilux',
    type: 'Pick-up 4×4',
    desc: 'Le pick-up de référence en Afrique. Robuste, puissant, adapté à tous les terrains de Guinée.',
    specs: ['Diesel 2.4L', '4×4 permanente', 'Charge utile 1 tonne', 'Cabine double'],
    img: '/images/auto/hilux-blanc-avant.jpg',
    gallery: [
      { src: '/images/auto/hilux-blanc-avant.jpg', label: 'Extérieur' },
      { src: '/images/auto/hilux-interieur.jpg',   label: 'Habitacle' },
      { src: '/images/auto/hilux-arriere.jpg',      label: 'Arrière' },
    ],
  },
  {
    marque: 'Toyota',
    modele: 'Land Cruiser 76',
    type: 'SUV Tout-terrain',
    desc: "L'icône de l'endurance. Conçu pour conquérir les terrains les plus exigeants, sans compromis.",
    specs: ['V8 Diesel 4.5L', '4×4 premium', 'Sièges 8 places', 'Châssis blindé optionnel'],
    img: '/images/auto/lc76-avant.jpg',
    gallery: [
      { src: '/images/auto/lc76-avant.jpg',     label: 'Extérieur' },
      { src: '/images/auto/lc76-interieur.jpg', label: 'Habitacle' },
      { src: '/images/auto/lc76-arriere.jpg',   label: 'Arrière' },
    ],
  },
  {
    marque: 'Toyota',
    modele: 'Land Cruiser 300',
    type: 'SUV Haut de Gamme',
    desc: 'Le SUV de luxe par excellence — technologie de pointe, confort supérieur et puissance brute.',
    specs: ['V6 Twin-Turbo', 'Suspension adaptative', 'Système 4×4 avancé', 'Finition premium'],
    img: '/images/auto/landcruiser-300.jpg',
  },
]

const avantages: Avantage[] = [
  { title: 'Stock disponible', desc: 'Véhicules en stock pour une livraison rapide sur Conakry.' },
  {
    title: 'Financement',
    desc: 'Solutions de financement adaptées, avec partenaires bancaires locaux.',
  },
  {
    title: 'Garantie constructeur',
    desc: 'Tous nos véhicules neufs avec garantie constructeur officielle.',
  },
  {
    title: 'Livraison Guinée',
    desc: "Livraison sur l'ensemble du territoire guinéen selon disponibilité.",
  },
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

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/sequences/automobile/frame015.webp"
          alt="DGS SARL — automobiles Conakry"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
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
            DGS SARL · Nos activités — Automobile
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading mb-6 leading-[0.82] font-extrabold tracking-tight text-white uppercase"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
          >
            La mobilité
            <br />
            sans
            <br />
            <span className="text-[#CC1418]">compromis.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-sm tracking-widest text-white/45 uppercase md:text-base"
          >
            Vente · Importation · Flotte Entreprise · Premium
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 bottom-8 z-10 flex flex-col items-center gap-2 md:right-14"
      >
        <p
          className="font-body text-[9px] tracking-[0.4em] text-white/25 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Découvrir
        </p>
        <div className="h-10 w-px bg-gradient-to-b from-[#B8966E] to-transparent" />
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
              Notre savoir-faire
            </p>
            <h2
              className="font-heading mb-8 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              Rouler
              <br />
              en toute
              <br />
              <span className="text-[#CC1418]">confiance.</span>
            </h2>
            <div className="mb-8 h-px w-14 bg-[#CC1418]" />
            <p
              className="font-body mb-5 text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Berlines, SUV, pick-ups, utilitaires — DGS propose une sélection de véhicules fiables
              et adaptés à vos besoins, pour rouler en toute confiance sur les routes de Guinée.
            </p>
            <p
              className="font-body text-[15px] leading-[1.85]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Que vous soyez particulier ou entreprise, nous vous accompagnons dans le choix du
              véhicule idéal, son financement et sa livraison — de l&apos;import jusqu&apos;à votre
              porte.
            </p>
          </motion.div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="/images/auto/rav4-rouge.jpg"
                  alt="Véhicule DGS SARL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-105 object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-5 -left-3 bg-[#CC1418] px-6 py-4 md:-left-8"
            >
              <p className="font-heading text-2xl leading-none font-extrabold text-white">4×4</p>
              <p className="font-body mt-1 text-[9px] tracking-[0.3em] text-white/70 uppercase">
                Tout-terrain
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-4 -right-3 px-5 py-3 md:-right-7"
              style={{ border: '1px solid rgba(184,150,110,0.3)', background: 'var(--bg)' }}
            >
              <p className="font-heading text-lg leading-none font-extrabold text-[#B8966E]">
                Toyota
              </p>
              <p
                className="font-body mt-1 text-[9px] tracking-[0.28em] uppercase"
                style={{ color: 'var(--fg-subtle)' }}
              >
                Distributeur
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
      <div className="pointer-events-none absolute bottom-0 left-0 h-[40vh] w-[50vw] bg-[#CC1418]/3 blur-[100px]" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Ce que nous offrons
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Nos Services
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group glass flex gap-6 p-8"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#CC1418]/30 transition-colors duration-300 group-hover:border-[#CC1418]">
                <span className="font-body text-[10px] tracking-widest text-[#CC1418]">
                  {s.num}
                </span>
              </div>
              <div>
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
                <div className="mt-5 h-px w-0 bg-[#CC1418] transition-all duration-500 group-hover:w-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GammeSection() {
  const ref = useRef<HTMLElement>(null)
  useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Sélection exclusive
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Notre Gamme
          </h2>
        </motion.div>
        <div className="flex flex-col gap-20 md:gap-32">
          {gamme.map((v, i) => (
            <motion.div
              key={v.modele}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {v.gallery ? (
                  <VehicleGallery images={v.gallery} alt={`${v.marque} ${v.modele}`} index={i} />
                ) : (
                  <VehicleParallaxImage src={v.img} alt={`${v.marque} ${v.modele}`} index={i} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-none">
                  {v.specs.slice(0, 2).map((sp) => (
                    <span
                      key={sp}
                      className="font-body bg-black/75 px-2.5 py-1.5 text-[9px] tracking-[0.2em] text-[#B8966E] uppercase backdrop-blur-sm"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body mb-4 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
                  {v.marque} · {v.type}
                </p>
                <h3
                  className="font-heading mb-6 text-[clamp(2.5rem,5vw,4rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
                  style={{ color: 'var(--fg)' }}
                >
                  {v.modele}
                </h3>
                <div className="mb-6 h-px w-10 bg-[#CC1418]" />
                <p
                  className="font-body mb-8 text-[14px] leading-[1.85]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {v.desc}
                </p>
                <div className="mb-8 flex flex-wrap gap-2.5">
                  {v.specs.map((sp) => (
                    <span
                      key={sp}
                      className="font-body px-3.5 py-2 text-[10px] tracking-[0.2em] uppercase"
                      style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
                    >
                      {sp}
                    </span>
                  ))}
                </div>
                <Link
                  href="/#contact"
                  className="font-body inline-flex cursor-none items-center gap-3 border border-[#CC1418]/50 px-8 py-3.5 text-[11px] font-semibold tracking-[0.28em] text-[#CC1418] uppercase transition-all duration-300 hover:bg-[#CC1418] hover:text-white"
                >
                  Renseignements
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VehicleParallaxImage({ src, alt }: VehicleParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.div ref={ref} className="absolute inset-0" style={{ y }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="scale-110 object-cover"
      />
    </motion.div>
  )
}

function VehicleGallery({ images, alt, index: _index }: VehicleGalleryProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="absolute inset-0">
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={images[active].src}
            alt={`${alt} — ${images[active].label}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Tabs */}
      <div className="absolute top-4 right-4 z-10 flex gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.label}
            onClick={() => setActive(i)}
            className={`font-body cursor-pointer px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300 ${
              i === active
                ? 'bg-[#CC1418] text-white'
                : 'bg-black/50 text-white/60 hover:bg-black/70 hover:text-white/90'
            }`}
          >
            {img.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function AvantagesSection() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-body mb-5 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Pourquoi choisir DGS
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Nos Avantages
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {avantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group p-6 transition-all duration-400 hover:border-[#B8966E]/25"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#CC1418]/10 transition-colors duration-300 group-hover:bg-[#CC1418]/20">
                <span className="font-body text-[10px] tracking-widest text-[#CC1418]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3
                className="font-heading mb-2.5 text-sm leading-tight font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E]"
                style={{ color: 'var(--fg)' }}
              >
                {a.title}
              </h3>
              <p
                className="font-body text-[12px] leading-[1.85]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {a.desc}
              </p>
            </motion.div>
          ))}
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
            Trouvez votre véhicule
          </p>
          <h2
            className="font-heading mb-8 text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Votre prochaine
            <br />
            <span className="text-[#CC1418]">voiture vous attend.</span>
          </h2>
          <p
            className="font-body mx-auto mb-12 max-w-md text-[15px] leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            Contactez-nous pour disponibilité, tarifs et devis personnalisé. Réponse sous 24h.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/224000000000?text=Bonjour%20DGS%20SARL%2C%20je%20cherche%20un%20v%C3%A9hicule%20—%20pouvez-vous%20me%20renseigner%20%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex min-h-[52px] cursor-none items-center gap-3 bg-[#25D366] px-10 py-4 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-300 hover:bg-[#1DA850]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
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
              Accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
