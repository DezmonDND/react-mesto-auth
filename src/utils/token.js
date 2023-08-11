const TOKEN_KEY = 'jwt';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (e) {
        return '';
    }
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}