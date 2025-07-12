import { Router } from './Router.js'
window.router = new Router();

document.addEventListener('DOMContentLoaded', () => {
  router.init();
})