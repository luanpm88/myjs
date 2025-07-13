import { Router } from './router.js'
import { view } from './view.js'

window.corejs = {}
window.corejs.router = new Router()
window.corejs.view = view
window.corejs.appContainer = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
  // On first load
  corejs.router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    corejs.router.goToPage(window.location.pathname); // re-render the view
  });
})