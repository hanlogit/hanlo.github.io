// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay   = document.getElementById("overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("show");
    overlay.classList.toggle("show");
  }

  menuIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
});
