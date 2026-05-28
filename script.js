/* =============================================
   PORTFOLIO – script.js
   Author: Dhanyata Kothapalli
   ============================================= */

/* =============================================
   1. LOADING SCREEN
   ============================================= */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Hide loader after a short delay for effect
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);
});

/* =============================================
   2. PARTICLES BACKGROUND
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  let W, H;

  // Resize canvas to fill window
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particle constructor
  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.5 + 0.5;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    // Wrap around edges
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  };

  // Create particles
  const COUNT = 80;
  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
  }

  // Draw connections between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
      ctx.fill();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* =============================================
   3. TYPING ANIMATION
   ============================================= */
(function initTyping() {
  const el     = document.getElementById('typed-text');
  const words  = ['Full Stack Developer', 'AI Enthusiast', 'Frontend Developer', 'Problem Solver'];
  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  const SPEED_TYPE   = 90;   // ms per character when typing
  const SPEED_DELETE = 50;   // ms per character when deleting
  const PAUSE_END    = 1800; // pause at end of word
  const PAUSE_START  = 400;  // pause before typing next word

  function type() {
    const current = words[wordIdx];

    if (!deleting) {
      // Typing forward
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        // Finished typing — pause then start deleting
        deleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
      setTimeout(type, SPEED_TYPE);
    } else {
      // Deleting
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        // Finished deleting — move to next word
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(type, PAUSE_START);
        return;
      }
      setTimeout(type, SPEED_DELETE);
    }
  }
  type();
})();

/* =============================================
   4. STICKY NAVBAR + ACTIVE LINK HIGHLIGHT
   ============================================= */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add scrolled class for glass effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveLink();
    toggleScrollTop();
  });

  // Highlight the nav link whose section is in view
  function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
})();

/* =============================================
   5. MOBILE HAMBURGER MENU
   ============================================= */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
})();

/* =============================================
   6. SCROLL REVEAL ANIMATIONS
   ============================================= */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals slightly
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Add stagger delays to grid children
  document.querySelectorAll('.skills-grid, .about-grid, .projects-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.dataset.delay = i * 80;
    });
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* =============================================
   7. SCROLL-TO-TOP BUTTON
   ============================================= */
function toggleScrollTop() {
  const btn = document.getElementById('scroll-top');
  btn.classList.toggle('visible', window.scrollY > 400);
}

document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   8. SMOOTH SCROLLING FOR NAV LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* =============================================
   9. CONTACT FORM HANDLER (EmailJS)
   ============================================= */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    // Show sending state
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled  = true;

    // EmailJS send
    emailjs.sendForm('service_ydr05ce', 'template_4e6ulsy', form)
      .then(() => {
        // Success
        form.reset();
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        btn.disabled  = false;
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      })
      .catch((err) => {
        // Error
        console.error('EmailJS error:', err);
        btn.innerHTML = 'Failed — Try Again <i class="fas fa-exclamation-circle"></i>';
        btn.disabled  = false;
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        setTimeout(() => {
          btn.innerHTML    = 'Send Message <i class="fas fa-paper-plane"></i>';
          btn.style.background = '';
        }, 3000);
      });
  });
})();

/* =============================================
   10. BUTTON HOVER RIPPLE EFFECT
   ============================================= */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    // Create ripple element
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top  - size / 2}px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.5s ease-out forwards;
      pointer-events: none;
    `;
    // Ensure button has relative positioning
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);
