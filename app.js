(function () {
  const html = document.documentElement;
  const body = document.body;

  const navMenu = document.getElementById("navMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("jp_theme", theme);
    updateThemeButton();
  }

  function updateThemeButton() {
    const theme = html.getAttribute("data-theme") || "dark";
    const lang = body.getAttribute("data-lang") || "en";
    if (theme === "dark") themeToggle.textContent = (lang === "en") ? "☀ Light" : "☀ ಬೆಳಕು";
    else themeToggle.textContent = (lang === "en") ? "🌙 Dark" : "🌙 ಕತ್ತಲೆ";
  }

  function setLang(lang) {
    body.setAttribute("data-lang", lang);
    localStorage.setItem("jp_lang", lang);

    document.querySelectorAll("[data-en][data-kn]").forEach(el => {
      el.textContent = el.getAttribute(lang === "kn" ? "data-kn" : "data-en");
    });

    langToggle.textContent = (lang === "en") ? "ಕನ್ನಡ" : "English";
    updateThemeButton();
  }

  function closeMenu() {
    if (navMenu) navMenu.classList.remove("open");
  }

  // Mobile menu
  mobileMenuBtn?.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close menu after clicking internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", () => setTimeout(closeMenu, 50));
  });

  // Theme toggle
  themeToggle?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // Language toggle
  langToggle?.addEventListener("click", () => {
    const current = body.getAttribute("data-lang") || "en";
    setLang(current === "en" ? "kn" : "en");
  });

  // Restore saved preferences
  const savedTheme = localStorage.getItem("jp_theme") || "dark";
  const savedLang = localStorage.getItem("jp_lang") || "en";
  setTheme(savedTheme);
  setLang(savedLang);
})();
