import { view } from '../view.js'
import { TaskService } from '../services/TaskService.js';

export var TaskController = class {
    static index() {
        const tasks = TaskService.getTasks();

        view('task/index', {
            tasks: tasks,
        });
    }
}