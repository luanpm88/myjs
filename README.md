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

1. Add a placeholder in your EJS file:
   ```html
   <div id="Header"></div>
   ```

2. In your script, render the component and inject it:
   ```js
   window.corejs.view('component/header').then((html) => {
       document.getElementById('Header').innerHTML = html;
   });
   ```

---

## Reference

Please refer to the current sample code in the repository for understanding how it works. The sample code itself provides a simple and clear example of usage.

## License

MIT
