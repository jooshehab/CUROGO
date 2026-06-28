'use client'

import { ChevronLeft, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SITE, SERVICES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { CTABanner } from '@/components/site/sections/cta-banner'
import { getServiceImage } from '@/lib/service-images'

export function PricesPage() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">الأسعار</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              أسعار حسب مكانك
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              السعر حسب المكان
              <br />
              <span className="text-primary">ويسرّنا نحددوله لك</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              في CureGo بنؤمن إن كل منطقة وكل حالة ليها ظروفها. عشان كده الأسعار بتتحدد حسب مكانك، نوع الخدمة، حالة المريض، والميعاد المطلوب. كلمنا أو راسلنا على واتساب، وهتاخد عرض سعر فوري بدون أي التزام.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why location-based pricing */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-card border border-border/50 p-6 lg:p-8 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-extrabold mb-5">ليه الأسعار حسب المكان؟</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { t: 'المسافة', d: 'كل ما تبعد عن مركزنا، بتزيد تكلفة الوقود والوقت. القاهرة الكبرى ليها سعر، والمحافظات ليها سعر تاني.' },
                { t: 'نوع التجهيز', d: 'إسعاف عادي غير إسعاف عناية مركزة، وكمان نقل على تنفس صناعي بيطلب فريق متخصص وأجهزة أعلى.' },
                { t: 'وقت الخدمة', d: 'الكشف العادي في النهار غير الكشف الفوري في 3 الصبح. كل نوع ليه تسعيرته.' },
                { t: 'حالة المريض', d: 'بعد ما ندخل في تفاصيل الحالة، بنقدر نحدد السعر النهائي بدقة. مفيش رسوم خفية.' },
              ].map((item, idx) => (
                <motion.div
                  key={item.t}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm mb-1">{item.t}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services with "ask for price" */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-extrabold mb-2 text-center"
          >
            خدماتنا — اسأل عن السعر
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10">كل خدمة لينا سعرها حسب مكانك — كلمنا ونتفق</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                  <img
                    src={getServiceImage(service.slug, 'md')}
                    srcSet={`${getServiceImage(service.slug, 'sm')} 400w, ${getServiceImage(service.slug, 'md')} 800w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-bold text-primary">
                    السعر حسب المكان
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg mb-1.5">{service.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{service.shortDesc}</p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${SITE.phoneIntl}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg gradient-emergency text-white font-bold text-sm"
                      dir="ltr"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {SITE.phone}
                    </a>
                    <a
                      href={buildHref(`/services/${service.slug}`)}
                      onClick={(e) => handleNav(e, `/services/${service.slug}`)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-bold hover:border-primary/30"
                    >
                      تفاصيل الخدمة
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-card border border-border/50 p-8 lg:p-12 text-center max-w-3xl mx-auto"
          >
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">
              جاهز تعرف سعر خدمتك؟
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              كلمنا على الرقم الموحد أو راسلنا على واتساب. هتاخد عرض سعر فوري بدون أي التزام. مفيش رسوم خفية، وكل حاجة واضحة من البداية.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-emergency text-white font-bold shadow-emergency"
                dir="ltr"
              >
                <Phone className="h-5 w-5" />
                {SITE.phone}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-success/10 text-success font-bold hover:bg-success/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                واتساب
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
