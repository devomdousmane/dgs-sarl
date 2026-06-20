'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1800

    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 300)
      }
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-16 text-center"
          >
            <p className="font-body mb-3 text-[10px] tracking-[0.55em] text-[#B8966E] uppercase">
              D Global Services
            </p>
            <h1
              className="font-heading text-[clamp(2.5rem,8vw,5rem)] leading-none font-extrabold tracking-tight uppercase"
              style={{ color: 'var(--fg)' }}
            >
              DGS<span className="text-[#CC1418]">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex w-48 flex-col items-center gap-3"
          >
            <div
              className="relative h-px w-full overflow-hidden"
              style={{ background: 'var(--border)' }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#CC1418]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <p
              className="font-body text-[10px] tracking-[0.3em] tabular-nums"
              style={{ color: 'var(--fg-subtle)' }}
            >
              {String(progress).padStart(3, '0')}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body absolute bottom-10 text-[9px] tracking-[0.45em] uppercase"
            style={{ color: 'var(--fg-subtle)' }}
          >
            Conakry · Guinée
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
