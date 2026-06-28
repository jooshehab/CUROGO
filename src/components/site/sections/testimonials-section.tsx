'use client'

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/site-data'

/**
 * TestimonialsSection — آراء العملاء جنب بعضها مع تمرير يدوي
 *
 * - الكروت جنب بعضها أفقياً (grid → horizontal scroll)
 * - المستخدم هو اللي بيمررها (سحب أو أزرار التنقل)
 * - مفيش marquee تلقائي
 * - تدرّج على الجوانب لتأثير احترافي
 * - Responsive: scroll أفقياً على الموبايل، grid على الديسكتوب
 */
export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cards = Array.from(container.children) as HTMLElement[]
    if (cards.length === 0) return

    // إيجاد الكارت الحالي اللي ظاهر في الـ viewport
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    let currentIdx = 0
    let minDistance = Infinity
    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const distance = Math.abs(cardCenter - containerCenter)
      if (distance < minDistance) {
        minDistance = distance
        currentIdx = idx
      }
    })

    // تحديد الكارت الهدف
    const targetIdx = direction === 'next' 
      ? Math.min(currentIdx + 1, cards.length - 1)
      : Math.max(currentIdx - 1, 0)

    cards[targetIdx]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30 overflow-hidden" aria-label="آراء عملائنا">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              آراء عملائنا
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">
              قصص حقيقية من عيلتنا
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-2xl">
              مش بس بنقول إننا أحسن... بنخلي عملاؤنا اللي يحكوا. اقرأ تجاربهم الحقيقية مع CureGo.
            </p>
          </div>

          {/* أزرار التنقل (ديسكتوب فقط) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll('prev')}
              aria-label="السابق"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border hover:border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              aria-label="التالي"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border hover:border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Container للكروت مع scroll أفقياً */}
      <div className="relative">
        {/* الـ scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(220, 38, 38, 0.3) transparent',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <TestimonialCard key={idx} t={t} index={idx} />
          ))}
        </div>

        {/* تدرّج على الجوانب عشان تأثير احترافي */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
      </div>

      {/* مؤشر السحب (للموبايل) */}
      <div className="container-curego mt-3 sm:hidden">
        <p className="text-xs text-muted-foreground text-center">
          ← اسحب لرؤية المزيد →
        </p>
      </div>

      {/* CSS للـ scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.3);
          border-radius: 999px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.5);
        }
      `}</style>
    </section>
  )
}

/** كارت تقييم واحد — بعرض ثابت عشان يمشي مع الـ scroll */
function TestimonialCard({
  t,
  index,
}: {
  t: { name: string; area: string; text: string; rating: number; date: string }
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 flex flex-col w-[300px] sm:w-[380px] shrink-0 snap-center"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < t.rating ? 'fill-warning text-warning' : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>
        <Quote className="h-8 w-8 text-primary/15" />
      </div>

      <p className="text-sm leading-relaxed mb-5 flex-1 text-foreground/90">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-emergency text-white font-bold text-sm shrink-0">
          {t.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <div className="font-bold text-sm">{t.name}</div>
          <div className="text-xs text-muted-foreground">
            {t.area} · {t.date}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
