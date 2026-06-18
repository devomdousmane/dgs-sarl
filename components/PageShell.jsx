'use client'
import { ThemeProvider } from './ThemeProvider'
import SmoothScroll from './SmoothScroll'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageShell({ children }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="bg-[#0A0A0A] overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}
