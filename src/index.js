import './styles.css'
import { projects } from './todos'
import { menuController, renderTodosByTime } from './display'

window.menuController = menuController()
window.renderTodosByTime = renderTodosByTime('today')
window.projects = projects