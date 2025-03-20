import './styles.css'
import { newProject, projects } from './todos'
import { menuController } from './display'

window.newProject = newProject
window.menuController = menuController()
window.projects = projects