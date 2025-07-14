# Introduction

A simple JS framework for web app front-end.

## Quick Guide

### 0. Install and Run

1. Clone the repository.
   ```bash
   git clone https://github.com/luanpm88/myjs
   cd myjs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server to test or develop your application:
   ```bash
   npm run dev
   ```
4. For production, run the build command. The output will be ready to deploy in `/dist`:
   ```bash
   npm run build
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

- **Add routes should be defined in `/src/router.js`:**
   ```js
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
   ```

- **Navigate to a full page route:**
   ```js
   window.corejs.router.goToPage('/tasks');
   ```
- **Render a route into a specific container:**
   ```js
   window.corejs.router.render('/tasks/addForm', document.getElementById('AddTaskModal'));
   ```

- **Run a controller action directly with request data:**

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
   // Here is how typically executing add task via router
   corejs.router.run('/tasks/add', {
      name: taskName
   }).then( json => {
      // Successful response handling
      console.log('Task added:', json);
      alert('Task added: ' + json.name);
      // Optionally, you can clear the input field after submission
      document.querySelector('input[type="text"]').value = '';
   }).catch(error => {
      // Handle any error that occurred
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
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
   window.corejs.view.render('component/header').then((html) => {
       window.corejs.helper.innerHTML(document.getElementById('Header'), html);
   });
   ```

---

## Reference

Please refer to the current sample code in the repository for understanding how it works. The sample code itself provides a simple and clear example of usage.

## License

MIT
