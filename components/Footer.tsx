'use client'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'

interface NavLink {
  label: string
  href: string
}

interface ContactItem {
  icon: string
  text: string
  href?: string
}

interface Column {
  title: string
  links?: NavLink[]
  items?: ContactItem[]
}

const columns: Column[] = [
  {
    title: 'Services',
    links: [
      { label: 'Immobilier', href: '/immobilier' },
      { label: 'Automobile', href: '/automobile' },
      { label: 'BTP & Génie Civil', href: '/btp' },
      { label: 'Nos réalisations', href: '/#projets' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Notre Histoire', href: '/about' },
      { label: 'Nos réalisations', href: '/#projets' },
      { label: 'Notre vision', href: '/#vision' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Contact',
    items: [
      { icon: 'location', text: 'Conakry, République de Guinée' },
      { icon: 'phone', text: '+224 000 000 000', href: 'tel:+224000000000' },
      { icon: 'email', text: 'contact@dgssarl.com', href: 'mailto:contact@dgssarl.com' },
    ],
  },
]

export default function Footer() {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/logo/logo-dark.png' : '/logo/logo-light.png'

  return (
    <footer
      className="relative border-t"
      style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-10 md:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <Image
              src={logoSrc}
              alt="DGS SARL"
              width={130}
              height={57}
              className="h-9 w-auto object-contain"
            />
            <p
              className="font-body max-w-[240px] text-[13px] leading-relaxed"
              style={{ color: 'var(--fg-subtle)' }}
            >
              D Global Services — Expert BTP, Immobilier et Automobile en Guinée depuis 2010.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook DGS SARL"
                className="flex h-9 w-9 cursor-none items-center justify-center transition-all duration-300 hover:text-[#B8966E]"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn DGS SARL"
                className="flex h-9 w-9 cursor-none items-center justify-center transition-all duration-300 hover:text-[#B8966E]"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://wa.me/224000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp DGS SARL"
                className="flex h-9 w-9 cursor-none items-center justify-center transition-all duration-300 hover:text-[#25D366]"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2.044 21.5l4.42-1.376A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-body mb-5 text-[10px] tracking-[0.35em] text-[#B8966E] uppercase">
                {col.title}
              </p>
              {col.links ? (
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-body cursor-none text-[13px] transition-all duration-250 hover:opacity-100"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-col gap-4">
                  {col.items?.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <ContactIcon type={item.icon} />
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body cursor-none text-[13px] leading-relaxed transition-colors duration-250 hover:text-[#B8966E]"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p
                          className="font-body text-[13px] leading-relaxed"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          {item.text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F4F1EB]/8 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row md:px-14">
        <p className="font-body text-[11px] tracking-wide" style={{ color: 'var(--fg-subtle)' }}>
          © {new Date().getFullYear()} DGS SARL — D Global Services. Tous droits réservés.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-body cursor-none text-[11px] transition-colors duration-200 hover:opacity-80"
            style={{ color: 'var(--fg-subtle)' }}
          >
            Mentions légales
          </a>
          <a
            href="#"
            className="font-body cursor-none text-[11px] transition-colors duration-200 hover:opacity-80"
            style={{ color: 'var(--fg-subtle)' }}
          >
            Confidentialité
          </a>
        </div>
      </div>
    </footer>
  )
}

function ContactIcon({ type }: { type: string }) {
  const cls = 'w-3.5 h-3.5 text-[#B8966E] shrink-0 mt-[2px]'
  if (type === 'location')
    return (
      <svg className={cls} viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5C12.5 3.515 10.485 1.5 8 1.5zM8 7.75A1.75 1.75 0 118 4.25a1.75 1.75 0 010 3.5z"
          fill="currentColor"
        />
      </svg>
    )
  if (type === 'phone')
    return (
      <svg className={cls} viewBox="0 0 16 16" fill="none">
        <path
          d="M3 2h2.5l1 2.5L5 6s1 2 5 5l1.5-1.5 2.5 1V13C14 13.5 11 15 8 12 5 9 2.5 5.5 3 2z"
          fill="currentColor"
        />
      </svg>
    )
  return (
    <svg className={cls} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
