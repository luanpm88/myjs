import ejs from 'ejs-browser';

export const View = class {
  constructor() {
    // Store views in an object
    this.views = {};

    // Load all views
    // This will import all .ejs files in the /src/views directory
    // and make them available in window.corejs.views
    const templates = import.meta.glob('/src/views/**/*.ejs', { query: '?raw', import: 'default', eager: true });
    for (const path in templates) {
      // Normalize path, e.g. '/src/views/component/header.ejs' → 'component/header'
      const viewName = path.replace('/src/views/', '').replace('.ejs', '');
      this.views[viewName] = templates[path];
    }
  }

  // Render a view with parameters
  async render(viewName, params = {})
  {
    //
    if (!this.views[viewName]) {
        alert(`View not found: ${viewName}. Make sure the view file is added in the src/views/${viewName}.ejs`);
        throw new Error(`View not found: ${viewName}. Make sure the view file is added in the src/views/${viewName}.ejs`);
    }

    return ejs.render(this.views[viewName], params);
  }
}