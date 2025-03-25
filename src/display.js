import { projects } from './todos'
import { isToday, isThisWeek, format } from 'date-fns'

import arrowIcon from './images/todo_icons/arrow-down-bold.svg'
import checkIcon from './images/todo_icons/check-bold.svg'
import editIcon from './images/todo_icons/pencil.svg'

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

function createTodoElement(todo) {

    console.log(todo)

    const container = document.createElement('div')
    container.classList.add('todo')

    const todoHeader = document.createElement('div')
    todoHeader.classList.add('todo-header')

    const btnArrow = document.createElement('img')
    btnArrow.src = arrowIcon
    btnArrow.classList.add('icon')
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

    const todoDescription = document.createElement('div')

    const containerDesc = document.createElement('div')
    const todoDescriptionText = document.createElement('p')
    todoDescriptionText.innerText = todo.description
    containerDesc.append(todoDescriptionText)
    todoDescription.append(containerDesc)
    todoDescription.classList.add('todo-description')

    const todoButtons = document.createElement('div')
    todoButtons.classList.add('todo-buttons')
    const btnPriority = document.createElement('button')
    btnPriority.innerText = todo.priority
    btnPriority.classList.add('button-priority')
    const btnEdit = document.createElement('img')
    btnEdit.src = editIcon
    btnEdit.classList.add('icon')
    todoButtons.append(btnPriority, btnEdit)
    todoDescription.append(todoButtons)

    container.append(todoHeader, todoDescription)

    btnArrow.addEventListener('click', () => {
        const isNotExpanded = todoDescription.style.display === 'none'
        if (isNotExpanded) {
            todoDescription.style.display = 'block'
            btnArrow.style.transform = 'rotate(180deg)'
        } else {
            todoDescription.style.display = 'none'
            btnArrow.style.transform = 'rotate(0deg'
        }
    })

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