'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import ScrollVideo from '../ui/ScrollVideo'

export default function Scene1Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  // offset end end : progress atteint 1 quand le bas de la section
  // touche le bas du viewport — la sticky reste visible jusqu'au bout
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Vidéo couvre tout le scroll (0→1)
  const seqProgress    = useTransform(scrollYProgress, [0, 1], [0, 1])
  // Léger zoom avant pendant le scroll
  const canvasScale    = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1, 1.08])
  // Texte hero disparaît vite au début du scroll
  const textOpacity    = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const textY          = useTransform(scrollYProgress, [0, 0.12], ['0%', shouldReduce ? '0%' : '-4%'])
  // Overlay noir monte vers la fin pour fondre proprement dans Scene2
  const fadeOut        = useTransform(scrollYProgress, [0.78, 1], [0, 1])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  // Texte cinématique transitoire entre les deux
  const endTextOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.86], [0, 1, 0])
  const endTextY       = useTransform(scrollYProgress, [0.55, 0.72], shouldReduce ? ['0px', '0px'] : ['30px', '0px'])

  const particles = [
    { left: '8%',  top: '25%', delay: '0s',   dur: '4s'   },
    { left: '15%', top: '65%', delay: '0.8s', dur: '5s'   },
    { left: '85%', top: '20%', delay: '1.2s', dur: '3.5s' },
    { left: '75%', top: '70%', delay: '0.4s', dur: '4.5s' },
    { left: '50%', top: '15%', delay: '2s',   dur: '6s'   },
    { left: '92%', top: '50%', delay: '1.6s', dur: '3s'   },
  ]

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-0"
      style={{ height: '300vh' }}
    >
      <div className="letterbox sticky top-0 h-screen overflow-hidden">

        {/* Poster image — affiché avant que la vidéo charge */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/render.webp"
            alt="DGS SARL"
            fill sizes="100vw" priority
            className="object-cover"
          />
        </div>

        {/* Vidéo hero scroll-pilotée */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ scale: canvasScale, willChange: 'transform' }}
        >
          <ScrollVideo
            src="/videos/hero.mp4"
            poster="/images/render.webp"
            progressValue={seqProgress}
          />
        </motion.div>

        {/* Gradients cinéma permanents */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-transparent to-black/55" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Fondu noir de sortie */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{ opacity: fadeOut }}
        />

        {/* Texte principal hero */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col justify-center pt-20 md:pt-16"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="font-body mb-4 text-[9px] tracking-[0.3em] text-[#B8966E] uppercase md:mb-10 md:text-[10px]"
            >
              BTP · Immobilier · Automobile
            </motion.p>

            <div className="mb-2 overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[clamp(2.8rem,10vw,10rem)] font-extrabold leading-[0.82] uppercase text-white tracking-tight"
              >
                D.GLOBAL
              </motion.h1>
            </div>
            <div className="mb-6 overflow-hidden md:mb-14">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[clamp(2.8rem,10vw,10rem)] font-extrabold leading-[0.82] uppercase text-[#CC1418] tracking-tight"
              >
                SERVICES
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className="mb-10 flex flex-col gap-1 md:mb-14"
            >
              {["Construire aujourd'hui.", 'Investir durablement.', 'Habiter demain.'].map((line, i) => (
                <p
                  key={i}
                  className={`font-display text-[clamp(1rem,2.2vw,1.6rem)] font-light italic tracking-wide ${
                    i === 2 ? 'text-[#B8966E]' : 'text-white/75'
                  }`}
                >
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.7 }}
            >
              <a
                href="#immobilier"
                className="group inline-flex cursor-none items-center gap-4 border border-white/30 px-7 py-4 transition-all duration-500 hover:border-[#CC1418] hover:bg-[#CC1418]/10"
              >
                <span className="font-body text-[11px] tracking-[0.3em] uppercase text-white">
                  Découvrir nos projets
                </span>
                <svg className="h-4 w-4 text-[#B8966E] transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Message cinématique de transition */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{ opacity: endTextOpacity, y: endTextY }}
        >
          <div className="px-6 text-center">
            <p className="font-display mb-4 text-[clamp(1rem,2vw,1.4rem)] italic tracking-widest text-[#B8966E]">
              D Global Services
            </p>
            <p className="font-heading text-[clamp(2rem,6vw,5rem)] font-extrabold uppercase tracking-tight text-white">
              Bâtir l&apos;avenir de la Guinée
            </p>
          </div>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-white/40">Défiler</span>
          <div className="relative h-12 w-px bg-gradient-to-b from-[#B8966E]/60 to-transparent">
            <div className="scroll-dot absolute top-0 h-4 w-px bg-[#B8966E]" />
          </div>
        </motion.div>

        {/* Particules ambiantes */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#B8966E]/40"
              style={{
                left: p.left, top: p.top,
                animation: `float ${p.dur} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
