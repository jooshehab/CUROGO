'use client'

import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Send } from 'lucide-react'
import { SITE, SERVICES, CITIES, NAV_LINKS, ALL_PAGES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function SiteFooter() {
  const { navigate } = useHashRoute()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Top emergency CTA strip */}
      <div className="gradient-emergency text-white">
        <div className="container-curego py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 pulse-emergency">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs opacity-90">في طوارئ؟ اتصل دلوقتي</div>
                <div className="text-2xl font-extrabold" dir="ltr">{SITE.phone}</div>
              </div>
            </div>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-lg font-bold hover:bg-white/95 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              راسلنا على واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-curego py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" onClick={(e) => handleNav(e, '/')} className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-emergency text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="10" y="3" width="4" height="18" rx="0.5" />
                  <rect x="3" y="10" width="18" height="4" rx="0.5" />
                </svg>
              </span>
              <div>
                <div className="text-xl font-extrabold">
                  Cure<span className="text-primary">Go</span>
                </div>
                <div className="text-xs opacity-70">{SITE.tagline}</div>
              </div>
            </a>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              أكبر شبكة خدمات طبية منزلية في القاهرة والجيزة. بنوفر إسعاف خاص، دكتور منزلي، تمريض، أشعة، وتحاليل بنوصلوك في 10 دقائق. متاحين 24 ساعة طوال أيام الأسبوع.
            </p>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستجرام"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="بريد إلكتروني"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="خدماتنا">
            <h3 className="font-bold text-lg mb-4 text-white">خدماتنا</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={buildHref(`/services/${s.slug}`)}
                    onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary">+</span> {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-label="مناطق التغطية">
            <h3 className="font-bold text-lg mb-4 text-white">مناطق التغطية</h3>
            <ul className="space-y-2 text-sm">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <a
                    href={buildHref(`/areas/${city.slug}`)}
                    onClick={(e) => handleNav(e, `/areas/${city.slug}`)}
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {city.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={buildHref('/areas')}
                  onClick={(e) => handleNav(e, '/areas')}
                  className="opacity-80 hover:opacity-100 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-primary">←</span> كل المناطق
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href={`tel:${SITE.phoneIntl}`} className="opacity-80 hover:opacity-100" dir="ltr">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href={`mailto:${SITE.email}`} className="opacity-80 hover:opacity-100" dir="ltr">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="opacity-80">{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="opacity-80">{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={buildHref(link.href)}
                  onClick={(e) => handleNav(e, link.href)}
                  className="opacity-75 hover:opacity-100 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={buildHref('/sitemap')}
                onClick={(e) => handleNav(e, '/sitemap')}
                className="opacity-75 hover:opacity-100 hover:text-primary transition-colors"
              >
                خريطة الموقع
              </a>
            </li>
            <li>
              <a
                href={buildHref('/terms')}
                onClick={(e) => handleNav(e, '/terms')}
                className="opacity-75 hover:opacity-100 hover:text-primary transition-colors"
              >
                الشروط والخصوصية
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        <div className="container-curego">
          © {new Date().getFullYear()} {SITE.name} — جميع الحقوق محفوظة. تشغيل بموجب ترخيص نقابة المهن الصحية المصرية رقم 4781.
        </div>
      </div>
    </footer>
  )
}
