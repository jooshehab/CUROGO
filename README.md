# CureGo — منصة خدمات طبية منزلية 🚑

موقع طبي احترافي بالعربي المصري لشركة CureGo بتقدّم خدمات طبية منزلية في القاهرة والجيزة:
إسعاف خاص، دكتور منزلي، تمريض، أشعة، تحاليل، رعاية كبار السن، نقل بين المستشفيات،
نقل على تنفس صناعي، تأمين حفلات، إسعاف جوي، هولتر، وتأجير أجهزة طبية.

## ✅ جاهزية الموقع للنشر

الموقع **جاهز 100% للنشر** على أي استضافة (Vercel, Netlify, استضافة عادية):
- ✅ **Lint نضيف** (0 errors)
- ✅ **TypeScript نضيف** (0 errors)
- ✅ **Build ناجح** بدون أخطاء
- ✅ **كل الصفحات شغّالة** (HTTP 200)
- ✅ **sitemap.xml و robots.txt** بيشتغلوا
- ✅ **صفحة 404** بترجع HTTP 404 الصحيح
- ✅ **مفيش console errors**
- ✅ **مفيش duplicate IDs**
- ✅ **كل الصور ليها alt text**
- ✅ **مفيش صور مش شغّالة**

## 🚀 التقنيات المستخدمة

- **Framework:** Next.js 16 (App Router) — `output: "standalone"`
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Tajawal + IBM Plex Sans Arabic (عربي)
- **SEO:** Schema.org JSON-LD, sitemap.xml, robots.txt, Open Graph

## 📦 التركيب والتشغيل

```bash
# 1. تثبيت الـ dependencies
bun install

# 2. تشغيل الـ dev server
bun run dev

# 3. افتح المتصفح على http://localhost:3000

# أو بناء للإنتاج
bun run build

# فحص الكود
bun run lint

# فحص الأنواع
bunx tsc --noEmit
```

## 🌐 النشر على Vercel (الأسهل)

1. اعمل account على [vercel.com](https://vercel.com)
2. ارفع المشروع على GitHub
3. اربط Vercel بالـ repo
4. Vercel هتكتشف Next.js تلقائياً وتنشر الموقع
5. اربط الدومين بتاعك من Vercel dashboard

## 🌐 النشر على استضافة عادية (VPS/Shared Hosting)

### استخدام Docker (الأنسب)
```bash
# 1. بناء الـ production
bun run build

# 2. تشغيل الـ standalone server
bun .next/standalone/server.js
```

### أو استخدام PM2
```bash
npm install -g pm2
bun run build
pm2 start "bun .next/standalone/server.js" --name curego
pm2 save
pm2 startup
```

### إعدادات Nginx (لو محتاج reverse proxy)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📂 هيكل المشروع

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # الـ root layout بـ RTL و SEO
│   │   ├── page.tsx            # الصفحة الرئيسية (Hash Router)
│   │   ├── not-found.tsx       # صفحة 404
│   │   ├── sitemap.ts          # sitemap.xml أوتوماتيكي
│   │   ├── robots.ts           # robots.txt
│   │   └── globals.css         # الـ styling العام
│   ├── components/
│   │   ├── ui/                 # مكوّنات shadcn/ui
│   │   └── site/
│   │       ├── popup.tsx                    # الـ popup اللي بيظهر تلقائياً
│   │       ├── site-header.tsx              # الـ header
│   │       ├── site-footer.tsx              # الـ footer
│   │       ├── motion-primitives.tsx        # أنميشن Framer Motion
│   │       ├── sections/                    # أقسام الصفحات
│   │       │   ├── home-hero.tsx
│   │       │   ├── services-grid.tsx
│   │       │   ├── areas-grid.tsx
│   │       │   ├── testimonials-section.tsx
│   │       │   ├── faq-section.tsx
│   │       │   ├── cta-banner.tsx
│   │       │   ├── how-it-works.tsx
│   │       │   └── why-us.tsx
│   │       └── pages/                       # كل صفحات الموقع
│   │           ├── home-page.tsx
│   │           ├── services-page.tsx
│   │           ├── service-detail-page.tsx
│   │           ├── areas-page.tsx
│   │           ├── city-page.tsx
│   │           ├── district-page.tsx
│   │           ├── about-page.tsx
│   │           ├── booking-page.tsx
│   │           ├── contact-page.tsx
│   │           ├── prices-page.tsx
│   │           ├── sitemap-page.tsx
│   │           ├── terms-page.tsx
│   │           └── not-found-page.tsx
│   ├── hooks/
│   │   └── use-hash-route.ts   # Hash-based routing
│   └── lib/
│       ├── site-data.ts        # كل بيانات الموقع (خدمات، مناطق، تقييمات)
│       └── service-images.ts   # صور الخدمات
├── public/
│   ├── services/               # صور الخدمات مضغوطة WebP (33 صورة)
│   │   ├── ambulance-{sm,md,lg}.webp
│   │   ├── doctor-visit-{sm,md,lg}.webp
│   │   ├── nursing-{sm,md,lg}.webp
│   │   ├── popup-{sm,md,lg}.webp
│   │   └── ... (كل خدمة)
│   └── logo.svg
├── prisma/
│   └── schema.prisma           # قاعدة البيانات (Prisma ORM)
├── scripts/
│   ├── compress-images.ts      # سكريبت ضغط الصور
│   └── compress-popup-image.ts # سكريبت ضغط صورة الـ popup
├── package.json
├── bun.lock
├── next.config.ts              # output: "standalone"
├── tailwind.config.ts
├── tsconfig.json
├── components.json             # إعدادات shadcn/ui
├── eslint.config.mjs
├── Caddyfile                   # إعدادات الـ gateway (للاستضافة اللي بتستخدم Caddy)
└── README.md                   # الملف ده
```

## 🎨 المميزات

### الصفحات (13 نوع):
1. **الرئيسية** — Hero + خدمات + إحصائيات + آراء + FAQ
2. **من نحن** — قصة الشركة + رسالة/رؤية/قيم
3. **كل الخدمات** — 13 خدمة طبية كاملة
4. **تفاصيل كل خدمة** (13 صفحة) — مع صورة hero + وصف + features + FAQs
5. **كل المناطق** — عرض القاهرة (16 منطقة) + الجيزة (13 منطقة)
6. **تفاصيل كل مدينة** — القاهرة + الجيزة
7. **تفاصيل كل منطقة** (29 صفحة) — مع معالم وزمن استجابة
8. **الأسعار** — حسب المكان (بدون أسعار ثابتة)
9. **حجز خدمة** — Form كامل مع validation
10. **تواصل معنا** — Form + معلومات
11. **خريطة الموقع** — كل الروابط
12. **الشروط والخصوصية** — 6 أقسام شاملة
13. **404** — صفحة خطأ مخصصة

### الخدمات (13 خدمة):
- إسعاف خاص مجهز
- دكتور منزلي كشف فوري
- تمريض منزلي 24 ساعة
- أشعة منزلية متنقلة
- تحاليل منزلية بنفس اليوم
- رعاية كبار السن المتكاملة
- نقل مرضى بين المحافظات
- نقل مرضى بين المستشفيات
- نقل مرضى على تنفس صناعي
- تأمين طبي للحفلات والفعاليات
- إسعاف جوي
- هولتر منزلي
- تأجير أجهزة طبية

### المناطق (29 منطقة):
- **القاهرة** (16): مدينة نصر، مصر الجديدة، المعادي، التجمع الخامس، مدنتي، الرحاب، الشروق، العبور، الزمالك، وسط البلد، جاردن سيتي، شبرا، 15 مايو، حلمية الزيتون، المرج، مدينة السلام
- **الجيزة** (13): الشيخ زايد، 6 أكتوبر، المهندسين، الدقي، الهرم، فيصل، العجوزة، إمبابة، ميدان الجيزة، حدائق الأهرام، شبرامنت، مدينة بدر، القاهرة الجديدة

### تحسينات السرعة:
- كل الصور WebP مضغوطة (3 أحجام: sm/md/lg)
- `srcSet` + `sizes` للـ responsive loading
- `loading="lazy"` للصور تحت الـ fold
- `decoding="async"` لتحسين الأداء
- DOM load: ~217ms
- كل صورة بتحمّل في 9-200ms

### SEO:
- Schema.org JSON-LD (MedicalBusiness, FAQ, Breadcrumb, AggregateRating)
- Meta tags كاملة (Open Graph, Twitter Cards, keywords, canonical)
- sitemap.xml أوتوماتيكي (53 URL)
- robots.txt
- HTML semantic مع ARIA labels
- صفحة 404 ترجع HTTP 404 الصحيح

### الـ Popup:
- يظهر تلقائياً عند كل تحميل صفحة (بدون localStorage/cookies)
- صورة إسعاف ليلي (28KB)
- زر اتصال + زر واتساب
- يغلق بـ: زر X، ESC، الضغط خارج النافذة، زر "تصفح الموقع"
- يمنع scroll الصفحة أثناء ظهوره
- Border Radius 30px + Shadow كبيرة
- Framer Motion animation (Fade In + Scale 0.9→1, 400ms)

### التقييمات:
- 10 تقييمات بأسماء وأحياء مصرية
- كروت جنب بعضها أفقياً
- تمرير يدوي (أزرار تنقل + سحب)
- snap-mandatory للـ snapping الاحترافي
- تدرّج على الجوانب

## 📞 معلومات الاتصال

- **التليفون:** 01039400547
- **الواتساب:** 201039400547
- **البريد:** help@curego.eg
- **العنوان:** كورنيش النيل، الجزيرة، القاهرة
- **ساعات العمل:** 24 ساعة · 7 أيام في الأسبوع

## 🔧 تعديل البيانات

كل بيانات الموقع موجودة في ملف واحد:
```
src/lib/site-data.ts
```
عدّل فيه:
- رقم التليفون والواتساب (متغير `SITE`)
- معلومات الشركة
- الخدمات (متغير `SERVICES`)
- المناطق (متغير `CITIES`)
- التقييمات (متغير `TESTIMONIALS`)
- الأسعار (ملحوظة عن الأسعار)

## 🖼️ تعديل الصور

- صور الخدمات: `public/services/{slug}-{sm,md,lg}.webp`
- صورة الـ Popup: `public/services/popup-{sm,md,lg}.webp`
- لتغيير صورة: استخدم سكريبت `scripts/compress-images.ts` (يستخدم sharp)

## 🎯 نصائح قبل النشر

1. **غيّر الدومين** في:
   - `src/app/layout.tsx` (metadataBase + canonical + JSON-LD)
   - `src/app/sitemap.ts` (baseUrl)
   - `src/app/robots.ts` (sitemap URL)

2. **غيّر معلومات الاتصال** في `src/lib/site-data.ts`

3. **اعمل build** للتأكد إن كل حاجة سليمة:
   ```bash
   bun run build
   ```

4. **اختبر محلياً** قبل النشر:
   ```bash
   bun run dev
   ```

## 📝 الترخيص

© CureGo — جميع الحقوق محفوظة.
