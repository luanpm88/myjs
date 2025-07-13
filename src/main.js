import { Router } from './router.js'
window.router = new Router();

document.addEventListener('DOMContentLoaded', () => {
  // On first load
  router.init();

  // Listen for back/forward button
  window.addEventListener('popstate', () => {
    router.goToPage(window.location.pathname); // re-render the view
  });
})