import ejs from 'ejs-browser';

// Function to load and render an EJS view
export const view = (viewName, params) => {
  return fetch('./src/views/' + viewName + '.ejs')
    .then(response => response.text())
    .then(data => {
      return ejs.render(data, params);
    })
    .catch(error => {
      console.error('Error loading HTML:', error);
      throw error;
    });
};