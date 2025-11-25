// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const body = document.body; // Referencia al body para controlar el scroll

  if (toggle && nav) { // Asegúrate de que los elementos existen antes de añadir listeners
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
      body.classList.toggle("nav-open", isOpen); // Añade/elimina la clase para controlar el scroll
    });

    // Cierra el menú cuando se hace clic en un elemento de navegación (útil para SPAs)
    nav.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          body.classList.remove('nav-open');
        }
      });
    });
  }

  // Theme toggle (persisted)
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  else root.setAttribute('data-theme', 'auto');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Opcional: Cierra el menú si se redimensiona a escritorio mientras está abierto
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false'); // Asegura que el toggle también se actualice
      body.classList.remove('nav-open');
    }
  });
});
