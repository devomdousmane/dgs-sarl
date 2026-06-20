'use client'
import dynamic from 'next/dynamic'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

import Scene1Hero from '@/components/scenes/Scene1Hero'
import Scene2Immobilier from '@/components/scenes/Scene2Immobilier'
import Scene3Interior from '@/components/scenes/Scene3Interior'
import Scene4Auto from '@/components/scenes/Scene4Auto'
import Scene5Construction from '@/components/scenes/Scene5Construction'
import Scene9Contact from '@/components/scenes/Scene9Contact'

const Scene6Gallery = dynamic(() => import('@/components/scenes/Scene6Gallery'), { ssr: false })
const Scene7Vision = dynamic(() => import('@/components/scenes/Scene7Vision'), { ssr: false })
const Scene8Numbers = dynamic(() => import('@/components/scenes/Scene8Numbers'), { ssr: false })

export default function Home() {
  return (
    <ThemeProvider>
      <Loader />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main style={{ background: 'var(--bg)' }}>
          <Scene1Hero />
          <Scene2Immobilier />
          <Scene3Interior />
          <Scene4Auto />
          <Scene5Construction />
          <Scene6Gallery />
          <Scene7Vision />
          <Scene8Numbers />
          <Scene9Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}
