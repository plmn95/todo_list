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
    }

    updateTodo(title, newTitle, newDescription, newDueDate, newPriority) {
        const todo = this.todos.find(todo => todo.title === title)
        if (todo) {
            todo.title = newTitle
            todo.description = newDescription
            todo.dueDate = newDueDate
            todo.priority = newPriority
        }
    }

    deleteTodo(title) {
        const index = this.todos.findIndex(todo => todo.title === title)
        if (index !== -1) {
            this.todos.splice(index, 1)
        }
    }

}

const projectDefault = new Project('Default')
projectDefault.addTodo('Start', 'You must create your first task here.', addDays(new Date(), 2), 'low')
projectDefault.addTodo('Test', 'You must create your first task here.', addDays(new Date(), 2), 'low')
projectDefault.addTodo('Another Test', 'This task is two days from today', addDays(new Date(), 2), 'medium')

const projectTest = new Project('Test')

const projects = [projectDefault, projectTest]

export function newProject(name) {
    return new Project(name)
}

export { projects }