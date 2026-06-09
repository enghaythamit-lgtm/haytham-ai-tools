// js/viral.js - نظام المحتوى الفيروسي

document.addEventListener('DOMContentLoaded', () => {
    
    const btnGenerate = document.getElementById('btn-generate-viral');
    const inputToolName = document.getElementById('viral-tool-name');
    const selectAudience = document.getElementById('viral-audience');
    const inputTrigger = document.getElementById('viral-trigger');
    const btnCopyAll = document.getElementById('btn-copy-all');

    // دوال النسخ الفردية للأقسام
    window.copySection = function(sectionId) {
        const text = document.getElementById(sectionId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ القسم بنجاح! 📋');
        });
    };

    // نسخ كل المحتوى
    btnCopyAll.addEventListener('click', () => {
        const hooks = document.getElementById('hooks-content').innerText;
        const visual = document.getElementById('visual-content').innerText;
        const script = document.getElementById('script-content').innerText;
        const caption = document.getElementById('caption-content').innerText;
        
        const fullContent = `--- خطافات الانتباه ---\n${hooks}\n\n--- الإرشادات البصرية ---\n${visual}\n\n--- السكربت الصوتي ---\n${script}\n\n--- الكابشن (ManyChat) ---\n${caption}`;
        
        navigator.clipboard.writeText(fullContent).then(() => {
            btnCopyAll.innerHTML = '<i class="ri-checkbox-circle-fill"></i> تم النسخ!';
            setTimeout(() => {
                btnCopyAll.innerHTML = '<i class="ri-file-copy-line"></i> نسخ الكل';
            }, 2000);
        });
    });

    // مولد المحتوى الذكي
    btnGenerate.addEventListener('click', () => {
        
        const toolName = inputToolName.value.trim() || 'أداة ذكاء اصطناعي سرية';
        const audience = selectAudience.value;
        const triggerWord = inputTrigger.value.trim() || 'أداة';
        
        // تغيير شكل الزر لإظهار التحميل
        const originalBtnText = btnGenerate.innerHTML;
        btnGenerate.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> جاري توليد المحتوى الفيروسي...';
        btnGenerate.disabled = true;

        setTimeout(() => {
            
            // 1. توليد الخطافات (Hooks)
            const hooksHTML = `
                <div class="viral-hook">
                    <div class="hook-number">1</div>
                    <div><span class="viral-text-highlight">أداة سرية</span> ما حدش عايزك تعرفها هتغير شغلك كـ ${audience} بالكامل! 🤫</div>
                </div>
                <div class="viral-hook">
                    <div class="hook-number">2</div>
                    <div>لو أنت من ${audience} وما بتستخدمش ${toolName}، فأنتا فايتك كتير جداً! 🤯</div>
                </div>
                <div class="viral-hook">
                    <div class="hook-number">3</div>
                    <div>كيف توفر 100 ساعة عمل في الأسبوع باستخدام ${toolName}؟ السر في هذا الفيديو! ⏱️</div>
                </div>
            `;
            document.getElementById('hooks-content').innerHTML = hooksHTML;

            // 2. التوجيهات البصرية (Visuals)
            const visualsHTML = `
                <p><strong>الثانية 0 - 3:</strong> اظهر أمام الكاميرا بوجه متفاجئ، مع وضع عنوان الفيديو بخط عريض جداً (Hook) باللون الأصفر المضيء.</p>
                <p><strong>الثانية 3 - 10:</strong> انتقل بسرعة (B-roll) لتصوير شاشة الكمبيوتر (Screencast) وأنت تستخدم ${toolName} وتقوم بخطوة مبهرة.</p>
                <p><strong>الثانية 10 - 15:</strong> ارجع للكاميرا بثقة، وأشر بإصبعك للأسفل مع ظهور كلمة "${triggerWord}" بحركة انبثاقية (Pop-up Animation).</p>
            `;
            document.getElementById('visual-content').innerHTML = visualsHTML;

            // 3. السكربت الصوتي (Script)
            const scriptHTML = `
                "أداة ذكاء اصطناعي حرفياً بتعمل سحر! ✨<br><br>
                لو أنت من ${audience}، الأداة دي واسمها ${toolName} هتختصر عليك أيام من الشغل في ضغطة زر واحدة.<br><br>
                كل اللي عليك تعمله هو إنك ترفع ملفاتك، وتسيب الأداة تخلص لك الشغل باحترافية عالية جداً وفي ثواني.<br><br>
                عشان أسهل عليك، أنا جهزتلك الرابط المباشر والشرح الكامل للأداة..<br><br>
                اكتب كلمة <strong class="viral-text-highlight">(${triggerWord})</strong> في التعليقات، وهبعتلك الرابط فوراً في رسالة خاصة! 📩👇"
            `;
            document.getElementById('script-content').innerHTML = scriptHTML;

            // 4. الكابشن والهاشتاقات (Caption)
            const captionHTML = `
                سر جديد من أسرار الذكاء الاصطناعي لـ ${audience}! 🚀<br><br>
                أداة ${toolName} هي حرفياً كنز مخفي هيضاعف إنتاجيتك بشكل مرعب.<br><br>
                بدون تعقيد وبدون تضييع وقت، الأداة دي بتنجز المهام اللي كانت بتاخد أيام في دقائق معدودة.<br><br>
                🎁 <strong>للحصول على الأداة:</strong><br>
                اكتب كلمة <strong>"${triggerWord}"</strong> في التعليقات وسأرسل لك الرابط والشرح مباشرة في رسالة خاصة (DM)! 📩<br><br>
                احفظ الفيديو عشان ترجعله، وشارك المقطع مع شخص مهتم! 🤝<br><br>
                #ذكاء_اصطناعي #AI #تطوير_الذات #إنتاجية #تقنية #أدوات_ذكية #هيثم_ابراهيم #مهندس_ذكاء_اصطناعي
            `;
            document.getElementById('caption-content').innerHTML = captionHTML;

            // إعادة الزر لحالته
            btnGenerate.innerHTML = originalBtnText;
            btnGenerate.disabled = false;

        }, 1200); // محاكاة وقت التحميل والتفكير
    });

});
