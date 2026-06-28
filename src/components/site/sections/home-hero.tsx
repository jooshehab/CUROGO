'use client'

import { Phone, Truck, Clock, ShieldCheck, Star, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE, STATS } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { getServiceImage } from '@/lib/service-images'

const HERO_IMG_LG = getServiceImage('ambulance', 'lg')
const HERO_IMG_MD = getServiceImage('ambulance', 'md')
const HERO_IMG_SM = getServiceImage('ambulance', 'sm')

export function HomeHero() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <section className="relative overflow-hidden bg-grid-pattern" aria-label="CureGo - خدمات طبية منزلية">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />

      <div className="container-curego relative py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              متاحين 24 ساعة · نوصلك خلال {SITE.responseTime}
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight mb-5"
            >
              إسعاف خاص ودكتور منزلي
              <br />
              <span className="text-primary">في القاهرة والجيزة</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base lg:text-lg text-muted-foreground mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              سيارات إسعاف مجهزة عناية مركزة، دكاترة منزليين، تمريض، أشعة، تحاليل، نقل على تنفس صناعي،
              وإسعاف جوي — كلها بيوصلوك باب بيتك. أسطول من {SITE.fleetSize} سيارة منتشرة في {STATS.find(s=>s.label==='منطقة مغطاة')?.value} منطقة.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity text-lg pulse-emergency"
              >
                <Phone className="h-5 w-5" />
                اتصل الآن · {SITE.phone}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                واتساب
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <span className="font-bold">{SITE.rating}</span>
                <span className="text-muted-foreground">({SITE.reviewsCount} تقييم)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                ترخيص نقابة المهن الصحية
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main card with real image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-emergency">
                <img
                  src={HERO_IMG_MD}
                  srcSet={`${HERO_IMG_SM} 400w, ${HERO_IMG_MD} 800w, ${HERO_IMG_LG} 1200w`}
                  sizes="(max-width: 640px) 100vw, 500px"
                  alt="فريق طبي من CureGo في خدمة الإسعاف"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                  <div className="text-5xl font-extrabold mb-1">24/7</div>
                  <div className="text-lg font-medium opacity-95">
                    بنشتغل 24 ساعة
                    <br />
                    7 أيام في الأسبوع
                  </div>
                  <div className="mt-4 inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur text-sm font-bold">
                    حتى في الأعياد والرمضان
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: [0, -8, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -left-4 lg:-left-8 bg-card rounded-2xl shadow-card-hover p-4 max-w-[180px] rotate-[-6deg]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-extrabold">{SITE.responseTime}</span>
                </div>
                <div className="text-xs text-muted-foreground">متوسط الاستجابة في القاهرة</div>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: [0, 8, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute -bottom-4 -right-4 lg:-right-8 bg-card rounded-2xl shadow-card-hover p-4 max-w-[180px] rotate-[5deg]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-extrabold">{SITE.fleetSize}</span>
                </div>
                <div className="text-xs text-muted-foreground">سيارة إسعاف منتشرة في شوارعك</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-card rounded-xl p-4 lg:p-5 text-center shadow-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl lg:text-3xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
