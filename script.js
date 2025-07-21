// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ——— Menú móvil ———
  const menuIcon   = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay    = document.getElementById("overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("show");
    overlay.classList.toggle("show");
  }

  menuIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // ——— Reveal on scroll ———
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
});
// Slider Quiénes Somos
function initQuienesSomosSlider() {
  const slides = document.querySelector('.slides');
  const slideEls = document.querySelectorAll('.slides .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  let current = 0;
  const total = slideEls.length;

  function goTo(index) {
    current = (index + total) % total;

    // ancho real de un slide (incluye border, padding)
    const slideRect = slideEls[0].getBoundingClientRect();
    const slideWidth = slideRect.width;

    // obtén el margin-right aplicado en CSS
    const style = getComputedStyle(slideEls[0]);
    const gap = parseFloat(style.marginRight);

    // mueve la pista por píxeles
    slides.style.transform = `translateX(-${current * (slideWidth + gap)}px)`;

    // actualiza puntos activos
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.slide)));
  });
}

// iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
  initQuienesSomosSlider();
});
// == Flip‑card setup para Servicios y Proceso ==
document.querySelectorAll('.service-item, .proceso-item').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  // 1. Crear estructura flip-card
  const flipCard = document.createElement('div');
  flipCard.classList.add('flip-card');

  const inner = document.createElement('div');
  inner.classList.add('flip-card-inner');

  const front = document.createElement('div');
  front.classList.add('flip-card-front');
  front.appendChild(img.cloneNode(true));  // clonar la imagen

  const back = document.createElement('div');
  back.classList.add('flip-card-back');
  const p = document.createElement('p');
  p.textContent = 'Texto de ejemplo';      // placeholder
  back.appendChild(p);

  inner.appendChild(front);
  inner.appendChild(back);
  flipCard.appendChild(inner);

  // 2. Reemplazar contenido original del item
  item.innerHTML = '';
  item.appendChild(flipCard);

  // 3. Eventos hover para voltear
  flipCard.addEventListener('mouseenter', () => inner.classList.add('flipped'));
  flipCard.addEventListener('mouseleave', () => inner.classList.remove('flipped'));
});
