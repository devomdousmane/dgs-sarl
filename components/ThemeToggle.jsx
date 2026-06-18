'use client'
import { useTheme } from './ThemeProvider'
import { motion, AnimatePresence } from 'motion/react'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="relative w-12 h-6 rounded-full border border-[var(--border-hover)] bg-[var(--bg-3)] cursor-none flex items-center px-0.5 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC1418]"
    >
      {/* Track fill */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, #B8966E, #CC1418)',
          opacity: isDark ? 0.15 : 0.25,
        }}
      />
      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 36 }}
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
        style={{
          background: isDark ? '#F4F1EB' : '#0A0A0A',
          marginLeft: isDark ? 0 : 'auto',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="#0A0A0A"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F4F1EB"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
}
