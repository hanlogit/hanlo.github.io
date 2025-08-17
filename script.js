// script.js

// ——— 1) Arranque seguro al cargar el DOM ———
document.addEventListener("DOMContentLoaded", () => {
  const safe = (fn) => { try { fn && fn(); } catch (e) { console.error(e); } };

  safe(initMobileMenu);
  safe(initRevealOnScroll);
  safe(initQuienesSomosSlider);
  safe(initFlipCards);
});

// ——— 2) Menú móvil ———
function initMobileMenu() {
  const menuIcon   = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay    = document.getElementById("overlay");
  if (!menuIcon || !mobileMenu || !overlay) return; // blindaje

  function setOpen(open) {
    mobileMenu.classList.toggle("show", open);
    overlay.classList.toggle("show", open);
    document.body.classList.toggle("no-scroll", open);
  }
  const toggleMenu = () => setOpen(!mobileMenu.classList.contains("show"));

  menuIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", () => setOpen(false));

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

// ——— 3) Reveal on scroll ———
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback si el navegador no soporta IO
    reveals.forEach(el => el.classList.add("active"));
    return;
  }

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

// ——— 4) Slider “Quiénes Somos” ———
function initQuienesSomosSlider() {
  const slidesWrap = document.querySelector(".slides");
  const slideEls   = document.querySelectorAll(".slides .slide");
  const dots       = document.querySelectorAll(".slider-dots .dot");
  const prevBtn    = document.querySelector(".slider-nav.prev");
  const nextBtn    = document.querySelector(".slider-nav.next");
  if (!slidesWrap || !slideEls.length || !prevBtn || !nextBtn || !dots.length) return;

  let current = 0;
  const total = slideEls.length;

  function slideWidthWithGap() {
    const { width } = slideEls[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(slideEls[0]).marginRight || "0");
    return width + gap;
  }

  function goTo(index) {
    current = (index + total) % total;
    slidesWrap.style.transform = `translateX(-${current * slideWidthWithGap()}px)`;
    dots.forEach(d => d.classList.remove("active"));
    if (dots[current]) dots[current].classList.add("active");
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.slide);
      if (!Number.isNaN(i)) goTo(i);
    });
  });

  // Recalcular al redimensionar
  window.addEventListener("resize", () => goTo(current));

  // Ir al inicio
  goTo(0);
}

// ——— 5) Flip-cards (Servicios y Proceso) ———
function initFlipCards() {
  const items = document.querySelectorAll(".service-item, .proceso-item");
  if (!items.length) return;

  const descriptions = {
    // — Servicios —
    "Limpieza de datos":
      "Revisamos, depuramos y organizamos tus hojas de cálculo y archivos para que trabajes con información clara y confiable.",
    "Dashboards":
      "Diseñamos paneles interactivos con indicadores claves (KPIs) para que tomes decisiones basadas en datos en tiempo real.",
    "Automatización":
      "Implementamos soluciones automatizadas con Python y Power BI para reducir tareas repetitivas y errores manuales.",
    "Consultoría":
      "Te asesoramos en la interpretación de tus datos y en cómo usarlos estratégicamente para mejorar tu negocio.",
    "Reportes periódicos":
      "Generamos informes con resultados y tendencias para que tengas siempre el control de tu operación.",
    "Digitalización":
      "Transformamos procesos manuales en soluciones digitales adaptadas a tu negocio",

    // — Nuestro Proceso —
    "Descubrimiento":
      "Entendemos procesos, personas y datos. Entrega: diagnóstico inicial y enfoque de trabajo.",
    "Auditoría":
      "Revisamos cómo se recopilan y usan los datos. Entrega: mapa de información y recomendaciones.",
    "Implementación":
      "Creamos dashboards, reportes o estructuras de control. Entrega: herramientas listas + capacitación.",
    "KPIs":
      "Definimos indicadores clave y su seguimiento. Entrega: panel actualizado automáticamente.",
    "Acompañamiento":
      "Revisiones periódicas, ajustes y soporte continuo para mantener el sistema funcionando."
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  items.forEach(item => {
    if (item.querySelector(".flip-card")) return; // evita duplicar si re-inyectas

    const img = item.querySelector("img");
    if (!img) return;

    const title = (img.alt || "").trim();
    const desc  = descriptions[title] || "";

    const flipCard = document.createElement("div");
    flipCard.className = "flip-card";
    flipCard.setAttribute("role", "button");
    flipCard.setAttribute("tabindex", "0");
    flipCard.setAttribute("aria-label", `${title}: más información`);

    const inner = document.createElement("div");
    inner.className = "flip-card-inner";

    const front = document.createElement("div");
    front.className = "flip-card-front";
    front.appendChild(img.cloneNode(true));

    const back = document.createElement("div");
    back.className = "flip-card-back";
    const p = document.createElement("p");
    p.textContent = desc;
    back.appendChild(p);

    inner.append(front, back);
    flipCard.appendChild(inner);

    // Limpia y reemplaza
    item.innerHTML = "";
    item.appendChild(flipCard);

    // Interacciones
    if (!reduceMotion) {
      flipCard.addEventListener("mouseenter", () => inner.classList.add("flipped"));
      flipCard.addEventListener("mouseleave", () => inner.classList.remove("flipped"));
    }
    flipCard.addEventListener("click", () => inner.classList.toggle("flipped"));
    flipCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inner.classList.toggle("flipped");
      }
    });
  });
}

