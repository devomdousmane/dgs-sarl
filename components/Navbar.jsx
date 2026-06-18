'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from './ThemeProvider'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Immobilier', href: '/immobilier' },
  { label: 'Automobile', href: '/automobile' },
  { label: 'Construction', href: '/btp' },
  { label: 'Projets', href: '/#projets' },
  { label: 'Notre Histoire', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const logoSrc = isDark ? '/logo/logo-dark.png' : '/logo/logo-light.png'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700"
        style={{
          background: scrolled ? 'var(--bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-14 h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="relative flex items-center cursor-none shrink-0">
            <Image
              src={logoSrc}
              alt="DGS SARL"
              width={120}
              height={53}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative font-body text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 cursor-none"
                style={{ color: 'var(--fg-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-[#CC1418] group-hover:w-full transition-all duration-400"
                />
              </a>
            ))}
          </div>

          {/* Right side: toggle + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <ThemeToggle />
            <a
              href="/#contact"
              className="font-body text-[11px] font-semibold tracking-[0.22em] uppercase px-5 py-2.5 border border-[#CC1418] text-[#CC1418] hover:bg-[#CC1418] hover:text-white transition-all duration-300 cursor-none"
            >
              Contact
            </a>
          </div>

          {/* Mobile: toggle + burger */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] w-9 h-9 items-center justify-center cursor-none"
              aria-label="Menu"
            >
              <span className={`block h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px] w-6' : 'w-6'}`} />
              <span className={`block h-px bg-[var(--fg)] transition-all duration-200 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px] w-6' : 'w-6'}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col justify-center items-center gap-8 px-8"
            style={{ background: 'var(--bg)', backdropFilter: 'blur(24px)' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-[clamp(2rem,10vw,3rem)] font-semibold uppercase tracking-tight cursor-none"
                style={{ color: 'var(--fg)' }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 font-body text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 border border-[#CC1418] text-[#CC1418] hover:bg-[#CC1418] hover:text-white transition-all duration-300 cursor-none"
            >
              Nous contacter
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
