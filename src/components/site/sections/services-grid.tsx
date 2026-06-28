'use client'

import { Truck, Stethoscope, Syringe, Scan, TestTube, HeartPulse, ArrowLeft, Plane, Activity, Package, Wind, Shield } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SERVICES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { getServiceImage } from '@/lib/service-images'

const ICONS: Record<string, React.ElementType> = {
  ambulance: Truck,
  stethoscope: Stethoscope,
  syringe: Syringe,
  scan: Scan,
  'test-tube': TestTube,
  heart: HeartPulse,
  truck: Truck,
  wind: Wind,
  shield: Shield,
  plane: Plane,
  activity: Activity,
  package: Package,
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()
  const services = limit ? SERVICES.slice(0, limit) : SERVICES

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-medical" aria-label="خدماتنا الطبية">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            خدماتنا الطبية المنزلية · {SERVICES.length} خدمة
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            خدمة طبية متكاملة من باب بيتك
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            من الطوارئ اللي محتاجة إسعاف فوري، لـ الكشف الدوري والرعاية طويلة الأمد. CureGo بتجمع كل الخدمات الطبية تحت سقف واحد، بفريق مرخص وأجهزة معتمدة.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, idx) => {
            const Icon = ICONS[service.icon] || Truck
            const imgSm = getServiceImage(service.slug, 'sm')
            const imgMd = getServiceImage(service.slug, 'md')
            return (
              <motion.article
                key={service.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                {/* Real image with responsive srcset */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                  <img
                    src={imgMd}
                    srcSet={`${imgSm} 400w, ${imgMd} 800w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <span className="absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-emergency text-white shadow-emergency">
                    <Icon className="h-5 w-5" />
                  </span>
                  {service.responseTime && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-bold text-primary">
                      ⏱ {service.responseTime}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-extrabold mb-1">{service.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed flex-1">
                    {service.shortDesc}
                  </p>

                  <ul className="text-xs text-muted-foreground space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={buildHref(`/services/${service.slug}`)}
                    onClick={(e) => handleNav(e, `/services/${service.slug}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all mt-auto"
                  >
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        {!limit && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href={buildHref('/booking')}
              onClick={(e) => handleNav(e, '/booking')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
            >
              احجز الخدمة اللي محتاجها
              <ArrowLeft className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
