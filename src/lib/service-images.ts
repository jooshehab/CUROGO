// Real medical images for each service — user-provided real photos
// All images are local WebP files (compressed for fast loading)
// Three sizes per image: sm (400px), md (800px), lg (1200px) for responsive loading

type ServiceImageSet = {
  sm: string  // للموبايل
  md: string  // للديسكتوب
  lg: string  // للـ hero/large displays
}

const makeSet = (slug: string): ServiceImageSet => ({
  sm: `/services/${slug}-sm.webp`,
  md: `/services/${slug}-md.webp`,
  lg: `/services/${slug}-lg.webp`,
})

// الصور الحقيقية المرفوعة من المستخدم (10 صور)
export const SERVICE_IMAGES: Record<string, ServiceImageSet> = {
  ambulance: makeSet('ambulance'),                    // سيارة إسعاف مجهزة
  'doctor-visit': makeSet('doctor-visit'),            // دكتور بكشف منزلي
  nursing: makeSet('nursing'),                        // تمريض وعلاج جروح
  'elderly-care': makeSet('elderly-care'),            // رعاية كبار السن
  transport: makeSet('transport'),                    // نقل بين المحافظات
  'hospital-transfer': makeSet('hospital-transfer'),  // نقل بين المستشفيات
  'ventilator-transport': makeSet('ventilator-transport'), // نقل على تنفس صناعي
  'event-medical': makeSet('event-medical'),          // تأمين طبي للفعاليات
  holter: makeSet('holter'),                          // هولتر منزلي
}

// خدمات مش معاها صور حقيقية، بنستخدم صور احترافية من web image search
const FALLBACK_IMAGES: Record<string, ServiceImageSet> = {
  radiology: {
    sm: 'https://sfile.chatglm.cn/images-ppt/4a21e2531661.png',
    md: 'https://sfile.chatglm.cn/images-ppt/4a21e2531661.png',
    lg: 'https://sfile.chatglm.cn/images-ppt/4a21e2531661.png',
  },
  'lab-tests': {
    sm: 'https://sfile.chatglm.cn/images-ppt/c365f0b1e765.png',
    md: 'https://sfile.chatglm.cn/images-ppt/c365f0b1e765.png',
    lg: 'https://sfile.chatglm.cn/images-ppt/c365f0b1e765.png',
  },
  'air-ambulance': {
    sm: 'https://sfile.chatglm.cn/images-ppt/4a2fb64bab6e.jpg',
    md: 'https://sfile.chatglm.cn/images-ppt/4a2fb64bab6e.jpg',
    lg: 'https://sfile.chatglm.cn/images-ppt/4a2fb64bab6e.jpg',
  },
  'equipment-rental': {
    sm: 'https://sfile.chatglm.cn/images-ppt/9dda75d9928c.jpeg',
    md: 'https://sfile.chatglm.cn/images-ppt/9dda75d9928c.jpeg',
    lg: 'https://sfile.chatglm.cn/images-ppt/9dda75d9928c.jpeg',
  },
}

// دالة مساعدة لجلب صورة خدمة معينة (ترجع الحجم المناسب حسب السياق)
export function getServiceImage(slug: string, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const userImg = SERVICE_IMAGES[slug]
  if (userImg) return userImg[size]
  const fallback = FALLBACK_IMAGES[slug]
  if (fallback) return fallback[size]
  // fallback افتراضي
  return SERVICE_IMAGES.ambulance[size]
}

// Hero image — بنستخدم صورة الإسعاف الكبيرة
export const HERO_IMAGE = '/services/ambulance-lg.webp'

// Fallback image
export const FALLBACK_IMAGE = '/services/ambulance-md.webp'

// للتوافق مع الكود القديم (اللي بيتوقع string مش ServiceImageSet)
// نرجّع الحجم md افتراضياً
export function getServiceImageUrl(slug: string): string {
  return getServiceImage(slug, 'md')
}
