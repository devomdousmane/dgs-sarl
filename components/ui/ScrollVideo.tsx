'use client'
import { useRef, useEffect } from 'react'
import type { MotionValue } from 'motion/react'
import { useMotionValueEvent } from 'motion/react'

interface ScrollVideoProps {
  src: string
  progressValue: MotionValue<number>
  poster?: string
}

export default function ScrollVideo({ src, progressValue, poster }: ScrollVideoProps) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const durationRef = useRef(0)
  const rafRef      = useRef<number | null>(null)
  const readyRef    = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    readyRef.current  = false
    durationRef.current = 0

    const markReady = () => {
      if (readyRef.current) return
      const dur = video.duration
      if (!dur || !isFinite(dur)) return
      durationRef.current = dur
      readyRef.current    = true
      video.currentTime   = 0
      video.style.opacity = '1'
    }

    // Écouter tous les événements qui peuvent signaler les métadonnées disponibles
    video.addEventListener('loadedmetadata', markReady)
    video.addEventListener('loadeddata',     markReady)
    video.addEventListener('canplay',        markReady)

    // Si déjà prêt (readyState >= HAVE_METADATA = 1)
    if (video.readyState >= 1 && video.duration && isFinite(video.duration)) {
      markReady()
    }

    return () => {
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('loadeddata',     markReady)
      video.removeEventListener('canplay',        markReady)
    }
  }, [src])

  useMotionValueEvent(progressValue, 'change', (p: number) => {
    const video = videoRef.current
    if (!video || !readyRef.current || !durationRef.current) return

    const target = Math.max(0, Math.min(p, 1)) * durationRef.current
    if (Math.abs(video.currentTime - target) < 0.016) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      video.currentTime = target
    })
  })

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      style={{
        opacity: 0,
        transition: 'opacity 0.6s ease',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  )
}
