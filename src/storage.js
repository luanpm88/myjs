// storage.js

export var Storage = class {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Storage set error for key "${key}":`, e);
    }
  }

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Storage get error for key "${key}":`, e);
      return defaultValue;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Storage remove error for key "${key}":`, e);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(`Storage clear error:`, e);
    }
  }

  has(key) {
    return localStorage.getItem(key) !== null;
  }
};