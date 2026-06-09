// js/video-renderer.js - محرك إنتاج وتصدير الفيديو

document.addEventListener('DOMContentLoaded', () => {
    
    const btnRender = document.getElementById('btn-render-video');
    const btnDownload = document.getElementById('btn-download-video');
    const canvas = document.getElementById('video-canvas');
    const ctx = canvas.getContext('2d');
    const audioUpload = document.getElementById('audio-upload');
    const bgAudio = document.getElementById('bg-audio');
    const overlay = document.getElementById('preview-overlay');
    const progressDiv = document.getElementById('render-progress');
    const progressText = document.getElementById('progress-text');

    let mediaRecorder;
    let recordedChunks = [];
    let animationId;
    let isRecording = false;

    // إعدادات الفيديو
    const FPS = 30;
    const VIDEO_DURATION = 15; // 15 seconds
    
    // نظام الجزيئات السينمائية (Particles)
    let particles = [];
    for(let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 1 + 0.2,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    // إعداد الصوت عند تحميل ملف
    audioUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            bgAudio.src = url;
        }
    });

    // دالة رسم الإطار (Cinematic Frame)
    function drawFrame(timeSeconds, toolName, audience, triggerWord) {
        
        // 1. الخلفية السينمائية (Dark Cinematic Vignette)
        const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 50, 
            canvas.width/2, canvas.height/2, canvas.height
        );
        // لون أزرق منتصف الليل داكن جداً يميل للأسود
        gradient.addColorStop(0, '#111827'); 
        gradient.addColorStop(1, '#030712');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. تحديث ورسم الجزيئات المضيئة (Cinematic Dust/Bokeh)
        ctx.save();
        particles.forEach(p => {
            p.y -= p.speedY;
            p.x += p.speedX;
            if(p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * (0.5 + Math.sin(timeSeconds * 3 + p.x)*0.5)})`;
            ctx.shadowColor = '#D4AF37';
            ctx.shadowBlur = 10;
            ctx.fill();
        });
        ctx.restore();

        // 3. الفلاش السينمائي عند انتقال المشاهد (الثانية 5 و 10)
        if ((timeSeconds > 4.9 && timeSeconds < 5.2) || (timeSeconds > 9.9 && timeSeconds < 10.2)) {
            let flashOpacity = Math.max(0, 1 - Math.abs(Math.sin(timeSeconds * 10)));
            ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity * 0.3})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 4. المشاهد السينمائية
        if (timeSeconds < 5) {
            // المشهد الأول: الخطاف بانبثاق وتوهج (Neon Glow)
            let fadeIn = Math.min(1, timeSeconds * 2); // 0.5s fade
            
            ctx.save();
            ctx.globalAlpha = fadeIn;
            
            // الكلمة السرية (توهج ذهبي)
            ctx.fillStyle = '#D4AF37';
            ctx.shadowColor = '#D4AF37';
            ctx.shadowBlur = 25;
            ctx.font = 'bold 45px Cairo';
            
            let scale = 1 + Math.sin(timeSeconds * 2) * 0.05; // نبض خفيف بطيء
            ctx.translate(canvas.width / 2, canvas.height / 2 - 80);
            ctx.scale(scale, scale);
            ctx.fillText('أداة سرية', 0, 0);
            ctx.restore();

            // باقي النص بانسيابية من الأسفل
            ctx.save();
            let yOffset = Math.max(0, 30 - timeSeconds * 30); // Slide up effect
            ctx.translate(0, yOffset);
            ctx.globalAlpha = Math.min(1, Math.max(0, timeSeconds - 0.5));
            ctx.fillStyle = '#F3F4F6'; // أبيض ناصع
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 10;
            ctx.font = 'bold 32px Cairo';
            wrapText(ctx, `ستغير حياتك كـ ${audience}! 🤯`, canvas.width / 2, canvas.height / 2 + 20, 480, 50);
            ctx.restore();

        } else if (timeSeconds >= 5 && timeSeconds < 10) {
            // المشهد الثاني: استعراض اسم الأداة بفخامة
            let sceneTime = timeSeconds - 5;
            let fadeIn = Math.min(1, sceneTime * 2);
            
            ctx.save();
            ctx.globalAlpha = fadeIn;
            ctx.fillStyle = '#D1D5DB';
            ctx.font = 'bold 30px Cairo';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 5;
            ctx.fillText('السر يكمن في أداة:', canvas.width / 2, canvas.height / 2 - 80);
            
            // مستطيل زجاجي خلف اسم الأداة (Glassmorphism Effect)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
            ctx.lineWidth = 2;
            ctx.roundRect(30, canvas.height / 2 - 30, 480, 100, 20);
            ctx.fill();
            ctx.stroke();

            // اسم الأداة بتوهج درامي
            ctx.fillStyle = '#D4AF37';
            ctx.shadowColor = '#D4AF37';
            ctx.shadowBlur = 30 + Math.sin(sceneTime * 5) * 15; // توهج نابض
            ctx.font = 'bold 55px Alexandria';
            ctx.fillText(toolName, canvas.width / 2, canvas.height / 2 + 20);
            ctx.restore();

        } else if (timeSeconds >= 10) {
            // المشهد الثالث: الـ CTA (دعوة لاتخاذ إجراء قوية)
            let sceneTime = timeSeconds - 10;
            let fadeIn = Math.min(1, sceneTime * 2);
            
            ctx.save();
            ctx.globalAlpha = fadeIn;
            
            ctx.fillStyle = '#F3F4F6';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 10;
            ctx.font = 'bold 32px Cairo';
            wrapText(ctx, 'للحصول على الرابط والشرح المجاني', canvas.width / 2, canvas.height / 2 - 100, 480, 45);

            // زر وهمي للتعليق
            ctx.fillStyle = 'rgba(37, 211, 102, 0.15)'; // لون واتساب باهت
            ctx.strokeStyle = '#25D366';
            ctx.lineWidth = 3;
            let pulse = 1 + Math.sin(sceneTime * 8) * 0.05;
            ctx.translate(canvas.width / 2, canvas.height / 2 + 10);
            ctx.scale(pulse, pulse);
            ctx.roundRect(-150, -45, 300, 90, 45);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#25D366';
            ctx.shadowColor = '#25D366';
            ctx.shadowBlur = 20;
            ctx.font = 'bold 40px Cairo';
            ctx.fillText(`اكتب "${triggerWord}"`, 0, 0);
            ctx.restore();

            ctx.save();
            ctx.globalAlpha = Math.min(1, Math.max(0, sceneTime - 1));
            ctx.fillStyle = '#D1D5DB';
            ctx.font = '24px Cairo';
            ctx.fillText('في التعليقات وسأرسله فوراً! 📩', canvas.width / 2, canvas.height / 2 + 120);
            ctx.restore();
        }

        // علامة مائية سينمائية
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.font = '18px Alexandria';
        ctx.letterSpacing = '2px';
        ctx.fillText('HAYTHAM IBRAHIM', canvas.width / 2, canvas.height - 40);
    }

    // إضافة دعم رسم المستطيل بحواف دائرية للـ Canvas
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x+r, y);
        this.arcTo(x+w, y,   x+w, y+h, r);
        this.arcTo(x+w, y+h, x,   y+h, r);
        this.arcTo(x,   y+h, x,   y,   r);
        this.arcTo(x,   y,   x+w, y,   r);
        this.closePath();
        return this;
    }

    // دالة مساعدة لتقطيع النص إلى أسطر
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        let words = text.split(' ');
        let line = '';
        let currentY = y;

        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, currentY);
    }

    // تهيئة الشاشة الافتراضية
    drawFrame(0, 'اسم الأداة', 'الجمهور', 'كلمة سرية');

    btnRender.addEventListener('click', () => {
        if (!bgAudio.src || bgAudio.src === window.location.href) {
            alert('يرجى تحميل ملف الموسيقى (MP3) أولاً لدمجه مع الفيديو!');
            return;
        }

        const toolName = document.getElementById('viral-tool-name').value.trim() || 'Midjourney';
        const audience = document.getElementById('viral-audience').value;
        const triggerWord = document.getElementById('viral-trigger').value.trim() || 'أداة';

        // إعدادات التسجيل
        const canvasStream = canvas.captureStream(FPS);
        let audioStream;
        
        try {
            // توصيل الصوت بـ Web Audio API لدمجه
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const sourceNode = audioCtx.createMediaElementSource(bgAudio);
            const destNode = audioCtx.createMediaStreamDestination();
            sourceNode.connect(destNode);
            sourceNode.connect(audioCtx.destination); // لسماع الصوت أثناء الريندر
            audioStream = destNode.stream;
        } catch (e) {
            console.error('Audio routing error, falling back', e);
            // في حال عدم دعم المتصفح
            bgAudio.play();
        }

        // دمج المسارين (فيديو + صوت)
        const combinedStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...(audioStream ? audioStream.getAudioTracks() : [])
        ]);

        mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp9' });
        recordedChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            btnDownload.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `Viral_Reel_${toolName}.webm`;
                a.click();
            };
            btnDownload.style.display = 'block';
            progressDiv.innerHTML = '<i class="ri-checkbox-circle-fill"></i> اكتمل إنشاء الفيديو! يمكنك تحميله الآن.';
            btnRender.innerHTML = '<i class="ri-refresh-line"></i> إعادة الإنشاء';
            overlay.style.display = 'flex';
        };

        // بدء الريندر والتسجيل
        overlay.style.display = 'none';
        progressDiv.style.display = 'block';
        btnRender.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> جاري الإنشاء...';
        btnDownload.style.display = 'none';
        bgAudio.currentTime = 0;
        bgAudio.play();
        
        mediaRecorder.start();
        isRecording = true;

        let startTime = performance.now();

        function renderLoop(now) {
            const timeSeconds = (now - startTime) / 1000;
            
            // تحديث شريط التقدم
            const percent = Math.min(100, Math.floor((timeSeconds / VIDEO_DURATION) * 100));
            progressText.innerText = `${percent}%`;

            drawFrame(timeSeconds, toolName, audience, triggerWord);

            if (timeSeconds < VIDEO_DURATION) {
                animationId = requestAnimationFrame(renderLoop);
            } else {
                mediaRecorder.stop();
                bgAudio.pause();
                isRecording = false;
            }
        }

        requestAnimationFrame(renderLoop);
    });
});
