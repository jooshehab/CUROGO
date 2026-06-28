'use client'

import { Phone, MessageCircle, CalendarPlus } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function CTABanner() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <section className="py-12 lg:py-16 bg-foreground text-background" aria-label="احجز خدمة الآن">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 items-center"
        >
          <div className="md:col-span-2">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-2 text-white">
              محتاج مساعدة طبية دلوقتي؟
            </h2>
            <p className="text-background/80 text-sm lg:text-base leading-relaxed">
              متقلقش، احنا معاك. فريقنا متاح 24 ساعة، 7 أيام في الأسبوع. اتصل أو احجز أونلاين وهنوصلك في {SITE.responseTime}.
            </p>
          </div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row md:flex-col gap-3"
          >
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
              dir="ltr"
            >
              <Phone className="h-5 w-5" />
              {SITE.phone}
            </a>
            <a
              href={buildHref('/booking')}
              onClick={(e) => handleNav(e, '/booking')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-background text-foreground font-bold hover:bg-background/90 transition-colors"
            >
              <CalendarPlus className="h-5 w-5" />
              احجز أونلاين
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
