'use client'

import { ChevronLeft, MapPin, Clock, Phone, CheckCircle2, ArrowLeft, Navigation, MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { CITIES, SERVICES, SITE } from '@/lib/site-data'
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

export function DistrictPage({ citySlug, districtSlug }: { citySlug: string; districtSlug: string }) {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()
  const city = CITIES.find((c) => c.slug === citySlug)
  const district = city?.districts.find((d) => d.slug === districtSlug)

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  if (!city || !district) {
    return (
      <div className="container-curego py-20 text-center">
        <h1 className="text-3xl font-extrabold mb-3">المنطقة غير موجودة</h1>
        <a href={buildHref('/areas')} onClick={(e) => handleNav(e, '/areas')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-emergency text-white font-bold">
          <ArrowLeft className="h-4 w-4" /> كل المناطق
        </a>
      </div>
    )
  }

  const otherDistricts = city.districts.filter(d => d.slug !== districtSlug).slice(0, 6)
  const otherCity = CITIES.find(c => c.slug !== city.slug)

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <a href={buildHref('/areas')} onClick={(e) => handleNav(e, '/areas')} className="hover:text-primary">المناطق</a>
            <ChevronLeft className="h-4 w-4" />
            <a href={buildHref(`/areas/${city.slug}`)} onClick={(e) => handleNav(e, `/areas/${city.slug}`)} className="hover:text-primary">{city.name}</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">{district.name}</span>
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
                  <MapPin className="h-8 w-8" />
                </span>
                <div>
                  <h1 className="text-3xl lg:text-5xl font-extrabold mb-2">
                    {district.name}، {city.name}
                  </h1>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    {district.shortDesc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${SITE.phoneIntl}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  اطلب خدمة من {district.name}
                </a>
                <a
                  href={buildHref('/booking')}
                  onClick={(e) => handleNav(e, '/booking')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  احجز أونلاين
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-success/10 text-success font-bold hover:bg-success/20 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  واتساب
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h3 className="font-extrabold text-lg mb-4">معلومات {district.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">زمن الاستجابة</div>
                    <div className="font-bold">{district.responseMin} دقيقة متوسطة</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">المدينة</div>
                    <div className="font-bold">{city.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">حالة التغطية</div>
                    <div className="font-bold text-success">مغطاة بالكامل · 24/7</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* District description — صفحة منفصلة كاملة */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-extrabold mb-5"
              >
                خدمات CureGo في {district.name}
              </motion.h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  احنا في CureGo بنتفاخر بخدمتنا في {district.name}، {city.name}. عندنا محطة إسعاف ثابتة قريبة منك عشان نضمن وصول خلال {district.responseMin} دقيقة من مكالمتك. الفريق الطبي في المنطقة بيعرف كل شوارعها وأزقتها، وبيعرف طرق مختصرة تتجنب زحمة المرور.
                </motion.p>
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  سواء كنت ساكن في {district.landmarks.slice(0, 2).join(' أو ')}، أو أي مكان تاني في {district.name}، فريقنا هيوصلك بسرعة وبكل احترافية. كل سيارات الإسعاف بتاعتنا مجهزة بأحدث الأجهزة الطبية، وكل الدكاترة والممرضين مرخصون من نقابة المهن الصحية المصرية.
                </motion.p>
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  بنوفر في {district.name} كل خدماتنا: إسعاف خاص مجهز، دكتور منزلي، تمريض، أشعة، تحاليل، رعاية كبار السن، نقل بين المستشفيات، نقل على تنفس صناعي، تأمين حفلات، هولتر، وتأجير أجهزة. كمان بنقدر ننسّقلك نقل من {district.name} لأي مستشفى في {city.name} أو لمحافظة تانية في مصر.
                </motion.p>
              </div>

              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-extrabold mt-10 mb-5"
              >
                معالم نخدمها في {district.name}
              </motion.h2>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {district.landmarks.map((lm, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    {lm}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-card p-6 sticky top-24"
              >
                <h3 className="font-extrabold text-lg mb-4">احجز في {district.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  فيك تستلم خدمة طبية في {district.name} خلال {district.responseMin} دقيقة. اتصل أو احجز أونلاين.
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
                  className="block w-full text-center px-4 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 mb-2"
                >
                  احجز أونلاين
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-success/10 text-success font-bold hover:bg-success/20"
                >
                  <MessageCircle className="h-4 w-4 inline ml-1" />
                  راسلنا واتساب
                </a>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  السعر حسب المكان والخدمة المطلوبة
                </p>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Services available — مع صور */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-extrabold mb-2 text-center"
          >
            كل خدماتنا متوفرة في {district.name} ({SERVICES.length})
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10">من إسعاف لرعاية كبار السن، احنا معاك في {district.name}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, idx) => {
              const ServiceIcon = ICONS[s.icon] || Truck
              return (
                <motion.a
                  key={s.slug}
                  href={buildHref(`/services/${s.slug}`)}
                  onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
                    <img
                      src={getServiceImage(s.slug, 'sm')}
                      srcSet={`${getServiceImage(s.slug, 'sm')} 400w, ${getServiceImage(s.slug, 'md')} 800w`}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <span className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-emergency text-white">
                      <ServiceIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold text-sm mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{s.shortDesc}</p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Other districts in same city — cross-link */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-extrabold mb-2 text-center"
          >
            مناطق تانية في {city.name}
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10">شوف خدماتنا في باقي أحياء {city.name}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherDistricts.map((d, dIdx) => (
              <motion.a
                key={d.slug}
                href={buildHref(`/areas/${city.slug}/${d.slug}`)}
                onClick={(e) => handleNav(e, `/areas/${city.slug}/${d.slug}`)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: dIdx * 0.05 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.responseMin} دقيقة استجابة</div>
                </div>
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Other city cross-link */}
      {otherCity && (
        <section className="py-8 pb-12">
          <div className="container-curego">
            <motion.a
              href={buildHref(`/areas/${otherCity.slug}`)}
              onClick={(e) => handleNav(e, `/areas/${otherCity.slug}`)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block bg-muted/30 rounded-2xl p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">المدينة التانية</div>
                  <div className="text-xl font-extrabold">
                    خدماتنا في {otherCity.name} ({otherCity.districts.length} منطقة)
                  </div>
                </div>
                <ArrowLeft className="h-6 w-6 text-primary" />
              </div>
            </motion.a>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  )
}
