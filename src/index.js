import './styles.css'
import { newProject, projects } from './todos'
import { menuController, renderTodos, createTodo } from './display'

window.newProject = newProject
window.menuController = menuController()
//window.renderTodos = renderTodos('today')
window.createTodo = createTodo()
window.projects = projects