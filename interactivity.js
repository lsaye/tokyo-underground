    const ambience = new Audio('sound_effects/backgroundambience.mp3');
    ambience.loop = true;
    ambience.volume = 1;
    const ch12audio = new Audio('sound_effects/ch1.2audio.mp3');
    const ch14audio = new Audio('sound_effects/ch1.4audio.mp3');
    const driftSound = new Audio('sound_effects/driftsound1.mp3');
    ch12audio.preload = 'auto';
    ch14audio.preload = 'auto';
    driftSound.preload = 'auto';

    (function () {
    const btn    = document.getElementById('pushToStart');
    const frame2 = document.getElementById('frame2');
    const frame3 = document.getElementById('frame3');
    const prompt = document.getElementById('introPrompt');

    if (!btn) return;

    btn.addEventListener('click', function onStart() {
        btn.removeEventListener('click', onStart);
        const carStart = new Audio('sound_effects/carstart1.mp3');
        carStart.volume = 1.0;
        carStart.play();
        ambience.play();
        ch12audio.load();
        ch14audio.load();
        driftSound.load();
        [ch12audio, ch14audio, driftSound].forEach(function(a) {
            a.muted = true;
            a.play().then(function() {
            a.pause();
        a.currentTime = 0;
        a.muted = false;
        }).catch(function() {
        a.muted = false;
        });
        });
        btn.classList.add('done');
        prompt.classList.add('hidden');

        // Show frame 2 (NISSAN boot screen)
        frame2.classList.add('active');
        document.getElementById('sunsetBg').classList.add('active');

        // After 1.4s, show frame 3 (full UI)
        setTimeout(function () {
            frame3.classList.add('active');
            // immediate: add lit background to body so background swaps right away
            if (document.body) document.body.classList.add('lit-bg');
            const scrollCue = document.getElementById('scrollCue');
        if (scrollCue) scrollCue.classList.add('visible');
        }, 2200);

    });
})();

(function () {
    const btn     = document.getElementById('pushToStart');
    const frame3  = document.getElementById('frame3');
    const subway1 = document.getElementById('subway1');
    const subway2 = document.getElementById('subway2');

    if (!btn || !subway1 || !subway2) return;

    // Watch for frame3 becoming active (dashboard fully on)
    const observer = new MutationObserver(function () {
        if (frame3.classList.contains('active')) {
            observer.disconnect();

            // Add lit background when final frame is active
            document.body && document.body.classList.add('lit-bg');

            // Wait for dashboard animation to settle, then fade in subway1
            setTimeout(function () {
                subway1.style.opacity = '1';

                // 2 seconds later, cross-fade to subway2
                setTimeout(function () {
                    subway2.style.opacity = '1';
                    ch12audio.play();
                }, 6000);

            }, 2200);
        }
    });

    observer.observe(frame3, { attributes: true, attributeFilter: ['class'] });
})();
(function () {
    const subway2   = document.getElementById('subway2');
    const ch1_3     = document.getElementById('ch1_3');
    const ch1_4     = document.getElementById('ch1_4');
    const prompt    = document.getElementById('answerPrompt');
    const handle    = document.getElementById('dragHandle');

    if (!subway2 || !ch1_3) return;

    // Watch for subway2 becoming visible, then trigger ch1_3
    const obs = new MutationObserver(function () {
        if (parseFloat(subway2.style.opacity) === 1) {
            obs.disconnect();
            setTimeout(function () {
                ch1_3.style.opacity = '1';
                setTimeout(function () {
                    prompt.classList.add('visible');
                }, 1500);
            }, 4000); // wait 4s after subway2 appears
        }
    });
    obs.observe(subway2, { attributes: true, attributeFilter: ['style'] });

    // Drag to answer
    if (!handle) return;

    let startX = 0;
    let dragging = false;
    const threshold = 100; // px drag distance to trigger

    handle.addEventListener('mousedown', function (e) {
        dragging = true;
        startX = e.clientX;
        handle.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        const dx = e.clientX - startX;
        if (dx > 0) {
            handle.style.transform = `translateX(${Math.min(dx, threshold + 20)}px)`;
        }
        if (dx >= threshold) {
            dragging = false;
            handle.style.transition = 'opacity 0.3s ease';
            handle.style.opacity = '0';
            prompt.style.opacity = '0';
            ch1_4.style.opacity = '1';
            const ch14audio = new Audio('sound_effects/ch1.4audio.mp3');
            ch14audio.play();
        }
        document.getElementById('postStoryScroll').style.opacity = '1';
    });

    document.addEventListener('mouseup', function () {
        if (dragging) {
            dragging = false;
            handle.style.transform = 'translateX(0)';
            handle.style.cursor = 'grab';
        }
    });

    // Touch support
    handle.addEventListener('touchstart', function (e) {
        dragging = true;
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        const dx = e.touches[0].clientX - startX;
        if (dx > 0) {
            handle.style.transform = `translateX(${Math.min(dx, threshold + 20)}px)`;
        }
        if (dx >= threshold) {
            dragging = false;
            handle.style.opacity = '0';
            prompt.style.opacity = '0';
            ch1_4.style.opacity = '1';
            const ch14audio = new Audio('sound_effects/ch1.4audio.mp3');
            ch14audio.play();
            document.getElementById('postStoryScroll').style.opacity = '1';
        }
    });

    document.addEventListener('touchend', function () {
        if (dragging) {
            dragging = false;
            handle.style.transform = 'translateX(0)';
        }
    });
})();

(function () {
    const ch2_1 = document.getElementById('ch2_1');
    const ch2_2 = document.getElementById('ch2_2');

    if (!ch2_1 || !ch2_2) return;

    let triggered = false;

    window.addEventListener('scroll', function onScroll() {
        if (triggered) return;
        const scene = document.getElementById('ch2Scene');
        const rect = scene.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            triggered = true;
            window.removeEventListener('scroll', onScroll);
            setTimeout(function () {
                ch2_1.style.opacity = '1';
                setTimeout(function () {
                    ch2_2.style.opacity = '1';
                    setTimeout(function () {
                        const car = document.getElementById('animatedCar');
                        car.style.opacity = '1';
                        void car.offsetWidth;
                        car.classList.add('drive-in');
                        driftSound.currentTime = 0;
                        console.log('drift readyState:', driftSound.readyState, 'paused:', driftSound.paused, 'src:', driftSound.src);
                        driftSound.play().catch(function(e){ console.log('drift error:', e); });
                    }, 4000);
                }, 4000);
            }, 300);
        }
    });
})();