'use client'

import { CheckCircle2, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { BOOKING_STEPS, SITE } from '@/lib/site-data'

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 lg:py-24 bg-muted/30" aria-label="إزاي بنشتغل">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            إزاي بنشتغل
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            4 خطوات بسيطة لخدمة طبية في بيتك
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            من أول مكالمة لحد ما الفريق الطبي يوصلك، كل حاجة مدروسة ومظبوطة.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 right-0 left-0 h-0.5 border-t-2 border-dashed border-primary/20 -z-10" />

          {BOOKING_STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={prefersReducedMotion ? {} : { y: -6 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  initial={prefersReducedMotion ? false : { scale: 0 }}
                  whileInView={prefersReducedMotion ? {} : { scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12 + 0.2, type: 'spring' }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-emergency text-white font-extrabold text-lg shadow-emergency"
                >
                  {step.num}
                </motion.span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="text-lg font-extrabold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
            dir="ltr"
          >
            <Phone className="h-5 w-5" />
            ابدأ دلوقتي · {SITE.phone}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
