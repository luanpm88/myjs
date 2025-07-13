import { view } from '../view.js'
import { TaskService } from '../services/TaskService.js';

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