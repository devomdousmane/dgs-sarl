'use client'
import dynamic from 'next/dynamic'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import Footer from '@/components/Footer'

// Load scenes normally — no SSR issues since they're client components
import Scene1Hero from '@/components/scenes/Scene1Hero'
import Scene2Immobilier from '@/components/scenes/Scene2Immobilier'
import Scene3Interior from '@/components/scenes/Scene3Interior'
import Scene4Auto from '@/components/scenes/Scene4Auto'
import Scene5Construction from '@/components/scenes/Scene5Construction'
import Scene9Contact from '@/components/scenes/Scene9Contact'

// GSAP-heavy scenes: dynamic import to avoid SSR issues
const Scene6Gallery = dynamic(() => import('@/components/scenes/Scene6Gallery'), { ssr: false })
const Scene7Vision = dynamic(() => import('@/components/scenes/Scene7Vision'), { ssr: false })
const Scene8Numbers = dynamic(() => import('@/components/scenes/Scene8Numbers'), { ssr: false })

export default function Home() {
  return (
    <ThemeProvider>
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Scene 1 — Hero cinematic image sequence (500vh) */}
        <Scene1Hero />

        {/* Scene 2 — Immobilier depth cards */}
        <Scene2Immobilier />

        {/* Scene 3 — Interior zoom + stats */}
        <Scene3Interior />

        {/* Scene 4 — Automobile sequence + cards (400vh) */}
        <Scene4Auto />

        {/* Scene 5 — Construction BTP timeline */}
        <Scene5Construction />

        {/* Scene 6 — Horizontal scroll gallery (GSAP) */}
        <Scene6Gallery />

        {/* Scene 7 — Vision word reveal */}
        <Scene7Vision />

        {/* Scene 8 — Numbers dashboard */}
        <Scene8Numbers />

        {/* Scene 9 — Contact premium */}
        <Scene9Contact />
      </main>
      <Footer />
    </SmoothScroll>
    </ThemeProvider>
  )
}
