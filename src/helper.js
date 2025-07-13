//
export const helper = {
  updateHTML: (container, html) => {
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
}