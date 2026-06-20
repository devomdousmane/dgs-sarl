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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const logoSrc = isDark ? '/logo/logo-dark.png' : '/logo/logo-light.png'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-700 ${
          scrolled ? 'bg-theme border-b border-theme backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-6 md:h-20 md:px-14">
          <a href="/" className="relative flex shrink-0 cursor-none items-center">
            <Image
              src={logoSrc}
              alt="DGS SARL"
              width={120}
              height={53}
              className="h-8 w-auto object-contain md:h-10"
              priority
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-fg-muted group relative cursor-none text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:text-fg"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#CC1418] transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <ThemeToggle />
            <a
              href="/#contact"
              className="font-body cursor-none border border-[#CC1418] px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] text-[#CC1418] uppercase transition-all duration-300 hover:bg-[#CC1418] hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 cursor-none flex-col items-center justify-center gap-[5px]"
              aria-label="Menu"
            >
              <span className={`block h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'}`} />
              <span className={`block h-px bg-[var(--fg)] transition-all duration-200 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-6'}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-theme fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 px-8 backdrop-blur-2xl"
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
                className="font-heading text-fg cursor-none text-[clamp(2rem,10vw,3rem)] font-semibold tracking-tight uppercase"
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
              className="font-body mt-4 cursor-none border border-[#CC1418] px-10 py-4 text-[11px] font-semibold tracking-[0.25em] text-[#CC1418] uppercase transition-all duration-300 hover:bg-[#CC1418] hover:text-white"
            >
              Nous contacter
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
