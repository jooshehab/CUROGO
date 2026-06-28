'use client'

import { MapPin, Clock, ArrowLeft, Building2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { CITIES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function AreasGrid() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <section className="py-16 lg:py-24" aria-label="مناطق التغطية">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            تغطية شاملة
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            بنوصل كل أحياء القاهرة والجيزة
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            أسطول من {CITIES.reduce((sum, c) => sum + c.districts.length, 0)} منطقة موزعة على القاهرة الكبرى والجيزة.
            اختار منطقتك واعرف مدة الاستجابة في حيك.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {CITIES.map((city, idx) => (
            <motion.div
              key={city.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
            >
              {/* City header */}
              <div className="gradient-emergency text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-7 w-7" />
                  <h3 className="text-2xl font-extrabold">{city.name}</h3>
                  <span className="mr-auto px-3 py-1 rounded-full bg-white/20 text-sm font-bold">
                    {city.districts.length} منطقة
                  </span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed line-clamp-2">
                  {city.description[0]}
                </p>
              </div>

              {/* Districts grid */}
              <div className="p-5 grid sm:grid-cols-2 gap-2">
                {city.districts.slice(0, 8).map((district, dIdx) => (
                  <motion.a
                    key={district.slug}
                    href={buildHref(`/areas/${city.slug}/${district.slug}`)}
                    onClick={(e) => handleNav(e, `/areas/${city.slug}/${district.slug}`)}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: dIdx * 0.04 }}
                    whileHover={prefersReducedMotion ? {} : { x: -4 }}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:gradient-emergency group-hover:text-white transition-all shrink-0">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm group-hover:text-primary transition-colors">
                        {district.name}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        استجابة خلال {district.responseMin} دقيقة
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="px-5 pb-5">
                <a
                  href={buildHref(`/areas/${city.slug}`)}
                  onClick={(e) => handleNav(e, `/areas/${city.slug}`)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  كل تفاصيل تغطية {city.name} ({city.districts.length} منطقة)
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
