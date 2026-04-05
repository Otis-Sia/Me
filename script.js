// ── Navbar: active link on scroll ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');

// Only run scroll-based active tracking when anchor links exist for page sections
const hasAnchorLinks = Array.from(sections).some(section =>
  document.querySelector(`.navbar__links a[href="#${section.getAttribute('id')}"]`)
);

function updateActiveLink() {
  if (!hasAnchorLinks) return;
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.navbar__links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── Mobile menu toggle ──────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});


// ── Fade-in on scroll (Intersection Observer) ──────────────────────────
const fadeEls = document.querySelectorAll(
  '.skill-card, .project-card, .about__stats .stat, .timeline__item'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Also observe any elements that already have .fade-in applied directly in HTML
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ── Back-to-top button ──────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Hero typing animation ──────────────────────────────────────────────
const typingEl = document.getElementById('typingText');
if (typingEl) {
  const words = typingEl.getAttribute('data-words').split(',').map(w => w.trim());
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = words[wordIdx];
    if (deleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    typingEl.textContent = current.slice(0, charIdx);

    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// ── Resume collapse toggle ──────────────────────────────────────────────
const resumeCollapseBtn = document.getElementById('resumeCollapseBtn');
if (resumeCollapseBtn) {
  const resumeWrapper = document.querySelector('.resume__wrapper');
  resumeCollapseBtn.addEventListener('click', () => {
    resumeWrapper.classList.toggle('is-collapsed');
    const isCollapsed = resumeWrapper.classList.contains('is-collapsed');
    resumeCollapseBtn.setAttribute('aria-expanded', !isCollapsed);
  });
}

// ── Formspree Contact Form Init ───────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#contactForm', formId: 'xdappeag' });
}

// ── Animated Counters (Scouting Page) ───────────────────────────────────
const counters = document.querySelectorAll('.scout-stat__number[data-target]');
if (counters.length > 0) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = true;
      const target = +entry.target.dataset.target;
      const suffix = entry.target.dataset.suffix || '';
      const duration = 1400;
      const step = Math.max(1, Math.floor(duration / target));
      let current = 0;
      const timer = setInterval(() => {
        current++;
        entry.target.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));
}

// ── Global Footer Year ──────────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

