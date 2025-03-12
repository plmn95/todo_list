class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

export function addTodo(title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority)
    todos.push(newTodo)
}

const todoDefault = new Todo('Start', 'You must create your first task here.', '20-03-2026', 'low')

const todos = [ todoDefault ]

export function sayTitle(todo) {
    console.log(todo.title)
}

export function deleteTodo(title) {
    const index = todos.findIndex(todo => todo.title === title)
    if (index !== -1) {
        todos.splice(index, 1)
    }
}

export { todos }