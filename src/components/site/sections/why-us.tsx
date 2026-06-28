'use client'

import { ShieldCheck, Award, HeartHandshake, Clock4 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'ترخيص رسمي ومراقبة',
    desc: 'مرخصون من نقابة المهن الصحية المصرية رقم 4781. كل أطبائنا وممرضينا حاصلون على تصاريح مزاولة، وكل أجهزتنا معتمدة من وزارة الصحة ومعايَرة دورياً.',
  },
  {
    icon: Award,
    title: 'أجهزة طبية حديثة',
    desc: 'أسطول من 38 سيارة إسعاف مجهزة بأحدث أجهزة التنفس الصناعي، مونيتور للعلامات الحيوية، ومانعل قلب. بنحدّث الأجهزة كل سنة عشان نضمن أعلى جودة.',
  },
  {
    icon: HeartHandshake,
    title: 'فريق بيلمس القلب',
    desc: 'مش بس مهارة طبية، احنا بنختار فريقنا اللي عنده لمسة إنسانية. كل دكتور وممرض بيتدرّب على التعامل مع الحالات بكرامة واحترام، خصوصاً كبار السن والأطفال.',
  },
  {
    icon: Clock4,
    title: 'استجابة فورية',
    desc: 'بنوصل في خلال 10 دقائق داخل القاهرة الكبرى، و 15-20 دقيقة في المدن الجديدة. عندنا 18 محطة ثابتة منتشرة عشان نضمن السرعة في كل منطقة.',
  },
]

export function WhyUs() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 lg:py-24" aria-label="ليه CureGo">
      <div className="container-curego">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4"
            >
              ليه CureGo؟
            </motion.div>
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-extrabold mb-5"
            >
              احنا مش مجرد خدمة طبية، احنا عيلتك في الوقت الصعب
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6"
            >
              تأسست CureGo سنة 2018 بفكرة بسيطة: المصري يستاهل رعاية طبية محترمة في بيته بدون ما يعاني في طوابير المستشفيات.
              النهارده بنخدم أكتر من 13,200 عميل، بفريق من 165 دكتور وممرض، وسيارات إسعاف بتغطي كل شبر في القاهرة والجيزة وكل المحافظات.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {FEATURES.map((f, idx) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Visual side */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="space-y-4"
              >
                <div className="aspect-[4/5] rounded-2xl gradient-emergency text-white p-6 flex flex-col justify-between shadow-emergency">
                  <ShieldCheck className="h-10 w-10" />
                  <div>
                    <div className="text-4xl font-extrabold">+7</div>
                    <div className="text-sm opacity-90">سنوات خبرة في خدمة القاهرة</div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-card border border-border/50 p-5 shadow-card flex flex-col justify-between">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-extrabold">+165</div>
                    <div className="text-xs text-muted-foreground">طاقم طبي مرخص</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="space-y-4 mt-8"
              >
                <div className="aspect-square rounded-2xl bg-card border border-border/50 p-5 shadow-card flex flex-col justify-between">
                  <HeartHandshake className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-extrabold">+13K</div>
                    <div className="text-xs text-muted-foreground">عميل سعيد</div>
                  </div>
                </div>
                <div className="aspect-[4/5] rounded-2xl bg-foreground text-background p-6 flex flex-col justify-between">
                  <Clock4 className="h-10 w-10 text-primary" />
                  <div>
                    <div className="text-4xl font-extrabold">10</div>
                    <div className="text-sm opacity-90">دقائق متوسط الاستجابة</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
