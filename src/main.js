import { Router } from './router.js'
import { View } from './view.js'
import { helper } from './helper.js'

// Global corejs functions/objects
window.corejs = {}
window.corejs.router = null;
window.corejs.view = new View();
window.corejs.helper = helper;

// Initialize the router and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Create a new Router instance with the app container
  window.corejs.router = new Router(document.getElementById('app'))

  // On first load
  corejs.router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    corejs.router.goToPage(window.location.pathname); // re-render the view
  });
})