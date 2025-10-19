// main.js — handles theme switching, enquiry form (WhatsApp + Formspree), and small helpers
const sample_count = 15;

// ---------- Theme switching ----------
const THEMES = {
  'black-gold': 'theme-black-gold',
  'white-blue': 'theme-white-blue',
  'brown-cream': 'theme-brown-cream'
};
const themeSelects = document.querySelectorAll('.theme-select');

function applyThemeKey(key){
  const cls = THEMES[key] || THEMES['black-gold'];
  document.body.classList.remove(...Object.values(THEMES));
  document.body.classList.add(cls);
  // persist
  localStorage.setItem('drphot-theme', key);
  // keep selects in sync
  themeSelects.forEach(s => { s.value = key; });
}

// initialize theme selects and bind
themeSelects.forEach(s => {
  // create options if empty (some pages had empty selects)
  if (s.children.length === 0) {
    s.innerHTML = `
      <option value="black-gold">Elegant Black & Gold</option>
      <option value="white-blue">Modern White & Blue</option>
      <option value="brown-cream">Warm Brown & Cream</option>`;
  }
  s.addEventListener('change', (e) => applyThemeKey(e.target.value));
});

// load saved theme or default
(function initTheme(){
  const saved = localStorage.getItem('drphot-theme') || 'black-gold';
  applyThemeKey(saved);
})();

// ---------- Enquiry form handling ----------
const OWNER_WHATSAPP = '919080057005'; // no plus, for wa.me
function el(id){ return document.getElementById(id); }

document.addEventListener('DOMContentLoaded', () => {
  const form = el('enquiryForm');
  if (!form) return;

  // Bootstrap validation
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const req = form.requirement.value.trim();

    // 1) Open WhatsApp with prefilled message
    const waText = encodeURIComponent(`Enquiry from website\nName: ${name}\nPhone: ${phone}\nRequirement: ${req}`);
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${waText}`, '_blank');

  });

  // WhatsApp button (quick open without submitting)
  const waBtn = document.getElementById('whatsappBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name = form.name.value.trim() || 'Guest';
      const phone = form.phone.value.trim() || '';
      const req = form.requirement.value.trim() || 'Enquiry';
      const waText = encodeURIComponent(`Enquiry from website\nName: ${name}\nPhone: ${phone}\nRequirement: ${req}`);
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${waText}`, '_blank');
    });
  }
});

// ---------- Small helper: keep navigation active (simple) ----------
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
});


