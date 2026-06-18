'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useTheme } from '../ThemeProvider'

const services = ['BTP & Génie Civil', 'Immobilier', 'Automobile', 'Aménagement', 'Partenariat', 'Autre']

export default function Scene9Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.message.trim()) e.message = 'Requis'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  const inputClass = (key) =>
    `w-full bg-transparent font-body text-base px-4 py-3.5 min-h-[52px] outline-none transition-all duration-300 placeholder:text-[#F4F1EB]/25 ${
      errors[key]
        ? 'border border-[#CC1418] text-[#F4F1EB]'
        : 'border border-[#F4F1EB]/18 text-[#F4F1EB] focus:border-[#B8966E]'
    }`

  return (
    <section id="contact" className="relative bg-[#0A0A0A] overflow-hidden pt-36 pb-0">
      <div className="absolute top-0 left-1/4 w-[60vw] h-[40vh] bg-[#CC1418]/4 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.45em] uppercase text-[#B8966E] mb-6">
            Démarrons votre projet
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-[0.85] text-[#F4F1EB] tracking-tight">
            Parlons de<br />
            <span className="text-[#CC1418]">votre projet.</span>
          </h2>
          <p className="mt-6 font-body text-[15px] text-[#F4F1EB]/45 max-w-md mx-auto leading-relaxed">
            Devis gratuit · Réponse sous 48 h
          </p>
        </motion.div>

        {/* Body */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start">

          {/* Left — infos + WhatsApp */}
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
                <p className="font-body text-[10px] tracking-[0.38em] uppercase text-[#B8966E] mb-2">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-heading font-semibold text-lg md:text-xl uppercase text-[#F4F1EB] hover:text-[#B8966E] transition-colors duration-300 cursor-none">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-heading font-semibold text-lg md:text-xl uppercase text-[#F4F1EB]">{item.value}</p>
                )}
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/224000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1db954] text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase px-7 py-4 min-h-[52px] transition-colors duration-300 cursor-none w-fit"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2.044 21.5l4.42-1.376A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.958 7.958 0 01-4.078-1.118l-.292-.174-3.026.941.96-2.95-.19-.303A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
              </svg>
              Contacter sur WhatsApp
            </a>
          </motion.div>

          {/* Right — form */}
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
                  <div className="w-14 h-14 rounded-full border border-[#B8966E] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#B8966E]" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-heading font-bold text-2xl uppercase text-[#F4F1EB]">Message envoyé</p>
                  <p className="font-body text-[15px] text-[#F4F1EB]/50 max-w-xs leading-relaxed">
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
                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block font-body text-[11px] tracking-[0.28em] uppercase text-[#B8966E] mb-2">
                      Domaine d'intérêt
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={form.service}
                        onChange={set('service')}
                        className="w-full appearance-none bg-[#0A0A0A] border border-[#F4F1EB]/18 text-[#F4F1EB]/70 font-body text-base px-4 py-3.5 pr-10 min-h-[52px] focus:border-[#B8966E] focus:outline-none transition-colors duration-300 cursor-none"
                      >
                        <option value="">Sélectionner un domaine…</option>
                        {services.map((s) => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8966E] pointer-events-none" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="name" label="Nom complet" type="text" inputMode="text" autoComplete="name" required
                      value={form.name} onChange={set('name')} error={errors.name} className={inputClass('name')} />
                    <Field id="email" label="Adresse email" type="email" inputMode="email" autoComplete="email" required
                      value={form.email} onChange={set('email')} error={errors.email} className={inputClass('email')} />
                  </div>

                  {/* Phone */}
                  <Field id="phone" label="Téléphone (optionnel)" type="tel" inputMode="tel" autoComplete="tel"
                    value={form.phone} onChange={set('phone')} placeholder="+224 000 000 000" className={inputClass('phone')} />

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-body text-[11px] tracking-[0.28em] uppercase text-[#B8966E] mb-2">
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
                    />
                    {errors.message && <p className="mt-1 font-body text-xs text-[#CC1418]">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center justify-center gap-3 bg-[#CC1418] disabled:opacity-60 text-white font-body text-[11px] font-semibold tracking-[0.3em] uppercase px-8 py-4 min-h-[56px] hover:bg-[#A50F12] transition-colors duration-300 cursor-none mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        Envoi en cours…
                      </span>
                    ) : (
                      <>
                        Envoyer le message
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="font-body text-[10px] text-[#F4F1EB]/25 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez d'être contacté par l'équipe DGS SARL.
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

function Field({ id, label, type = 'text', inputMode, autoComplete, required, value, onChange, error, placeholder, className }) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-[11px] tracking-[0.28em] uppercase text-[#B8966E] mb-2">
        {label}{required && <span className="text-[#CC1418] ml-1">*</span>}
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
      />
      {error && <p className="mt-1 font-body text-xs text-[#CC1418]">{error}</p>}
    </div>
  )
}
