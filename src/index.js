import './styles.css'
import { newProject, projects } from './todos'
import { menuController, renderTodos } from './display'

window.newProject = newProject
window.menuController = menuController()
window.renderTodos = renderTodos('today')
window.projects = projects