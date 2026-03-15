// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.feature-card, .step, .provider-card, .integration-pill, .cta-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add fade-in CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .feature-card.fade-in:nth-child(2) { transition-delay: 0.1s; }
  .feature-card.fade-in:nth-child(3) { transition-delay: 0.2s; }
  .feature-card.fade-in:nth-child(4) { transition-delay: 0.1s; }
  .feature-card.fade-in:nth-child(5) { transition-delay: 0.2s; }
  .feature-card.fade-in:nth-child(6) { transition-delay: 0.3s; }
  .step.fade-in:nth-child(3) { transition-delay: 0.15s; }
  .step.fade-in:nth-child(5) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Screenshot tab switching
document.querySelectorAll('.screenshot-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.screenshot-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.screenshot-panel').forEach((s) => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// Dark/Light comparison slider
(function () {
  const slider = document.getElementById('comparison-slider');
  if (!slider) return;

  const overlay = slider.querySelector('.comparison-overlay');
  const darkImg = overlay.querySelector('.comparison-img');
  const handle = slider.querySelector('.comparison-handle');
  let isDragging = false;

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    overlay.style.width = pct + '%';
    darkImg.style.width = (rect.width) + 'px';
    handle.style.left = pct + '%';
  }

  // Initialize dark image width on load/resize
  function initSize() {
    darkImg.style.width = slider.offsetWidth + 'px';
  }
  window.addEventListener('resize', initSize);
  // Run on load + after image loads
  initSize();
  darkImg.addEventListener('load', initSize);

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    setPosition(e.clientX);
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
})();

// Nav: compact on scroll, hide on fast scroll down, show on scroll up
(function() {
  const navEl = document.querySelector('.nav');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Compact after leaving hero
    navEl.classList.toggle('nav-compact', y > 100);

    // Hide on scroll down (past hero), show on scroll up
    if (y > 400 && y - lastY > 10) {
      navEl.classList.add('nav-hidden');
    } else if (lastY - y > 5 || y < 100) {
      navEl.classList.remove('nav-hidden');
    }

    lastY = y;
  }, { passive: true });
})();
