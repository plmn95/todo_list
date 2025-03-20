import { projects } from "./todos"
import { isToday, isThisWeek } from "date-fns"

export function menuController() {
    const btnToday = document.getElementById('btn-today')
    const btnThisWeek = document.getElementById('btn-week')
    const btnProjects = document.getElementById('btn-projects')
    const projectsMenu = document.getElementById('projects-menu')
    btnToday.addEventListener('click', () => {
        renderTodos('today')
    })
    btnThisWeek.addEventListener('click', () => {
        renderTodos('this week')
    })
    btnProjects.addEventListener('click', () => {
        renderProjects()
        projectsMenu.style.display = projectsMenu.style.display === 'block' ? 'none' : 'block'
    })
}

function renderProjects() {
    const projectsMenu = document.getElementById('projects-menu')
    projectsMenu.innerHTML = ''
    projects.forEach(project => {
        const btn = document.createElement('li')
        btn.innerText = project.name
        projectsMenu.append(btn)
    })
}

function createTodoElement(todo) {
    console.log(todo)
    const container = document.createElement('div')
    const title = document.createElement('p')
    title.innerText = todo.title
    container.append(title)
    return container
}

function renderTodos(timeSpan) {
    const divTodos = document.getElementById('todos')
    divTodos.innerHTML = ''
    projects.forEach(project => {
        project.todos.forEach(todo => {
            switch (timeSpan) {
                case 'today':
                    if(isToday(todo.dueDate)) {
                        divTodos.append(createTodoElement(todo))
                    }
                    break;
                case 'this week':
                    if(isThisWeek(todo.dueDate)) {
                        divTodos.append(createTodoElement(todo))
                    }
            }
        })
    })
}