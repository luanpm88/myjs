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

## 📦 `corejs.storage` – LocalStorage Helper

A lightweight utility to simplify `localStorage` operations with built-in JSON handling and error checking.

---

### ✅ Methods

#### `corejs.storage.set(key, value)`
Stores a value in `localStorage` under the specified `key`.  
Automatically stringifies objects or arrays.

```js
corejs.storage.set('api_token', 'your_api_token_here');
corejs.storage.set('user', { id: 1, name: 'Luan', email: 'luan@example.com' });
```

---

#### `corejs.storage.get(key, defaultValue = null)`
Retrieves a value by key and parses it from JSON.  
Returns `defaultValue` if the key does not exist or parsing fails.

```js
const token = corejs.storage.get('api_token', '');
const user = corejs.storage.get('user', null);
```

---

#### `corejs.storage.remove(key)`
Removes the item associated with the given key.

```js
corejs.storage.remove('api_token');
corejs.storage.remove('user');
```

---

#### `corejs.storage.clear()`
Clears all keys from `localStorage`.

```js
corejs.storage.clear();
```

---

#### `corejs.storage.has(key)`
Returns `true` if the key exists in `localStorage`.

```js
if (corejs.storage.has('api_token')) {
  console.log('User is authenticated');
}
```

---
## 🔐 `corejs.auth` – Authentication Helper

A simple wrapper around `Auth.js` to manage user login state, API token, and user info.  
Follows best practices for handling localStorage and authentication on the frontend.

---

### ✅ Methods

#### `corejs.auth.login({ token, user })`
Stores the user's API token and user information into localStorage.

```js
corejs.auth.login({
  token: response.token,
  user: response.user // { id, name, email, role, ... }
});
```

---

#### `corejs.auth.logout()`
Clears both token and user data from localStorage.

```js
corejs.auth.logout();
```

---

#### `corejs.auth.check()`
Returns `true` if the user is logged in (i.e., token exists).

```js
if (corejs.auth.check()) {
  console.log('User is logged in');
}
```

---

#### `corejs.auth.getToken()`
Returns the stored API token as a string, or `''` if not found.

```js
const token = corejs.auth.getToken();
```

---

#### `corejs.auth.getUser()`
Returns the stored user object or `null` if not available.

```js
const user = corejs.auth.getUser();
console.log(user?.name);
```

---

#### `corejs.auth.isAdmin()`
Returns `true` if the user's role is `'admin'`.  
(You can customize this method to fit your user role logic.)

```js
if (corejs.auth.isAdmin()) {
  console.log('User is admin');
}
```

---

### 📁 Example Usage

```js
// ✅ Login
corejs.auth.login({
  token: 'abc123xyz',
  user: { id: 1, name: 'Luan', email: 'luan@example.com', role: 'admin' }
});

// ✅ Check login status
if (corejs.auth.check()) {
  const user = corejs.auth.getUser();
  console.log(`Hello, ${user.name}`);
}

// ✅ Use token in API call
fetch('/api/profile', {
  headers: {
    Authorization: `Bearer ${corejs.auth.getToken()}`
  }
});

// ✅ Logout
corejs.auth.logout();
```

---

> ⚠️ **Security Tip:** Avoid storing sensitive data like passwords or full tokens in localStorage. Use short-lived tokens and HTTPS, and consider storing tokens in HTTP-only cookies for sensitive apps.

---

## Reference

Please refer to the current sample code in the repository for understanding how it works. The sample code itself provides a simple and clear example of usage.

## License

MIT
