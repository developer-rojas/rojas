// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  const expanded = nav.classList.contains("open");
  toggle.setAttribute("aria-expanded", expanded);
});

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



// Year
document.getElementById('year').textContent = new Date().getFullYear();
