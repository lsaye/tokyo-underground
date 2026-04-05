(function () {
    const btn    = document.getElementById('pushToStart');
    const frame2 = document.getElementById('frame2');
    const frame3 = document.getElementById('frame3');
    const prompt = document.getElementById('introPrompt');

    if (!btn) return;

    btn.addEventListener('click', function onStart() {
        btn.removeEventListener('click', onStart);
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

                // 2 seconds later, cross-fade to subway2 (with thought bubble)
                setTimeout(function () {
                    subway2.style.opacity = '1';
                }, 6000);

            }, 2200); // matches your existing frame3 delay
        }
    });

    observer.observe(frame3, { attributes: true, attributeFilter: ['class'] });
})();