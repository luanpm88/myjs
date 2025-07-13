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

  static async addTask(data) {
    console.log('Service: Adding task with data:', data.name);
    // // Example: POST taskData to a fake API endpoint
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(taskData)
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to add task');
    // }
    // const data = await response.json();

    return {
      id: 1,
      name: data.name,
      description: data.description,
    };
  }
}