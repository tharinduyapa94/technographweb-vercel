/* =========================================================
   [YOUR COMPANY NAME] — Frontend script
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
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
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

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateContactForm(form)) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.style.color = '#B4232C';
      return;
    }

    const data = collectFormData(form);
    submitContactForm(data);
  });
}

function validateContactForm(form) {
  let valid = form.checkValidity();
  form.classList.add('was-validated');
  return valid;
}

function collectFormData(form) {
  return {
    name: form.name.value.trim(),
    business: form.business.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    interest: form.interest.value,
    message: form.message.value.trim(),
  };
}

function submitContactForm(data) {
  // TODO: Connect contact form to backend API
  // Example future integration:
  //
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => res.json())
  //   .then((result) => showFormSuccess())
  //   .catch((err) => showFormError(err));

  console.log('Contact form data (not yet sent — no backend connected):', data);
  showFormSuccess();
}

function showFormSuccess() {
  const status = document.getElementById('formStatus');
  const form = document.getElementById('contactForm');
  status.textContent =
    "Thanks — this form isn't connected to a server yet, but your enquiry details were captured.";
  status.style.color = '#0E8F82';
  form.reset();
  form.classList.remove('was-validated');
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
