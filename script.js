document.addEventListener('DOMContentLoaded', () => {
  // ===== Mobile nav toggle =====
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
      body.classList.toggle("nav-open", isOpen);
    });

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

  // ===== Theme toggle =====
  const root = document.documentElement;
  const themeBtn = document.querySelector('[data-action="toggle-theme"]'); // ahora buscamos por atributo
  const themeBtnText = themeBtn ? themeBtn.querySelector('span') : null;
  const saved = localStorage.getItem('theme');

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeBtnText) {
      themeBtnText.textContent = theme === 'dark' ? 'Tema: oscuro' : 'Tema: claro';
    }
  };

  if (themeBtn && themeBtnText) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(saved || systemTheme);

    themeBtn.addEventListener('click', (e) => {
      e.preventDefault(); // evita el scroll del href="#!"
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ===== Año dinámico =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Cierra el menú si se redimensiona a escritorio =====
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-open');
    }
  });
});
