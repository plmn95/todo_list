import { projects, newProject } from './todos'
import { isToday, isThisWeek, format } from 'date-fns'

import arrowIcon from './images/todo_icons/arrow-down-bold.svg'
import checkIcon from './images/todo_icons/check-bold.svg'
import editIcon from './images/todo_icons/pencil.svg'
import newProjectIcon from './images/icons/add.svg'

export function menuController() {
    const btnToday = document.getElementById('btn-today')
    const btnThisWeek = document.getElementById('btn-week')
    const btnViewAll = document.getElementById('btn-all')
    btnToday.addEventListener('click', () => {
        renderTodos('today')
    })
    btnThisWeek.addEventListener('click', () => {
        renderTodos('this week')
    })
    btnViewAll.addEventListener('click', () => {
        renderTodos('all')
    })
    renderProjects()
}

function renderProjects() {
    const projectsMenu = document.getElementById('projects-menu')
    //projectsMenu.innerHTML = ''
    projects.forEach(project => {
        const btn = document.createElement('li')
        btn.innerText = project.name
        projectsMenu.append(btn)
    })
}

function createTodoElement(todo, timeSpan) {

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

    btnCheck.addEventListener('click', () => {
        projects.forEach(project => {
            project.deleteTodo(todo.title)
        })
        renderTodos(timeSpan)
    })

    return container

}

export function renderTodos(timeSpan) {
    const divTodos = document.getElementById('todos')
    const bottomMenu = document.getElementById('bottom-menu')
    divTodos.innerHTML = ''
    projects.forEach(project => {
        project.todos.forEach(todo => {
            switch (timeSpan) {
                case 'today':
                    if(isToday(todo.dueDate)) {
                        divTodos.append(createTodoElement(todo, timeSpan))
                    }
                    break;
                case 'this week':
                    if(isThisWeek(todo.dueDate)) {
                        divTodos.append(createTodoElement(todo, timeSpan))
                        break;
                    }
                case 'all':
                    divTodos.append(createTodoElement(todo, timeSpan))
                    break;
            }
        })
    })
    const btnAdd = document.createElement('p')
    btnAdd.innerText = '+ add'
    btnAdd.setAttribute('id', 'btn-add')
    bottomMenu.innerHTML = ''
    bottomMenu.append(btnAdd)
    btnAdd.addEventListener('click', () => {
        initializeForm()
        formController()
    })
}

// export function createTodo() {
//     const btnAdd = document.getElementById('btn-add')
//     const todosDiv = document.getElementById('todos')

//     btnAdd.addEventListener('click', () => {
//         todosDiv.innerHTML = ''
//     })
// }


// ---Initializing the form used to create new todos---

function initializeForm() {
    const container = document.querySelector('#todos')

    const form = document.createElement('form')
    form.setAttribute('id', 'form-add')

    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name')
    nameLabel.innerText = 'title'
    const name = document.createElement('input')
    name.setAttribute('type', 'text')
    name.setAttribute('id', 'name')

    const descriptionLabel = document.createElement('label')
    descriptionLabel.setAttribute('for', 'description')
    descriptionLabel.innerText = 'description'
    const description = document.createElement('textarea')
    description.setAttribute('rows', '3')
    description.setAttribute('id', 'description')

    const dueDateLabel = document.createElement('label')
    dueDateLabel.setAttribute('for', 'dueDate')
    dueDateLabel.innerText = 'deadline'
    const dueDate = document.createElement('input')
    dueDate.setAttribute('type', 'date')
    dueDate.setAttribute('id', 'dueDate')

    const priorityLabel = document.createElement('label')
    priorityLabel.setAttribute('for', 'priority')
    priorityLabel.innerText = 'priority'
    const priorityBtnsDiv = document.createElement('div')
    priorityBtnsDiv.setAttribute('class', 'priority-buttons')
    const btnLow = document.createElement('button')
    btnLow.setAttribute('type', 'button')
    btnLow.classList.add('priority-btn', 'selected-btn')
    btnLow.innerText = 'low'
    const btnMid = document.createElement('button')
    btnMid.setAttribute('type', 'button')
    btnMid.setAttribute('class', 'priority-btn')
    btnMid.innerText = 'mid'
    const btnHigh = document.createElement('button')
    btnHigh.setAttribute('type', 'button')
    btnHigh.setAttribute('class', 'priority-btn')
    btnHigh.innerText = 'high'
    priorityBtnsDiv.append(btnLow, btnMid, btnHigh)

    const projectLabel = document.createElement('label')
    projectLabel.setAttribute('for', 'project')
    projectLabel.innerText = 'project'
    const divProjectSelection = document.createElement('div')
    divProjectSelection.setAttribute('class', 'div-select-project')
    const projectSelection = document.createElement('select')
    projectSelection.setAttribute('id', 'project')
    const newProjectDiv = document.createElement('div')
    newProjectDiv.setAttribute('class', 'div-add-img')
    const newProjectBtn = document.createElement('img')
    newProjectBtn.src = newProjectIcon
    newProjectBtn.setAttribute('class', 'btn-add-project')
    newProjectDiv.append(newProjectBtn)
    divProjectSelection.append(projectSelection, newProjectDiv)
    
    form.append(nameLabel, name, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priorityBtnsDiv, projectLabel, divProjectSelection)
    container.innerHTML = ''
    container.append(form)

    const bottomMenu = document.querySelector('#bottom-menu')

    bottomMenu.innerHTML = ''

    const bottomMenuFormBtns = document.createElement('div')
    bottomMenuFormBtns.setAttribute('id', 'form-btns')
    const btnSave = document.createElement('p')
    btnSave.setAttribute('id', 'btn-submit')
    btnSave.innerText = 'save'
    const btnCancel = document.createElement('p')
    btnCancel.innerText = 'cancel'
    bottomMenuFormBtns.append(btnSave, btnCancel)
    bottomMenu.append(bottomMenuFormBtns)
}

export function formController() {

    const form = document.getElementById('form-add')
    const priorityBtns = document.querySelectorAll('.priority-btn')
    const formDropdown = document.getElementById('project')
    const btnAddProject = document.querySelector('.btn-add-project')
    const btnSubmit = document.getElementById('btn-submit')
    let selectedPriority = 'low'

    console.log(btnSubmit)

    priorityBtns.forEach(button => {
        button.addEventListener('click', () => {
            priorityBtns.forEach(btn => btn.classList.remove('selected-btn'))
            button.classList.add('selected-btn')
            switch (button.innerText) {
                case button.innerText = 'mid':
                    selectedPriority = 'medium'
                    break;
                default:
                    selectedPriority = button.innerText
                    break;
            }
        })
    })

    projects.forEach(project => {
        const option = document.createElement('option')
        option.value = project.name
        option.text = project.name
        formDropdown.appendChild(option)
    })

    btnAddProject.addEventListener('click', () => {
        const name = prompt('Enter new project name:')
        if (name) {
            projects.push(newProject(name))
            initializeForm()
            formController()
        } 
    })

    btnSubmit.addEventListener('click', () => {

        const name = document.querySelector('#name').value
        const description = document.querySelector('#description').value
        const dueDate = new Date(form.querySelector('#dueDate').value)
        const priority = selectedPriority
        const project = projects.find(project => project.name === formDropdown.value)

        if (name && description && dueDate != 'Invalid Date') {
            project.addTodo(name, description, dueDate, priority)
            renderTodos('all')
        }



    // //     // form.reset()
    // //     // priorityBtns.forEach(btn => btn.classList.remove('selected-btn'))
    // //     // selectedPriority = 'low']
    })
}

function newProjectPrompt() {
    const name = prompt('Name of new project:')
    const newProject = new Project(name)
    projects.push(newProject)
}