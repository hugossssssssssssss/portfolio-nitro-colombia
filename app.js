/**
 * Nitro Colombia 2026 · Web Presentation Engine
 * Inspired by Lusion.co: Fullscreen 16:9 Slides, 3D Packshot Physics & Verbatim Portuguese
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initSideTracker();
  init3DPackshotTilt();
  initScrollReveal();
  initSmoothScroll();
});

/* ==========================================================================
   1. Real-time Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   2. Side Tracker HUD & Active Slide Detection (01 / 21)
   ========================================================================== */
function initSideTracker() {
  const currentSpan = document.getElementById('tracker-current');
  const dotsContainer = document.getElementById('tracker-dots');
  const pillTitle = document.getElementById('pill-title');
  const slides = document.querySelectorAll('.slide-section');

  if (!slides.length || !dotsContainer) return;

  // Generate 21 dots
  dotsContainer.innerHTML = '';
  slides.forEach((slide, idx) => {
    const dot = document.createElement('div');
    dot.className = `tracker-dot ${idx === 0 ? 'active' : ''}`;
    dot.dataset.target = `#${slide.id}`;
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.tracker-dot');

  // IntersectionObserver to detect active slide
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideIndex = entry.target.dataset.slideIndex;
        const slideTitle = entry.target.dataset.slideTitle;

        if (currentSpan) {
          currentSpan.textContent = String(slideIndex).padStart(2, '0');
        }

        if (pillTitle && slideTitle) {
          pillTitle.textContent = slideTitle;
        }

        const numericIndex = parseInt(slideIndex, 10) - 1;
        dots.forEach((d, i) => {
          if (i === numericIndex) {
            d.classList.add('active');
          } else {
            d.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.45
  });

  slides.forEach(s => observer.observe(s));
}

/* ==========================================================================
   3. 3D Packshot Tilt Physics (Lusion.co Signature)
   ========================================================================== */
function init3DPackshotTilt() {
  // Only enable on pointer-capable devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltSections = document.querySelectorAll('.slide-section');

  tiltSections.forEach(section => {
    const tiltEl = section.querySelector('.packshot-stage, .cover-packshot-cluster, .photo-frame');
    if (!tiltEl) return;

    let rafId = null;

    section.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0 to 1
        const y = (e.clientY - rect.top) / rect.height; // 0 to 1

        const tiltX = (x - 0.5) * 2; // -1 to 1
        const tiltY = (y - 0.5) * 2; // -1 to 1

        const rotateX = -tiltY * 14;
        const rotateY = tiltX * 16;
        const translateY = -tiltY * 8;

        tiltEl.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale3d(1.03, 1.03, 1.03)`;
      });
    }, { passive: true });

    section.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      tiltEl.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Smooth Native Navigation Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
}
