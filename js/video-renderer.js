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
    
    // إعداد الصوت عند تحميل ملف
    audioUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            bgAudio.src = url;
        }
    });

    // دالة رسم الإطار (Frame)
    function drawFrame(timeSeconds, toolName, audience, triggerWord) {
        // 1. الخلفية (متدرجة وداكنة وفخمة)
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        // تغيير لون الخلفية تدريجياً بمرور الوقت لإعطاء حركة
        const g1 = Math.floor(20 + Math.sin(timeSeconds) * 10);
        const g2 = Math.floor(40 + Math.cos(timeSeconds) * 10);
        gradient.addColorStop(0, `rgb(${g1}, ${g1}, ${g1})`);
        gradient.addColorStop(1, `rgb(${g2}, ${g2}, ${g2})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. العناصر الزخرفية (دوائر تطفو)
        ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
        for (let i = 0; i < 5; i++) {
            const yPos = (canvas.height + Math.sin(timeSeconds * 2 + i) * 100) % canvas.height;
            ctx.beginPath();
            ctx.arc(canvas.width / 2 + Math.cos(timeSeconds + i) * 100, yPos, 30 + i * 10, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 3. كتابة النص بناءً على توقيت الفيديو
        if (timeSeconds < 5) {
            // المشهد الأول: الخطاف
            ctx.fillStyle = '#D4AF37'; // ذهبي
            ctx.font = 'bold 40px Cairo';
            
            // أنيميشن تكبير تدريجي
            let scale = Math.min(1, timeSeconds * 2);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2 - 50);
            ctx.scale(scale, scale);
            ctx.fillText('أداة سرية', 0, 0);
            ctx.restore();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 30px Cairo';
            ctx.globalAlpha = Math.min(1, Math.max(0, timeSeconds - 0.5));
            wrapText(ctx, `ستغير حياتك كـ ${audience}! 🤯`, canvas.width / 2, canvas.height / 2 + 30, 480, 45);
            ctx.globalAlpha = 1;

        } else if (timeSeconds >= 5 && timeSeconds < 10) {
            // المشهد الثاني: اسم الأداة
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 35px Cairo';
            ctx.fillText('اسم الأداة هو:', canvas.width / 2, canvas.height / 2 - 60);

            // مربع خلف الأداة
            ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
            ctx.fillRect(40, canvas.height / 2 - 20, 460, 80);

            ctx.fillStyle = '#D4AF37';
            ctx.font = 'bold 50px Alexandria';
            ctx.fillText(toolName, canvas.width / 2, canvas.height / 2 + 20);

        } else if (timeSeconds >= 10) {
            // المشهد الثالث: الـ CTA (ManyChat)
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 35px Cairo';
            wrapText(ctx, 'للحصول على الرابط والشرح المجاني', canvas.width / 2, canvas.height / 2 - 80, 480, 45);

            ctx.fillStyle = '#D4AF37';
            ctx.font = 'bold 45px Cairo';
            ctx.fillText('اكتب كلمة:', canvas.width / 2, canvas.height / 2);

            // أنيميشن نبض للكلمة
            let pulse = 1 + Math.sin(timeSeconds * 10) * 0.1;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2 + 80);
            ctx.scale(pulse, pulse);
            ctx.fillStyle = '#25D366'; // لون واتساب/أخضر للأتمتة
            ctx.fillText(`"${triggerWord}"`, 0, 0);
            ctx.restore();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '25px Cairo';
            ctx.fillText('في التعليقات وسأرسله لك فوراً! 📩', canvas.width / 2, canvas.height / 2 + 160);
        }

        // علامة مائية
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '20px Alexandria';
        ctx.fillText('@haytham_ibrahim', canvas.width / 2, canvas.height - 40);
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
