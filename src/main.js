import { Router } from './router.js'
import { View } from './view.js'
import { helper } from './helper.js'
import { Storage } from './storage.js'

// Initialize the router and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Global corejs functions/objects
  window.corejs = {}
  window.corejs.router = new Router(document.getElementById('app'));
  window.corejs.view = new View();
  window.corejs.helper = helper;
  window.corejs.storage = new Storage();

  // On first load
  corejs.router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    corejs.router.goToPage(window.location.pathname); // re-render the view
  });
})