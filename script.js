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

  function toggleMenu() {
    mobileMenu.classList.toggle("show");
    overlay.classList.toggle("show");
  }

  menuIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
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


// ——— 5. Flip‑cards con descripciones (usa img.alt para el título) ———
function initFlipCards() {
  const descriptions = {
    // — Servicios —
    'Limpieza de datos':
      'Revisamos, depuramos y organizamos tus hojas de cálculo o archivos para que trabajes con información clara y confiable.',
    'Dashboards':
      'Diseñamos paneles visuales interactivos con indicadores clave (KPIs) para que tomes decisiones basadas en datos en tiempo real.',
    'Automatización':
      'Implementamos soluciones automatizadas usando herramientas como Excel, Google Sheets, Power BI y Python, reduciendo tareas repetitivas y errores manuales.',
    'Consultoría':
      'Te asesoramos en la interpretación de tus datos y te orientamos sobre cómo usarlos estratégicamente para mejorar tu negocio.',
    'Reportes periódicos':
      'Generamos informes mensuales con los principales resultados y tendencias para que tengas siempre el control de tu operación.',

    // — Nuestro Proceso —
    'Descubrimiento':
      'Entendemos cómo funciona el negocio: procesos, personas, herramientas actuales. Escuchamos sus dolores específicos y definimos objetivos claros. Entrega: Ficha de cliente con diagnóstico inicial y enfoque de trabajo.',
    'Auditoría':
      'Revisamos cómo se almacenan, recopilan y usan los datos clave (ventas, stock, clientes, etc.). Identificamos desorden, duplicidad, brechas o falta de conexión. Entrega: Mapa de información actual + recomendaciones de mejora. 🛠️',
    'Implementación':
      'Creamos dashboards, reportes o estructuras de control personalizadas. Trabajamos con Excel, Google Sheets o Power BI (según el cliente). Entrega: Herramientas listas para usar + capacitación. 🚦',
    'KPIs':
      'Acordamos los indicadores clave de gestión del negocio (margen, stock crítico, pagos, etc.). Generamos paneles visuales simples y accionables. Entrega: Panel de indicadores actualizado automáticamente.',
    'Acompañamiento':
      'Reuniones periódicas para revisar datos, hacer ajustes y resolver dudas. Soporte continuo para mantener el sistema alineado a la evolución del negocio. Entrega: Informe de mejoras + soporte constante.'
  };

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
