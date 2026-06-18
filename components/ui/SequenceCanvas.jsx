'use client'
import { useRef, useEffect, useCallback } from 'react'
import { useMotionValueEvent } from 'motion/react'

export default function SequenceCanvas({ basePath, totalFrames, progressValue }) {
  const canvasRef = useRef(null)
  const images = useRef({})
  const rafRef = useRef(null)
  const currentFrame = useRef(0)

  const frameUrl = useCallback(
    (i) => `${basePath}/frame${String(i + 1).padStart(3, '0')}.webp`,
    [basePath]
  )

  const paint = useCallback((frameIdx) => {
    const canvas = canvasRef.current
    const img = images.current[frameIdx]
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    const cw = canvas.offsetWidth
    const ch = canvas.offsetHeight

    if (canvas.width !== cw) canvas.width = cw
    if (canvas.height !== ch) canvas.height = ch

    // Cover-fill: maintain aspect ratio, fill entire canvas
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const sw = img.naturalWidth * scale
    const sh = img.naturalHeight * scale
    const ox = (cw - sw) / 2
    const oy = (ch - sh) / 2

    ctx.drawImage(img, ox, oy, sw, sh)
  }, [])

  const loadFrame = useCallback(
    (i) => {
      if (i < 0 || i >= totalFrames) return
      if (images.current[i] !== undefined) return

      images.current[i] = null // mark as loading

      const img = new Image()
      img.src = frameUrl(i)
      img.onload = () => {
        images.current[i] = img
        // Paint if this is the current frame
        if (i === currentFrame.current) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => paint(i))
        }
      }
    },
    [totalFrames, frameUrl, paint]
  )

  // React to scroll progress changes WITHOUT causing re-renders
  useMotionValueEvent(progressValue, 'change', (p) => {
    const target = Math.min(Math.floor(p * (totalFrames - 1)), totalFrames - 1)

    // Preload window: 5 behind, 40 ahead
    for (let i = Math.max(0, target - 5); i < Math.min(totalFrames, target + 40); i++) {
      loadFrame(i)
    }

    if (target === currentFrame.current) return
    currentFrame.current = target

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => paint(target))
  })

  // Initial preload: first 60 frames
  useEffect(() => {
    for (let i = 0; i < Math.min(60, totalFrames); i++) {
      loadFrame(i)
    }
    // Paint frame 0 once first image loads
    const checkFirst = setInterval(() => {
      if (images.current[0]) {
        paint(0)
        clearInterval(checkFirst)
      }
    }, 50)
    return () => clearInterval(checkFirst)
  }, [loadFrame, paint, totalFrames])

  // Handle resize
  useEffect(() => {
    const onResize = () => paint(currentFrame.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [paint])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
