import { HomeController } from './controllers/HomeController.js'
import { TaskController } from './controllers/TaskController.js'

export const Router = class {
    constructor() {
        this.routes = {
            '/': () => {
                HomeController.index();
            },
            '/tasks': () => {
                TaskController.index();
            },
        }
    }

    init() {
        const path = window.location.pathname
        this.routes[path]?.()
    }

    goToPage(path) {
        window.location.pathname = path
    }
}