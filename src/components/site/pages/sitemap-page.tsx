'use client'

import { ChevronLeft, FileText, ArrowLeft } from 'lucide-react'
import { ALL_PAGES, SERVICES, CITIES, NAV_LINKS, SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

function LinkItem({ href, label, desc, onNavigate }: { href: string; label: string; desc?: string; onNavigate: (href: string) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(href)
  }
  return (
    <a
      href={buildHref(href)}
      onClick={handleClick}
      className="group block p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary shrink-0" />
        <span className="font-bold text-sm group-hover:text-primary transition-colors">{label}</span>
        <ArrowLeft className="h-3 w-3 text-muted-foreground mr-auto group-hover:text-primary transition-colors" />
      </div>
      {desc && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{desc}</p>}
    </a>
  )
}

export function SitemapPage() {
  const { navigate } = useHashRoute()

  const handleNav = (href: string) => {
    navigate(href)
  }

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">خريطة الموقع</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              Sitemap
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-5">
              خريطة موقع CureGo
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              كل صفحات موقعنا في مكان واحد. اختار الصفحة اللي محتاجها من القائمة الجاية.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-curego space-y-12">
          {/* Main pages */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emergency text-white text-sm">1</span>
              الصفحات الرئيسية
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NAV_LINKS.map(link => (
                <LinkItem key={link.href} href={link.href} label={link.label} onNavigate={handleNav} />
              ))}
              <LinkItem href="/booking" label="حجز خدمة" onNavigate={handleNav} />
              <LinkItem href="/prices" label="الأسعار" onNavigate={handleNav} />
              <LinkItem href="/sitemap" label="خريطة الموقع" onNavigate={handleNav} />
              <LinkItem href="/terms" label="الشروط وسياسة الخصوصية" onNavigate={handleNav} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emergency text-white text-sm">2</span>
              صفحات الخدمات ({SERVICES.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <LinkItem href="/services" label="كل الخدمات" desc="صفحة عامة لكل الخدمات" onNavigate={handleNav} />
              {SERVICES.map(s => (
                <LinkItem key={s.slug} href={`/services/${s.slug}`} label={s.name} desc={s.shortDesc} onNavigate={handleNav} />
              ))}
            </div>
          </div>

          {/* Areas */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emergency text-white text-sm">3</span>
              صفحات المناطق
            </h2>
            <div className="space-y-6">
              <LinkItem href="/areas" label="كل المناطق" desc="صفحة عامة لكل المناطق" onNavigate={handleNav} />
              {CITIES.map(city => (
                <div key={city.slug} className="pl-4 border-r-2 border-primary/20 pr-4">
                  <div className="mb-3">
                    <LinkItem href={`/areas/${city.slug}`} label={`منطقة ${city.name}`} desc={city.description[0]} onNavigate={handleNav} />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                    {city.districts.map(d => (
                      <LinkItem key={d.slug} href={`/areas/${city.slug}/${d.slug}`} label={`${d.name}، ${city.name}`} desc={d.shortDesc} onNavigate={handleNav} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All pages list */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emergency text-white text-sm">4</span>
              كل الروابط ({ALL_PAGES.length})
            </h2>
            <div className="bg-card rounded-2xl shadow-card border border-border/50 p-5">
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {ALL_PAGES.map((page, idx) => (
                  <li key={idx}>
                    <a
                      href={buildHref(page.path)}
                      onClick={(e) => handleNavClick(e, page.path)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors group"
                    >
                      <ArrowLeft className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-bold group-hover:text-primary transition-colors">{page.title}</span>
                      <code className="text-[10px] text-muted-foreground mr-auto" dir="ltr">{page.path}</code>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
