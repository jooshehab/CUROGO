'use client'

import { ChevronLeft, MapPin, Building2, Clock, ArrowLeft, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { CITIES, SERVICES, SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { CTABanner } from '@/components/site/sections/cta-banner'

export function AreasPage() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  const totalDistricts = CITIES.reduce((sum, c) => sum + c.districts.length, 0)

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">المناطق</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              مناطق التغطية · {totalDistricts} منطقة
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              بنوصل كل شبر في
              <br />
              <span className="text-primary">القاهرة والجيزة</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              أسطول من {totalDistricts} منطقة منتشرة في القاهرة الكبرى والجيزة.
              متوسط الاستجابة في القاهرة {SITE.responseTime}، وفي الجيزة 12-18 دقيقة حسب المنطقة.
              اختار منطقتك واعرف تفاصيل التغطية فيها، الخدمات المتاحة، وكل المعلومات اللي محتاجها.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-8 bg-muted/30">
        <div className="container-curego">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border/50">
              <div className="text-2xl font-extrabold text-primary">{CITIES.length}</div>
              <div className="text-xs text-muted-foreground">مدينة رئيسية</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border/50">
              <div className="text-2xl font-extrabold text-primary">{totalDistricts}</div>
              <div className="text-xs text-muted-foreground">منطقة مغطاة</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border/50">
              <div className="text-2xl font-extrabold text-primary">{SITE.fleetSize}</div>
              <div className="text-xs text-muted-foreground">سيارة إسعاف</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-card border border-border/50">
              <div className="text-2xl font-extrabold text-primary">{SITE.responseTime}</div>
              <div className="text-xs text-muted-foreground">دقائق استجابة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities overview — كل منطقة في صف منفصل */}
      <section className="py-12 lg:py-16">
        <div className="container-curego space-y-12">
          {CITIES.map((city, cityIdx) => (
            <motion.div
              key={city.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
            >
              <div className="gradient-emergency text-white p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <Building2 className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-extrabold mb-1">{city.name}</h2>
                    <p className="text-sm opacity-90">
                      {city.districts.length} منطقة مغطاة · استجابة خلال {city.districts[0].responseMin}-{city.districts[city.districts.length-1].responseMin} دقيقة
                    </p>
                  </div>
                  <a
                    href={buildHref(`/areas/${city.slug}`)}
                    onClick={(e) => handleNav(e, `/areas/${city.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-primary font-bold hover:bg-white/95 transition-colors text-sm"
                  >
                    صفحة {city.name} كاملة
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-5 lg:p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                  {city.description[0]}
                </p>

                {/* كل منطقة في صف منفصل كـ Card مستقل */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {city.districts.map((district, dIdx) => (
                    <motion.a
                      key={district.slug}
                      href={buildHref(`/areas/${city.slug}/${district.slug}`)}
                      onClick={(e) => handleNav(e, `/areas/${city.slug}/${district.slug}`)}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: dIdx * 0.04 }}
                      whileHover={prefersReducedMotion ? {} : { y: -4 }}
                      className="group block p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:gradient-emergency group-hover:text-white transition-all shrink-0">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm group-hover:text-primary transition-colors">
                            {district.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Clock className="h-3 w-3" />
                            استجابة {district.responseMin} دقيقة
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{district.shortDesc}</p>
                      <div className="mt-2 pt-2 border-t border-border/30 flex flex-wrap gap-1">
                        {district.landmarks.slice(0, 2).map((lm, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                            {lm}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cross-link: services available in all areas */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">
              كل خدماتنا متوفرة في كل المناطق
            </h2>
            <p className="text-muted-foreground">
              من إسعاف طوارئ لإسعاف جوي — كل خدمة عندنا متوفرة في كل منطقة في القاهرة والجيزة
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICES.map((s, idx) => (
              <motion.a
                key={s.slug}
                href={buildHref(`/services/${s.slug}`)}
                onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                whileHover={prefersReducedMotion ? {} : { y: -3 }}
                className="block p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
              >
                <div className="font-bold text-sm mb-1 hover:text-primary transition-colors">{s.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{s.shortDesc}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
