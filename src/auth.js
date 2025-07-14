const TOKEN_KEY = 'api_token';
const USER_KEY = 'user';

export var Auth = class {
    login({ token, user }) {
        if (token) corejs.storage.set(TOKEN_KEY, token);
        if (user) corejs.storage.set(USER_KEY, user);
    }

    logout() {
        corejs.storage.remove(TOKEN_KEY);
        corejs.storage.remove(USER_KEY);
    }

    check() {
        return corejs.storage.has(TOKEN_KEY);
    }

    getToken() {
        return corejs.storage.get(TOKEN_KEY, '');
    }

    getUser() {
        return corejs.storage.get(USER_KEY, null);
    }
};