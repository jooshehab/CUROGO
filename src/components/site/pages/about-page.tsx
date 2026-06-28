'use client'

import { ChevronLeft, Phone, Mail, MapPin, Clock, Heart, Target, Eye, Award, Users, Truck } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE, STATS } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { CTABanner } from '@/components/site/sections/cta-banner'

export function AboutPage() {
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
            <span className="text-foreground font-bold">من نحن</span>
          </nav>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              قصة CureGo
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              بدأنا سنة {SITE.founded} بفكرة بسيطة:
              <br />
              <span className="text-primary">المصري يستاهل رعاية محترمة في بيته</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              CureGo هي أكبر شبكة خدمات طبية منزلية في القاهرة والجيزة. بنوفر إسعاف خاص، دكاترة منزليين، تمريض، أشعة، تحاليل، رعاية كبار السن، نقل بين المستشفيات، نقل على تنفس صناعي، إسعاف جوي، هولتر، وتأجير أجهزة طبية — كلها بفريق مرخص من {SITE.teamSize} طبيب وممرض، وأسطول من {SITE.fleetSize} سيارة إسعاف منتشرة في {STATS.find(s=>s.label==='منطقة مغطاة')?.value} منطقة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-5">إزاي بدأنا</h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>
                  في سنة {SITE.founded}, مؤسسنا المهندس أحمد فؤاد كان بيعاني من نقص خدمة الإسعاف لما جده الله يرحمه كان محتاج نقل طاريء. التجربة كانت صعبة — تأخر الإسعاف ساعة ونص، ولما وصل ما كانش مجهز صح. جده اتوفي في الطريق.
                </p>
                <p>
                  من اللحظة دي، أحمد قرر إنه يعمل حاجة. اتشارك مع دكتور خالد السيد (استشاري طب طوارئ) وأسسوا CureGo بـ 3 سيارات إسعاف وخمسة دكاترة. الفكرة كانت بسيطة: إسعاف سريع، مجهز صح، وبفريق محترم.
                </p>
                <p>
                  بعد 7 سنين، بقينا أكبر شبكة طبية منزلية في القاهرة الكبرى. بنخدم أكتر من 13,200 عميل، بـ {SITE.fleetSize} سيارة و{SITE.teamSize} طبيب وممرض. بس لسه بنشتغل بنفس المبدأ: المصري يستاهل رعاية محترمة في بيته.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="space-y-4"
              >
                <div className="aspect-square rounded-2xl gradient-emergency text-white p-6 flex flex-col justify-between shadow-emergency">
                  <Heart className="h-10 w-10" />
                  <div>
                    <div className="text-3xl font-extrabold">{SITE.founded}</div>
                    <div className="text-sm opacity-90">سنة التأسيس</div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-card border border-border/50 p-6 flex flex-col justify-between shadow-card">
                  <Users className="h-10 w-10 text-primary" />
                  <div>
                    <div className="text-3xl font-extrabold">{SITE.teamSize}+</div>
                    <div className="text-sm text-muted-foreground">طبيب وممرض</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="space-y-4 mt-8"
              >
                <div className="aspect-square rounded-2xl bg-card border border-border/50 p-6 flex flex-col justify-between shadow-card">
                  <Truck className="h-10 w-10 text-primary" />
                  <div>
                    <div className="text-3xl font-extrabold">{SITE.fleetSize}</div>
                    <div className="text-sm text-muted-foreground">سيارة إسعاف</div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-foreground text-background p-6 flex flex-col justify-between">
                  <Award className="h-10 w-10 text-primary" />
                  <div>
                    <div className="text-3xl font-extrabold">4.9</div>
                    <div className="text-sm opacity-80">تقييم العملاء</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'رسالتنا',
                desc: 'نوفر رعاية طبية منزلية بأعلى جودة لكل المصريين في القاهرة والجيزة. نكون أسرع إسعاف، أنظف خدمة، وأكثر فريق محترم. هدفنا ننقذ أرواح ونسهّل حياة الناس.',
              },
              {
                icon: Eye,
                title: 'رؤيتنا',
                desc: 'نبقى أول اسم يخطر على بال المصري لما يحتاج خدمة طبية في بيته. نتوسع في كل محافظات مصر، ونوفر رعاية منزلية متكاملة بأسعار عادلة وجودة عالية.',
              },
              {
                icon: Heart,
                title: 'قيمنا',
                desc: 'السرعة في الاستجابة، الاحترام في التعامل، الجودة في الخدمة، الشفافية في الأسعار. كل قرار بناخده بيبدأ من سؤال: "لو المريض ده والدتي، إيش كنت حابب أتعامل معاه إزاي؟"',
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-emergency text-white mb-4">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-extrabold text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-extrabold text-center mb-10"
          >
            CureGo بالأرقام
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card rounded-xl p-5 text-center shadow-card border border-border/50"
              >
                <div className="text-2xl lg:text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-curego">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-card border border-border/50 p-6 lg:p-10"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">اتصل بنا</div>
                  <a href={`tel:${SITE.phoneIntl}`} className="font-bold hover:text-primary" dir="ltr">{SITE.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">بريد إلكتروني</div>
                  <a href={`mailto:${SITE.email}`} className="font-bold hover:text-primary" dir="ltr">{SITE.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">العنوان</div>
                  <div className="font-bold text-sm">{SITE.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">ساعات العمل</div>
                  <div className="font-bold text-sm">{SITE.hours}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
