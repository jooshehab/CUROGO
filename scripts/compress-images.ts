// ضغط الصور الأصلية وتحويلها لـ WebP بأحجام متعددة (responsive)
// عشان الموقع يبقى سريع جداً
import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = '/home/z/my-project/upload'
const OUTPUT_DIR = '/home/z/my-project/public/services'

// ترتيب الصور حسب تحليل VLM
const IMAGE_MAP: { src: string; slug: string }[] = [
  { src: '1000401475.jpg', slug: 'ambulance' },           // ambulance with equipment
  { src: '1000401481.jpg', slug: 'doctor-visit' },         // doctor stethoscope
  { src: '1000401483.jpg', slug: 'nursing' },              // wound care
  { src: '1000401480.jpg', slug: 'elderly-care' },         // caregiver elderly
  { src: '1000401479.jpg', slug: 'transport' },            // ambulance on highway
  { src: '1000401482.jpg', slug: 'hospital-transfer' },    // mobile medical unit
  { src: '1000401476.jpg', slug: 'ventilator-transport' }, // ventilator monitor
  { src: '1000401478.jpg', slug: 'event-medical' },        // paramedics
  { src: '1000401477.jpg', slug: 'holter' },               // holter monitor
  { src: '1000401484.jpg', slug: 'elderly-care-2' },       // elderly foot care (backup)
]

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }

  for (const item of IMAGE_MAP) {
    const srcPath = path.join(UPLOAD_DIR, item.src)
    if (!existsSync(srcPath)) {
      console.log(`⚠️  ${item.src} غير موجود`)
      continue
    }

    // أحجام متعددة (responsive images)
    const sizes = [
      { width: 400, suffix: 'sm' },   // للموبايل
      { width: 800, suffix: 'md' },   // للديسكتوب
      { width: 1200, suffix: 'lg' },  // للـ hero
    ]

    for (const size of sizes) {
      const outPath = path.join(OUTPUT_DIR, `${item.slug}-${size.suffix}.webp`)
      await sharp(srcPath)
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })  // جودة عالية مع حجم صغير
        .toFile(outPath)
      console.log(`✓ ${item.slug}-${size.suffix}.webp (${size.width}px)`)
    }
  }

  console.log('\n✅ تم ضغط كل الصور بنجاح')
}

main().catch(console.error)
