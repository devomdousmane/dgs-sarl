'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import ScrollVideo from '../ui/ScrollVideo'

interface Service {
  num: string
  title: string
  desc: string
}

const services: Service[] = [
  { num: '01', title: 'Vente Automobile',    desc: "Gamme sélectionnée de véhicules neufs et d'occasion, pour tous les profils." },
  { num: '02', title: 'Importation Directe', desc: 'Sourcing international aux meilleures conditions de marché.' },
  { num: '03', title: 'Flotte Entreprise',   desc: 'Solutions dédiées aux professionnels et institutions.' },
  { num: '04', title: 'Véhicules Premium',   desc: 'Sélection exclusive haut de gamme. Mobilité sans compromis.' },
]

export default function Scene4Auto() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  // end end : sticky reste collée jusqu'à ce que le bas de la section
  // sorte du bas du viewport — aucun scroll mort
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Frames : on utilise tout le scroll
  const seqProgress   = useTransform(scrollYProgress, [0, 1], [0, 1])
  // Zoom progressif pendant les frames
  const canvasScale   = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1.0, 1.10])
  // Wipe d'entrée : noir qui s'en va vers la droite sur les 8% premiers
  const wipeX         = useTransform(scrollYProgress, [0, 0.08], ['-100%', '100%'])
  const wipeOpacity   = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0])
  // Fondu noir de sortie sur les derniers 15%
  const fadeOut       = useTransform(scrollYProgress, [0.85, 1], [0, 1])
  // Apparition du titre et du contenu
  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.18], [0, 1])
  const titleOpacity   = useTransform(scrollYProgress, [0.06, 0.22], [0, 1])
  const titleY         = useTransform(scrollYProgress, [0.06, 0.22], ['50px', '0px'])
  const panelOpacity   = useTransform(scrollYProgress, [0.25, 0.42], [0, 1])
  const panelX         = useTransform(scrollYProgress, [0.25, 0.42], ['-48px', '0px'])

  return (
    <section
      id="automobile"
      ref={containerRef}
      className="relative z-10"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Vidéo automobile scroll-pilotée — zoom progressif */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: canvasScale, willChange: 'transform' }}
        >
          <ScrollVideo
            src="/videos/auto.mp4"
            progressValue={seqProgress}
          />
        </motion.div>

        {/* Overlays cinéma permanents */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse 55% 65% at 68% 52%, transparent 0%, rgba(10,10,10,0.30) 55%, rgba(10,10,10,0.80) 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.80) 36%, rgba(10,10,10,0.25) 56%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 18%, transparent 68%, rgba(10,10,10,0.90) 100%)' }}
        />

        {/* Wipe d'entrée */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 bg-[#0A0A0A]"
          style={{ x: wipeX, opacity: wipeOpacity }}
        />

        {/* Fondu noir de sortie */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 bg-[#0A0A0A]"
          style={{ opacity: fadeOut }}
        />

        {/* Numéro décoratif en arrière-plan */}
        <div className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 select-none overflow-hidden xl:block">
          <p
            className="font-heading font-extrabold leading-none"
            style={{ fontSize: 'clamp(12rem, 22vw, 22rem)', color: 'rgba(244,241,235,0.025)' }}
          >
            02
          </p>
        </div>

        {/* Contenu UI */}
        <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-[1440px] flex-col justify-between px-6 py-10 md:px-10 md:py-14">

          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="font-body text-[10px] tracking-[0.45em] text-[#B8966E] uppercase"
          >
            D Global Services — Automobile
          </motion.p>

          <div className="flex flex-col gap-10">
            <motion.div style={{ opacity: titleOpacity, y: titleY }}>
              <h2
                className="font-heading font-extrabold uppercase leading-[0.78] tracking-tight"
                style={{ fontSize: 'clamp(5rem, 13vw, 11rem)', color: '#F4F1EB' }}
              >
                AUTO<br />MOBILE
              </h2>
            </motion.div>

            <motion.div style={{ opacity: panelOpacity, x: panelX }} className="max-w-md">
              {services.map((s) => (
                <div
                  key={s.num}
                  className="group flex gap-5 border-t py-4 last:border-b"
                  style={{ borderColor: 'rgba(244,241,235,0.08)' }}
                >
                  <span className="font-body mt-[3px] w-6 shrink-0 text-[9px] tracking-[0.25em] text-[#B8966E]">
                    {s.num}
                  </span>
                  <div>
                    <p
                      className="font-body mb-1 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-[#B8966E]"
                      style={{ color: '#F4F1EB' }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="font-body text-[11px] font-light leading-relaxed tracking-wide"
                      style={{ color: 'rgba(244,241,235,0.38)' }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ opacity: titleOpacity }} className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="h-px w-6 bg-[#CC1418]" />
              <p className="font-body text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(244,241,235,0.28)' }}>
                Import · Vente · Flotte · Premium
              </p>
            </div>
            <p className="font-body hidden text-[9px] tracking-[0.3em] uppercase md:block" style={{ color: 'rgba(244,241,235,0.28)' }}>
              Conakry, Guinée
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
