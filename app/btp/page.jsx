'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import PageShell from '@/components/PageShell'

const services = [
  { num: '01', title: 'Gros Œuvre', desc: 'Fondations solides, structures béton armé et charpentes conçues pour résister au temps et aux conditions du terrain.' },
  { num: '02', title: 'Second Œuvre', desc: 'Électricité, plomberie, isolation thermique et acoustique, menuiseries intérieures et extérieures — chaque détail compte.' },
  { num: '03', title: 'Rénovation', desc: 'Nous redonnons vie à vos bâtiments anciens ou dégradés avec expertise et soin, dans le respect de l\'existant.' },
  { num: '04', title: 'Construction Clé en Main', desc: 'Gestion intégrale de votre projet : études, travaux, suivi, livraison. Une seule interlocution, une seule responsabilité.' },
  { num: '05', title: 'Aménagement Intérieur & Extérieur', desc: 'Décoration, voirie, terrassement, clôtures, espaces verts — nous sublimons vos espaces de vie et de travail.' },
]

const phases = [
  { num: '01', phase: 'Conception', desc: 'Étude de faisabilité, plans architecturaux et ingénierie structurelle approfondie.' },
  { num: '02', phase: 'Planification', desc: 'Gestion de projet rigoureuse, approvisionnement et programmation des travaux.' },
  { num: '03', phase: 'Construction', desc: 'Exécution avec les meilleures équipes et matériaux rigoureusement sélectionnés.' },
  { num: '04', phase: 'Livraison', desc: 'Contrôle qualité final et remise des clés dans les délais contractuels.' },
]

const valeurs = [
  { title: 'Qualité', desc: 'Matériaux rigoureusement sélectionnés, équipes qualifiées, contrôle exigeant à chaque étape.' },
  { title: 'Sécurité', desc: 'Chaque chantier encadré selon les normes les plus strictes. La sécurité des équipes et des clients est non négociable.' },
  { title: 'Réactivité', desc: 'Organisation agile, équipes disponibles. Nous répondons vite et agissons juste — votre temps a de la valeur.' },
  { title: 'Durabilité', desc: 'Pratiques écoresponsables, gestion des déchets et choix durables guident chacune de nos interventions.' },
]

export default function BTPPage() {
  return (
    <PageShell>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <ProcessSection />
      <ValeursSection />
      <CTASection />
    </PageShell>
  )
}

/* ── HERO ── */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/dgs-site-2.webp" alt="DGS SARL — chantier BTP"
          fill sizes="100vw" priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="absolute bottom-0 inset-x-0 z-10 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-14">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-[10px] tracking-[0.5em] uppercase text-[#B8966E] mb-6">
            DGS SARL · Nos activités — BTP & Génie Civil
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold uppercase leading-[0.82] text-[#F4F1EB] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}>
            Bâtir<br />
            avec<br />
            <span className="text-[#CC1418]">rigueur.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.0 }}
            className="font-body text-[#F4F1EB]/45 text-sm md:text-base tracking-widest uppercase">
            Gros Œuvre · Second Œuvre · Rénovation · Clé en Main
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

/* ── MISSION ── */
function MissionSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textX = useTransform(scrollYProgress, [0.1, 0.5], ['-24px', '0px'])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1])

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 md:gap-24 items-center">

          <motion.div style={{ x: textX, opacity: textOpacity }}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Notre mission</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.88] text-[#F4F1EB] tracking-tight mb-8">
              Construire<br /><span className="text-[#CC1418]">durablement</span><br />la Guinée.
            </h2>
            <div className="w-14 h-px bg-[#CC1418] mb-8" />
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85] mb-5">
              Chez DGS, chaque chantier est mené avec des solutions techniques innovantes, une gestion rigoureuse et un engagement inébranlable envers la qualité, la sécurité et le respect des délais.
            </p>
            <p className="font-body text-[15px] text-[#F4F1EB]/55 leading-[1.85]">
              Chaque projet que nous prenons en charge est une promesse tenue — de la fondation jusqu'à la remise des clés.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { val: '100%', label: 'Projets livrés à temps' },
                { val: '5+', label: 'Chantiers actifs' },
                { val: '2023', label: 'Fondée à Conakry' },
                { val: '∞', label: 'Engagement qualité' },
              ].map(({ val, label }) => (
                <div key={label} className="border border-[#F4F1EB]/8 p-5">
                  <p className="font-heading font-extrabold text-3xl text-[#CC1418] leading-none mb-1">{val}</p>
                  <p className="font-body text-[11px] text-[#F4F1EB]/40 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image src="/images/dgs-site-4.webp" alt="DGS SARL — casque chantier"
                  fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover scale-110" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute -bottom-5 -right-3 md:-right-8 glass-rouge p-5 max-w-[160px]">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#CC1418] mb-1">Sécurité</p>
              <p className="font-heading font-bold text-sm uppercase text-[#F4F1EB] leading-tight">Norme stricte sur chaque site</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SERVICES ── */
function ServicesSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[40vw] h-[50vh] bg-[#CC1418]/3 blur-[100px] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Expertise complète</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Nos Services BTP
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`glass p-7 group ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <p className="font-display text-[#CC1418] text-2xl mb-5 tracking-wider">{s.num}</p>
              <h3 className="font-heading font-bold text-lg uppercase text-[#F4F1EB] tracking-wide mb-3 group-hover:text-[#B8966E] transition-colors duration-300 leading-tight">
                {s.title}
              </h3>
              <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-[1.85]">{s.desc}</p>
              <div className="mt-6 w-0 h-px bg-[#CC1418] group-hover:w-10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PROCESS ── */
function ProcessSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 md:mb-24 text-center">
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Notre méthode</p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Notre Processus
          </h2>
        </motion.div>

        {/* Desktop horizontal flow */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#CC1418]/60 via-[#B8966E]/40 to-[#CC1418]/30 z-0" />
          {phases.map((p, i) => (
            <motion.div key={p.phase} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center px-4">
              <div className="relative z-10 w-14 h-14 border-2 border-[#CC1418] flex items-center justify-center bg-[#0A0A0A] mb-6">
                <span className="font-heading font-bold text-sm text-[#CC1418]">{p.num}</span>
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-[#F4F1EB] tracking-wide mb-3">{p.phase}</h3>
              <p className="font-body text-[12px] text-[#F4F1EB]/40 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-10 pl-6 border-l border-[#CC1418]/25">
          {phases.map((p, i) => (
            <motion.div key={p.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative -ml-[calc(1.5rem+1px)]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 border-2 border-[#CC1418] flex items-center justify-center bg-[#0A0A0A] shrink-0">
                  <span className="font-heading font-bold text-sm text-[#CC1418]">{p.num}</span>
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-[#F4F1EB] tracking-wide">{p.phase}</h3>
              </div>
              <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-relaxed ml-16">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VALEURS ── */
function ValeursSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#111111] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-5">Ce qui nous distingue</p>
            <h2 className="font-heading font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
              Nos<br />Valeurs
            </h2>
            <p className="font-body text-[15px] text-[#F4F1EB]/45 leading-[1.85]">
              Ce qui nous distingue, ce n'est pas seulement ce que nous construisons — c'est la façon dont nous le faisons. Chaque valeur est une promesse faite à nos clients et à nos équipes.
            </p>
            <div className="mt-10 relative aspect-[4/3] overflow-hidden">
              <Image src="/images/equipe.webp" alt="Équipe DGS SARL" fill
                sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {valeurs.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group flex gap-6 p-6 border border-[#F4F1EB]/8 hover:border-[#B8966E]/25 transition-colors duration-400">
                <div className="w-10 h-10 border border-[#CC1418]/40 flex items-center justify-center shrink-0 group-hover:border-[#CC1418] transition-colors duration-300">
                  <span className="font-body text-[10px] text-[#CC1418] tracking-widest">{String(i+1).padStart(2,'0')}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base uppercase text-[#F4F1EB] tracking-wide mb-2 group-hover:text-[#B8966E] transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="font-body text-[13px] text-[#F4F1EB]/40 leading-[1.85]">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection() {
  return (
    <section className="relative py-36 md:py-52 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[45vh] bg-[#CC1418]/4 blur-[140px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">Construisons ensemble</p>
          <h2 className="font-heading font-extrabold text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight mb-8">
            Votre chantier,<br /><span className="text-[#CC1418]">notre expertise.</span>
          </h2>
          <p className="font-body text-[15px] text-[#F4F1EB]/40 max-w-md mx-auto leading-relaxed mb-12">
            Devis gratuit, étude de faisabilité et première rencontre sous 48 heures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact"
              className="inline-flex items-center gap-3 bg-[#CC1418] hover:bg-[#A50F12] text-white font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-colors duration-300 cursor-none">
              Obtenir un devis
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-3 border border-[#F4F1EB]/18 hover:border-[#B8966E]/50 text-[#F4F1EB]/55 hover:text-[#B8966E] font-body text-[11px] font-semibold tracking-[0.28em] uppercase px-10 py-4 min-h-[52px] transition-all duration-300 cursor-none">
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
