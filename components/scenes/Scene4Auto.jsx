'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SequenceCanvas from '../ui/SequenceCanvas'

const TOTAL_FRAMES = 874

const services = [
  { num: '01', title: 'Vente Automobile', desc: "Gamme sélectionnée de véhicules neufs et d'occasion, pour tous les profils." },
  { num: '02', title: 'Importation Directe', desc: 'Sourcing international aux meilleures conditions de marché.' },
  { num: '03', title: 'Flotte Entreprise', desc: 'Solutions dédiées aux professionnels et institutions.' },
  { num: '04', title: 'Véhicules Premium', desc: 'Sélection exclusive haut de gamme. Mobilité sans compromis.' },
]

export default function Scene4Auto() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Canvas covers full scroll
  const seqProgress = useTransform(scrollYProgress, [0, 0.78], [0, 1])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.07])

  // Cinematic wipe in from black — plus lent
  const wipeX = useTransform(scrollYProgress, [0, 0.12], ['-100%', '100%'])
  const wipeOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0])

  // Title reveal
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.28], [0, 1])
  const titleY = useTransform(scrollYProgress, [0.1, 0.28], ['50px', '0px'])

  // Left panel slides in plus progressivement
  const panelOpacity = useTransform(scrollYProgress, [0.36, 0.58], [0, 1])
  const panelX = useTransform(scrollYProgress, [0.36, 0.58], ['-56px', '0px'])

  // Section label at top
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.24], [0, 1])

  return (
    <section id="automobile" ref={containerRef} style={{ height: '420vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas — fills full viewport */}
        <motion.div className="absolute inset-0" style={{ scale: canvasScale, willChange: 'transform' }}>
          <SequenceCanvas basePath="/sequences/auto" totalFrames={TOTAL_FRAMES} progressValue={seqProgress} />
        </motion.div>

        {/* Spotlight radial — draws eye to center-right where car lives */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse 55% 65% at 68% 52%, transparent 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.82) 100%)' }}
        />

        {/* Left panel gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 38%, rgba(10,10,10,0.3) 58%, transparent 72%)' }}
        />

        {/* Top/bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 18%, transparent 78%, rgba(10,10,10,0.65) 100%)' }}
        />

        {/* Wipe transition */}
        <motion.div
          className="absolute inset-0 bg-[#0A0A0A] z-30 pointer-events-none"
          style={{ x: wipeX, opacity: wipeOpacity }}
        />

        {/* Ghost section number — decorative */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none hidden xl:block overflow-hidden">
          <p className="font-heading font-extrabold leading-none text-[#F4F1EB]/[0.025]" style={{ fontSize: 'clamp(12rem, 22vw, 22rem)' }}>
            02
          </p>
        </div>

        {/* ── CONTENT ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none px-6 md:px-14 py-10 md:py-14 max-w-[1280px] mx-auto">

          {/* Eyebrow top-left */}
          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E]"
          >
            D Global Services — Automobile
          </motion.p>

          {/* Center content */}
          <div className="flex flex-col gap-10">
            {/* Section title */}
            <motion.div style={{ opacity: titleOpacity, y: titleY }}>
              <h2
                className="font-heading font-extrabold uppercase leading-[0.78] text-[#F4F1EB] tracking-tight"
                style={{ fontSize: 'clamp(5rem, 13vw, 11rem)' }}
              >
                AUTO<br />MOBILE
              </h2>
            </motion.div>

            {/* Services spec-sheet list */}
            <motion.div style={{ opacity: panelOpacity, x: panelX }} className="max-w-md">
              {services.map((s, i) => (
                <div key={s.num} className="flex gap-5 py-4 border-t border-[#F4F1EB]/8 last:border-b group">
                  <span className="font-body font-light text-[9px] tracking-[0.25em] text-[#B8966E] mt-[3px] shrink-0 w-6">
                    {s.num}
                  </span>
                  <div>
                    <p className="font-body font-semibold text-[11px] tracking-[0.22em] uppercase text-[#F4F1EB] mb-1 group-hover:text-[#B8966E] transition-colors duration-300">
                      {s.title}
                    </p>
                    <p className="font-body font-light text-[11px] text-[#F4F1EB]/38 leading-relaxed tracking-wide">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom meta */}
          <motion.div style={{ opacity: titleOpacity }} className="flex justify-between items-end">
            <div className="flex items-center gap-4">
              <div className="w-6 h-px bg-[#CC1418]" />
              <p className="font-body font-light text-[9px] tracking-[0.35em] uppercase text-[#F4F1EB]/28">
                Import · Vente · Flotte · Premium
              </p>
            </div>
            <p className="font-body font-light text-[9px] tracking-[0.3em] uppercase text-[#F4F1EB]/28 hidden md:block">
              Conakry, Guinée
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
