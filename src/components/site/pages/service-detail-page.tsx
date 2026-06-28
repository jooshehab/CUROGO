'use client'

import { ChevronLeft, CheckCircle2, Phone, MapPin, Clock, Users, ArrowLeft, MessageCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { motion, useReducedMotion } from 'framer-motion'
import { SERVICES, CITIES, SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { CTABanner } from '@/components/site/sections/cta-banner'
import { getServiceImage } from '@/lib/service-images'
import { Truck, Stethoscope, Syringe, Scan, TestTube, HeartPulse, Plane, Activity, Package, Wind, Shield } from 'lucide-react'

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

export function ServiceDetailPage({ slug }: { slug: string }) {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()
  const service = SERVICES.find((s) => s.slug === slug)

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  if (!service) {
    return (
      <div className="container-curego py-20 text-center">
        <h1 className="text-3xl font-extrabold mb-3">الخدمة غير موجودة</h1>
        <p className="text-muted-foreground mb-6">الخدمة اللي بتدور عليها مش متوفرة عندنا.</p>
        <a href={buildHref('/services')} onClick={(e) => handleNav(e, '/services')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-emergency text-white font-bold">
          <ArrowLeft className="h-4 w-4" />
          كل الخدمات
        </a>
      </div>
    )
  }

  const Icon = ICONS[service.icon] || Truck
  const relatedServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3)
  const heroImgLg = getServiceImage(service.slug, 'lg')
  const heroImgMd = getServiceImage(service.slug, 'md')
  const heroImgSm = getServiceImage(service.slug, 'sm')

  return (
    <>
      {/* Hero with image */}
      <section className="relative bg-grid-pattern py-12 lg:py-16 overflow-hidden">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <a href={buildHref('/services')} onClick={(e) => handleNav(e, '/services')} className="hover:text-primary">الخدمات</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-emergency text-white shadow-emergency shrink-0">
                  <Icon className="h-8 w-8" />
                </span>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold mb-2">{service.name}</h1>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
                  <span className="text-xs text-muted-foreground">السعر</span>
                  <span className="text-sm font-bold text-primary">{SITE.pricingNote}</span>
                </div>
                <a
                  href={`tel:${SITE.phoneIntl}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  اتصل دلوقتي
                </a>
                <a
                  href={buildHref('/booking')}
                  onClick={(e) => handleNav(e, '/booking')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  احجز أونلاين
                </a>
              </div>
            </motion.div>

            {/* Quick facts card */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 shadow-card">
                <h3 className="font-extrabold text-lg mb-4">معلومات سريعة</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">الاستجابة</div>
                      <div className="text-muted-foreground">{service.responseTime || SITE.responseTime}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">مناطق التغطية</div>
                      <div className="text-muted-foreground">{service.areas.join('، ')}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">الفريق</div>
                      <div className="text-muted-foreground">أطباء وممرضون مرخصون من النقابة</div>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-success/10 text-success font-bold hover:bg-success/20 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    اسأل على واتساب
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="pb-12 lg:pb-16">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-card-hover bg-muted/30"
          >
            <img
              src={heroImgLg}
              srcSet={`${heroImgSm} 400w, ${heroImgMd} 800w, ${heroImgLg} 1200w`}
              sizes="(max-width: 640px) 100vw, 1200px"
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-6 lg:p-8 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold mb-2">
                <Icon className="h-3.5 w-3.5" />
                {service.name}
              </div>
              <p className="text-sm lg:text-base opacity-90 max-w-2xl leading-relaxed">
                {service.shortDesc}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-extrabold mb-6"
              >
                عن الخدمة
              </motion.h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                {service.longDesc.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-extrabold mt-10 mb-6"
              >
                إيه اللي بتحصل عليه
              </motion.h2>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {service.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={prefersReducedMotion ? {} : { x: -4 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Cross-link to related areas */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/20"
              >
                <h3 className="font-extrabold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  الخدمة متوفرة في كل المناطق دي
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map(city => (
                    <a
                      key={city.slug}
                      href={buildHref(`/areas/${city.slug}`)}
                      onClick={(e) => handleNav(e, `/areas/${city.slug}`)}
                      className="px-3 py-1.5 rounded-full bg-card text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {city.name}
                    </a>
                  ))}
                  {service.areas.filter(a => a.includes('محافظات') || a.includes('دولي')).map((area, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-card text-sm font-bold">
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 shadow-card gradient-medical">
                  <h3 className="font-extrabold text-lg mb-3">جاهز تحجز؟</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    اتصل بنا أو احجز أونلاين. فريقنا هيرد عليك في دقائق وينسق معاك كل التفاصيل، ويقولك السعر حسب مكانك.
                  </p>
                  <a
                    href={`tel:${SITE.phoneIntl}`}
                    className="block w-full text-center px-4 py-3 rounded-lg gradient-emergency text-white font-bold shadow-emergency mb-2"
                    dir="ltr"
                  >
                    <Phone className="h-4 w-4 inline ml-1" />
                    {SITE.phone}
                  </a>
                  <a
                    href={buildHref('/booking')}
                    onClick={(e) => handleNav(e, '/booking')}
                    className="block w-full text-center px-4 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5"
                  >
                    احجز أونلاين
                  </a>
                </Card>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 shadow-card">
                  <h3 className="font-extrabold text-lg mb-4">مناطق التغطية</h3>
                  <div className="space-y-2">
                    {service.areas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        {area}
                      </div>
                    ))}
                  </div>
                  <a
                    href={buildHref('/areas')}
                    onClick={(e) => handleNav(e, '/areas')}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all"
                  >
                    كل المناطق
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">أسئلة شائعة عن {service.name}</h2>
            <p className="text-muted-foreground">الأجوبة على أكتر الأسئلة اللي بتوصلنا عن الخدمة دي.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-card rounded-xl shadow-card border border-border/50 px-5"
                >
                  <AccordionTrigger className="text-right hover:no-underline py-5 text-base font-bold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-extrabold mb-3 text-center"
          >
            خدمات تانية ممكن تهمك
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10">شوف باقي خدمات CureGo الطبية المنزلية.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((s, idx) => {
              const RelatedIcon = ICONS[s.icon] || Truck
              const relatedImgSm = getServiceImage(s.slug, 'sm')
              const relatedImgMd = getServiceImage(s.slug, 'md')
              return (
                <motion.a
                  key={s.slug}
                  href={buildHref(`/services/${s.slug}`)}
                  onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
                    <img
                      src={relatedImgMd}
                      srcSet={`${relatedImgSm} 400w, ${relatedImgMd} 800w`}
                      sizes="(max-width: 640px) 50vw, 33vw"
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-emergency text-white">
                      <RelatedIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold text-lg mb-1.5">{s.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{s.shortDesc}</p>
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Link to all services */}
          <div className="mt-8 text-center">
            <a
              href={buildHref('/services')}
              onClick={(e) => handleNav(e, '/services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
            >
              كل الخدمات الـ {SERVICES.length}
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
