'use client'

import { HomeHero } from '@/components/site/sections/home-hero'
import { ServicesGrid } from '@/components/site/sections/services-grid'
import { AreasGrid } from '@/components/site/sections/areas-grid'
import { WhyUs } from '@/components/site/sections/why-us'
import { HowItWorks } from '@/components/site/sections/how-it-works'
import { TestimonialsSection } from '@/components/site/sections/testimonials-section'
import { FAQSection } from '@/components/site/sections/faq-section'
import { CTABanner } from '@/components/site/sections/cta-banner'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesGrid limit={6} />
      <WhyUs />
      <HowItWorks />
      <AreasGrid />
      <TestimonialsSection />
      <FAQSection limit={6} />
      <CTABanner />
    </>
  )
}
