import { projects } from "./todos"

export function menuController() {
    const btnProjects = document.getElementById('btn-projects')
    btnProjects.addEventListener('click', () => {
        renderProjects()
    })
}

function renderProjects() {
    const projectsMenu = document.getElementById('projects-menu')
    console.log(projects)
    projects.forEach(project => {
        const btn = document.createElement('li')
        btn.innerText = project.name
        projectsMenu.append(btn)
    })
}