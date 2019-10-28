import UsersServer from './users-server';

export const ACCESS_TOKEN_STORAGE_KEY = '__access_token__';

export class Users {
  currentUser = null

  token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

  constructor() {
    this.resume();
  }

  setToken = (accessToken) => {
    let token = accessToken;
    if (typeof accessToken === 'object') {
      token = accessToken.token;
    }
    this.token = token;
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  createAccount = (username, password, profile) => {
    const accessToken = UsersServer.createAccount(username.trim(), password.trim(), profile);
    this.setToken(accessToken);
    this.currentUser = this.me(this.token);
  }

  resume = () => {
    this.token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    if (this.token) {
      this.currentUser = this.me(this.token);
      //  if (this.currentUser) this.logout(true);
    }
  }

  login = (username, password) => {
    const accessToken = UsersServer.login(username, password);
    this.setToken(accessToken);
    this.currentUser = this.me(this.token);
  }

  logout = (skipServer) => {
    if (!skipServer) {
      UsersServer.logout(this.token);
    }
    this.currentUser = this.me(this.token);
    this.setToken({ token: '' });
  }

  me = () => UsersServer.findUserByToken(this.token)

  getUser = (id) => UsersServer.findUserById(id)

  isLoggedIn = () => !!this.token
}

export default new Users();
