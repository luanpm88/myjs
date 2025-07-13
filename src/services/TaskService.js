export var TaskService = class {
  static async getTasks() {
    // return [
    //   { title: 'First Task', description: 'This is a first task' },
    //   { title: 'Second Task', description: 'This is a second task' },
    //   { title: 'Third Task', description: 'This is a third task' }
    // ]


    const response = await fetch('https://provinces.open-api.vn/api/');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data;
    
  }
} 