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
            throw new Error('Error fetching tasks: ' + err.message);
        }
    }

    static addForm() {
        return view('task/addForm');
    }

    static async add(request) {
        try {
            return await TaskService.addTask(request);
        } catch (err) {
            throw new Error('Error adding task: ' + err.message);
        }
    }
}