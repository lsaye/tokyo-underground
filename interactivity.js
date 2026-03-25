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

        // After 1.4s, show frame 3 (full UI)
        setTimeout(function () {
            frame3.classList.add('active');
        }, 2800);
    });
})();