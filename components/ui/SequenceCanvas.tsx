'use client'
import { useRef, useEffect, useCallback } from 'react'
import type { MotionValue } from 'motion/react'
import { useMotionValueEvent } from 'motion/react'

interface SequenceCanvasProps {
  basePath: string
  totalFrames: number
  progressValue: MotionValue<number>
  preloadAhead?: number  // frames à précharger en avance (défaut: 30)
}

export default function SequenceCanvas({
  basePath,
  totalFrames,
  progressValue,
  preloadAhead = 30,
}: SequenceCanvasProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const images      = useRef<Record<number, HTMLImageElement | null>>({})
  const rafRef      = useRef<number | null>(null)
  const currentFrame = useRef(0)

  const frameUrl = useCallback(
    (i: number) => `${basePath}/frame${String(i + 1).padStart(3, '0')}.webp`,
    [basePath]
  )

  const paint = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    const img    = images.current[frameIdx]
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.offsetWidth
    const ch = canvas.offsetHeight
    if (canvas.width  !== cw) canvas.width  = cw
    if (canvas.height !== ch) canvas.height = ch

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const sw = img.naturalWidth  * scale
    const sh = img.naturalHeight * scale
    const ox = (cw - sw) / 2
    const oy = (ch - sh) / 2

    ctx.drawImage(img, ox, oy, sw, sh)
  }, [])

  const loadFrame = useCallback(
    (i: number) => {
      if (i < 0 || i >= totalFrames) return
      if (images.current[i] !== undefined) return

      images.current[i] = null
      const img = new window.Image()
      img.src = frameUrl(i)
      img.onload = () => {
        images.current[i] = img
        if (i === currentFrame.current) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => paint(i))
        }
      }
    },
    [totalFrames, frameUrl, paint]
  )

  // Scroll handler : fenêtre glissante autour de la frame courante
  useMotionValueEvent(progressValue, 'change', (p: number) => {
    const target = Math.min(Math.floor(p * (totalFrames - 1)), totalFrames - 1)

    // Précharger en avant et légèrement en arrière
    const from = Math.max(0, target - 5)
    const to   = Math.min(totalFrames, target + preloadAhead)
    for (let i = from; i < to; i++) loadFrame(i)

    if (target === currentFrame.current) return
    currentFrame.current = target

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => paint(target))
  })

  // Au montage : charger seulement les premières frames + déclencher le reste progressivement
  useEffect(() => {
    const INITIAL = Math.min(10, totalFrames)
    for (let i = 0; i < INITIAL; i++) loadFrame(i)

    // Afficher frame 0 dès qu'elle est prête
    const checkFirst = setInterval(() => {
      if (images.current[0]) {
        paint(0)
        clearInterval(checkFirst)
      }
    }, 30)

    // Précharger le reste en arrière-plan par petits paquets
    let cursor = INITIAL
    const pump = setInterval(() => {
      const end = Math.min(cursor + 20, totalFrames)
      for (let i = cursor; i < end; i++) loadFrame(i)
      cursor = end
      if (cursor >= totalFrames) clearInterval(pump)
    }, 200)

    return () => {
      clearInterval(checkFirst)
      clearInterval(pump)
    }
  }, [loadFrame, paint, totalFrames])

  useEffect(() => {
    const onResize = () => paint(currentFrame.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [paint])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
