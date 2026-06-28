'use client'

import { useState } from 'react'
import { ChevronLeft, Phone, MessageCircle, Send, CheckCircle2, MapPin } from 'lucide-react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SITE, SERVICES, CITIES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function BookingPage() {
  const { navigate } = useHashRoute()
  const prefersReducedMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">حجز خدمة</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              احجز خدمة طبية
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              احجز خدمتك في
              <span className="text-primary"> 3 دقايق</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              املأ النموذج ده وهنتواصل معاك في خلال 15 دقيقة. السعر بنتفق عليه حسب مكانك والخدمة المطلوبة. لو في طارئ، اتصل على الرقم الموحد {SITE.phone}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                  >
                    <Card className="p-8 shadow-card text-center">
                      <motion.span
                        initial={prefersReducedMotion ? false : { scale: 0 }}
                        animate={prefersReducedMotion ? {} : { scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-4 mx-auto"
                      >
                        <CheckCircle2 className="h-8 w-8" />
                      </motion.span>
                      <h2 className="text-2xl font-extrabold mb-2">تم استلام طلبك بنجاح</h2>
                      <p className="text-muted-foreground mb-6">
                        شكراً لثقتك في CureGo. فريقنا هيتواصل معاك في خلال 15 دقيقة على الرقم اللي سجلته.
                        لو الموضوع طارئ، اتصل بنا مباشرة على {SITE.phone}.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={`tel:${SITE.phoneIntl}`}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-emergency text-white font-bold"
                          dir="ltr"
                        >
                          <Phone className="h-4 w-4" />
                          {SITE.phone}
                        </a>
                        <Button variant="outline" onClick={() => setSubmitted(false)}>
                          احجز خدمة تانية
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Card className="p-6 lg:p-8 shadow-card">
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="mb-1.5 block">الاسم بالكامل *</Label>
                            <Input id="name" required placeholder="مثال: أحمد محمد علي" />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="mb-1.5 block">رقم الموبايل *</Label>
                            <Input id="phone" required type="tel" placeholder="01xxxxxxxxx" dir="ltr" />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="service" className="mb-1.5 block">الخدمة المطلوبة *</Label>
                            <Select required>
                              <SelectTrigger id="service">
                                <SelectValue placeholder="اختار الخدمة" />
                              </SelectTrigger>
                              <SelectContent>
                                {SERVICES.map(s => (
                                  <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="city" className="mb-1.5 block">المدينة *</Label>
                            <Select required>
                              <SelectTrigger id="city">
                                <SelectValue placeholder="اختار المدينة" />
                              </SelectTrigger>
                              <SelectContent>
                                {CITIES.map(c => (
                                  <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="area" className="mb-1.5 block">المنطقة / الحي *</Label>
                            <Input id="area" required placeholder="مثال: مدينة نصر، الحي السابع" />
                          </div>
                          <div>
                            <Label htmlFor="time" className="mb-1.5 block">الميعاد المفضل</Label>
                            <Input id="time" type="datetime-local" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address" className="mb-1.5 block">العنوان بالتفصيل *</Label>
                          <Input id="address" required placeholder="الشارع، رقم العمارة، الدور، الشقة" />
                        </div>

                        <div>
                          <Label htmlFor="notes" className="mb-1.5 block">ملاحظات عن الحالة</Label>
                          <Textarea
                            id="notes"
                            placeholder="اكتب أي تفاصيل تساعدنا: العمر، الأعراض، التاريخ المرضي، أدوية منتظمة..."
                            rows={4}
                          />
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <input type="checkbox" id="urgent" className="mt-1" />
                          <Label htmlFor="urgent" className="text-sm font-medium cursor-pointer">
                            الحالة طارئة (محتاجة استجابة فورية)
                          </Label>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/30 flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">ملاحظة عن السعر:</strong> بنحدد السعر حسب مكانك والخدمة المطلوبة بعد ما بنتواصل معاك. مفيش رسوم خفية، وكل حاجة بتكون واضحة من البداية.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full gradient-emergency text-white shadow-emergency hover:opacity-95 font-bold text-lg"
                        >
                          <Send className="h-4 w-4 ml-2" />
                          إرسال طلب الحجز
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          بإرسال الطلب، أنت موافق على
                          <a href={buildHref('/terms')} onClick={(e) => handleNav(e, '/terms')} className="text-primary hover:underline mx-1">
                            الشروط وسياسة الخصوصية
                          </a>
                          الخاصة بـ CureGo.
                        </p>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 shadow-card gradient-emergency text-white">
                  <h3 className="font-extrabold text-xl mb-3">في طارئ؟</h3>
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">
                    لو الحالة محتاجة تدخل فوري، ما تستناش الرد على النموذج. اتصل على طول.
                  </p>
                  <a
                    href={`tel:${SITE.phoneIntl}`}
                    className="block w-full text-center px-4 py-3 rounded-lg bg-white text-primary font-bold shadow-lg mb-2"
                    dir="ltr"
                  >
                    <Phone className="h-4 w-4 inline ml-1" />
                    {SITE.phone}
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors font-bold"
                  >
                    <MessageCircle className="h-4 w-4 inline ml-1" />
                    راسلنا على واتساب
                  </a>
                </Card>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-6 shadow-card">
                  <h3 className="font-extrabold text-lg mb-4">ليه تحجز مع CureGo؟</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      رد على طلبك خلال 15 دقيقة
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      فريق طبي مرخص من النقابة
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      أسعار حسب مكانك بدون رسوم خفية
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      متاح 24/7 حتى في الأعياد
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      قبول التأمين الصحي
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
