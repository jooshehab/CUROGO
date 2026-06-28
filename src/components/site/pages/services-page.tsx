'use client'

import { ChevronLeft, ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ServicesGrid } from '@/components/site/sections/services-grid'
import { FAQSection } from '@/components/site/sections/faq-section'
import { CTABanner } from '@/components/site/sections/cta-banner'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { SERVICES } from '@/lib/site-data'

export function ServicesPage() {
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
            <span className="text-foreground font-bold">الخدمات</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              خدماتنا الطبية المنزلية · {SERVICES.length} خدمة
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              كل الخدمات الطبية اللي بتحتاجها،
              <br />
              <span className="text-primary">في بيتك</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              CureGo بتوفر {SERVICES.length} خدمات طبية متكاملة بفريق مرخص وأجهزة معتمدة. من إسعاف الطوارئ لرعاية كبار السن، ومن النقل على تنفس صناعي للإسعاف الجوي — احنا معاك في كل خطوة.
              اختار الخدمة اللي محتاجها واعرف التفاصيل الكاملة والمناطق المغطاة. السعر بيتحدد حسب مكانك.
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesGrid />
      <FAQSection limit={9} />
      <CTABanner />
    </>
  )
}
