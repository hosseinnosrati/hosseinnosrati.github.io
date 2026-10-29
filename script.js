// ==========================================================================
// 3D Motion, Section Snapping Dots & DSP Signal Wave Background Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Animated DSP Multi-Tone Sine Wave Background (Canvas Engine)
  const canvas = document.getElementById('dsp-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let step = 0;

    function renderWaves() {
      ctx.clearRect(0, 0, width, height);

      // Wave 1: Electric Cyan Carrier Wave
      ctx.beginPath();
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.shadowColor = 'rgba(56, 189, 248, 0.65)';
      ctx.shadowBlur = 14;

      for (let x = 0; x < width; x += 4) {
        const y = Math.sin(x * 0.0035 + step) * 45 + Math.cos(x * 0.007 + step * 0.8) * 20 + height * 0.45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2: Neon Violet / Harmonics Wave
      ctx.beginPath();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.shadowColor = 'rgba(168, 85, 247, 0.55)';
      ctx.shadowBlur = 12;

      for (let x = 0; x < width; x += 4) {
        const y = Math.sin(x * 0.005 - step * 1.2) * 35 + Math.sin(x * 0.002 + step * 0.5) * 25 + height * 0.55;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 3: Emerald Baseband Trace
      ctx.beginPath();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.28)';
      ctx.shadowColor = 'rgba(52, 211, 153, 0.45)';
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x += 5) {
        const y = Math.cos(x * 0.002 + step * 0.6) * 55 + height * 0.65;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += 0.016;
      requestAnimationFrame(renderWaves);
    }

    renderWaves();
  }

  // 2. Active Dot Tracker for Section-by-Section 3D Snap
  const sections = document.querySelectorAll('.snap-section');
  const navDots = document.querySelectorAll('.dot-item a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navDots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // 3. Interactive 3D Card Tilt Effect
  const tiltCards = document.querySelectorAll('.tilt-card-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6.5;
      const rotateY = ((x - centerX) / centerX) * 6.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

});
