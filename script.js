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

/**
 * Inicializa el efecto flip‑card en los elementos de Servicios y Nuestro Proceso.
 */
function initFlipCards() {
  // Selecciona cada item de servicio y de proceso
  document.querySelectorAll('.service-item, .proceso-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;  // si no tiene imagen, ignorar

    // 1. Crear estructura HTML de la carta
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');
    inner.classList.remove('flipped'); // asegurar estado inicial

    const front = document.createElement('div');
    front.classList.add('flip-card-front');
    front.appendChild(img.cloneNode(true)); // clonar la imagen como front

    const back = document.createElement('div');
    back.classList.add('flip-card-back');
    const p = document.createElement('p');
    p.textContent = 'Texto de ejemplo';     // placeholder, reemplázalo luego
    back.appendChild(p);

    // Montar estructura
    inner.appendChild(front);
    inner.appendChild(back);
    flipCard.appendChild(inner);

    // 2. Reemplazar el contenido original por la flip‑card
    item.innerHTML = '';
    item.appendChild(flipCard);

    // 3. Eventos para voltear la carta
    // Hover en desktop
    flipCard.addEventListener('mouseenter', () => inner.classList.add('flipped'));
    flipCard.addEventListener('mouseleave', () => inner.classList.remove('flipped'));
    // Click/touch en móvil
    flipCard.addEventListener('click', () => inner.classList.toggle('flipped'));
  });
}
/**
 * Inicializa el efecto flip‑card y asigna descripciones
 * para Servicios y Nuestro Proceso.
 */
function initFlipCards() {
  // Mapeo de títulos a descripciones
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

  // Selecciona cada elemento de servicio o proceso
  document.querySelectorAll('.service-item, .proceso-item').forEach(item => {
    // Obtiene el título (h3) para buscar la descripción
    const titleEl = item.querySelector('h3');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const desc = descriptions[title] || '';

    // Crea la estructura flip‑card
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');
    inner.classList.remove('flipped'); // estado inicial

    // Cara frontal (la imagen)
    const front = document.createElement('div');
    front.classList.add('flip-card-front');
    const img = item.querySelector('img');
    if (img) front.appendChild(img.cloneNode(true));

    // Cara trasera (la descripción)
    const back = document.createElement('div');
    back.classList.add('flip-card-back');
    const p = document.createElement('p');
    p.textContent = desc;
    back.appendChild(p);

    // Monta la carta
    inner.appendChild(front);
    inner.appendChild(back);
    flipCard.appendChild(inner);

    // Reemplaza el contenido original
    item.innerHTML = '';
    item.appendChild(flipCard);

    // Eventos para voltear
    flipCard.addEventListener('mouseenter', () => inner.classList.add('flipped'));
    flipCard.addEventListener('mouseleave', () => inner.classList.remove('flipped'));
    flipCard.addEventListener('click', () => inner.classList.toggle('flipped'));
  });
}

// Ejecuta al cargar el DOM
document.addEventListener('DOMContentLoaded', initFlipCards);

// Ejecutar la inicialización tras cargar el DOM
document.addEventListener('DOMContentLoaded', initFlipCards);

