import ejs from 'ejs-browser';

var mainContainer = document.getElementById('app');

//
function renderHTMLWithScripts(container, html, params) {
  //
  html = ejs.render(html, params);

  // 1. Set HTML content
  container.innerHTML = html;

  // 2. Find all script tags in the inserted content
  const scripts = container.querySelectorAll('script');

  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script');
    
    // Copy script attributes (src, type, etc.)
    [...oldScript.attributes].forEach(attr =>
      newScript.setAttribute(attr.name, attr.value)
    );
    
    // Copy script content (for inline scripts)
    newScript.textContent = oldScript.textContent;

    // Replace old script with new one to trigger execution
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

//
export const view = (viewName, params) => {
    fetch('./src/views/' + viewName + '.ejs')
        .then(response => response.text())
        .then(data => {
            //
            renderHTMLWithScripts(mainContainer, data, params);
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
}