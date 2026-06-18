'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import SequenceCanvas from '../ui/SequenceCanvas'

const TOTAL_FRAMES = 873

export default function Scene1Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Sequence progress: full range of scroll
  const seqProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Slow zoom in on canvas
  const canvasScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1])

  // Hero text: visible at top, fades out on first scroll (plus doux)
  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.18], ['0vh', '-6vh'])

  // Overlay darkens progressivement
  const overlayOpacity = useTransform(scrollYProgress, [0.55, 0.88], [0.3, 0.8])

  // Scroll indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  // End-scene text
  const endTextOpacity = useTransform(scrollYProgress, [0.84, 0.97], [0, 1])
  const endTextY = useTransform(scrollYProgress, [0.84, 0.97], ['40px', '0px'])

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ height: '500vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden letterbox">
        {/* Poster image — visible instantly, hidden when sequence loads */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/render.webp"
            alt="DGS SARL — résidence Conakry"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Canvas image sequence (overlays poster once ready) */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ scale: canvasScale, willChange: 'transform' }}
        >
          <SequenceCanvas
            basePath="/sequences/hero"
            totalFrames={TOTAL_FRAMES}
            progressValue={seqProgress}
          />
        </motion.div>

        {/* Persistent dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />

        {/* Dynamic overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0A0A0A] pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />

        {/* ── HERO CONTENT ── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center pt-20 md:pt-16"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 md:px-14">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="font-body text-[10px] md:text-xs text-[#B8966E] uppercase mb-6 md:mb-10 tracking-[0.35em]"
          >
            BTP · Génie Civil · Immobilier · Automobile — Conakry, Guinée
          </motion.p>

          {/* Main title */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-[clamp(2.8rem,10vw,10rem)] leading-[0.82] uppercase text-[#F4F1EB] tracking-tight"
            >
              D.GLOBAL
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6 md:mb-14">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-[clamp(2.8rem,10vw,10rem)] leading-[0.82] uppercase text-[#CC1418] tracking-tight"
            >
              SERVICES
            </motion.h1>
          </div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="flex flex-col gap-1 mb-10 md:mb-14"
          >
            {['Construire aujourd\'hui.', 'Investir durablement.', 'Habiter demain.'].map((line, i) => (
              <p
                key={i}
                className={`font-display text-[clamp(1rem,2.2vw,1.6rem)] italic font-light tracking-wide ${
                  i === 2 ? 'text-[#B8966E]' : 'text-[#F4F1EB]/75'
                }`}
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <a
              href="#immobilier"
              className="group inline-flex items-center gap-4 border border-[#F4F1EB]/30 hover:border-[#CC1418] px-7 py-4 transition-all duration-500 hover:bg-[#CC1418]/10 cursor-none"
            >
              <span className="font-body text-[11px] tracking-[0.3em] uppercase text-[#F4F1EB]">
                Découvrir nos projets
              </span>
              <svg
                className="w-4 h-4 text-[#B8966E] group-hover:translate-x-2 transition-transform duration-300"
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
          </div>
        </motion.div>

        {/* ── END-OF-SEQUENCE TRANSITION TEXT ── */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: endTextOpacity, y: endTextY }}
        >
          <div className="text-center px-6">
            <p className="font-display text-[clamp(1rem,2vw,1.4rem)] italic text-[#B8966E] tracking-widest mb-4">
              D Global Services
            </p>
            <p className="font-heading font-extrabold text-[clamp(2rem,6vw,5rem)] uppercase text-[#F4F1EB] tracking-tight">
              Bâtir l'avenir de la Guinée
            </p>
          </div>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-[#F4F1EB]/40">
            Défiler
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#B8966E]/60 to-transparent relative">
            <div className="scroll-dot absolute top-0 w-px h-4 bg-[#B8966E]" />
          </div>
        </motion.div>

        {/* ── FLOATING PARTICLES ── */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[
            { left: '8%', top: '25%', delay: '0s', dur: '4s' },
            { left: '15%', top: '65%', delay: '0.8s', dur: '5s' },
            { left: '85%', top: '20%', delay: '1.2s', dur: '3.5s' },
            { left: '75%', top: '70%', delay: '0.4s', dur: '4.5s' },
            { left: '50%', top: '15%', delay: '2s', dur: '6s' },
            { left: '92%', top: '50%', delay: '1.6s', dur: '3s' },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#B8966E]/40"
              style={{
                left: p.left,
                top: p.top,
                animation: `float ${p.dur} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Frame counter (dev aid — remove in prod) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute bottom-4 right-4 z-30 font-mono text-[10px] text-white/20">
            {TOTAL_FRAMES} frames
          </div>
        )}
      </div>
    </section>
  )
}
