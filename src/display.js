import { projects } from './todos'
import { isToday, isThisWeek, format } from 'date-fns'

import arrowIcon from './images/todo_icons/arrow-down-bold.svg'
import checkIcon from './images/todo_icons/check-bold.svg'

export function menuController() {
    const btnToday = document.getElementById('btn-today')
    const btnThisWeek = document.getElementById('btn-week')
    btnToday.addEventListener('click', () => {
        renderTodos('today')
    })
    btnThisWeek.addEventListener('click', () => {
        renderTodos('this week')
    })
    renderProjects()
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

function CreateTodoElement(todo) {

    console.log(todo)

    const container = document.createElement('div')
    container.classList.add('todo')

    const todoHeader = document.createElement('div')
    todoHeader.classList.add('todo-header')

    const btnArrow = document.createElement('img')
    btnArrow.src = arrowIcon
    btnArrow.classList.add('icon')
    btnArrow.addEventListener('click', () => {
        container.append(CreateTodoDescription(todo))
    })
    const title = document.createElement('p')
    title.innerText = todo.title
    const containerLeft = document.createElement('div')
    containerLeft.classList.add('todo-header-part')
    containerLeft.append(btnArrow, title)

    const dueDate = document.createElement('p')
    dueDate.innerText = format(todo.dueDate, 'dd/MM/yyyy')
    const btnCheck = document.createElement('img')
    btnCheck.src = checkIcon
    btnCheck.classList.add('icon')
    const containerRight = document.createElement('div')
    containerRight.classList.add('todo-header-part')
    containerRight.append(dueDate, btnCheck)

    todoHeader.append(containerLeft, containerRight)
    container.append(todoHeader)
    return container

}

function CreateTodoDescription(todo) {

    const container = document.createElement('div')

    const containerDesc = document.createElement('div')
    const description = document.createElement('p')
    description.innerText = todo.description
    containerDesc.append(description)

    container.append(containerDesc)

    return container

}

export function renderTodos(timeSpan) {
    const divTodos = document.getElementById('todos')
    divTodos.innerHTML = ''
    projects.forEach(project => {
        project.todos.forEach(todo => {
            switch (timeSpan) {
                case 'today':
                    if(isToday(todo.dueDate)) {
                        divTodos.append(CreateTodoElement(todo))
                    }
                    break;
                case 'this week':
                    if(isThisWeek(todo.dueDate)) {
                        divTodos.append(CreateTodoElement(todo))
                    }
            }
        })
    })
}