    const ambience      = new Audio('sound_effects/backgroundambience.mp3');
    ambience.loop = true;
    ambience.volume = 1;
    const ch12audio     = new Audio('sound_effects/ch1.2audio.mp3');
    const ch14audio     = new Audio('sound_effects/ch1.4audio.mp3');
    const driftSound    = new Audio('sound_effects/driftsound1.mp3');
    const engineRev     = new Audio('sound_effects/enginerev.mp3');
    const crowdSound    = new Audio('sound_effects/crowd.mp3');
    const sirenSound    = new Audio('sound_effects/siren.mp3');
    const tyreScreech   = new Audio('sound_effects/tyrescreech.mp3');
    const shiftSound    = new Audio('sound_effects/gearshift.mp3');
    const ch23audio     = new Audio('sound_effects/ch2.3audio.mp3');
    const ch24audio     = new Audio('sound_effects/ch2.4audio.mp3');
    const ch34audio     = new Audio('sound_effects/ch3.4audio.mp3');
    const ch41audio     = new Audio('sound_effects/ch4.1audio.mp3');
    const ch42audio     = new Audio('sound_effects/ch4.2audio.mp3');
    const ch43audio     = new Audio('sound_effects/ch4.3audio.mp3');
    const chaseAudio    = new Audio('sound_effects/chaseaudio.mp3');
    sirenSound.loop     = true;
    chaseAudio.loop     = true;
    engineRev.volume    = 0.6;
    crowdSound.volume   = 0.5;
    shiftSound.volume   = 1.0;
    ch12audio.preload   = 'auto';
    ch14audio.preload   = 'auto';
    driftSound.preload  = 'auto';
    engineRev.preload   = 'auto';
    crowdSound.preload  = 'auto';
    sirenSound.preload  = 'auto';
    tyreScreech.preload = 'auto';
    shiftSound.preload  = 'auto';
    ch23audio.preload   = 'auto';
    ch24audio.preload   = 'auto';
    ch34audio.preload   = 'auto';
    ch41audio.preload   = 'auto';
    ch42audio.preload   = 'auto';
    ch43audio.preload   = 'auto';
    chaseAudio.preload  = 'auto';

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

        [ch12audio, ch14audio, driftSound, engineRev, crowdSound, sirenSound, tyreScreech, shiftSound,
         ch23audio, ch24audio, ch34audio, ch41audio, ch42audio, ch43audio, chaseAudio].forEach(function(a) {
            a.load();
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

        frame2.classList.add('active');
        document.getElementById('sunsetBg').classList.add('active');

        setTimeout(function () {
            frame3.classList.add('active');
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

    const observer = new MutationObserver(function () {
        if (frame3.classList.contains('active')) {
            observer.disconnect();
            document.body && document.body.classList.add('lit-bg');
            setTimeout(function () {
                subway1.style.opacity = '1';
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

    const obs = new MutationObserver(function () {
        if (parseFloat(subway2.style.opacity) === 1) {
            obs.disconnect();
            setTimeout(function () {
                ch1_3.style.opacity = '1';
                setTimeout(function () {
                    prompt.classList.add('visible');
                }, 1500);
            }, 4000);
        }
    });
    obs.observe(subway2, { attributes: true, attributeFilter: ['style'] });

    if (!handle) return;

    let startX = 0;
    let dragging = false;
    const threshold = 100;

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
                        setTimeout(function () {
                            document.getElementById('postCh2Scroll').style.opacity = '1';
                        }, 3000);
                    }, 4000);
                }, 4000);
            }, 300);
        }
    });
})();

(function () {
    const ch2_3 = document.getElementById('ch2_3');
    const ch2_4 = document.getElementById('ch2_4');
    const ch2_5 = document.getElementById('ch2_5');

    if (!ch2_3 || !ch2_4 || !ch2_5) return;

    let triggered = false;

    window.addEventListener('scroll', function onScroll() {
        if (triggered) return;
        const scene = document.getElementById('ch2bScene');
        const rect  = scene.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            triggered = true;
            window.removeEventListener('scroll', onScroll);

            setTimeout(function () {
                ch2_3.style.opacity = '1';
                ch23audio.currentTime = 0;
                ch23audio.play().catch(() => {});
            }, 500);

            setTimeout(function () {
                ch2_4.style.opacity = '1';
                ch24audio.currentTime = 0;
                ch24audio.play().catch(() => {});
            }, 7000);

            setTimeout(function () {
                ch2_5.style.opacity = '1';
                setTimeout(function () {
                    document.getElementById('postCh2bScroll').style.opacity = '1';
                }, 6000);
            }, 13000);
        }
    });
})();

(function () {
    const transitionEl = document.getElementById('chTransitionText');
    if (!transitionEl) return;

    let triggered = false;

    window.addEventListener('scroll', function onScroll() {
        if (triggered) return;
        const rect = transitionEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            triggered = true;
            window.removeEventListener('scroll', onScroll);
            transitionEl.classList.add('visible');
        }
    });
})();

(function () {
  const scene        = document.getElementById('ch3Scene');
  const ch3_1        = document.getElementById('ch3_1');
  const ch3_2        = document.getElementById('ch3_2');
  const ch3_3        = document.getElementById('ch3_3');
  const ch3_4        = document.getElementById('ch3_4');
  const countdown    = document.getElementById('raceCountdown');
  const countNum     = document.getElementById('countdownNum');
  const shiftPrompt  = document.getElementById('shiftPrompt');
  const shiftBtn     = document.getElementById('shiftBtn');
  const shiftCounter = document.getElementById('shiftCounter');
  if (!scene) return;

  let triggered = false;
  let shiftsDone = 0;
  const SHIFTS_NEEDED = 3;
  let shiftComplete = false;

  window.addEventListener('scroll', function ch3Scroll() {
    if (triggered) return;
    const rect = scene.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.65) {
      triggered = true;
      window.removeEventListener('scroll', ch3Scroll);

      setTimeout(() => { ch3_1.style.opacity = '1'; }, 1000);

      setTimeout(() => {
        ch3_2.style.opacity = '1';
        crowdSound.play().catch(() => {});
        setTimeout(() => {
          document.getElementById('postCh3Row1Scroll').style.opacity = '1';
        }, 5000);
      }, 8000);

      setTimeout(() => {
        const steps = ['3', '2', '1', 'GO!'];
        countdown.classList.add('visible');
        steps.forEach((val, i) => {
          setTimeout(() => {
            countNum.textContent = val;
            countNum.style.animation = 'none';
            void countNum.offsetWidth;
            countNum.style.animation = 'count-pop 0.8s ease-out forwards';
            if (i === steps.length - 1) {
              setTimeout(() => countdown.classList.remove('visible'), 900);
            }
          }, i * 950);
        });
      }, 14000);

      setTimeout(() => {
        ch3_3.style.opacity = '1';
        engineRev.play().catch(() => {});
        shiftPrompt.classList.add('visible');
      }, 19000);
    }
  });

  function doShift() {
    if (shiftComplete) return;
    shiftsDone++;
    shiftCounter.textContent = `${shiftsDone} / ${SHIFTS_NEEDED}`;
    shiftSound.currentTime = 0;
    shiftSound.play().catch(() => {});
    shiftBtn.style.boxShadow = '0 0 40px var(--neon-blue)';
    setTimeout(() => { shiftBtn.style.boxShadow = ''; }, 200);

    if (shiftsDone >= SHIFTS_NEEDED) {
      shiftComplete = true;
      shiftPrompt.style.opacity = '0';
      shiftPrompt.style.pointerEvents = 'none';

      setTimeout(() => {
        ch3_4.style.opacity = '1';
        ch34audio.currentTime = 0;
        ch34audio.play().catch(() => {});
        chaseAudio.currentTime = 0;
        chaseAudio.play().catch(() => {});

        let f = 0;
        const policeFlash = setInterval(() => {
          scene.style.background = f % 2 === 0 ? 'rgba(255,0,60,0.18)' : 'rgba(0,80,255,0.18)';
          f++;
          if (f >= 6) { clearInterval(policeFlash); scene.style.background = '#000'; }
        }, 300);
        setTimeout(() => {
          document.getElementById('postCh3Row2Scroll').style.opacity = '1';
        }, 6000);
      }, 600);
    }
  }

  shiftBtn.addEventListener('click', doShift);
  document.addEventListener('keydown', function (e) {
    if ((e.code === 'Space' || e.code === 'ArrowUp') && shiftPrompt.classList.contains('visible')) {
      e.preventDefault();
      doShift();
    }
  });
})();

(function () {
  const scene        = document.getElementById('ch4Scene');
  const ch4_1        = document.getElementById('ch4_1');
  const ch4_2        = document.getElementById('ch4_2');
  const ch4_3        = document.getElementById('ch4_3');
  const swervePrompt = document.getElementById('swervePrompt');
  const playerEl     = document.getElementById('swerveCar');
  const obsEl        = document.getElementById('swerveObs');
  const livesEl      = document.getElementById('swerveLives');
  const goalEl       = document.getElementById('swerveGoal');
  const hintEl       = document.getElementById('swerveHint');
  const tunnelFlash  = document.getElementById('tunnelFlash');
  const road         = document.getElementById('swerveRoad');
  if (!scene) return;

  const winMsg = document.createElement('p');
  winMsg.className = 'swerve-win-msg';
  winMsg.textContent = 'YOU WIN';
  swervePrompt.appendChild(winMsg);

  const winSub = document.createElement('p');
  winSub.className = 'swerve-win-sub';
  winSub.textContent = 'SCROLL DOWN TO CONTINUE';
  swervePrompt.appendChild(winSub);

  const LANES = [10, 43, 76];
  const PLAYER_LEFT_PX = 30;

  let playerLane     = 1;
  let obsLane        = 1;
  let lives          = 3;
  let evadeCount     = 0;
  const EVADES_NEEDED = 5;
  let swerveActive   = false;
  let swerveComplete = false;
  let triggered      = false;
  let obsAnimFrame   = null;
  let obsStartTime   = null;
  const OBS_DURATION = 1800;

  function setPlayerLane(lane) {
    playerLane = Math.max(0, Math.min(2, lane));
    playerEl.style.top = LANES[playerLane] + '%';
  }

  function setObsLane(lane) {
    obsLane = lane;
    obsEl.style.top = LANES[obsLane] + '%';
  }

  function updateLives() {
    livesEl.textContent = Array(3).fill(0).map((_, i) => i < lives ? '❤️' : '🖤').join('');
  }

  function flashScreen() {
    tunnelFlash.classList.add('flash');
    setTimeout(() => tunnelFlash.classList.remove('flash'), 150);
  }

  function flashHit() {
    road.style.background = 'rgba(255,0,60,0.4)';
    setTimeout(() => { road.style.background = '#111'; }, 250);
  }

  function launchObstacle() {
    if (swerveComplete) return;
    obsStartTime = null;

    const randomLane = Math.floor(Math.random() * 3);
    setObsLane(randomLane);
    hintEl.textContent = ['TOP LANE — MOVE!', 'MIDDLE LANE — MOVE!', 'BOTTOM LANE — MOVE!'][randomLane];

    const roadWidth = road.offsetWidth;
    const startLeft = roadWidth + 10;
    const endLeft   = -60;

    obsEl.style.transition = 'none';
    obsEl.style.left  = startLeft + 'px';
    obsEl.style.right = 'auto';
    void obsEl.offsetWidth;

    function animateObs(timestamp) {
      if (!obsStartTime) obsStartTime = timestamp;
      const elapsed  = timestamp - obsStartTime;
      const progress = Math.min(elapsed / OBS_DURATION, 1);

      const currentLeft = startLeft + (endLeft - startLeft) * progress;
      obsEl.style.left = currentLeft + 'px';

      const collisionStart = PLAYER_LEFT_PX - 40;
      const collisionEnd   = PLAYER_LEFT_PX + 50;

      if (
        currentLeft >= collisionStart &&
        currentLeft <= collisionEnd &&
        obsLane === playerLane &&
        !swerveComplete
      ) {
        cancelAnimationFrame(obsAnimFrame);
        lives = Math.max(0, lives - 1);
        updateLives();
        flashHit();
        tyreScreech.currentTime = 0;
        tyreScreech.play().catch(() => {});

        if (lives <= 0) {
          hintEl.textContent = 'GAME OVER — RESTARTING...';
          chaseAudio.pause();
          sirenSound.pause();
          flashScreen();
          setTimeout(() => { flashScreen(); }, 200);
          setTimeout(() => { window.location.reload(); }, 1500);
          return;
        }

        hintEl.textContent = 'TOO SLOW!';
        setTimeout(() => { if (!swerveComplete) launchObstacle(); }, 1000);
        return;
      }

      if (progress < 1) {
        obsAnimFrame = requestAnimationFrame(animateObs);
      } else {
        if (obsLane !== playerLane) {
          evadeCount++;
          goalEl.textContent = `EVADES: ${evadeCount} / ${EVADES_NEEDED}`;
          hintEl.textContent = evadeCount < EVADES_NEEDED ? 'NICE! KEEP GOING' : '';
          if (evadeCount >= EVADES_NEEDED) {
            completeSwerve();
            return;
          }
        }
        setTimeout(() => { if (!swerveComplete) launchObstacle(); }, 600);
      }
    }

    obsAnimFrame = requestAnimationFrame(animateObs);
  }

  function completeSwerve() {
    swerveComplete = true;
    swerveActive = false;
    cancelAnimationFrame(obsAnimFrame);
    chaseAudio.pause();
    sirenSound.pause();

    swervePrompt.classList.add('win');

    setTimeout(() => {
      flashScreen();
      setTimeout(() => {
        ch4_1.style.opacity = '1';
        ch41audio.currentTime = 0;
        ch41audio.play().catch(() => {});

        setTimeout(() => {
          ch4_2.style.opacity = '1';
          ch42audio.currentTime = 0;
          ch42audio.play().catch(() => {});

          setTimeout(() => {
            document.getElementById('postCh4Row1Scroll').style.opacity = '1';
          }, 5000);

          setTimeout(() => {
            ch4_3.style.opacity = '1';
            ch4_3.style.filter = 'drop-shadow(0 0 20px var(--neon-pink))';
            ch43audio.currentTime = 0;
            ch43audio.play().catch(() => {});

            setTimeout(() => {
              const theEnd = document.querySelector('.the-end-text');
              if (theEnd) theEnd.classList.add('visible');
            }, 6000);
          }, 8000);
        }, 5000);
      }, 1500);
    }, 800);
  }

  function ch4ScrollHandler() {
    if (triggered) return;
    const rect = scene.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.65) {
      triggered = true;
      window.removeEventListener('scroll', ch4ScrollHandler);

      sirenSound.play().catch(() => {});

      setTimeout(() => {
        setPlayerLane(1);
        updateLives();
        swervePrompt.classList.add('visible');
        swerveActive = true;
        launchObstacle();
      }, 1000);
    }
  }

  window.addEventListener('scroll', ch4ScrollHandler);

  document.addEventListener('keydown', function (e) {
    if (!swerveActive || swerveComplete) return;
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      setPlayerLane(playerLane - 1);
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      setPlayerLane(playerLane + 1);
    }
  });

  let touchStartY = 0;
  swervePrompt.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  swervePrompt.addEventListener('touchend', e => {
    if (!swerveActive || swerveComplete) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy < -30) setPlayerLane(playerLane - 1);
    if (dy >  30) setPlayerLane(playerLane + 1);
  });
})();