import ejs from 'ejs-browser';

// Function to load and render an EJS view
export const view = async (viewName, params = {}) => {
  return ejs.render(window.corejs.views[viewName], params);
};