import { TaskService } from '../services/TaskService.js'; // task data service

export var TaskController = class {
    static async index() {
        try {
            const tasks = await TaskService.getTasks();

            return corejs.view.render('task/index', {
                tasks: tasks,
            });
        } catch (err) {
            throw new Error('Error fetching tasks: ' + err.message);
        }
    }

    static addForm() {
        return corejs.view.render('task/addForm');
    }

    static async add(request) {
        try {
            return await TaskService.addTask(request);
        } catch (err) {
            throw new Error('Error adding task: ' + err.message);
        }
    }
}