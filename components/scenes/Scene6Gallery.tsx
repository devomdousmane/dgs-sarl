'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  title: string
  type: string
  location: string
  img: string
  year: string
}

interface ProjectCardProps {
  p: Project
  i: number
  style?: React.CSSProperties
  className?: string
}

const projects: Project[] = [
  {
    title: 'Résidence Horizon',
    type: 'Immobilier Résidentiel',
    location: 'Conakry, Guinée',
    img: '/images/render.webp',
    year: '2024',
  },
  {
    title: 'Réunion de Travail',
    type: 'Partenariat Technique',
    location: 'Conakry, Guinée',
    img: '/images/projet-site-d.jpg',
    year: '2025',
  },
  {
    title: 'Chantier Fondations',
    type: 'Gros Œuvre BTP',
    location: 'Conakry, Guinée',
    img: '/images/chantier.webp',
    year: '2024',
  },
  {
    title: 'Partenariat Stratégique',
    type: 'Gestion de Projet',
    location: 'Conakry, Guinée',
    img: '/images/partenariat.webp',
    year: '2023',
  },
  {
    title: 'DGS — Excellence',
    type: 'Identité & Qualité',
    location: 'Conakry, Guinée',
    img: '/images/casque.webp',
    year: '2023',
  },
  {
    title: 'Équipe Terrain',
    type: 'Coordination Équipe',
    location: 'Conakry, Guinée',
    img: '/images/equipe.webp',
    year: '2024',
  },
]

function ProjectCard({ p, i, style = {}, className = '' }: ProjectCardProps) {
  return (
    <div
      className={`gallery-card group relative flex-shrink-0 cursor-none overflow-hidden ${className}`}
      style={style}
    >
      <Image
        src={p.img}
        alt={p.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 28vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 translate-y-1 p-5 transition-transform duration-400 group-hover:translate-y-0 md:p-6">
        <p className="font-body mb-1.5 text-[9px] tracking-[0.35em] text-[#B8966E] uppercase">
          {p.type} · {p.year}
        </p>
        <h3
          className="font-heading text-lg font-bold tracking-wide uppercase md:text-xl"
          style={{ color: 'var(--fg)' }}
        >
          {p.title}
        </h3>
        <p className="font-body mt-0.5 text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
          {p.location}
        </p>
        <div className="mt-3 h-px w-0 bg-[#CC1418] transition-all duration-500 group-hover:w-10" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          border: '1px solid rgba(184,150,110,0.15)',
          boxShadow: 'inset 0 0 40px rgba(204,20,24,0.06)',
        }}
      />
    </div>
  )
}

function DesktopGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (window.__lenis) {
      window.__lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        if (window.__lenis) window.__lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      const totalWidth = track.scrollWidth - track.offsetWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth * 1.3}`,
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      })

      track.querySelectorAll('.gallery-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${i * 80} top`,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="relative z-10 hidden md:block"
      style={{ background: 'var(--bg)', overflowX: 'clip', overflowY: 'visible' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="sticky top-0 flex h-screen flex-col justify-center" style={{ overflowX: 'clip' }}>
        <GalleryHeader />
        <div
          ref={trackRef}
          className="flex gap-5 px-6 will-change-transform md:px-14"
          style={{ width: 'max-content', minWidth: '100vw' }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} className="aspect-[3/4] w-[38vw] lg:w-[27vw]" />
          ))}
        </div>
        <div className="mt-8 px-6 md:px-10">
          <p
            className="font-body text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'var(--fg-subtle)' }}
          >
            Défiler pour explorer →
          </p>
        </div>
      </div>
    </section>
  )
}

function MobileGallery() {
  return (
    <section
      id="projets-mobile"
      className="relative z-10 px-5 py-20 md:hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="mb-10">
        <GalleryHeader />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[3/4]'}
            style={{ position: 'relative' }}
          >
            <ProjectCard p={p} i={i} className="absolute inset-0 h-full w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GalleryHeader() {
  return (
    <div className="mx-auto mb-10 max-w-[1440px] px-6 pt-0 md:mb-12 md:px-14 md:pt-20">
      <p className="font-body mb-2 text-[9px] tracking-[0.4em] text-[#B8966E] uppercase md:mb-3 md:text-[10px]">
        Notre portfolio — 04
      </p>
      <h2
        className="font-heading text-[clamp(2.2rem,7vw,6rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
        style={{ color: 'var(--fg)' }}
      >
        NOS RÉALISATIONS
      </h2>
    </div>
  )
}

export default function Scene6Gallery() {
  return (
    <>
      <MobileGallery />
      <DesktopGallery />
    </>
  )
}
