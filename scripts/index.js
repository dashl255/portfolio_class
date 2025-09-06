document.addEventListener('DOMContentLoaded', () => {
    // Cargar perfil de GitHub
    fetch("https://api.github.com/users/dashl255")
        .then(res => res.json())
        .then(data => {
            const perfilContainer = document.getElementById("perfilContainer");
            if (perfilContainer) {
                perfilContainer.innerHTML = `
                    <img src="${data.avatar_url}" alt="Avatar" class="profile-img" width="100" />
                    <h4>${data.login}</h4>
                    <a href="${data.html_url}" target="_blank">Ver GitHub</a>
                `;
            }
        });

    const repositoryUrl = 'https://api.github.com/users/dashl255/repos';

    // Cargar proyectos de GitHub directamente
    async function loadRepos() {
        try {
            const response = await fetch(repositoryUrl);
            const repos = await response.json();
            const projectsSection = document.querySelector('#proyectos');
            if (projectsSection && Array.isArray(repos)) {
                projectsSection.innerHTML = '<h2 id="proyectos">Proyectos Destacados</h2>' +
                    repos.map(r => `
                        <div class="project">
                            <div class="project-title">${r.name}</div>
                            <div class="project-desc">${r.description || 'Sin descripción.'}</div>
                            <a href="${r.html_url}" target="_blank">Ver proyecto</a>
                        </div>
                    `).join('');
            }
        } catch (error) {
            error('Error loading repositories:', error);
        }
    }

    loadRepos();
});