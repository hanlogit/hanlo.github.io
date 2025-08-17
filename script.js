// script.js

// ——— 1. Al cargar el DOM inicializamos todo ———
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initRevealOnScroll();
  initQuienesSomosSlider();
  initFlipCards();
});


// ——— 2. Menú móvil ———
function initMobileMenu() {
  const menuIcon   = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay    = document.getElementById("overlay");

  function setOpen(open) {
    mobileMenu.classList.toggle("show", open);
    overlay.classList.toggle("show", open);
    document.body.classList.toggle("no-scroll", open);
  }

  function toggleMenu() {
    setOpen(!mobileMenu.classList.contains("show"));
  }

  if (menuIcon) menuIcon.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", () => setOpen(false));

  // Cerrar al clickear cualquier link del menú móvil
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}



// ——— 3. Reveal on scroll ———
function initRevealOnScroll() {
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
}


// ——— 4. Slider “Quiénes Somos” ———
function initQuienesSomosSlider() {
  const slides   = document.querySelector('.slides');
  const slideEls = document.querySelectorAll('.slides .slide');
  const dots     = document.querySelectorAll('.slider-dots .dot');
  const prevBtn  = document.querySelector('.slider-nav.prev');
  const nextBtn  = document.querySelector('.slider-nav.next');
  let current = 0;
  const total = slideEls.length;

  function goTo(index) {
    current = (index + total) % total;
    const { width: w } = slideEls[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(slideEls[0]).marginRight);
    slides.style.transform = `translateX(-${current * (w + gap)}px)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.slide)));
}


function initFlipCards() {
  const descriptions = {
    // — Servicios —
    'Limpieza de datos':
      'Revisamos, depuramos y organizamos tus hojas de cálculo y archivos para que trabajes con información clara y confiable.',
    'Dashboards':
      'Diseñamos paneles interactivos con indicadores claves (KPIs) para que tomes decisiones basadas en datos en tiempo real.',
    'Automatización':
      'Implementamos soluciones automatizadas con Python y Power BI para reducir tareas repetitivas y errores manuales.',
    'Consultoría':
      'Te asesoramos en la interpretación de tus datos y en cómo usarlos estratégicamente para mejorar tu negocio.',
    'Reportes periódicos':
      'Generamos informes con resultados y tendencias para que tengas siempre el control de tu operación.',
    'Digitalización':
      'Transformamos procesos manuales en soluciones digitales adaptadas a tu negocio',

    // — Nuestro Proceso —
    'Descubrimiento':
      'Entendemos procesos, personas y datos. Entrega: diagnóstico inicial y enfoque de trabajo.',
    'Auditoría':
      'Revisamos cómo se recopilan y usan los datos. Entrega: mapa de información y recomendaciones.',
    'Implementación':
      'Creamos dashboards, reportes o estructuras de control. Entrega: herramientas listas + capacitación.',
    'KPIs':
      'Definimos indicadores clave y su seguimiento. Entrega: panel actualizado automáticamente.',
    'Acompañamiento':
      'Revisiones periódicas, ajustes y soporte continuo para mantener el sistema funcionando.'
  };

  // ... resto de tu lógica de flip-cards (sin cambios)
}


  document.querySelectorAll('.service-item, .proceso-item').forEach(item => {
    // 1) Extrae la imagen y su alt (que usamos como clave)
    const img = item.querySelector('img');
    if (!img) return;
    const title = img.alt.trim();
    const desc  = descriptions[title] || '';

    // 2) Crea la flip‑card
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');

    const front = document.createElement('div');
    front.classList.add('flip-card-front');
    front.appendChild(img.cloneNode(true));

    const back = document.createElement('div');
    back.classList.add('flip-card-back');
    const p = document.createElement('p');
    p.textContent = desc;
    back.appendChild(p);

    inner.append(front, back);
    flipCard.appendChild(inner);

    // 3) Reemplaza el contenido original
    item.innerHTML = '';
    item.appendChild(flipCard);

    // 4) Eventos para voltear
    flipCard.addEventListener('mouseenter', () => inner.classList.add('flipped'));
    flipCard.addEventListener('mouseleave', () => inner.classList.remove('flipped'));
    flipCard.addEventListener('click', () => inner.classList.toggle('flipped'));
  });
}
