document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  const frBtn = document.getElementById("fr");
  const enBtn = document.getElementById("en");
  let currentLang = localStorage.getItem("lang") || "fr";

  function updateTranslations() {
    const elements = document.querySelectorAll("[data-fr][data-en]");
    elements.forEach(el => {
      if (el.dataset[currentLang]) {
        el.innerHTML = el.dataset[currentLang];
      }
    });
  }

  function setLang(lang) {
    currentLang = lang;
    updateTranslations();
    frBtn.classList.toggle("active", lang === "fr");
    enBtn.classList.toggle("active", lang === "en");
    localStorage.setItem("lang", lang);
    
    // Re-render projects to update descriptions
    renderProjects();
  }

  // Initial setup
  document.querySelector('a[href="https://github.com/Nivmizz7"]').dataset.fr = '<i class="fa-brands fa-github"></i> GitHub';
  document.querySelector('a[href="https://github.com/Nivmizz7"]').dataset.en = '<i class="fa-brands fa-github"></i> GitHub';
  
  setLang(currentLang);

  frBtn.addEventListener("click", () => setLang("fr"));
  enBtn.addEventListener("click", () => setLang("en"));

  // Fetch GitHub Projects
  let cachedRepos = [];

  async function fetchGitHubRepos() {
    const projectsContainer = document.getElementById('github-projects');
    try {
      // Fetch repos from GitHub API
      const response = await fetch('https://api.github.com/users/Nivmizz7/repos?sort=updated&per_page=10');
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      let repos = await response.json();
      
      // Filter out profile readme repository and forks if needed
      repos = repos.filter(repo => repo.name !== 'Nivmizz7' && !repo.fork).slice(0, 6);
      
      cachedRepos = repos;
      renderProjects();

    } catch (error) {
      console.error(error);
      projectsContainer.innerHTML = `<p data-fr="Impossible de charger les projets GitHub." data-en="Failed to load GitHub projects.">Impossible de charger les projets GitHub.</p>`;
      updateTranslations();
    }
  }

  function renderProjects() {
    const projectsContainer = document.getElementById('github-projects');
    if (cachedRepos.length === 0) return;
    
    projectsContainer.innerHTML = '';
    
    cachedRepos.forEach(repo => {
      const desc = repo.description || (currentLang === 'fr' ? 'Aucune description disponible.' : 'No description available.');
      const projectEl = document.createElement('div');
      projectEl.className = 'project';
      
      const langIcon = repo.language ? `<span class="tag"><i class="fa-solid fa-code"></i> ${repo.language}</span>` : '';
      const starIcon = `<span class="tag"><i class="fa-solid fa-star" style="color: #fbbf24;"></i> ${repo.stargazers_count}</span>`;
      
      projectEl.innerHTML = `
        <h3><i class="fa-regular fa-folder-open"></i> ${repo.name}</h3>
        <p>${desc}</p>
        <div class="project-tags">
          ${langIcon}
          ${starIcon}
        </div>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i> Code
          </a>
          ${repo.homepage ? `
          <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>` : ''}
        </div>
      `;
      projectsContainer.appendChild(projectEl);
    });
  }

  fetchGitHubRepos();
});
