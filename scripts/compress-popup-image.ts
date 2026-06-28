// ضغط صورة الـ Popup الجديدة (إسعاف ليلي) بحجم مناسب للـ popup
import sharp from 'sharp'
import path from 'path'

const SRC = '/home/z/my-project/upload/1000401492.jpg'

async function main() {
  // Popup image — حاجة معتدلة الحجم (العرض الكامل للـ popup ~ 512px)
  // بنستخدم 600px width عشان نضمن جودة عالية على الـ retina displays
  const sizes = [
    { width: 400, suffix: 'sm', quality: 70 },   // للموبايل
    { width: 600, suffix: 'md', quality: 72 },   // للديسكتوب
    { width: 900, suffix: 'lg', quality: 75 },   // للـ retina
  ]

  for (const size of sizes) {
    const outPath = path.join('/home/z/my-project/public/services', `popup-${size.suffix}.webp`)
    await sharp(SRC)
      .resize({ width: size.width, withoutEnlargement: true })
      // crop من فوق شوية عشان نركز على الإسعاف (الصورة الأصلية فيها سما كتير)
      .webp({ quality: size.quality, effort: 4 })
      .toFile(outPath)
    console.log(`✓ popup-${size.suffix}.webp (${size.width}px)`)
  }

  console.log('\n✅ تم ضغط صورة الـ Popup بنجاح')
}

main().catch(console.error)
