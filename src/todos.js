import { addDays } from 'date-fns'

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class Project {

    constructor(name) {
        this.name = name
        this.todos = []
    }

    addTodo(title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority)
        this.todos.push(newTodo)
        saveToStorage()
    }

    updateTodo(title, newTitle, newDescription, newDueDate, newPriority) {
        const todo = this.todos.find(todo => todo.title === title)
        if (todo) {
            todo.title = newTitle
            todo.description = newDescription
            todo.dueDate = newDueDate
            todo.priority = newPriority
        }
        saveToStorage()
    }

    deleteTodo(title) {
        const index = this.todos.findIndex(todo => todo.title === title)
        if (index !== -1) {
            this.todos.splice(index, 1)
        }
        saveToStorage()
    }

}

export function newProject(name) {
    projects.push(new Project(name))
    saveToStorage()
}

let projects = []
export { projects }

export function deleteProject(name) {
    const index = projects.findIndex(project => project.name === name)
    console.log(projects[index])
    projects.splice(index, 1)
    saveToStorage()
}

function saveToStorage() {
    sessionStorage.setItem("mySessionProjects", JSON.stringify(projects))
}

function loadFromStorage() {
    const plainProjects = JSON.parse(sessionStorage.getItem("mySessionProjects"))
    projects = plainProjects.map(plainProject => {
        const project = new Project(plainProject.name)
        project.todos = plainProject.todos.map(plainTodo =>
            new Todo(plainTodo.title, plainTodo.description, plainTodo.dueDate, plainTodo.priority)
        )
        return project
    })
}

(function initialize() {
    if (sessionStorage.getItem("mySessionProjects")) {
        loadFromStorage()
    } else {
        const projectDefault = new Project('Default')
        projectDefault.addTodo('Starting Task', 'This is your first task!', new Date(), 'low')
        projects = [projectDefault]
        saveToStorage()
    }
})()