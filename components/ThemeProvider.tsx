'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ThemeCtxValue {
  theme: 'dark' | 'light'
  toggle: () => void
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = (localStorage.getItem('dgs-theme') as 'dark' | 'light') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggle = () => {
    const next: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('dgs-theme', next)
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
