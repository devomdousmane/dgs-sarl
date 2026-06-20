'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number | null>(null)
  const hoveredRef = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    if (!window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'auto'
      return
    }

    dot.style.opacity = '1'

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const attachHover = (root: Document | Element = document) => {
      root.querySelectorAll('a, button, [role="button"], [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          hoveredRef.current = true
        })
        el.addEventListener('mouseleave', () => {
          hoveredRef.current = false
        })
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    attachHover()

    const mutationObs = new MutationObserver(() => attachHover())
    mutationObs.observe(document.body, { childList: true, subtree: true })

    function animate() {
      if (!dotRef.current || !ringRef.current) return

      dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`

      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      const size = hoveredRef.current ? 52 : 32
      const offset = size / 2
      ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`
      ringRef.current.style.width = `${size}px`
      ringRef.current.style.height = `${size}px`
      ringRef.current.style.opacity = hoveredRef.current ? '0.85' : '0.45'

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      mutationObs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#CC1418] mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-[#F4F1EB] transition-[width,height,opacity] duration-200"
        style={{ opacity: 0, willChange: 'transform', width: 32, height: 32 }}
      />
    </>
  )
}
