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
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = (index + total) % total;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.slide)));
  });
}

// Iniciar al cargar contenido
document.addEventListener('DOMContentLoaded', () => {
  initQuienesSomosSlider();
});
