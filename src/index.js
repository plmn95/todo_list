import './styles.css'

import { menuController, renderTodosByTime } from './display'
import { projects } from './todos'

window.menuController = menuController()
window.renderTodosByTime = renderTodosByTime('today')
window.sayProjects = function sayProjects() {
    console.log(projects)
}