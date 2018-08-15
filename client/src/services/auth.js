import axios from 'axios';
import jwt from 'jsonwebtoken';
const TOKEN_LABEL = 'tkn';
const auth = {
  isAuthenticated() {
    const token = this.getToken();
    if(!token) return false;
    const { exp } = jwt.decode(token);
    const date = new Date(exp);
    const now = new Date();
    if (date < now) {
        this.signout();
        return false;
    }
    return true;
},
  login(email, password) {
    return axios.post('./api/login', { email, password })
    .then(response => {
        const { token } = response.data;
        this.setToken(token);
        return response;
    });
  },
  signout() {
    window.localStorage.removeItem(TOKEN_LABEL);
  },
  signup(email, password) {
    return axios.post('./api/signup', { email, password })
    .then(response => {
        return response;
    });
  },
  getUserInfo() {
    if(!this.isAuthenticated) {
        return false;
    }
    const token = this.getToken();
    const { email } = jwt.decode(token);
    return {
        email
    };
},
  getToken() {
    return window.localStorage.getItem(TOKEN_LABEL);
  },
  setToken(token) {
      window.localStorage.setItem(TOKEN_LABEL, token);
  }
};

export default auth;
