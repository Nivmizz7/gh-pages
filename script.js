document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
