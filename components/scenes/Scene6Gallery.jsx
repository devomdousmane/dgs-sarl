'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  { title: 'Résidence Horizon', type: 'Immobilier Résidentiel', location: 'Conakry, Guinée', img: '/images/render.webp', year: '2024' },
  { title: 'Chantier Fondations', type: 'Gros Œuvre BTP', location: 'Conakry, Guinée', img: '/images/chantier.webp', year: '2024' },
  { title: 'Partenariat Stratégique', type: 'Gestion de Projet', location: 'Conakry, Guinée', img: '/images/partenariat.webp', year: '2023' },
  { title: 'DGS — Excellence', type: 'Identité & Qualité', location: 'Conakry, Guinée', img: '/images/casque.webp', year: '2023' },
  { title: 'Réunion Chantier', type: 'Coordination Équipe', location: 'Conakry, Guinée', img: '/images/equipe.webp', year: '2024' },
]

function ProjectCard({ p, i, style = {}, className = '' }) {
  return (
    <div
      className={`gallery-card group relative flex-shrink-0 overflow-hidden cursor-none ${className}`}
      style={style}
    >
      <Image
        src={p.img}
        alt={p.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 28vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#B8966E] mb-1.5">
          {p.type} · {p.year}
        </p>
        <h3 className="font-heading font-bold text-lg md:text-xl uppercase text-[#F4F1EB] tracking-wide">
          {p.title}
        </h3>
        <p className="font-body text-[11px] text-[#F4F1EB]/45 mt-0.5">{p.location}</p>
        <div className="mt-3 w-0 h-px bg-[#CC1418] group-hover:w-10 transition-all duration-500" />
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid rgba(184,150,110,0.15)', boxShadow: 'inset 0 0 40px rgba(204,20,24,0.06)' }}
      />
    </div>
  )
}

/* ── Desktop: GSAP horizontal ── */
function DesktopGallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    if (window.__lenis) {
      window.__lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => { if (window.__lenis) window.__lenis.raf(time * 1000) })
      gsap.ticker.lagSmoothing(0)
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current
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
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
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
    <section id="projets" ref={sectionRef} className="relative bg-[#0A0A0A] overflow-hidden hidden md:block">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <GalleryHeader />
        <div
          ref={trackRef}
          className="flex gap-5 px-6 md:px-14 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              i={i}
              className="w-[38vw] lg:w-[27vw] aspect-[3/4]"
            />
          ))}
        </div>
        <div className="px-6 md:px-14 mt-8">
          <p className="font-body text-[10px] text-[#F4F1EB]/22 tracking-[0.3em] uppercase">
            Défiler pour explorer →
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Mobile: vertical grid ── */
function MobileGallery() {
  return (
    <section id="projets-mobile" className="md:hidden bg-[#0A0A0A] py-20 px-5">
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
            <ProjectCard
              p={p}
              i={i}
              className="w-full h-full absolute inset-0"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GalleryHeader() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-14 mb-10 md:mb-12 pt-0 md:pt-20">
      <p className="font-body text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#B8966E] mb-2 md:mb-3">
        Notre portfolio — 04
      </p>
      <h2 className="font-heading font-extrabold text-[clamp(2.2rem,7vw,6rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
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
