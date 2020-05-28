import axios from 'axios';

const API_URL = 'http://localhost:8080';

let interceptor;

class Authentication {
  executeJwtAuthenticationService(username, password, remember) {
    if (remember) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password
    });
  }

  async registerSuccessfulLoginForJwt(username, token) {
    var jwtToken = this.createJWTToken(token);
    await sessionStorage.setItem('token', jwtToken);
    await this.setupAxiosInterceptors(jwtToken);
  }

  createJWTToken(token) {
    return 'Bearer ' + token;
  }

  logout() {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('token');
    axios.interceptors.request.eject(interceptor);
  }

  register(type, userInfo) {
    login(userInfo);
  }

  updateUser(attr, value) {
    var user = this.getUser();
    user[attr] = value;
    sessionStorage.setItem('userInfo', JSON.stringify(user));
    return user;
  }

  getUser() {
    var user = JSON.parse(sessionStorage.getItem('userInfo'));
    return user;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isUserLoggedIn() {
    let token = sessionStorage.getItem('token');
    if (token === null) return false;
    return true;
  }

  async setupAxiosInterceptors(token) {
    interceptor = axios.interceptors.request.use(config => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
      }
      return config;
    });
  }
}

export default new Authentication();
