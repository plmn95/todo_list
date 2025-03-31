import './styles.css'
import { newProject, projects } from './todos'
import { menuController, renderTodos, createTodo, formController } from './display'

window.menuController = menuController()
window.renderTodos = renderTodos('today')
window.projects = projects

renderTodos('today')