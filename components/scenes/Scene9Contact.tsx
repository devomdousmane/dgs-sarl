'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../ThemeProvider'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  service: string
}

interface FieldProps {
  id: string
  label: string
  type?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  className: string
}

const services = [
  'BTP & Génie Civil',
  'Immobilier',
  'Automobile',
  'Aménagement',
  'Partenariat',
  'Autre',
]

export default function Scene9Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  useTheme()

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors((err) => ({ ...err, [key]: '' }))
    }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.message.trim()) e.message = 'Requis'
    return e
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  const inputClass = (key: string) =>
    `w-full bg-transparent font-body text-base px-4 py-3.5 min-h-[52px] outline-none focus:ring-2 focus:ring-[#B8966E] focus:ring-offset-0 transition-all duration-300 ${
      errors[key] ? 'border border-[#CC1418]' : 'border focus:border-[#B8966E]'
    }`

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-36 pb-0"
      style={{ background: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute top-0 left-1/4 h-[40vh] w-[60vw] rounded-full bg-[#CC1418]/4 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center md:mb-20"
        >
          <p className="font-body mb-6 text-[10px] tracking-[0.45em] text-[#B8966E] uppercase">
            Démarrons votre projet
          </p>
          <h2
            className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.85] font-extrabold tracking-tight uppercase"
            style={{ color: 'var(--fg)' }}
          >
            Parlons de
            <br />
            <span className="text-[#CC1418]">votre projet.</span>
          </h2>
          <p
            className="font-body mx-auto mt-6 max-w-md text-[15px] leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            Devis gratuit · Réponse sous 48 h
          </p>
        </motion.div>

        <div className="grid items-start gap-10 md:gap-16 lg:grid-cols-[1fr_1.6fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-8"
          >
            {[
              { label: 'Adresse', value: 'Conakry, République de Guinée', href: null },
              { label: 'Téléphone', value: '+224 000 000 000', href: 'tel:+224000000000' },
              { label: 'Email', value: 'contact@dgssarl.com', href: 'mailto:contact@dgssarl.com' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-body mb-2 text-[10px] tracking-[0.38em] text-[#B8966E] uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-heading cursor-none text-lg font-semibold uppercase transition-colors duration-300 hover:text-[#B8966E] md:text-xl"
                    style={{ color: 'var(--fg)' }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    className="font-heading text-lg font-semibold uppercase md:text-xl"
                    style={{ color: 'var(--fg)' }}
                  >
                    {item.value}
                  </p>
                )}
              </div>
            ))}

            <a
              href="https://wa.me/224000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-body inline-flex min-h-[52px] w-fit cursor-none items-center gap-3 bg-[#25D366] px-7 py-4 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-[#1db954]"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2.044 21.5l4.42-1.376A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.958 7.958 0 01-4.078-1.118l-.292-.174-3.026.941.96-2.95-.19-.303A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
              </svg>
              Contacter sur WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-20 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B8966E]">
                    <svg className="h-6 w-6 text-[#B8966E]" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-heading text-2xl font-bold uppercase"
                    style={{ color: 'var(--fg)' }}
                  >
                    Message envoyé
                  </p>
                  <p
                    className="font-body max-w-xs text-[15px] leading-relaxed"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    Nos équipes vous répondront sous 48 heures ouvrables.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label
                      htmlFor="service"
                      className="font-body mb-2 block text-[11px] tracking-[0.28em] text-[#B8966E] uppercase"
                    >
                      Domaine d&apos;intérêt
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={form.service}
                        onChange={set('service')}
                        className="font-body min-h-[52px] w-full cursor-none appearance-none px-4 py-3.5 pr-10 text-base transition-colors duration-300 outline-none focus:ring-2 focus:ring-[#B8966E] focus:ring-offset-0"
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          color: 'var(--fg-muted)',
                        }}
                      >
                        <option value="">Sélectionner un domaine…</option>
                        {services.map((s) => (
                          <option key={s} value={s} style={{ background: 'var(--bg-2)' }}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#B8966E]"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Nom complet"
                      type="text"
                      inputMode="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                      className={inputClass('name')}
                    />
                    <Field
                      id="email"
                      label="Adresse email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                      className={inputClass('email')}
                    />
                  </div>

                  <Field
                    id="phone"
                    label="Téléphone (optionnel)"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+224 000 000 000"
                    className={inputClass('phone')}
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body mb-2 block text-[11px] tracking-[0.28em] text-[#B8966E] uppercase"
                    >
                      Votre projet <span className="text-[#CC1418]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Décrivez votre projet, vos besoins, votre budget…"
                      className={`${inputClass('message')} resize-none`}
                      style={{
                        color: 'var(--fg)',
                        borderColor: errors.message ? undefined : 'var(--border)',
                      }}
                    />
                    {errors.message && (
                      <p className="font-body mt-1 text-xs text-[#CC1418]">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group font-body mt-2 flex min-h-[56px] cursor-none items-center justify-center gap-3 bg-[#CC1418] px-8 py-4 text-[11px] font-semibold tracking-[0.3em] text-white uppercase transition-colors duration-300 hover:bg-[#A50F12] disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Envoi en cours…
                      </span>
                    ) : (
                      <>
                        Envoyer le message
                        <svg
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  <p
                    className="font-body text-[10px] leading-relaxed"
                    style={{ color: 'var(--fg-subtle)' }}
                  >
                    En soumettant ce formulaire, vous acceptez d&apos;être contacté par
                    l&apos;équipe DGS SARL.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  type = 'text',
  inputMode,
  autoComplete,
  required,
  value,
  onChange,
  error,
  placeholder,
  className,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-body mb-2 block text-[11px] tracking-[0.28em] text-[#B8966E] uppercase"
      >
        {label}
        {required && <span className="ml-1 text-[#CC1418]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={className}
        style={{ color: 'var(--fg)', borderColor: error ? undefined : 'var(--border)' }}
      />
      {error && <p className="font-body mt-1 text-xs text-[#CC1418]">{error}</p>}
    </div>
  )
}
