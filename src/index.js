import './styles.css'
import { sayTitle, addTodo, deleteTodo, todos } from './todos'

todos.forEach(todo => sayTitle(todo))

window.sayTitle = sayTitle
window.addTodo = addTodo
window.deleteTodo = deleteTodo
window.todos = todos