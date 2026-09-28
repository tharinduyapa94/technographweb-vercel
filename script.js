import { Collapse } from 'bootstrap';

/* =========================================================
  Technograph — Frontend script
   Frontend-only for now. See TODO comments for future
   backend/API integration points.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  initNavbarCollapseOnClick();
  initContactForm();
});

/* ---------- Scroll reveal (fade-up on view) ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Close mobile nav after clicking a link ---------- */
function initNavbarCollapseOnClick() {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;
  navMenu.querySelectorAll('a.nav-link, a.btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateContactForm(form)) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.style.color = '#B4232C';
      return;
    }

    await submitContactForm(form, status);
  });
}

function validateContactForm(form) {
  let valid = form.checkValidity();
  form.classList.add('was-validated');
  return valid;
}

async function submitContactForm(form, status) {
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  status.textContent = 'Sending your enquiry...';
  status.style.color = '';

  try {
    const response = await fetch('https://formspree.io/f/xkjgkwwo', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Form submission failed');

    status.textContent = "Thanks. Your enquiry has been sent. We'll be in touch soon.";
    status.style.color = '#0E8F82';
    form.reset();
    form.classList.remove('was-validated');
  } catch {
    status.textContent = 'We could not send your enquiry. Please try again or email technographinformation@gmail.com.';
    status.style.color = '#B4232C';
  } finally {
    submitButton.disabled = false;
  }
}

/* =========================================================
   FUTURE BACKEND / API INTEGRATION NOTES
   ---------------------------------------------------------
   Suggested endpoints for a future backend:
     POST /api/contact       – contact form / enquiries
     GET  /api/products      – product catalogue
     GET  /api/testimonials  – customer testimonials
     GET  /api/services      – services list
     POST /api/enquiries     – product/service enquiries

   Keep UI logic (DOM updates) separate from data-fetching
   functions like submitContactForm() so a real API client
   can be swapped in without touching the rest of the page.
   ========================================================= */
