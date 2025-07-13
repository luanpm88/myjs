# Introduction

A simple JS framework for web app front-end.

## Quick Guide

### 0. Install and Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Project Structure

- `src/main.js` - Application entry point
- `src/router.js` - App Router logic and route registration
- `src/view.js` - App View core functions
- `src/helper.js` - Helper functions used throughout the app
- `src/controllers/` - Controller files (e.g., `HomeController.js`, `TaskController.js`)
- `src/services/` - Service files (e.g., `TaskService.js`)
- `src/views/` - EJS view templates (e.g., `home/index.ejs`, `task/addForm.ejs`)

---

### Using the Router

- **Navigate to a full page route:**
  ```js
  window.corejs.router.goToPage('/tasks');
  ```
- **Render a route into a specific container:**
  ```js
  window.corejs.router.render('/tasks/addForm', document.getElementById('AddTaskModal'));
  ```

---

### Using View Components in MyJS

To include a view component dynamically inside your EJS template:

1. Create the component file inside `src/views/` and insert the component’s HTML, for example `src/views/component/header.ejs`:
   ```html
   <header>
     <h1>App Header</h1>
   </header>
   ```

2. In any other EJS view where you want to include the header, add a placeholder like this:
   ```html
   <div id="Header"></div>
   ```

3. In the same EJS file, render the component and inject it into the placeholder:
   ```js
   window.corejs.view('component/header').then((html) => {
       window.corejs.helper.renderHTML(document.getElementById('Header'), html);
   });
   ```

4. Run a controller action directly with request data:

   Route defined:
   ```js
   // HTML routes
   // ...
   // JSON routes
   '/tasks/add': (request) => {
       return TaskController.add(request);
   },
   ```

   For example, to add a task:
   ```js
   // Add a task using the controller action
   corejs.router.run('/tasks/add', {
       name: taskName
   }).then(json => {
       // Here you would typically send the taskName to your server
       console.log('Task added:', json);
       alert('Task added: ' + json.name);
       // Optionally, you can clear the input field after submission
       document.querySelector('input[type="text"]').value = '';
   });
   ```

   Controller code looks like:
   ```js
   static async add(request) {
       try {
           return await TaskService.addTask(request);
       } catch (err) {
           throw new Error('Error adding task: ' + err.message);
       }
   }
   ```

---

## Reference

Please refer to the current sample code in the repository for understanding how it works. The sample code itself provides a simple and clear example of usage.

## License

MIT
