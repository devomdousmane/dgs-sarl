'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  const hoveredRef = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    // Touch/stylus devices — restore system cursor, hide custom
    if (!window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'auto'
      return
    }

    // Mouse device — reveal elements
    dot.style.opacity = '1'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const attachHover = (root = document) => {
      root.querySelectorAll('a, button, [role="button"], [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hoveredRef.current = true })
        el.addEventListener('mouseleave', () => { hoveredRef.current = false })
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    attachHover()

    const mutationObs = new MutationObserver(() => attachHover())
    mutationObs.observe(document.body, { childList: true, subtree: true })

    function animate() {
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`

      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      const size = hoveredRef.current ? 52 : 32
      const offset = size / 2
      ringEl.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`
      ringEl.style.width = `${size}px`
      ringEl.style.height = `${size}px`
      ringEl.style.opacity = hoveredRef.current ? '0.85' : '0.45'

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      mutationObs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Always rendered so refs attach — opacity starts at 0, revealed by effect
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#CC1418] pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#F4F1EB] pointer-events-none z-[9998] transition-[width,height,opacity] duration-200"
        style={{ opacity: 0, willChange: 'transform', width: 32, height: 32 }}
      />
    </>
  )
}
