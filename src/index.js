import './styles.css'
import { newProject, projects } from './todos'
import { menuController, renderTodos, createTodo, setupTaskForm } from './display'

window.newProject = newProject
window.menuController = menuController()
//window.renderTodos = renderTodos('today')
window.setupTaskForm = setupTaskForm()
window.createTodo = createTodo()
window.projects = projects