// js/viral.js - نظام المحتوى الفيروسي الذكي (Strict Non-Repeating Algorithm)

document.addEventListener('DOMContentLoaded', () => {
    
    const btnGenerate = document.getElementById('btn-generate-viral');
    const inputToolName = document.getElementById('viral-tool-name');
    const btnRandomTrend = document.getElementById('btn-random-trend');
    const selectAudience = document.getElementById('viral-audience');
    const inputTrigger = document.getElementById('viral-trigger');
    const btnCopyAll = document.getElementById('btn-copy-all');

    // 1. قاعدة البيانات القوية
    const trendingTools = [
        "Midjourney", "ChatGPT-4o", "Claude 3", "Notion AI", "Canva Magic Studio",
        "CapCut AI", "ElevenLabs", "Gamma App", "Perplexity AI", "Runway Gen-2",
        "Sora AI", "HeyGen", "Opus Clip", "Luma Dream Machine", "Suno AI",
        "Leonardo AI", "Firefly", "Synthesia", "Tome", "Veed.io"
    ];

    const hooksDb = [
        "أداة سرية ما حدش عايزك تعرفها هتغير شغلك كـ [الجمهور] بالكامل! 🤫",
        "لو أنت من [الجمهور] وما بتستخدمش [الأداة]، فأنتا فايتك كتير جداً! 🤯",
        "كيف توفر 100 ساعة عمل باستخدام [الأداة]؟ السر في هذا الفيديو! ⏱️",
        "أداة ذكاء اصطناعي مجانية حسستني إني بهاكر النظام! 💻🔥",
        "سر مخفي في [الأداة] هيضاعف إنتاجيتك 10 أضعاف كـ [الجمهور]! 🚀",
        "لا تدفع دولاراً واحداً قبل أن تجرب [الأداة].. سحر حقيقي! ✨",
        "هذه الأداة غير القانونية تقريباً ستقوم بعملك بدلاً منك! 🕵️‍♂️",
        "موقع ذكاء اصطناعي تمنيت لو عرفته قبل سنة من الآن! ⏳",
        "توقف عن العمل بجهد، وابدأ العمل بذكاء مع [الأداة] كـ [الجمهور]! 🧠",
        "أداة [الأداة] هي التحديث الذي كنت تنتظره طوال حياتك المهنية! 🎯"
    ];

    const visualsDb = [
        "<p><strong>0-3ث:</strong> وجه متفاجئ، زووم سريع على عينك ثم انتقل للشاشة.</p><p><strong>3-10ث:</strong> تصوير سريع للشاشة وأنت تكتب الأمر وتظهر النتيجة بثانية.</p><p><strong>10-15ث:</strong> أشر بيدك أسفل الشاشة واجعل كلمة '[الكلمة]' تهتز (Shake).</p>",
        "<p><strong>0-3ث:</strong> امسك كوب قهوة وابتسم، ثم ضع النص فوق رأسك باللون الأصفر.</p><p><strong>3-10ث:</strong> اعرض فيديو (Before/After) لعملك قبل الأداة وبعد استخدام [الأداة].</p><p><strong>10-15ث:</strong> اقترب من الكاميرا واهمس: اكتب '[الكلمة]' في التعليقات.</p>",
        "<p><strong>0-3ث:</strong> ابدأ الفيديو وأنت تضرب الطاولة بحماس وتنظر للكاميرا.</p><p><strong>3-10ث:</strong> اعرض واجهة [الأداة] مع عمل Fast Forward سريع لإنجاز المهمة.</p><p><strong>10-15ث:</strong> أظهر رسالة (DM) وهمية على الشاشة مع الكلمة المفتاحية '[الكلمة]'.</p>",
        "<p><strong>0-3ث:</strong> اخفِ وجهك خلف اللابتوب ثم أظهره فجأة مع الخطاف.</p><p><strong>3-10ث:</strong> لقطات متتالية (B-roll) للنتائج المذهلة التي تخرجها الأداة.</p><p><strong>10-15ث:</strong> نص عريض يغطي الشاشة: (الرابط مجاني.. اكتب '[الكلمة]').</p>",
        "<p><strong>0-3ث:</strong> قف في مكان مظلم وأضئ وجهك بهاتفك فقط (تأثير درامي).</p><p><strong>3-10ث:</strong> استعرض [الأداة] بتأثير الـ Neon الجذاب لتسليط الضوء على الزر السري.</p><p><strong>10-15ث:</strong> ابتسم بثقة وأشر بعلامة (✌️) مع ظهور زر التعليق.</p>"
    ];

    const scriptsDb = [
        "أداة ذكاء اصطناعي حرفياً بتعمل سحر! ✨\nلو أنت من [الجمهور]، الأداة دي واسمها [الأداة] هتختصر عليك أيام من الشغل في ضغطة زر واحدة.\nكل اللي عليك تعمله هو إنك ترفع ملفاتك وتسيبها تخلص.\nاكتب كلمة ([الكلمة]) في التعليقات، وهبعتلك الرابط فوراً في رسالة خاصة! 📩👇",
        "عايز أقولك إنك بتضيع عمرك لو لسه بتشتغل بالطريقة القديمة!\nبص على أداة [الأداة] دي، مخصصة لـ [الجمهور] عشان تنجز المهام المعقدة في 5 ثواني بس.\nالنتائج مرعبة ومجانية تماماً.\nعشان تاخد الرابط والشرح، اكتب كلمة ([الكلمة]) في كومنت وهيوصلك حالاً! 🚀",
        "تخيل يكون معاك مساعد شخصي ما بينامش! 🤖\nأداة [الأداة] هي الحل السحري لكل مشاكل [الجمهور]. بتعمل لك كل حاجة أوتوماتيك من الألف للياء.\nمش محتاج أي خبرة سابقة.\nاحفظ الفيديو واكتب كلمة ([الكلمة]) تحت وهبعتلك رابط المنصة في الـ DM. 🎁",
        "سر جديد من أسرار الذكاء الاصطناعي محدش بيقولك عليه! 🤫\nلو دخلت على [الأداة]، هتقدر تعمل شغل أسبوع كامل في كباية قهوة.\nعظيمة جداً لـ [الجمهور] اللي وقتهم ضيق.\nالرابط حصري ومجاني.. علق بكلمة ([الكلمة]) واللينك هيكون عندك في رسالة! ⚡",
        "أنا مصدوم من اللي الأداة دي بتعمله! 🤯\nاسمها [الأداة]، ودي نقلة نوعية لـ [الجمهور]. بتحلل وتصمم وتكتب كأنك وظفت فريق كامل معاك.\nلازم تجربها النهاردة قبل ما تبقى مدفوعة.\nعايز اللينك؟ اكتب ([الكلمة]) في الكومنتات وسيبه عليا. 🔥"
    ];

    const captionsDb = [
        "سر جديد لـ [الجمهور]! 🚀\nأداة [الأداة] هي حرفياً كنز مخفي هيضاعف إنتاجيتك.\n🎁 **للحصول على الأداة:**\nاكتب كلمة **\"[الكلمة]\"** في التعليقات وسأرسل لك الرابط مباشرة في رسالة خاصة (DM)! 📩\nاحفظ الفيديو وشارك المقطع! 🤝\n#ذكاء_اصطناعي #AI #تطوير_الذات #إنتاجية",
        "هل تعبت من العمل اليدوي الطويل؟ ⏱️\nالحل السحري كـ [الجمهور] هو استخدام قوة [الأداة] الرهيبة.\n🔥 **جاهز للتجربة؟**\nعلق بكلمة **\"[الكلمة]\"** وسأرسل لك الرابط والشرح الحصري في الـ Inbox الخاص بك.\nلا تفوت الفرصة! 🎯\n#تقنية #أدوات_ذكية #هيثم_ابراهيم #أتمتة",
        "التطور لا ينتظر أحداً! 🧠\nأداة [الأداة] أصبحت الأداة الأولى التي يعتمد عليها كل شخص من [الجمهور] للتميز.\n👇 **كيف تحصل عليها؟**\nبكل بساطة اكتب **\"[الكلمة]\"** بالأسفل وسيتكفل الرد الآلي بإرسال الرابط لك فوراً.\n#تكنولوجيا #مستقبل #AI_Tools #نجاح",
        "ثورة الذكاء الاصطناعي مستمرة! 🤖✨\nلا تضيع وقتك واختصر المسافات باستخدام [الأداة]. تم تصميمها خصيصاً لـ [الجمهور].\n🔗 **الرابط متاح لك مجاناً:**\nفقط اكتب **\"[الكلمة]\"** في تعليق وستصلك الرسالة الآن.\n#ذكاء_صناعي #أسرار_التقنية #تطوير_الأعمال",
        "أقوى أداة لعام 2026 بلا منازع! 🏆\nإذا كنت من [الجمهور]، فإن [الأداة] ستغير قواعد اللعبة بالنسبة لك تماماً.\n🎁 **هدية المتابعين:**\nاكتب الكلمة السحرية **\"[الكلمة]\"** في التعليقات لاستلام رابط الدخول الفوري.\n#AI #ابتكار #هيثم_ذكاء_اصطناعي #عمل_حر"
    ];

    // 2. خوارزمية السحب العشوائي الصارم (Strict Randomization with Memory)
    function getStrictRandomItem(array, storageKey) {
        // جلب الذاكرة
        let usedIndices = JSON.parse(localStorage.getItem(storageKey)) || [];
        
        // إذا استُنفِدت جميع الخيارات، امسح الذاكرة لتبدأ دورة جديدة
        if (usedIndices.length >= array.length) {
            console.log(`[إعادة تدوير] تم استنفاد جميع خيارات (${storageKey})، جاري بدء دورة جديدة...`);
            usedIndices = [];
        }

        // إيجاد الفهارس المتاحة (غير المستخدمة)
        let availableIndices = [];
        for (let i = 0; i < array.length; i++) {
            if (!usedIndices.includes(i)) availableIndices.push(i);
        }

        // اختيار عشوائي من المتاح
        let randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
        let selectedIndex = availableIndices[randomAvailableIndex];

        // حفظ الفهرس في الذاكرة
        usedIndices.push(selectedIndex);
        localStorage.setItem(storageKey, JSON.stringify(usedIndices));

        return array[selectedIndex];
    }

    // زر توليد التريند العشوائي
    if (btnRandomTrend) {
        btnRandomTrend.addEventListener('click', () => {
            const randomTool = getStrictRandomItem(trendingTools, 'viral_used_tools');
            inputToolName.value = randomTool;
            // تأثير بصري للزر
            btnRandomTrend.innerHTML = '<i class="ri-check-line"></i>';
            setTimeout(() => btnRandomTrend.innerHTML = '<i class="ri-magic-line"></i>', 1000);
        });
    }

    // دوال النسخ
    window.copySection = function(sectionId) {
        const text = document.getElementById(sectionId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ القسم بنجاح! 📋');
        });
    };

    btnCopyAll.addEventListener('click', () => {
        const hooks = document.getElementById('hooks-content').innerText;
        const visual = document.getElementById('visual-content').innerText;
        const script = document.getElementById('script-content').innerText;
        const caption = document.getElementById('caption-content').innerText;
        
        const fullContent = `--- خطاف الانتباه ---\n${hooks}\n\n--- الإرشادات البصرية ---\n${visual}\n\n--- السكربت الصوتي ---\n${script}\n\n--- الكابشن (ManyChat) ---\n${caption}`;
        
        navigator.clipboard.writeText(fullContent).then(() => {
            btnCopyAll.innerHTML = '<i class="ri-checkbox-circle-fill"></i> تم النسخ!';
            setTimeout(() => btnCopyAll.innerHTML = '<i class="ri-file-copy-line"></i> نسخ الكل', 2000);
        });
    });

    // 3. محرك التوليد ودمج المتغيرات
    btnGenerate.addEventListener('click', () => {
        
        // إذا ترك المستخدم حقل الأداة فارغاً، نولد له واحدة تلقائياً
        if (!inputToolName.value.trim()) {
            inputToolName.value = getStrictRandomItem(trendingTools, 'viral_used_tools');
        }

        const toolName = inputToolName.value.trim();
        const audience = selectAudience.options[selectAudience.selectedIndex].text; // استخدام النص المعروض
        const triggerWord = inputTrigger.value.trim() || 'أداة';
        
        const originalBtnText = btnGenerate.innerHTML;
        btnGenerate.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> جاري توليد محتوى فريد...';
        btnGenerate.disabled = true;

        setTimeout(() => {
            
            // سحب القوالب الفريدة
            let hookRaw = getStrictRandomItem(hooksDb, 'viral_used_hooks');
            let visualRaw = getStrictRandomItem(visualsDb, 'viral_used_visuals');
            let scriptRaw = getStrictRandomItem(scriptsDb, 'viral_used_scripts');
            let captionRaw = getStrictRandomItem(captionsDb, 'viral_used_captions');

            // دالة دمج المتغيرات في النص
            const replaceVars = (text) => {
                return text.replace(/\[الأداة\]/g, `<span class="viral-text-highlight">${toolName}</span>`)
                           .replace(/\[الجمهور\]/g, audience)
                           .replace(/\[الكلمة\]/g, triggerWord);
            };

            // حقن الـ HTML
            document.getElementById('hooks-content').innerHTML = `
                <div class="viral-hook">
                    <div class="hook-number"><i class="ri-fire-fill"></i></div>
                    <div>${replaceVars(hookRaw)}</div>
                </div>
            `;

            document.getElementById('visual-content').innerHTML = replaceVars(visualRaw);
            document.getElementById('script-content').innerHTML = replaceVars(scriptRaw).replace(/\n/g, '<br><br>');
            document.getElementById('caption-content').innerHTML = replaceVars(captionRaw).replace(/\n/g, '<br><br>');

            btnGenerate.innerHTML = originalBtnText;
            btnGenerate.disabled = false;

        }, 800); 
    });

});
