'use client'

import { useEffect } from 'react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { useHashRoute } from '@/hooks/use-hash-route'
import { HomePage } from '@/components/site/pages/home-page'
import { ServicesPage } from '@/components/site/pages/services-page'
import { ServiceDetailPage } from '@/components/site/pages/service-detail-page'
import { AreasPage } from '@/components/site/pages/areas-page'
import { CityPage } from '@/components/site/pages/city-page'
import { DistrictPage } from '@/components/site/pages/district-page'
import { AboutPage } from '@/components/site/pages/about-page'
import { BookingPage } from '@/components/site/pages/booking-page'
import { ContactPage } from '@/components/site/pages/contact-page'
import { PricesPage } from '@/components/site/pages/prices-page'
import { SitemapPage } from '@/components/site/pages/sitemap-page'
import { TermsPage } from '@/components/site/pages/terms-page'
import { NotFoundPage } from '@/components/site/pages/not-found-page'
import { Popup } from '@/components/site/popup'

export default function Home() {
  const { params, navigate } = useHashRoute()

  // Update document title based on route
  useEffect(() => {
    const titles: Record<string, string> = {
      'about': 'من نحن',
      'services': 'كل الخدمات الطبية',
      'areas': 'مناطق التغطية',
      'prices': 'الأسعار حسب المكان',
      'booking': 'حجز خدمة',
      'contact': 'تواصل معنا',
      'sitemap': 'خريطة الموقع',
      'terms': 'الشروط وسياسة الخصوصية',
    }

    let title = 'CureGo | إسعاف خاص ودكتور منزلي 24 ساعة في القاهرة والجيزة'

    if (params.length === 0) {
      title = 'CureGo | إسعاف خاص ودكتور منزلي 24 ساعة في القاهرة والجيزة'
    } else if (params[0] === 'services' && params.length === 1) {
      title = 'كل الخدمات الطبية | CureGo'
    } else if (params[0] === 'services' && params.length === 2) {
      // Find service name from data
      const slug = params[1]
      const serviceMap: Record<string, string> = {
        'ambulance': 'إسعاف خاص مجهز',
        'doctor-visit': 'دكتور منزلي كشف فوري',
        'nursing': 'تمريض منزلي 24 ساعة',
        'radiology': 'أشعة منزلية متنقلة',
        'lab-tests': 'تحاليل منزلية بنفس اليوم',
        'elderly-care': 'رعاية كبار السن المتكاملة',
        'transport': 'نقل مرضى بين المحافظات',
        'hospital-transfer': 'نقل مرضى بين المستشفيات',
        'ventilator-transport': 'نقل مرضى على تنفس صناعي',
        'event-medical': 'تأمين طبي للحفلات والفعاليات',
        'air-ambulance': 'إسعاف جوي',
        'holter': 'هولتر منزلي',
        'equipment-rental': 'تأجير أجهزة طبية',
      }
      title = `${serviceMap[slug] || titles['services']} | CureGo`
    } else if (params[0] === 'areas' && params.length === 1) {
      title = 'مناطق التغطية | CureGo'
    } else if (params[0] === 'areas' && params.length === 2) {
      const cityMap: Record<string, string> = { 'cairo': 'القاهرة', 'giza': 'الجيزة' }
      title = `خدماتنا في ${cityMap[params[1]] || params[1]} | CureGo`
    } else if (params[0] === 'areas' && params.length === 3) {
      title = `${params[2]} | CureGo`
    } else if (titles[params[0]]) {
      title = `${titles[params[0]]} | CureGo`
    }

    document.title = title
  }, [params])

  // Render the right page based on route params
  const renderPage = () => {
    // Home
    if (params.length === 0) return <HomePage />

    const [p1, p2, p3] = params

    // /services
    if (p1 === 'services') {
      if (!p2) return <ServicesPage />
      return <ServiceDetailPage slug={p2} />
    }

    // /areas
    if (p1 === 'areas') {
      if (!p2) return <AreasPage />
      if (!p3) return <CityPage slug={p2} />
      return <DistrictPage citySlug={p2} districtSlug={p3} />
    }

    // Single-segment routes
    if (p1 === 'about' && !p2) return <AboutPage />
    if (p1 === 'booking' && !p2) return <BookingPage />
    if (p1 === 'contact' && !p2) return <ContactPage />
    if (p1 === 'prices' && !p2) return <PricesPage />
    if (p1 === 'sitemap' && !p2) return <SitemapPage />
    if (p1 === 'terms' && !p2) return <TermsPage />

    // 404
    return <NotFoundPage />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Popup />
      <SiteHeader />
      <main className="flex-1">
        {renderPage()}
      </main>
      <SiteFooter />
    </div>
  )
}
