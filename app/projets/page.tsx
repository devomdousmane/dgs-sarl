'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import PageShell from '@/components/PageShell'
import Loader from '@/components/Loader'

interface Projet {
  id: string
  titre: string
  categorie: string
  annee: string
  lieu: string
  description: string
  img: string
  tags: string[]
}

interface ProjetCardProps {
  projet: Projet
  index: number
}

const projets: Projet[] = [
  {
    id: 'chantier-fondations',
    titre: 'Chantier Fondations',
    categorie: 'BTP & Génie Civil',
    annee: '2026',
    lieu: 'Conakry, Guinée',
    description:
      'Travaux de fondations et gros œuvre sur un chantier résidentiel de grande envergure. Mise en place des infrastructures béton armé, supervision technique et respect des délais contractuels.',
    img: '/images/projet-site-large.jpg',
    tags: ['Fondations', 'Béton armé', 'Gros œuvre'],
  },
  {
    id: 'site-a',
    titre: 'Résidence Horizon A',
    categorie: 'Immobilier',
    annee: '2026',
    lieu: 'Conakry, Guinée',
    description:
      "Promotion immobilière résidentielle avec finitions premium. Conception et réalisation d'un ensemble de logements modernes adaptés au marché guinéen.",
    img: '/images/projet-site-a.jpg',
    tags: ['Résidentiel', 'Promotion', 'Premium'],
  },
  {
    id: 'site-b',
    titre: 'Résidence Horizon B',
    categorie: 'Immobilier',
    annee: '2026',
    lieu: 'Conakry, Guinée',
    description:
      'Second volet du programme Horizon — appartements et villas sur mesure, intégrant les normes de construction parasismique et les contraintes climatiques locales.',
    img: '/images/projet-site-b.jpg',
    tags: ['Villas', 'Appartements', 'Sur mesure'],
  },
  {
    id: 'site-c',
    titre: 'Infrastructure Urbaine C',
    categorie: 'BTP & Génie Civil',
    annee: '2026',
    lieu: 'Conakry, Guinée',
    description:
      "Travaux d'infrastructure urbaine incluant voirie, réseaux et aménagements extérieurs. Coordination multi-corps d'état et gestion de projet intégrée.",
    img: '/images/projet-site-c.jpg',
    tags: ['Infrastructure', 'Voirie', 'Réseaux'],
  },
  {
    id: 'site-d',
    titre: 'Complexe Mixte D',
    categorie: 'BTP & Génie Civil',
    annee: '2026',
    lieu: 'Conakry, Guinée',
    description:
      "Réalisation d'un complexe à usage mixte combinant espaces commerciaux et logements. Ingénierie structurelle adaptée aux contraintes du terrain.",
    img: '/images/projet-site-d.jpg',
    tags: ['Mixte', 'Commercial', 'Logements'],
  },
  {
    id: 'residence-moderne',
    titre: 'Résidence Moderne',
    categorie: 'Immobilier',
    annee: '2024',
    lieu: 'Conakry, Guinée',
    description:
      "Architecture contemporaine, matériaux premium et finitions soignées. Ce programme résidentiel illustre la vision DGS SARL d'un habitat d'exception accessible.",
    img: '/images/render.webp',
    tags: ['Architecture', 'Résidentiel', 'Premium'],
  },
  {
    id: 'parc-automobile',
    titre: 'Parc Automobile DGS',
    categorie: 'Automobile',
    annee: '2024',
    lieu: 'Conakry, Guinée',
    description:
      "Constitution et gestion d'un parc automobile premium — importation directe Toyota et véhicules utilitaires. Solutions fleet management pour entreprises et institutions.",
    img: '/images/projet-auto-frame.webp',
    tags: ['Toyota', 'Import direct', 'Fleet'],
  },
  {
    id: 'chantier-equipe',
    titre: 'Coordination Chantier',
    categorie: 'BTP & Génie Civil',
    annee: '2023',
    lieu: 'Conakry, Guinée',
    description:
      "Mise en place des process de coordination inter-équipes sur chantier complexe. Formation des équipes locales et supervision de la qualité d'exécution.",
    img: '/images/equipe.webp',
    tags: ['Coordination', 'Équipe', 'Qualité'],
  },
]

export default function ProjetsPage() {
  return (
    <>
      <Loader />
      <PageShell>
        <section
          className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
          style={{ background: 'var(--bg)' }}
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/chantier.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-10"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, var(--bg) 0%, color-mix(in srgb, var(--bg) 50%, transparent) 50%, var(--bg) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-body mb-5 text-[10px] tracking-[0.5em] text-[#B8966E] uppercase">
                Notre portfolio
              </p>
              <h1
                className="font-heading leading-[0.82] font-extrabold tracking-tight uppercase"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: 'var(--fg)' }}
              >
                Nos
                <br />
                <span className="text-[#CC1418]">Réalisations</span>
              </h1>
              <div className="mt-6 h-px w-20 bg-[#CC1418]" />
              <p
                className="font-body mt-8 max-w-xl text-base leading-relaxed md:text-lg"
                style={{ color: 'var(--fg-muted)' }}
              >
                Chaque projet est une promesse tenue — de la fondation jusqu'à la livraison.
                Découvrez les réalisations DGS SARL en BTP, immobilier et automobile.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-32 md:pb-44" style={{ background: 'var(--bg)' }}>
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex items-center justify-between"
            >
              <p
                className="font-body text-[11px] tracking-[0.3em] uppercase"
                style={{ color: 'var(--fg-subtle)' }}
              >
                {projets.length} projets
              </p>
              <div className="mx-8 h-px flex-1" style={{ background: 'var(--border)' }} />
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {projets.map((projet, i) => (
                <ProjetCard key={projet.id} projet={projet} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t py-24 md:py-32"
          style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
        >
          <div className="mx-auto max-w-[1440px] px-6 text-center md:px-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
                Votre projet, notre expertise
              </p>
              <h2
                className="font-heading mb-8 text-[clamp(2rem,5vw,4.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
                style={{ color: 'var(--fg)' }}
              >
                Démarrons
                <br />
                ensemble.
              </h2>
              <a
                href="/#contact"
                className="font-body inline-flex cursor-none items-center gap-4 bg-[#CC1418] px-8 py-4 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-300 hover:bg-[#A50F12]"
              >
                Nous contacter
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>
      </PageShell>
    </>
  )
}

function ProjetCard({ projet, index }: ProjetCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex cursor-none flex-col overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={projet.img}
          alt={projet.titre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="font-body bg-black/40 px-3 py-1 text-[10px] tracking-[0.3em] text-white/70 uppercase backdrop-blur-sm">
            {projet.annee}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="font-body text-[9px] tracking-[0.28em] text-[#B8966E] uppercase">
            {projet.categorie}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7" style={{ background: 'var(--bg-2)' }}>
        <h3
          className="font-heading mb-3 text-xl font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[#B8966E] md:text-2xl"
          style={{ color: 'var(--fg)' }}
        >
          {projet.titre}
        </h3>
        <p
          className="font-body mb-5 flex-1 text-sm leading-relaxed"
          style={{ color: 'var(--fg-muted)' }}
        >
          {projet.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {projet.tags.map((tag) => (
            <span
              key={tag}
              className="font-body px-3 py-1 text-[10px] tracking-[0.2em] uppercase"
              style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <svg className="h-3 w-3 shrink-0 text-[#B8966E]" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5C12.5 3.515 10.485 1.5 8 1.5zM8 7.75A1.75 1.75 0 118 4.25a1.75 1.75 0 010 3.5z" />
          </svg>
          <span
            className="font-body text-[10px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--fg-subtle)' }}
          >
            {projet.lieu}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
