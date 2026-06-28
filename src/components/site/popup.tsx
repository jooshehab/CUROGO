'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, MessageCircle, ArrowRight } from 'lucide-react'

/**
 * Popup — نافذة منبثقة احترافية تظهر تلقائياً عند تحميل الصفحة
 *
 * المتطلبات المنفذة:
 * - تظهر في منتصف الشاشة مع خلفية سوداء شفافة (backdrop blur)
 * - تصميم Premium حديث
 * - Border Radius = 30px
 * - Shadow كبيرة وناعمة
 * - Animation: Fade In + Scale (0.9 → 1), 400ms
 * - زر X دائري أعلى اليسار
 * - Responsive
 * - لا يظهر Scroll داخل الـ Popup
 * - يغلق عند: الضغط خارج النافذة، ESC، زر X
 * - يمنع تحريك الصفحة أثناء ظهوره، ويعيد الـ scroll بعد الإغلاق
 * - يظهر في كل مرة يعمل المستخدم Refresh (بدون localStorage/sessionStorage/cookies)
 */

const PHONE = '01039400547'
const PHONE_INTL = '+201039400547'
const WHATSAPP_URL = 'https://wa.me/201039400547'
// صورة إسعاف ليلي بأضواء — أضغطت لـ WebP بحجم صغير (28KB)
const POPUP_IMG_SM = '/services/popup-sm.webp'
const POPUP_IMG_MD = '/services/popup-md.webp'
const POPUP_IMG_LG = '/services/popup-lg.webp'

export function Popup() {
  const [isOpen, setIsOpen] = useState(false)

  // إظهار الـ Popup تلقائياً عند تحميل الصفحة
  useEffect(() => {
    // إظهار بعد تأخير بسيط عشان نسمح للصفحة تتحمل الأول
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  // منع تحريك الصفحة أثناء ظهور الـ Popup
  useEffect(() => {
    if (isOpen) {
      // حفظ الحالة الحالية لـ overflow
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      // حساب عرض الـ scrollbar لتجنب الـ layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [isOpen])

  // إغلاق عند الضغط على ESC
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // إغلاق فقط عند الضغط على الـ backdrop نفسه (مش الأطفال)
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          aria-describedby="popup-desc"
        >
          <motion.div
            key="popup-content"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm sm:max-w-md overflow-hidden bg-white"
            style={{
              borderRadius: '30px',
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 80px rgba(59, 130, 246, 0.15)',
            }}
          >
            {/* زر الإغلاق X — دائري أعلى اليسار */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="إغلاق النافذة"
              className="absolute top-4 left-4 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-md text-gray-700 shadow-lg ring-1 ring-black/5 transition-all duration-200 hover:bg-white hover:scale-110 hover:rotate-90 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              }}
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {/* لا يوجد scroll داخل الـ Popup — كل المحتوى مرئي */}
            <div className="flex flex-col">
              {/* الصورة العلوية — إسعاف ليلي بأضواء، بحجم أصغر */}
              <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gray-900">
                <img
                  src={POPUP_IMG_MD}
                  srcSet={`${POPUP_IMG_SM} 400w, ${POPUP_IMG_MD} 600w, ${POPUP_IMG_LG} 900w`}
                  sizes="(max-width: 640px) 400px, 600px"
                  alt="إسعاف خاص مجهز من CureGo"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* تدرّج بسيط لتحسين ظهور الـ Badge */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

                {/* Badge أعلى يمين الصورة */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-black/5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-bold text-gray-900 whitespace-nowrap">
                    متاح الآن 24/7
                  </span>
                </div>
              </div>

              {/* المحتوى النصي + الأزرار */}
              <div className="px-5 sm:px-7 pt-4 sm:pt-5 pb-5 sm:pb-6 text-center">
                {/* العنوان */}
                <h2
                  id="popup-title"
                  className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 mb-2 leading-tight"
                >
                  اسعاف خاص مجهز
                  <br />
                  يصل خلال{' '}
                  <span className="text-blue-600">10 دقائق</span>
                </h2>

                {/* الوصف */}
                <p
                  id="popup-desc"
                  className="text-xs sm:text-sm leading-relaxed text-gray-600 mb-5 max-w-md mx-auto"
                >
                  رعاية مركزة متنقلة، تنفس صناعي، حضانات، نقل مرضى، طاقم طبي متكامل،
                  وخدمة 24 ساعة داخل القاهرة والجيزة.
                </p>

                {/* الأزرار */}
                <div className="space-y-2.5">
                  {/* الزر الأول — اتصال (أزرق) */}
                  <a
                    href={`tel:${PHONE_INTL}`}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0"
                    dir="ltr"
                  >
                    <Phone className="h-4 w-4 transition-transform duration-200 group-hover:animate-pulse" />
                    <span>{PHONE}</span>
                  </a>

                  {/* الزر الثاني — واتساب (أخضر) */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:translate-y-0"
                  >
                    <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>تواصل عبر واتساب</span>
                  </a>
                </div>

                {/* رابط تصفح الموقع */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  تصفح الموقع
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Popup
