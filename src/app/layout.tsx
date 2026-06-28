import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site-data";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://curego.eg"),
  title: {
    default: "CureGo | إسعاف خاص ودكتور منزلي 24 ساعة في القاهرة والجيزة",
    template: "%s | CureGo",
  },
  description:
    "اطلب أسرع إسعاف خاص في القاهرة والجيزة. سيارات مجهزة عناية مركزة، دكتور منزلي كشف فوري، تمريض، أشعة، وتحاليل منزلية. نوصلك خلال 10 دقائق. اتصل 01039400547.",
  keywords: [
    "إسعاف خاص القاهرة",
    "إسعاف خاص الجيزة",
    "رقم إسعاف خاص",
    "دكتور منزلي",
    "كشف منزلي فوري",
    "تمريض منزلي",
    "أشعة منزلية",
    "تحاليل منزلية",
    "رعاية كبار السن",
    "إسعاف التجمع الخامس",
    "إسعاف مدينة نصر",
    "إسعاف الشيخ زايد",
    "حجز عناية مركزة",
    "نقل مرضى بين المحافظات",
    "CureGo",
    "Private Ambulance Cairo",
    "Home Visit Doctor Egypt",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://curego.eg/",
    languages: { "ar-EG": "https://curego.eg/" },
  },
  openGraph: {
    type: "website",
    url: "https://curego.eg/",
    title: "CureGo | إسعاف خاص ودكتور منزلي 24 ساعة في القاهرة والجيزة",
    description:
      "خدمات إسعاف خاص ودكاترة منزليين في القاهرة والجيزة 24 ساعة. سيارات مجهزة لنقل المرضى وكشف طبي في المنزل. اتصل 01039400547.",
    siteName: SITE.name,
    locale: "ar_EG",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "CureGo — خدمات طبية منزلية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureGo | إسعاف خاص ودكتور منزلي 24 ساعة",
    description:
      "خدمات إسعاف خاص ودكاترة منزليين في القاهرة والجيزة 24 ساعة. اتصل 01039400547.",
    images: ["/og-image.jpg"],
  },
  verification: { google: "curego-verification-token" },
  category: "Medical Services",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Schema.org JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://curego.eg/#organization",
        name: "CureGo | كيور جو — إسعاف خاص ودكتور منزلي",
        alternateName: "CureGo Emergency & Home Care",
        description:
          "أكبر شبكة إسعاف خاص وخدمات طبية منزلية في القاهرة والجيزة، متاحة 24 ساعة لخدمات الطوارئ والرعاية المنزلية.",
        url: "https://curego.eg/",
        telephone: "+201039400547",
        priceRange: "$$",
        image: "https://curego.eg/og-image.jpg",
        logo: "https://curego.eg/logo.png",
        medicalSpecialty: ["EmergencyMedicine", "NursingCare", "Geriatrics", "Radiology"],
        areaServed: [
          { "@type": "AdministrativeArea", name: "Cairo" },
          { "@type": "AdministrativeArea", name: "Giza" },
          { "@type": "AdministrativeArea", name: "Nasr City" },
          { "@type": "AdministrativeArea", name: "Tagamoa El Khamis" },
          { "@type": "AdministrativeArea", name: "Maadi" },
          { "@type": "AdministrativeArea", name: "Heliopolis" },
          { "@type": "AdministrativeArea", name: "Sheikh Zayed" },
          { "@type": "AdministrativeArea", name: "6th of October" },
          { "@type": "AdministrativeArea", name: "Madinaty" },
          { "@type": "AdministrativeArea", name: "Rehab City" },
          { "@type": "AdministrativeArea", name: "Shorouk City" },
          { "@type": "AdministrativeArea", name: "Obour City" },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "كورنيش النيل، الجزيرة",
          addressLocality: "Cairo",
          addressRegion: "Cairo/Giza",
          addressCountry: "EG",
        },
        geo: { "@type": "GeoCoordinates", latitude: 30.0444, longitude: 31.2357 },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+201039400547",
          contactType: "emergency service",
          availableLanguage: ["Arabic", "English"],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: SITE.rating,
          reviewCount: SITE.reviewsCount,
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://curego.eg/#website",
        url: "https://curego.eg/",
        name: SITE.name,
        publisher: { "@id": "https://curego.eg/#organization" },
        inLanguage: "ar-EG",
      },
      {
        "@type": "FAQPage",
        "@id": "https://curego.eg/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "كيف أطلب إسعاف خاص في القاهرة بسرعة؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "اتصل على 01039400547 وأعطينا العنوان بالتفصيل، وأقرب سيارة إسعاف ليك هتتحرك فوراً. متوسط الاستجابة في القاهرة الكبرى 10 دقائق.",
            },
          },
          {
            "@type": "Question",
            name: "هل سيارات الإسعاف مجهزة بأجهزة تنفس صناعي؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، أسطول CureGo يضم سيارات عناية مركزة متدفقة مجهزة بأجهزة تنفس صناعي، مونيتور للعلامات الحيوية، مانعل قلب، وأسطوانات أكسجين احتياطية.",
            },
          },
          {
            "@type": "Question",
            name: "كم تكلفة كشف الدكتور المنزلي؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "كشف دكتور باطنة منزلي بـ 250 ج.م، أخصائي 350 ج.م، استشاري 500 ج.م. الكشف الفوري بيكلّف 50 ج.م زيادة على السعر الأساسي.",
            },
          },
          {
            "@type": "Question",
            name: "هل بتقبلوا التأمين الصحي؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، بنشتغل مع شبكة كبيرة من شركات التأمين (مصر للتأمين، شلات، أليانز، بوبا). ولو التأمين بتاعك مش معانا بنديك فاتورة معتمدة.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} ${ibmPlexArabic.variable} font-arabic antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
