import { view } from '../view.js' // view rendering
import { TaskService } from '../services/TaskService.js'; // task data service

export var TaskController = class {
    static async index() {
        try {
            const tasks = await TaskService.getTasks();

            return view('task/index', {
                tasks: tasks,
            });
        } catch (err) {
            console.error('Error loading tasks:', err);
            return view('error', { message: 'Could not load tasks' });
        }
    }

    static addForm() {
        return view('task/addForm');
    }
}