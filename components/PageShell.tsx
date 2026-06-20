'use client'
import type { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import SmoothScroll from './SmoothScroll'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="bg-theme">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}
