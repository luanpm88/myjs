import { HomeController } from './controllers/HomeController.js'
import { TaskController } from './controllers/TaskController.js'
import { LoginController } from './controllers/LoginController.js'
import { helper } from './helper.js'

export const Router = class {
    constructor(appContainer) {
        this.appContainer = appContainer;

        // Define routes and their corresponding controller methods
        this.routes = {
            // HTML routes
            '/': () => {
                return HomeController.index();
            },
            '/tasks': () => {
                return TaskController.index();
            },
            '/tasks/add-form': () => {
                return TaskController.addForm();
            },
            '/login': () => {
                return LoginController.index();
            },

            // JSON routes
            '/tasks/add': (request) => {
                return TaskController.add(request);
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
        //
        if (!this.routes[path]) {
            alert(`Route not found: ${path}. Make sure the path is defined in the src/router.js.`);
            throw new Error(`Route not found: ${path}. Make sure the path is defined in the src/router.js.`);
        }

        this.routes[path]?.().then(html => {
            helper.innerHTML(container, html)

            // @metronic
            helper.metronicInit(); // Initialize Metronic components after rendering
        });
    }

    // Run controller method via route path
    run(path, request = {}) {
        //
        if (!this.routes[path]) {
            alert(`Route not found: ${path}. Make sure the path is defined in the src/router.js.`);
            throw new Error(`Route not found: ${path}. Make sure the path is defined in the src/router.js.`);
        }

        // Call the controller method for the given path
        return this.routes[path]?.(request)
    }
}