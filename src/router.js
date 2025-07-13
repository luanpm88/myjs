import { HomeController } from './controllers/HomeController.js'
import { TaskController } from './controllers/TaskController.js'
import { renderHTMLWithScripts } from './helper.js'

export const Router = class {
    constructor(appContainer) {
        this.appContainer = appContainer;

        // Define routes and their corresponding controller methods
        this.routes = {
            '/': () => {
                return HomeController.index();
            },
            '/tasks': () => {
                return TaskController.index();
            },
            '/tasks/add-form': () => {
                return TaskController.addForm();
            },
        }
    }

    // Load first page on init
    init() {
        const path = window.location.pathname
        this.render(path, this.appContainer)
    }

    // Navigate to a specific page
    goToPage(path) {
        window.history.pushState({}, '', path);
        this.render(path, this.appContainer)
    }

    // Render the view for the given path
    render(path, container) {
        this.routes[path]?.().then(html => {
            renderHTMLWithScripts(container, html);
        });
    }
}