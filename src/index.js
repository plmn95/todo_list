import './styles.css'
import { newProject, projects } from './todos'
import { menuController, renderTodosByTime as renderTodosByTime, createTodo, formController } from './display'

window.menuController = menuController()
window.renderTodosByTime = renderTodosByTime('today')
window.projects = projects

renderTodosByTime('today')