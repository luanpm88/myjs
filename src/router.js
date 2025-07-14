import { HomeController } from './controllers/HomeController.js'
import { TaskController } from './controllers/TaskController.js'
import { TestController } from './controllers/TestController.js'
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

            // JSON routes
            '/tasks/add': (request) => {
                return TaskController.add(request);
            },
        }
    }

    // Load first page on init
    init() {
        const path = window.location.pathname
        this.goToPage(path); // Default to home if path is root
    }

    // Navigate to a specific page
    goToPage(path) {
        // 404 page handling
        // if (!this.routes[path]) {
        //     window.corejs.view.render('404', {
        //         'error': `Route not found: ${path}. Make sure the path is defined in the src/router.js.`
        //     }).then(html => {
        //         helper.innerHTML(this.appContainer, html);
        //     });
        //     return;
        // }

        // Update history state
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