'use client'

import { ChevronLeft, FileText, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/site-data'
import { useHashRoute, buildHref } from '@/hooks/use-hash-route'

export function TermsPage() {
  const { navigate } = useHashRoute()

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <>
      <section className="bg-grid-pattern py-12 lg:py-16">
        <div className="container-curego">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5" aria-label="مسار التنقل">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-primary">الرئيسية</a>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-bold">الشروط والخصوصية</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              الشروط والأحكام
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-3">
              الشروط وسياسة الخصوصية
            </h1>
            <p className="text-muted-foreground text-sm">
              آخر تحديث: يناير {new Date().getFullYear()} · بنحدّث الصفحة دي كل ما فيه تغيير في خدماتنا أو سياساتنا.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-curego">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* TOC */}
            <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6">
              <h2 className="font-extrabold text-lg mb-4">المحتويات</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="#terms" className="text-primary hover:underline">1. الشروط والأحكام العامة</a></li>
                <li><a href="#privacy" className="text-primary hover:underline">2. سياسة الخصوصية</a></li>
                <li><a href="#data" className="text-primary hover:underline">3. البيانات اللي بنجمعها</a></li>
                <li><a href="#cookies" className="text-primary hover:underline">4. ملفات تعريف الارتباط (Cookies)</a></li>
                <li><a href="#rights" className="text-primary hover:underline">5. حقوقك كعميل</a></li>
                <li><a href="#contact" className="text-primary hover:underline">6. التواصل بخصوص الخصوصية</a></li>
              </ul>
            </div>

            {/* Terms */}
            <article id="terms" className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-emergency text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold">1. الشروط والأحكام العامة</h2>
              </div>

              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>
                  باستخدامك لخدمات CureGo أو موقعنا الإلكتروني، أنت بتوافق على الشروط دي. لو مش موافق، من فضلك ما تستخدمش خدماتنا. CureGo هي علامة تجارية مسجلة باسم شركة "كيور جو للخدمات الطبية" المرخصة من نقابة المهن الصحية المصرية برقم 4781.
                </p>

                <h3 className="text-xl font-extrabold pt-3">1.1 نطاق الخدمات</h3>
                <p>
                  CureGo بتوفر خدمات طبية منزلية وإسعاف خاص في القاهرة الكبرى والجيزة. كل خدماتنا بيتقدمها فريق طبي مرخص من نقابة المهن الصحية المصرية. بنحاول نضمن جودة الخدمة، لكن مفيش ضمان على نتائج العلاج لأن ده بيعتمد على حالة المريض والاستجابة للعلاج.
                </p>

                <h3 className="text-xl font-extrabold pt-3">1.2 الحجوزات والمواعيد</h3>
                <p>
                  لما تحجز خدمة، فريقنا بيتواصل معاك في خلال 15 دقيقة لتأكيد الموعد. زمن الاستجابة المعلن عنه ({SITE.responseTime}) للإسعاف بي apply فقط داخل القاهرة الكبرى وفي الظروف العادية. بنحاول نحترم المواعيد، لكن في حالات الطوارئ ممكن نتأخر شوية. لو تأخرنا أكتر من 30 دقيقة عن الموعد بدون سبب، بنقدم خصم 10% على الخدمة.
                </p>

                <h3 className="text-xl font-extrabold pt-3">1.3 الأسعار والدفع</h3>
                <p>
                  كل الأسعار المعلنة على الموقع بداية، والسعر النهائي بيتحدد بعد التواصل مع فريقنا. الأسعار تشمل ضريبة القيمة المضافة (14%). بنقبل الدفع كاش، فيزا، ماستركارد، أو محافظ إلكترونية (فودافون كاش، إتصالات كاش). لو في خطأ في الفاتورة، اتصل بنا في خلال 48 ساعة.
                </p>

                <h3 className="text-xl font-extrabold pt-3">1.4 الإلغاء والاسترجاع</h3>
                <p>
                  تقدر تلغي الحجز مجاناً قبل الموعد بـ ساعتين على الأقل. لو ألغيت في خلال الساعتين، بنحاسبك 50% من القيمة. لو الفريق وصل ومفيش حد في البيت، بنحاسبك كامل القيمة. لو ألغينا نحن الخدمة بدون سبب من جانبك، بنرجّعلك 100% من المبلغ.
                </p>

                <h3 className="text-xl font-extrabold pt-3">1.5 المسؤولية القانونية</h3>
                <p>
                  CureGo مش مسؤولة عن أي ضرر ناتج عن عدم اتباع تعليمات الفريق الطبي، أو عن حالات الخطر اللي بتتم بعد مغادرة الفريق. كل خدماتنا بيتقدمها مهنيون مرخصون، وبتخضع لقانون المهن الصحية الموحد رقم 2 لسنة 2018.
                </p>
              </div>
            </article>

            {/* Privacy */}
            <article id="privacy" className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-emergency text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold">2. سياسة الخصوصية</h2>
              </div>

              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>
                  خصوصيتك مهمة لنا. السياسة دي بتوضّح إيه البيانات اللي بنجمعها، ليه بنجمعها، وإزاي بنحميها. CureGo بتلتزم بقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.
                </p>

                <h3 className="text-xl font-extrabold pt-3">2.1 التزامنا</h3>
                <p>
                  بنالتزم بأن: نحافظ على سرية بياناتك الطبية، ما نبعتش بياناتك لأي طرف ثالث بدون إذنك، نستخدم بياناتك فقط لتقديم خدماتنا وتحسينها، ونوفر لك حق الوصول لبياناتك وتعديلها في أي وقت. كل بياناتك الطبية بتتخزن في سيرفرات داخل مصر، مش برّه.
                </p>
              </div>
            </article>

            {/* Data collected */}
            <article id="data" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-extrabold">3. البيانات اللي بنجمعها</h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>بنجمع منك البيانات اللي لازمة لتقديم خدمة طبية محترمة:</p>
                <ul className="space-y-3 pl-4">
                  <li><strong>البيانات الشخصية:</strong> الاسم، رقم الموبايل، العنوان، تاريخ الميلاد.</li>
                  <li><strong>البيانات الطبية:</strong> التاريخ المرضي، الأدوية الحالية، الحساسية، نتائج الفحوصات.</li>
                  <li><strong>بيانات الدفع:</strong> طريقة الدفع، آخر 4 أرقام من البطاقة (لو اتعاملت ببطاقة).</li>
                  <li><strong>بيانات الاستخدام:</strong> زياراتك للموقع، الصفحات اللي شفتها، IP address.</li>
                </ul>
                <p>
                  البيانات الطبية بنتسجل في ملف طبي إلكتروني محمي، ومحدش يقدر يوصله غير الفريق المعالج. بنخزّن البيانات دي لمدة 10 سنوات طبقاً لقانون السجلات الطبية المصري.
                </p>
              </div>
            </article>

            {/* Cookies */}
            <article id="cookies" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-extrabold">4. ملفات تعريف الارتباط (Cookies)</h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>
                  موقعنا بيستخدم cookies لتحسين تجربتك. Cookies هي ملفات صغيرة بتتخزن على جهازك عشان نفتكرك لما ترجع تاني. بنستخدم:
                </p>
                <ul className="space-y-3 pl-4">
                  <li><strong>Cookies ضرورية:</strong> عشان الموقع يشتغل صح (زي تذكر اللغة العربية).</li>
                  <li><strong>Cookies تحليلية:</strong> عشان نفهم إزاي الناس بتستخدم الموقع ونحسّنه.</li>
                  <li><strong>Cookies تسويقية:</strong> عشان نعرضلك إعلانات عن خدمات ممكن تهمك.</li>
                </ul>
                <p>
                  تقدر تتحكم في cookies من إعدادات المتصفح بتاعك. لو قفلتها كلها، الموقع لسه هيشتغل بس ممكن بعض المميزات ما تشتغلش صح.
                </p>
              </div>
            </article>

            {/* Rights */}
            <article id="rights" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-extrabold">5. حقوقك كعميل</h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>لك الحق في:</p>
                <ul className="space-y-3 pl-4">
                  <li>طلب نسخة من بياناتك الشخصية اللي عندنا.</li>
                  <li>تصحيح أي بيانات غلط أو قديمة.</li>
                  <li>طلب حذف بياناتك (مع مراعاة القانون اللي بيلزمنا نحتفظ بالسجلات الطبية 10 سنوات).</li>
                  <li>الاعتراض على استخدام بياناتك لأغراض التسويق.</li>
                  <li>تقديم شكوى لمسؤول حماية البيانات لو حسيت بانتهاك.</li>
                </ul>
                <p>
                  عشان تطلب أي حاجة من ده، كلمنا على {SITE.phone} أو ابعتلنا على {SITE.email}. هنرد عليك في خلال 30 يوم.
                </p>
              </div>
            </article>

            {/* Contact */}
            <article id="contact" className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-extrabold">6. التواصل بخصوص الخصوصية</h2>
              <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
                <p>
                  لو عندك أي سؤال عن الشروط دي أو عن بياناتك، تواصل معانا:
                </p>
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="space-y-2 text-sm">
                    <div><strong>الشركة:</strong> كيور جو للخدمات الطبية - {SITE.name}</div>
                    <div><strong>العنوان:</strong> {SITE.address}</div>
                    <div><strong>التليفون:</strong> <span dir="ltr">{SITE.phone}</span></div>
                    <div><strong>البريد الإلكتروني:</strong> <span dir="ltr">{SITE.email}</span></div>
                    <div><strong>مسؤول حماية البيانات:</strong> د. خالد السيد</div>
                    <div><strong>رقم الترخيص:</strong> 4781 نقابة المهن الصحية المصرية</div>
                  </div>
                </div>
                <p>
                  بتغيّر CureGo الشروط دي من وقت للتاني. بننشر التحديثات في الصفحة دي، ولو في تغيير كبير هنبلّغك بالإيميل أو واتساب. استمرارك في استخدام خدماتنا بعد التحديث معناه موافقتك على الشروط الجديدة.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
