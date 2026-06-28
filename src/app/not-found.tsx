'use client'

import { NotFoundPage } from '@/components/site/pages/not-found-page'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Popup } from '@/components/site/popup'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Popup />
      <SiteHeader />
      <main className="flex-1">
        <NotFoundPage />
      </main>
      <SiteFooter />
    </div>
  )
}
