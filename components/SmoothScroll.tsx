'use client'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    window.__lenis = lenis

    // Synchronise Lenis avec Framer Motion (useScroll / whileInView)
    // Framer Motion écoute les events scroll natifs du window — Lenis doit les dispatcher
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      // Framer Motion useScroll se base sur window.scrollY
      // On force un event scroll natif pour que whileInView (IntersectionObserver) reste en sync
      window.dispatchEvent(new Event('scroll'))
      void scroll // used
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}
