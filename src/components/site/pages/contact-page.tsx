'use client'

import { useState } from 'react'
import { ChevronLeft, Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function ContactPage() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()
  const [sent, setSent] = useState(false)

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
            <span className="text-foreground font-bold">تواصل معنا</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              بنحب نسمع منك
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              تواصل معانا في أي وقت
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              فريقنا متاح 24 ساعة طوال أيام الأسبوع. لو عندك سؤال، شكوى، اقتراح، أو محتاج مساعدة، احنا هنا.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Contact info */}
            <div className="space-y-4">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 shadow-card gradient-emergency text-white">
                  <h3 className="font-extrabold text-lg mb-3">خط الطوارئ</h3>
                  <p className="text-sm opacity-90 mb-4">متاح 24 ساعة، 7 أيام في الأسبوع</p>
                  <a
                    href={`tel:${SITE.phoneIntl}`}
                    className="block w-full text-center px-4 py-3 rounded-lg bg-white text-primary font-extrabold text-lg shadow-lg mb-2"
                    dir="ltr"
                  >
                    <Phone className="h-5 w-5 inline ml-1" />
                    {SITE.phone}
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors font-bold"
                  >
                    <MessageCircle className="h-4 w-4 inline ml-1" />
                    واتساب
                  </a>
                </Card>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="p-6 shadow-card">
                  <h3 className="font-extrabold text-lg mb-4">معلومات التواصل</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">التليفون</div>
                        <a href={`tel:${SITE.phoneIntl}`} className="font-bold hover:text-primary" dir="ltr">{SITE.phone}</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">بريد إلكتروني</div>
                        <a href={`mailto:${SITE.email}`} className="font-bold hover:text-primary" dir="ltr">{SITE.email}</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">العنوان</div>
                        <div className="font-bold">{SITE.address}</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">ساعات العمل</div>
                        <div className="font-bold">{SITE.hours}</div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 shadow-card">
                  <h3 className="font-extrabold text-lg mb-3">عنواننا</h3>
                  <div className="aspect-video rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground text-sm">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mb-2 block mx-auto text-primary" />
                      <div className="font-bold">{SITE.address}</div>
                      <div className="text-xs mt-1">مفتوح 24 ساعة</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 lg:p-8 shadow-card">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <motion.span
                        initial={prefersReducedMotion ? false : { scale: 0 }}
                        animate={prefersReducedMotion ? {} : { scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-4"
                      >
                        <CheckCircle2 className="h-8 w-8" />
                      </motion.span>
                      <h2 className="text-2xl font-extrabold mb-2">تم إرسال رسالتك</h2>
                      <p className="text-muted-foreground mb-6">
                        شكراً لتواصلك مع CureGo. هنرد عليك في أقرب وقت.
                      </p>
                      <Button variant="outline" onClick={() => setSent(false)}>إرسال رسالة تانية</Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-2xl font-extrabold mb-1">ابعتلنا رسالة</h2>
                      <p className="text-muted-foreground mb-6">هنرد عليك في أقرب وقت ممكن.</p>

                      <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cname" className="mb-1.5 block">الاسم *</Label>
                            <Input id="cname" required placeholder="اسمك الكريم" />
                          </div>
                          <div>
                            <Label htmlFor="cphone" className="mb-1.5 block">الموبايل *</Label>
                            <Input id="cphone" required type="tel" placeholder="01xxxxxxxxx" dir="ltr" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cemail" className="mb-1.5 block">بريد إلكتروني</Label>
                          <Input id="cemail" type="email" placeholder="email@example.com" dir="ltr" />
                        </div>

                        <div>
                          <Label htmlFor="csubject" className="mb-1.5 block">الموضوع *</Label>
                          <Input id="csubject" required placeholder="مثال: استفسار عن خدمة كبار السن" />
                        </div>

                        <div>
                          <Label htmlFor="cmessage" className="mb-1.5 block">الرسالة *</Label>
                          <Textarea
                            id="cmessage"
                            required
                            placeholder="اكتب رسالتك هنا..."
                            rows={6}
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full gradient-emergency text-white shadow-emergency hover:opacity-95 font-bold text-lg"
                        >
                          <Send className="h-4 w-4 ml-2" />
                          إرسال الرسالة
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
