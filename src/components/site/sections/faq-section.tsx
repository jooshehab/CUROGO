'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { SERVICES } from '@/lib/site-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection({ limit = 8 }: { limit?: number }) {
  const prefersReducedMotion = useReducedMotion()
  // Aggregate FAQs from all services
  const allFaqs: { q: string; a: string; category: string }[] = []
  SERVICES.forEach((s) => {
    s.faqs.forEach((f) => {
      allFaqs.push({ ...f, category: s.name })
    })
  })

  const faqs = allFaqs.slice(0, limit)

  return (
    <section className="py-16 lg:py-24" aria-label="الأسئلة الشائعة">
      <div className="container-curego">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            كل اللي بتحب تعرفه عن خدماتنا
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            جمعنا لك أكتر الأسئلة اللي بتوصلنا من عملائنا. لو عندك سؤال تاني، كلمنا على طول على الرقم الموحد.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-card rounded-xl shadow-card border border-border/50 px-5"
              >
                <AccordionTrigger className="text-right hover:no-underline py-5 text-base font-bold">
                  <span className="flex items-start gap-3 flex-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-extrabold shrink-0 mt-0.5">
                      ؟
                    </span>
                    <span className="flex-1">{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pr-10">
                  {faq.a}
                  <div className="mt-3 text-xs text-primary font-bold">
                    تصنيف: {faq.category}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
