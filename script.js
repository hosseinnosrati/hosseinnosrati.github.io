// ==========================================================================
// 3D Motion & Interactive Scroll Engine (Pure Vanilla JS - 60 FPS)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-3d');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Once revealed, keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => scrollObserver.observe(el));

  // 2. Interactive 3D Card Tilt Effect (Following Mouse & Gyroscope)
  const tiltCards = document.querySelectorAll('.tilt-card-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angle (-8 to +8 degrees for elegant 3D feel)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // 3. Smooth Dynamic Parallax on Scroll for Ambient Glow Orbs
  const glowOrbs = document.querySelectorAll('.ambient-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    glowOrbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.15;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    }, { passive: true });
  });
});
