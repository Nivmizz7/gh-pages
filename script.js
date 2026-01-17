document.addEventListener("DOMContentLoaded", () => {
  const frBtn = document.getElementById("fr");
  const enBtn = document.getElementById("en");
  const elements = document.querySelectorAll("[data-fr][data-en]");

  function setLang(lang) {
    elements.forEach(el => {
      el.innerHTML = el.getAttribute(`data-${lang}`);
    });
    frBtn.classList.toggle("active", lang === "fr");
    enBtn.classList.toggle("active", lang === "en");
    localStorage.setItem("lang", lang);
  }

  const saved = localStorage.getItem("lang") || "fr";
  setLang(saved);

  frBtn.addEventListener("click", () => setLang("fr"));
  enBtn.addEventListener("click", () => setLang("en"));
});
