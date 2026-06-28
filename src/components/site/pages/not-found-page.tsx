'use client'

import { Home, Phone, ArrowLeft, MapPin } from 'lucide-react'
import { SITE, SERVICES, CITIES } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function NotFoundPage() {
  const { navigate } = useHashRoute()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <section className="min-h-[70vh] flex items-center bg-grid-pattern py-12">
      <div className="container-curego">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 visual */}
          <div className="relative inline-block mb-8">
            <div className="text-[120px] lg:text-[180px] font-extrabold leading-none gradient-emergency bg-clip-text text-transparent">
              404
            </div>
            <span className="absolute -top-4 -right-4 lg:right-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-card-hover rotate-12">
              <MapPin className="h-7 w-7 text-primary" />
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            صفحة مش موجودة
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
            أووبس! الصفحة دي مش موجودة
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            يمكن الصفحة اتلغت أو اتغير عنوانها، أو الرابط غلط. مش مشكلة! تقدر ترجع الرئيسية، أو تتصفح خدماتنا ومناطقنا من القائمة الجاية.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-emergency text-white font-bold shadow-emergency hover:opacity-95 transition-opacity"
            >
              <Home className="h-5 w-5" />
              الرجوع للرئيسية
            </a>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
              dir="ltr"
            >
              <Phone className="h-5 w-5" />
              {SITE.phone}
            </a>
          </div>

          {/* Helpful links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-right">
            {/* Services */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50">
              <h2 className="font-extrabold mb-3 flex items-center gap-2">
                <span className="text-primary">+</span> خدماتنا
              </h2>
              <ul className="space-y-1.5 text-sm">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.slug}>
                    <a
                      href={buildHref(`/services/${s.slug}`)}
                      onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={buildHref('/services')}
                    onClick={(e) => handleNav(e, '/services')}
                    className="text-primary font-bold hover:underline"
                  >
                    كل الخدمات ←
                  </a>
                </li>
              </ul>
            </div>

            {/* Areas */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50">
              <h2 className="font-extrabold mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                المناطق
              </h2>
              <ul className="space-y-1.5 text-sm">
                {CITIES.map(c => (
                  <li key={c.slug}>
                    <a
                      href={buildHref(`/areas/${c.slug}`)}
                      onClick={(e) => handleNav(e, `/areas/${c.slug}`)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={buildHref('/areas')}
                    onClick={(e) => handleNav(e, '/areas')}
                    className="text-primary font-bold hover:underline"
                  >
                    كل المناطق ←
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful links */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50">
              <h2 className="font-extrabold mb-3 flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-primary" />
                روابط مفيدة
              </h2>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href={buildHref('/about')} onClick={(e) => handleNav(e, '/about')}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href={buildHref('/prices')} onClick={(e) => handleNav(e, '/prices')}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    الأسعار
                  </a>
                </li>
                <li>
                  <a href={buildHref('/booking')} onClick={(e) => handleNav(e, '/booking')}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    حجز خدمة
                  </a>
                </li>
                <li>
                  <a href={buildHref('/contact')} onClick={(e) => handleNav(e, '/contact')}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    تواصل معنا
                  </a>
                </li>
                <li>
                  <a href={buildHref('/sitemap')} onClick={(e) => handleNav(e, '/sitemap')}
                    className="text-primary font-bold hover:underline">
                    خريطة الموقع ←
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
