/* ------------------------------------------------------------- */
/* منطق التشغيل والتحكم الرئيسي | مولد بوستات الكاروسيل للأستاذ هيثم إبراهيم */
/* ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. تعريف العناصر والروابط البرمجية ---
    
    // عناصر الحساب والملف الشخصي
    const avatarUpload = document.getElementById('avatar-upload');
    const profileAvatarPreview = document.getElementById('profile-avatar-preview');
    const userAvatars = document.querySelectorAll('.user-avatar-img');
    const usernameInput = document.getElementById('username-input');
    const userDisplayNames = document.querySelectorAll('.user-display-name');
    const handleInput = document.getElementById('handle-input');
    const userHandleTexts = document.querySelectorAll('.user-handle-text');
    const verifiedToggle = document.getElementById('verified-toggle');
    const verifiedBadgeIcons = document.querySelectorAll('.verified-badge-icon');
    
    // عناصر الكروت الأربعة الفردية للمعاينة
    const cards = document.querySelectorAll('.carousel-card');
    
    // عناصر تحرير البوست 1 (الأداة)
    const p1Title = document.getElementById('p1-title');
    const p1Subtitle = document.getElementById('p1-subtitle');
    const p1Tag = document.getElementById('p1-tag');
    const p1Icon = document.getElementById('p1-icon');
    const card1Title = document.getElementById('card-1-title');
    const card1Desc = document.getElementById('card-1-desc');
    const card1Tag = document.getElementById('card-1-tag');
    const card1IconElement = document.getElementById('card-1-icon-element');
    
    // عناصر تحرير البوست 2 (الشرح)
    const p2Title = document.getElementById('p2-title');
    const p2Points = document.querySelectorAll('.p2-point');
    const card2Title = document.getElementById('card-2-title');
    const card2P1 = document.getElementById('card-2-p1');
    const card2P2 = document.getElementById('card-2-p2');
    const card2P3 = document.getElementById('card-2-p3');
    
    // عناصر تحرير البوست 3 (الطريقة)
    const p3Title = document.getElementById('p3-title');
    const p3Steps = document.querySelectorAll('.p3-step');
    const card3Title = document.getElementById('card-3-title');
    const card3S1 = document.getElementById('card-3-s1');
    const card3S2 = document.getElementById('card-3-s2');
    const card3S3 = document.getElementById('card-3-s3');
    
    // عناصر تحرير البوست 4 (الرابط)
    const p4Title = document.getElementById('p4-title');
    const p4Link = document.getElementById('p4-link');
    const p4Cta = document.getElementById('p4-cta');
    const p4Tag2 = document.getElementById('p4-tag2');
    const card4Title = document.getElementById('card-4-title');
    const card4LinkDisplay = document.getElementById('card-4-link-display');
    const card4CtaText = document.getElementById('card-4-cta-text');
    const card4Tag = document.getElementById('card-4-tag');
    
    // التبويبات الجانبية وأزرار الكاروسيل
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const btnPrevSlide = document.getElementById('btn-prev-slide');
    const btnNextSlide = document.getElementById('btn-next-slide');
    const carouselDots = document.querySelectorAll('.nav-dot');
    
    // عناصر التخصيص والسمات
    const themeBtns = document.querySelectorAll('.theme-btn');
    const cardShadowSlider = document.getElementById('card-shadow-slider');
    const cardRadiusSlider = document.getElementById('card-radius-slider');
    const cardSizeSelect = document.getElementById('card-size-select');
    
    // أزرار التحميل
    const btnExportSingle = document.getElementById('btn-export-single');
    const btnExportAll = document.getElementById('btn-export-all');
    
    let currentSlide = 1;

    // --- 2. منطق تبديل الكاروسيل وتحديث التبويبات الجانبية ---
    
    function showSlide(slideNum) {
        currentSlide = slideNum;
        
        // تحديث الكروت النشطة
        cards.forEach(card => {
            if (parseInt(card.dataset.slide) === slideNum) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });
        
        // تحديث النقاط الدائرية بالأسفل
        carouselDots.forEach(dot => {
            if (parseInt(dot.dataset.slide) === slideNum) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
        
        // جعل تبويب التعديل الجانبي يواكب السلايد المعروض حالياً لتجربة مستخدم مذهلة
        tabBtns.forEach(btn => {
            const targetTab = btn.dataset.tab;
            if (targetTab === `post-${slideNum}`) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        tabPanes.forEach(pane => {
            if (pane.id === `pane-post-${slideNum}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    // التنقل بالأزرار السفلى
    btnPrevSlide.addEventListener('click', () => {
        let newSlide = currentSlide - 1;
        if (newSlide < 1) newSlide = 4;
        showSlide(newSlide);
    });

    btnNextSlide.addEventListener('click', () => {
        let newSlide = currentSlide + 1;
        if (newSlide > 4) newSlide = 1;
        showSlide(newSlide);
    });

    // التنقل عبر النقاط
    carouselDots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.slide));
        });
    });

    // تبديل التبويبات الجانبية ومزامنتها مع الكارت
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            const slideNum = parseInt(target.split('-')[1]);
            showSlide(slideNum);
        });
    });

    // --- 3. مزامنة المدخلات الجانبية مع الكروت (بث مباشر Real-time) ---
    
    // الملف الشخصي
    usernameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim() || 'هيثم إبراهيم';
        userDisplayNames.forEach(el => el.textContent = val);
        // حفظ الاسم في localStorage لربطه بصفحة الشرح
        localStorage.setItem('haytham_name', val);
    });
    
    handleInput.addEventListener('input', (e) => {
        let val = e.target.value.trim() || 'haytham_ibrahim';
        if (!val.startsWith('@') && val !== '') {
            val = '@' + val;
        }
        userHandleTexts.forEach(el => el.textContent = val);
    });
    
    verifiedToggle.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        verifiedBadgeIcons.forEach(icon => {
            icon.style.display = isChecked ? 'inline-block' : 'none';
        });
        localStorage.setItem('haytham_verified', isChecked);
    });

    // البوست الأول (الأداة)
    p1Title.addEventListener('input', (e) => card1Title.textContent = e.target.value);
    p1Subtitle.addEventListener('input', (e) => card1Desc.textContent = e.target.value);
    p1Tag.addEventListener('input', (e) => card1Tag.textContent = e.target.value);
    p1Icon.addEventListener('change', (e) => {
        card1IconElement.className = e.target.value;
    });

    // البوست الثاني (الشرح)
    p2Title.addEventListener('input', (e) => card2Title.textContent = e.target.value);
    p2Points[0].addEventListener('input', (e) => card2P1.textContent = e.target.value);
    p2Points[1].addEventListener('input', (e) => card2P2.textContent = e.target.value);
    p2Points[2].addEventListener('input', (e) => card2P3.textContent = e.target.value);

    // البوست الثالث (الطريقة)
    p3Title.addEventListener('input', (e) => card3Title.textContent = e.target.value);
    p3Steps[0].addEventListener('input', (e) => card3S1.textContent = e.target.value);
    p3Steps[1].addEventListener('input', (e) => card3S2.textContent = e.target.value);
    p3Steps[2].addEventListener('input', (e) => card3S3.textContent = e.target.value);

    // البوست الرابع (الرابط)
    p4Title.addEventListener('input', (e) => card4Title.textContent = e.target.value);
    p4Link.addEventListener('input', (e) => card4LinkDisplay.textContent = e.target.value);
    p4Cta.addEventListener('input', (e) => card4CtaText.textContent = e.target.value);
    p4Tag2.addEventListener('input', (e) => card4Tag.textContent = e.target.value);

    // --- 4. معالج رفع الصورة الشخصية وتحديثها ---
    
    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                profileAvatarPreview.src = dataUrl;
                userAvatars.forEach(img => img.src = dataUrl);
                // حفظ الصورة في localStorage لمزامنتها مع صفحة الشرح
                localStorage.setItem('haytham_avatar_data', dataUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 5. خيارات التصميم ودرجات الأبيض الكريمي (Theme Settings) ---
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الكلاس الفعال من الأزرار وتفعيله للزر الحالي
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const bg = btn.dataset.bg;
            const text = btn.dataset.text;
            const accent = btn.dataset.accent;
            
            // تغيير الخواص في الـ CSS لكافة الكروت دفعة واحدة
            document.documentElement.style.setProperty('--card-bg', bg);
            document.documentElement.style.setProperty('--card-text-main', text);
            document.documentElement.style.setProperty('--card-accent', accent);
            
            // تخصيص لون النصوص الخافتة بناءً على اللون الرئيسي للوضوح
            const textMuted = bg === '#FFFFFF' ? '#555555' : '#625E5A';
            document.documentElement.style.setProperty('--card-text-muted', textMuted);
            
            // مزامنة الألوان مع localStorage لصفحة الشرح
            localStorage.setItem('haytham_theme_bg', bg);
            localStorage.setItem('haytham_theme_text', text);
            localStorage.setItem('haytham_theme_accent', accent);
        });
    });

    // التحكم بالظلال
    cardShadowSlider.addEventListener('input', (e) => {
        const level = parseInt(e.target.value);
        let shadowValue = 'none';
        
        switch(level) {
            case 1:
                shadowValue = '0 10px 25px rgba(34, 30, 26, 0.06), 0 3px 10px rgba(34, 30, 26, 0.03)';
                break;
            case 2:
                shadowValue = '0 20px 40px rgba(34, 30, 26, 0.12), 0 5px 15px rgba(34, 30, 26, 0.06)';
                break;
            case 3:
                shadowValue = '0 30px 60px rgba(34, 30, 26, 0.18), 0 10px 25px rgba(34, 30, 26, 0.09)';
                break;
        }
        
        document.documentElement.style.setProperty('--card-shadow', shadowValue);
    });

    // التحكم بالاستدارة
    cardRadiusSlider.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--card-border-radius', e.target.value + 'px');
    });

    // التحكم بأبعاد ومقاس الكروت لشبكات التواصل الاجتماعي
    // تهيئة المقاس المربع الافتراضي لكافة الكروت
    cards.forEach(card => card.classList.add('ratio-1-1'));
    
    cardSizeSelect.addEventListener('change', (e) => {
        const selectedRatio = e.target.value;
        cards.forEach(card => {
            card.classList.remove('ratio-1-1', 'ratio-4-5', 'ratio-9-16', 'ratio-16-9');
            card.classList.add(selectedRatio);
        });
    });

    // --- 6. منطق تحميل الكروت كصور عالية الدقة (Export System) ---
    
    // تحميل كارت واحد محدد
    function exportCard(cardElement, filename) {
        if (!cardElement) return;
        
        // إظهار الكارت مؤقتاً وبدقة عالية للتصدير دون التأثير على التصميم المتجاوب
        const originalStyle = cardElement.style.cssText;
        
        // تهيئة الكارت لوضع التصدير
        cardElement.style.position = 'relative';
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'none';
        cardElement.style.display = 'flex';
        cardElement.style.zIndex = '9999';
        
        // توليد الصورة عبر html2canvas
        html2canvas(cardElement, {
            scale: 3, // مضاعفة الدقة 3 مرات لتكون مناسبة بجودة خارقة للينكد إن وإنستغرام
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
        }).then(canvas => {
            // إعادة الكارت لحالته الطبيعية فوراً
            cardElement.style.cssText = originalStyle;
            
            // تحميل ملف الصورة
            const link = document.createElement('a');
            link.download = filename + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('حدث خطأ أثناء توليد الصورة:', err);
            cardElement.style.cssText = originalStyle;
            alert('عذراً، حدث خطأ أثناء محاولة تصدير الصورة. يرجى المحاولة مرة أخرى.');
        });
    }

    // تحميل الكارت النشط حالياً
    btnExportSingle.addEventListener('click', () => {
        const activeCard = document.querySelector('.carousel-card.active-card');
        if (activeCard) {
            const slideId = activeCard.dataset.slide;
            exportCard(activeCard, `haytham_post_slide_${slideId}`);
        }
    });

    // تحميل الكروت الأربعة معاً كملف مضغوط (ZIP) دفعة واحدة لتخطي قيود حظر المتصفحات
    btnExportAll.addEventListener('click', async () => {
        btnExportAll.disabled = true;
        const originalText = btnExportAll.innerHTML;
        btnExportAll.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> جاري تجهيز الملف المضغوط (ZIP)...';

        try {
            const zip = new JSZip();
            
            // استخراج الصور وإضافتها للملف المضغوط
            for (let i = 0; i < cards.length; i++) {
                const cardElement = cards[i];
                const originalStyle = cardElement.style.cssText;
                
                // تهيئة الكارت لوضع التصدير
                cardElement.style.position = 'relative';
                cardElement.style.opacity = '1';
                cardElement.style.transform = 'none';
                cardElement.style.display = 'flex';
                cardElement.style.zIndex = '9999';
                
                // توليد الصورة
                const canvas = await html2canvas(cardElement, {
                    scale: 3,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null
                });
                
                // إعادة الكارت لحالته الطبيعية
                cardElement.style.cssText = originalStyle;
                
                // تحويل الصورة إلى base64 وإضافتها للـ ZIP
                const imgData = canvas.toDataURL('image/png').split('base64,')[1];
                zip.file(`haytham_post_slide_${i + 1}.png`, imgData, {base64: true});
            }
            
            // توليد ملف الـ ZIP وتحميله
            const content = await zip.generateAsync({type: 'blob'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'haytham_carousel_posts.zip';
            link.click();
            
            btnExportAll.innerHTML = '<i class="ri-checkbox-circle-fill"></i> تم التحميل بنجاح';
        } catch (err) {
            console.error('حدث خطأ أثناء إنشاء ملف ZIP:', err);
            alert('عذراً، حدث خطأ أثناء تجميع الصور. يرجى المحاولة مرة أخرى.');
            btnExportAll.innerHTML = originalText;
        } finally {
            setTimeout(() => {
                btnExportAll.disabled = false;
                btnExportAll.innerHTML = originalText;
            }, 3000);
        }
    });

    // --- 7. محرك التوليد التلقائي بالذكاء الاصطناعي (AI Post Generator Engine) ---
    
    const btnGenerateAI = document.getElementById('btn-generate-ai');
    const aiNicheSelect = document.getElementById('ai-niche-select');
    const aiToolConcept = document.getElementById('ai-tool-concept');
    const aiToneSelect = document.getElementById('ai-tone-select');
    const aiCaptionCard = document.getElementById('ai-caption-card');
    const aiCaptionOutput = document.getElementById('ai-caption-output');
    const btnCopyCaption = document.getElementById('btn-copy-caption');

    const aiTemplates = {
        text: {
            tag: "توليد نصوص",
            p1Title: "{name} | أسرع كاتب نصوص بالذكاء الاصطناعي ✍️",
            p1Subtitle: "وداعاً لعقدة الصفحة الفارغة! هذه الأداة تكتب لك المقالات والمنشورات الاحترافية بأسلوب بشري جذاب وبأقل من دقيقة.",
            p1Icon: "ri-magic-line",
            p2Title: "أبرز مميزات {name} الثورية ⭐",
            p2Points: [
                "توليد محتوى متوافق 100% مع معايير السيو (SEO) لزيادة المشاهدات",
                "دعم أكثر من 40 لغة منها اللغة العربية بطلاقة متناهية وفصاحة عالية",
                "كتابة سيناريوهات الفيديوهات وبوستات لينكد إن وجوجل بلمح البصر"
            ],
            p3Title: "خطوات الاستخدام بـ 3 نقرات فقط 🛠️",
            p3Steps: [
                "ادخل إلى منصة {name} وسجل حسابك المجاني فوراً",
                "حدد نوع المحتوى المطلوب واكتب فكرتك الأساسية ولغة النص",
                "اضغط على زر التوليد السريع، وانسخ النتيجة الاحترافية الجاهزة"
            ],
            p4Title: "ابدأ رحلة الإبداع الرقمي اليوم! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "جربها الآن",
            brief: "أحدث المساعدين الأذكياء لكتابة المحتوى الاحترافي والمقالات الطويلة التي تختصر عليك ساعات من التفكير والتعديل."
        },
        image: {
            tag: "تصميم صور",
            p1Title: "{name} | ثورة الرسم والتصميم بالذكاء الاصطناعي 🎨",
            p1Subtitle: "حول كلماتك البسيطة إلى لوحات فنية وتصاميم رقمية مذهلة فائقة الجودة وبلمسة إبداعية تأخذ العقل.",
            p1Icon: "ri-magic-line",
            p2Title: "لماذا تختار أداة {name} للتصميم؟ 🧐",
            p2Points: [
                "توليد صور واقعية ثلاثية الأبعاد (3D) بدقة وضوح 8K فائقة الجودة",
                "فهم عميق ودقيق جداً للأوامر العربية والإنجليزية المعقدة وتفسيرها",
                "تعديل أجزاء محددة من الصور وتغيير الخلفيات بكفاءة لا تصدق"
            ],
            p3Title: "كيف تصنع تحفتك الفنية الأولى؟ 🛠️",
            p3Steps: [
                "سجل دخولك في موقع أداة {name} لتبدأ التجربة المجانية الفورية",
                "اكتب وصف الصورة التي تتخيلها بالتفصيل في خانة الأوامر",
                "اضغط على توليد واشهد السحر! حمل الصورة بأعلى دقة ممكنة"
            ],
            p4Title: "أطلق العنان لمخيلتك البصرية! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "ابدأ التصميم",
            brief: "الجيل الجديد من مولدات الصور والفنون الرقمية التي تفسر الخيال إلى تصاميم مرئية نابضة بالحياة ثنائية وثلاثية الأبعاد بدقة فائقة."
        },
        video: {
            tag: "صناعة فيديو",
            p1Title: "{name} | أداة توليد الفيديو الفوري من النصوص 🎬",
            p1Subtitle: "صناعة فيديوهات احترافية وسينمائية كاملة بمجرد كتابة نص وصفي بسيط! مستقبل صناعة المحتوى البصري بين يديك.",
            p1Icon: "ri-rocket-line",
            p2Title: "ميزات تجعل {name} في الصدارة 🔥",
            p2Points: [
                "حركات كاميرا سلسة وديناميكية وإضاءة واقعية تحاكي كاميرات السينما",
                "توليد أصوات تعليق صوتي طبيعية ومتناسقة بالكامل مع لقطات الفيديو",
                "إمكانية دمج صورك الخاصة وتحويلها إلى مقاطع فيديو متحركة ومبهرة"
            ],
            p3Title: "اصنع فيديو احترافي بـ 3 خطوات 🛠️",
            p3Steps: [
                "ادخل إلى منصة {name} وافتح لوحة العمل الرقمية الخاصة بك",
                "اكتب فكرة المشهد بالتفصيل وحدد طول المقطع ونبرة المعلق الصوتي",
                "انقر على زر المعالجة واحصل على فيديو سنيمائي متناسق وجذاب"
            ],
            p4Title: "اصنع فيلمك الأول بالذكاء الاصطناعي! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "ابدأ الإنتاج",
            brief: "طفرة تكنولوجية غير مسبوقة لتحويل النصوص السينمائية المكتوبة إلى لقطات فيديو واقعية وحية تثير مشاعر وتفاعل المشاهدين."
        },
        coding: {
            tag: "برمجة ذكية",
            p1Title: "{name} | مساعد البرمجة ومطور المواقع الفوري 💻",
            p1Subtitle: "اكتب ما تريده بلغة عامية بسيطة، ودع هذا المساعد البرمجي الخارق يولد لك الكود، يصحح الأخطاء، ويبني لك تطبيقك بالكامل!",
            p1Icon: "ri-code-s-slash-line",
            p2Title: "كيف تطور برمجياتك مع {name}؟ ⭐",
            p2Points: [
                "شرح الأكواد المعقدة سطر بسطر وتصحيح الأخطاء البرمجية بذكاء مدهش",
                "توليد مشاريع كاملة ومواقع متجاوبة بكافة لغات البرمجة الحديثة",
                "مساعد تفاعلي ذكي يعمل كمهندس برمجيات محترف بجانبك طوال اليوم"
            ],
            p3Title: "كيف تبدأ برمجة أول مشروع؟ 🛠️",
            p3Steps: [
                "افتح أداة {name} واكتب شرحاً برمجياً للمشروع الذي تود بناءه",
                "اضغط على زر الإنشاء التلقائي ودع المساعد يولد لك ملفات الكود",
                "قم بنسخ وتجربة الكود، واستمتع بتطبيقك الذكي المكتمل بثوانٍ"
            ],
            p4Title: "برمج فكرتك القادمة بلمح البصر! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "ابدأ البرمجة",
            brief: "شريكك المبرمج الفعال لتسريع كتابة الأكواد وتصحيح المشاريع وفك شفرات الرموز البرمجية المعقدة دون أي عناء."
        },
        productivity: {
            tag: "إنتاجية خارقة",
            p1Title: "{name} | سكرتيرك الشخصي لتنظيم وإنجاز المهام ⚡",
            p1Subtitle: "الأداة الأكثر فعالية لتنظيم جدولك، تلخيص الاجتماعات الطويلة، وكتابة الردود البريدية الذكية لتوفر ساعات يومية من وقتك.",
            p1Icon: "ri-cpu-line",
            p2Title: "ارفع سقف إنتاجيتك مع {name} 📈",
            p2Points: [
                "تلخيص فوري للاجتماعات والتقارير الطويلة واستخراج التوصيات بذكاء",
                "تنظيم وإدارة المهام وتوزيعها على الفريق وإرسال تذكيرات ذكية",
                "صياغة ردود بريد إلكتروني احترافية ومقنعة بناء على ملاحظات سريعة"
            ],
            p3Title: "خطوات تنظيم يومك الرقمي 🛠️",
            p3Steps: [
                "ارفع تقريرك أو سجل جدول أعمالك اليومي داخل منصة {name}",
                "اختر نمط التلخيص أو صياغة الخطة اليومية التي تناسب أسلوب عملك",
                "احصل على خارطة طريق ذكية ومنظمة للمهام ورسائل بريد جاهزة"
            ],
            p4Title: "وفر وقتك واستعد السيطرة على يومك! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "ابدأ الآن",
            brief: "مساعد مهام ذكي وأداة للتنظيم والتلخيص المبتكر للملفات الطويلة، يوفر عليك التشتت ويجعل تركيزك في أعلى مستوياته."
        },
        audio: {
            tag: "هندسة صوتية",
            p1Title: "{name} | الاستوديو الصوتي المتكامل بالذكاء الاصطناعي 🎵",
            p1Subtitle: "تنقية فتاكة للصوت، عزل الضوضاء المحيطة تماماً، وتوليد مؤثرات صوتية وموسيقى حصرية فائقة الجودة لبودكاستك وفيديوهاتك.",
            p1Icon: "ri-flashlight-line",
            p2Title: "لماذا ستبهرك أداة {name} الصوتية؟ 🎙️",
            p2Points: [
                "عزل الضوضاء المحيطة والصدى بذكاء ليصبح صوتك كأنه في استوديو احترافي",
                "تحويل النصوص المكتوبة إلى معلقين صوتيين محترفين بأصوات طبيعية تماماً",
                "توليد موسيقى تصويرية ومؤثرات حصرية خالية من حقوق الملكية الفكرية"
            ],
            p3Title: "كيف تصنع ملفاً صوتياً فاخراً؟ 🛠️",
            p3Steps: [
                "قم برفع ملفك الصوتي أو البودكاست المسجل في واجهة {name}",
                "اختر نمط التنقية وعزل الضوضاء التلقائي أو اكتب نص التعليق الصوتي",
                "حمل الملف الصوتي النقي والفاخر بجودة عالية جداً، وجاهز للنشر"
            ],
            p4Title: "اجعل صوتك يبدو بأعلى مستويات الاحترافية! 🔗",
            p4Link: "www.haythamtech.com/{slug}",
            p4Cta: "احفظ الفيديو وتابعنى لتعرف كل جديد اضغط لايك شارك مع اصدقاء",
            p4Tag: "ابدأ الهندسة",
            brief: "أداة المعالجة وهندسة المؤثرات الصوتية المثالية لبث الحيوية والوضوح الخالي من الضجيج والتشويش في كافة تسجيلاتك الصوتية."
        }
    };

    // دالة المزامنة التلقائية لروابط الأدوات بعد توليد المحتوى أو عند كتابة أداة جديدة يدوياً
    function syncDynamicUrl() {
        const niche = aiNicheSelect.value;
        const conceptName = aiToolConcept.value.trim() || "اتوماتيك مع التنوع";
        
        // توليد الـ Slug للرابط
        const slug = conceptName.toLowerCase()
            .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '-');
            
        const liveUrl = `tool.html?niche=${niche}&name=${encodeURIComponent(conceptName)}`;
        
        // تحديث الرابط الفعلي لزر صفحة الشرح المفتوحة
        const btnLinkTool = document.querySelector('.btn-link-tool');
        if (btnLinkTool) {
            btnLinkTool.href = liveUrl;
        }
        
        // تحديث الكارت 4 ومربعات الإدخال
        if (card4LinkDisplay) {
            card4LinkDisplay.textContent = `haythamtech.com/${slug}`;
        }
    }

    // ربط أحداث الإدخال وتغيير التصنيفات بالمزامنة الفورية عند كتابة أداة جديدة يدوياً
    aiToolConcept.addEventListener('input', syncDynamicUrl);
    aiNicheSelect.addEventListener('change', syncDynamicUrl);
    
    // ربط الحقل p1Title أيضاً في حال تم التغيير اليدوي منه
    p1Title.addEventListener('input', (e) => {
        aiToolConcept.value = e.target.value;
        syncDynamicUrl();
    });

    btnGenerateAI.addEventListener('click', () => {
        const niche = aiNicheSelect.value;
        
        // قائمة أسماء الأدوات المتنوعة والاحترافية جداً بكل مجالات الذكاء الاصطناعي لتأمين تنوع لا ينتهي
        const nicheNames = {
            text: [
                "مُبدع الكلمات AI", "قلم المستقبل", "أديب تك", "مساعد الكتابة الذكي", 
                "مُدون دوت آي", "منشئ النصوص الخارق", "روائي الذكاء الاصطناعي", "فصيح AI",
                "مسوّد البرومبت", "كاتب الإعلانات الذكي", "لغوي تك", "محرر المحتوى الرقمي"
            ],
            image: [
                "لوحة خيال AI", "ريشة ذكية Pro", "إبداع بكسل", "مخيلة الفنون", 
                "عدسة المستقبل", "رسم ذكي", "فن الميدجورني", "مبتكر الصور AI",
                "استوديو التصميم الذكي", "صانع الأفتار", "رسام الأفكار", "عدسة النيون AI"
            ],
            video: [
                "مخرج الفيديو الذكي", "صانع اللقطات AI", "رؤية متحركة Pro", "سورا المطور", 
                "سينمائي تك", "أنيميشن برو", "فيديو جين AI", "مبتكر كليبات AI",
                "أتمتة الريلز الخارقة", "محرر التيك توك الذكي", "مونتير المستقبل", "مخرج الذكاء الاصطناعي"
            ],
            coding: [
                "مهندس الأكواد الذكي", "برمج تك AI", "خبير جافاسكريبت Pro", "مساعد المطور", 
                "كود سحري", "مصحح الثغرات AI", "مبتكر التطبيقات السريع", "كودر بلس",
                "منشئ قواعد البيانات", "مساعد بايثون", "مترجم الأكواد الذكي", "برمجة بدون كود AI"
            ],
            productivity: [
                "منظم المهام الذكي", "سكرتير المستقبل", "مفكرة الإنجاز AI", "مساعد ريادي Pro", 
                "إنجاز وسرعة", "منظم المشاريع الذكي", "مؤتمت الأعمال الخارق", "إنتاجية بلس",
                "مخطط الجداول التلقائي", "محلل البيانات الضخمة", "مؤتمت المهام المكررة", "مساعد المكاتب الذكي"
            ],
            audio: [
                "نقاء صوتي Pro", "استوديو ذكي", "صوت الإبداع AI", "معلق صوتي فوري", 
                "صدى المستقبل", "مولد الأصوات الذكي", "منظف التشويش AI", "بودكاستر تك",
                "مهندس الصوتيات المطور", "مترجم اللغات الصوتي", "عازف الألحان الذكي", "صانع المؤثرات الصوتية"
            ]
        };
        
        // اختيار اسم عشوائي متنوع من التصنيف المختار لتوفير التنوع التلقائي المطلق ومنع تكرار المحتوى القريب
        const namesList = nicheNames[niche] || ["اتوماتيك مع التنوع"];
        
        let lastGeneratedTools = [];
        try {
            lastGeneratedTools = JSON.parse(localStorage.getItem('last_generated_tools') || '[]');
        } catch(e) {
            lastGeneratedTools = [];
        }
        
        // تصفية الأسماء التي تم استخدامها مؤخراً لتأمين التنوع المطلق ومنع التكرار
        let availableNames = namesList.filter(name => !lastGeneratedTools.includes(name));
        if (availableNames.length === 0) {
            availableNames = namesList;
            lastGeneratedTools = [];
        }
        
        const conceptName = availableNames[Math.floor(Math.random() * availableNames.length)];
        
        lastGeneratedTools.push(conceptName);
        if (lastGeneratedTools.length > 5) {
            lastGeneratedTools.shift(); // الاحتفاظ بآخر 5 أدوات مولدة لعدم تكرارها
        }
        localStorage.setItem('last_generated_tools', JSON.stringify(lastGeneratedTools));
        
        // تحديث قيمة المدخل المخفي لتبسيط الواجهة
        aiToolConcept.value = conceptName;
        const tone = aiToneSelect.value;
        
        const template = aiTemplates[niche];
        if (!template) return;
        
        const nicheImages = {
            text: 'mockup_text_ai.png',
            image: 'mockup_image_ai.png',
            video: 'mockup_video_ai.png',
            coding: 'mockup_coding_ai.png',
            productivity: 'mockup_prod_ai.png',
            audio: 'mockup_audio_ai.png'
        };

        const card1ImageElement = document.getElementById('card-1-image-element');
        if (card1ImageElement) {
            card1ImageElement.src = nicheImages[niche] || 'tool_example_mockup.png';
        }
        
        // توليد الـ Slug للرابط
        const slug = conceptName.toLowerCase()
            .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '-');
            
        // 1. استبدال النصوص في الحقول الجانبية (Sidebar Editors)
        
        // كارت 1
        p1Title.value = template.p1Title.replace(/{name}/g, conceptName);
        p1Subtitle.value = template.p1Subtitle.replace(/{name}/g, conceptName);
        p1Tag.value = template.tag;
        p1Icon.value = template.p1Icon;
        
        // كارت 2
        p2Title.value = template.p2Title.replace(/{name}/g, conceptName);
        p2Points[0].value = template.p2Points[0].replace(/{name}/g, conceptName);
        p2Points[1].value = template.p2Points[1].replace(/{name}/g, conceptName);
        p2Points[2].value = template.p2Points[2].replace(/{name}/g, conceptName);
        
        // كارت 3
        p3Title.value = template.p3Title.replace(/{name}/g, conceptName);
        p3Steps[0].value = template.p3Steps[0].replace(/{name}/g, conceptName);
        p3Steps[1].value = template.p3Steps[1].replace(/{name}/g, conceptName);
        p3Steps[2].value = template.p3Steps[2].replace(/{name}/g, conceptName);
        
        // كارت 4
        p4Title.value = template.p4Title.replace(/{name}/g, conceptName);
        p4Link.value = `haythamtech.com/${slug}`;
        p4Cta.value = template.p4Cta.replace(/{name}/g, conceptName);
        p4Tag2.value = template.p4Tag;
        
        // توليد لينك الأداة والشرح تلقائياً وديناميكياً لربط الكروت بصفحة الشرح الحية
        const liveUrl = `tool.html?niche=${niche}&name=${encodeURIComponent(conceptName)}`;
        document.querySelector('.btn-link-tool').href = liveUrl;
        
        // 2. إطلاق حدث الإدخال لتحديث الكروت فوراً في شاشة المعاينة
        p1Title.dispatchEvent(new Event('input'));
        p1Subtitle.dispatchEvent(new Event('input'));
        p1Tag.dispatchEvent(new Event('input'));
        p1Icon.dispatchEvent(new Event('change'));
        
        p2Title.dispatchEvent(new Event('input'));
        p2Points[0].dispatchEvent(new Event('input'));
        p2Points[1].dispatchEvent(new Event('input'));
        p2Points[2].dispatchEvent(new Event('input'));
        
        p3Title.dispatchEvent(new Event('input'));
        p3Steps[0].dispatchEvent(new Event('input'));
        p3Steps[1].dispatchEvent(new Event('input'));
        p3Steps[2].dispatchEvent(new Event('input'));
        
        p4Title.dispatchEvent(new Event('input'));
        p4Link.dispatchEvent(new Event('input'));
        p4Cta.dispatchEvent(new Event('input'));
        p4Tag2.dispatchEvent(new Event('input'));
        
        // 3. بناء الكابشن والهاشتاجات الاحترافية لشبكات التواصل الاجتماعي بناء على اللهجة المختارة
        let ctaStart = "";
        let ctaEnd = "";
        
        switch(tone) {
            case "enthusiastic":
                ctaStart = "🔥 أداة جديدة وخطيرة ستغير قواعد اللعبة بالكامل! كالعادة، أشارككم كل ما هو جديد وثوري في عالم الذكاء الاصطناعي وأحدث الأدوات التي توفر عليكم ساعات من العمل الشاق! ⚡";
                ctaEnd = "👇👇 إذا كنت ترغب في الحصول على رابط الأداة المباشر مع ملف الشرح التفصيلي بصيغة PDF مجاناً، فقط أكتب لي في التعليقات 'محتاج الرابط' وسأقوم بمشاركتك إياه فوراً! 🚀";
                break;
            case "professional":
                ctaStart = "💼 يسعدني أن أشارككم اليوم مراجعة تقنية متكاملة لأحد الحلول البرمجية الواعدة المدعومة بالذكاء الاصطناعي والتي ترفع الكفاءة التشغيلية للأفراد والمؤسسات.";
                ctaEnd = "✉️ للحصول على الرابط المباشر للمنصة والتقرير الفني الكامل للاستخدام مجاناً، يرجى كتابة تعليق أدناه وسنتواصل معك لمشاركتك التفاصيل مباشرة.";
                break;
            case "creative":
                ctaStart = "💡 التكنولوجيا لم تعد مجرد سطور برمجة، بل أصبحت شريك الإبداع الأقوى! اليوم نتحدث عن أداة فريدة تعيد رسم خارطة الإنجاز والابتكار الرقمي بشكل عميق.";
                ctaEnd = "✨ إذا كنت مستعداً لتجربة الأداة واستلام الشرح الاحترافي المكتوب، أرسل تعليقك بالأسفل وسأقوم بتسليمك المفاتيح الرقمية فوراً!";
                break;
            case "informative":
                ctaStart = "📚 درس اليوم سنتعلم فيه كيفية الاستفادة من أداة ذكاء اصطناعي ثورية وجديدة كلياً لتسهيل مهامك اليومية خطوة بخطوة وبشرح مبسط للغاية.";
                ctaEnd = "📝 لحفظ رابط الأداة للرجوع إليه مع ملف الشرح المطبوع بصيغة PDF مجاناً، اترك تعليقاً بطلبك بالأسفل وسأرسله لك بكل سرور!";
                break;
        }
        
        const finalCaption = `${ctaStart}

🚀 اليوم نسلط الضوء على أداة: [ ${conceptName} ]
والتي تعتبر: ${template.brief.replace(/{name}/g, conceptName)}

⭐ أبرز ميزات الأداة:
1️⃣ ${template.p2Points[0].replace(/{name}/g, conceptName)}
2️⃣ ${template.p2Points[1].replace(/{name}/g, conceptName)}
3️⃣ ${template.p2Points[2].replace(/{name}/g, conceptName)}

🛠️ طريقة استخدام الأداة بـ 3 خطوات بسيطة:
1. ${template.p3Steps[0].replace(/{name}/g, conceptName)}
2. ${template.p3Steps[1].replace(/{name}/g, conceptName)}
3. ${template.p3Steps[2].replace(/{name}/g, conceptName)}

---
${ctaEnd}

#ذكاء_اصطناعي #أدوات_ذكية #هيثم_تك #تطوير_محتوى #تقنية_المعلومات #صناعة_المحتوى`;

        // إظهار بطاقة الكابشن وتحديث النص
        aiCaptionCard.style.display = 'block';
        aiCaptionOutput.value = finalCaption;
        
        // الانتقال تلقائياً للكارت الأول لرؤية التغييرات المذهلة
        showSlide(1);
    });

    // نسخ الكابشن والهاشتاجات للذاكرة بضغطة زر
    btnCopyCaption.addEventListener('click', () => {
        const textToCopy = aiCaptionOutput.value;
        if (!textToCopy) return;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btnCopyCaption.innerHTML;
            btnCopyCaption.innerHTML = '<i class="ri-checkbox-circle-line" style="color: #2ecc71;"></i> <span>تم نسخ الكابشن بنجاح!</span>';
            setTimeout(() => {
                btnCopyCaption.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('فشل في نسخ الكابشن:', err);
        });
    });

    // نسخ رابط الأداة المخصص لـ ManyChat
    const btnCopyManychatLink = document.getElementById('btn-copy-manychat-link');
    if(btnCopyManychatLink) {
        btnCopyManychatLink.addEventListener('click', () => {
            // استخراج القيم الحالية للأداة لبناء الرابط الحقيقي للموقع (Production URL)
            const aiNicheSelect = document.getElementById('ai-niche-select');
            const aiToolConcept = document.getElementById('ai-tool-concept');
            
            const niche = aiNicheSelect ? aiNicheSelect.value : 'text';
            const conceptName = aiToolConcept && aiToolConcept.value.trim() !== '' ? aiToolConcept.value.trim() : 'اتوماتيك مع التنوع';
            
            // الرابط المباشر الذي سيتم نسخه واستخدامه في ManyChat
            const liveUrl = `https://haythamtech.com/tool.html?niche=${niche}&name=${encodeURIComponent(conceptName)}`;
            
            // دالة النسخ التي تدعم الملفات المحلية (file:///) والإنترنت (https://)
            const copyToClipboard = (text) => {
                if (navigator.clipboard && window.isSecureContext) {
                    return navigator.clipboard.writeText(text);
                } else {
                    return new Promise((resolve, reject) => {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-999999px";
                        textArea.style.top = "-999999px";
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                        textArea.remove();
                    });
                }
            };
            
            copyToClipboard(liveUrl).then(() => {
                const originalText = btnCopyManychatLink.innerHTML;
                btnCopyManychatLink.innerHTML = '<i class="ri-checkbox-circle-fill" style="color: #2ecc71;"></i> <span style="color: #2ecc71; font-weight: bold;">تم نسخ الرابط بنجاح!</span>';
                setTimeout(() => {
                    btnCopyManychatLink.innerHTML = originalText;
                }, 2500);
            }).catch(err => {
                console.error('فشل في نسخ الرابط:', err);
                alert("تعذر النسخ تلقائياً. يرجى نسخه يدوياً:\n" + liveUrl);
            });
        });
    }

    // تحميل الإعدادات المحفوظة من localStorage عند بدء التشغيل لمزامنتها بكامل النظام
    function loadSavedProfileSettings() {
        const savedName = localStorage.getItem('haytham_name');
        const savedAvatar = localStorage.getItem('haytham_avatar_data');
        const savedVerified = localStorage.getItem('haytham_verified');

        if (savedName) {
            usernameInput.value = savedName;
            userDisplayNames.forEach(el => el.textContent = savedName);
        } else {
            localStorage.setItem('haytham_name', usernameInput.value);
        }

        if (savedVerified !== null) {
            const isVerified = (savedVerified === 'true');
            verifiedToggle.checked = isVerified;
            verifiedBadgeIcons.forEach(icon => {
                icon.style.display = isVerified ? 'inline-block' : 'none';
            });
        } else {
            localStorage.setItem('haytham_verified', verifiedToggle.checked);
        }

        if (savedAvatar) {
            profileAvatarPreview.src = savedAvatar;
            userAvatars.forEach(img => img.src = savedAvatar);
        } else {
            localStorage.setItem('haytham_avatar_data', 'personal_photo.png');
        }
    }
    
    // تشغيل تحميل الإعدادات عند الانطلاق
    loadSavedProfileSettings();
});
