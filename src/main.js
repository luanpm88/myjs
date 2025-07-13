import { Router } from './router.js'
import { view } from './view.js'
import { helper } from './helper.js'

// Global corejs functions/objects
window.corejs = {}
window.corejs.router = new Router(document.getElementById('app'))
window.corejs.view = view;
window.corejs.helper = helper;

document.addEventListener('DOMContentLoaded', () => {
  // On first load
  corejs.router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    corejs.router.goToPage(window.location.pathname); // re-render the view
  });
})