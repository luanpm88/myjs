import { Router } from './router.js'
import { view } from './view.js'
import { helper } from './helper.js'

// Global corejs functions/objects
window.corejs = {}
window.corejs.router = new Router(document.getElementById('app'))
window.corejs.view = view;
window.corejs.helper = helper;
window.corejs.views = {};

// Load all views
const templates = import.meta.glob('/src/views/**/*.ejs', { as: 'raw', eager: true });
for (const path in templates) {
  // Normalize path, e.g. '/src/views/component/header.ejs' → 'component/header'
  const viewName = path.replace('/src/views/', '').replace('.ejs', '');
  window.corejs.views[viewName] = templates[path];
}

// Initialize the router and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  // On first load
  corejs.router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    corejs.router.goToPage(window.location.pathname); // re-render the view
  });
})