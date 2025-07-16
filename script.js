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
