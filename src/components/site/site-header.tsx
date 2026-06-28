'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'
import { SITE, NAV_LINKS } from '@/lib/site-data'

export function SiteHeader() {
  const { route, navigate } = useHashRoute()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    const target = href.replace(/^\/?#\/?/, '/') || '/'
    const current = route === '/' ? '/' : route
    if (target === '/') return current === '/'
    return current.startsWith(target)
  }

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
    setOpen(false)
  }

  return (
    <>
      {/* Top urgency strip */}
      <div className="gradient-emergency text-white text-xs sm:text-sm">
        <div className="container-curego">
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="hidden md:flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/90 animate-pulse" />
                نوصلك خلال {SITE.responseTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> طاقم طبي 24/7
              </span>
              <span className="hidden lg:flex items-center gap-1.5">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20">+</span>
                عناية مركزة متنقلة
              </span>
            </div>
            {/* Marquee for mobile */}
            <div className="md:hidden flex-1 overflow-hidden">
              <div className="marquee-rtl whitespace-nowrap flex gap-8">
                <span>نوصلك خلال {SITE.responseTime}</span>
                <span>إسعاف عناية مركزة</span>
                <span>دكتور منزلي</span>
                <span>نوصلك خلال {SITE.responseTime}</span>
                <span>إسعاف عناية مركزة</span>
                <span>دكتور منزلي</span>
              </div>
            </div>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="flex items-center gap-1.5 font-bold hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b transition-all ${
          scrolled ? 'border-border shadow-sm' : 'border-transparent'
        }`}
      >
        <div className="container-curego">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="flex items-center gap-3 group shrink-0"
              aria-label={`${SITE.name} — الرئيسية`}
            >
              <span className="relative inline-flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl gradient-emergency text-white shadow-emergency group-hover:scale-105 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="10" y="3" width="4" height="18" rx="0.5" />
                  <rect x="3" y="10" width="18" height="4" rx="0.5" />
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xl lg:text-2xl font-extrabold tracking-tight">
                  Cure<span className="text-primary">Go</span>
                </span>
                <span className="text-[10px] lg:text-xs text-muted-foreground font-medium">
                  {SITE.tagline}
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={buildHref(link.href)}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors"
                dir="ltr"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] text-muted-foreground">خط الطوارئ</span>
                  <span className="text-sm font-extrabold text-foreground" dir="ltr">{SITE.phone}</span>
                </span>
              </a>
              <Button
                asChild
                size="lg"
                className="gradient-emergency text-white shadow-emergency hover:opacity-95 font-bold"
              >
                <a href={buildHref('/booking')} onClick={(e) => handleNav(e, '/booking')}>
                  <CalendarPlus className="h-4 w-4 ml-1" />
                  حجز خدمة
                </a>
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="فتح القائمة">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                  <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-emergency text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="10" y="3" width="4" height="18" rx="0.5" />
                          <rect x="3" y="10" width="18" height="4" rx="0.5" />
                        </svg>
                      </span>
                      <span className="text-lg font-extrabold">Cure<span className="text-primary">Go</span></span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" aria-label="إغلاق">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col p-2 gap-1">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={buildHref(link.href)}
                        onClick={(e) => handleNav(e, link.href)}
                        className={`px-4 py-3 rounded-lg font-bold transition-colors ${
                          isActive(link.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  <div className="p-4 mt-2 border-t space-y-2">
                    <a
                      href={`tel:${SITE.phoneIntl}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-primary text-primary font-bold"
                      dir="ltr"
                    >
                      <Phone className="h-4 w-4" />
                      {SITE.phone}
                    </a>
                    <Button
                      asChild
                      className="w-full gradient-emergency text-white font-bold shadow-emergency"
                      size="lg"
                    >
                      <a href={buildHref('/booking')} onClick={(e) => handleNav(e, '/booking')}>
                        <CalendarPlus className="h-4 w-4 ml-1" />
                        احجز خدمة الآن
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
