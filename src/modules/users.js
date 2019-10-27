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
    const accessToken = UsersServer.createAccount(username, password, profile);
    this.setToken(accessToken);
    this.currentUser = this.me(this.token);
  }

  resume = () => {
    if (this.token) {
      this.currentUser = this.me(this.token);
      if (this.currentUser) this.logout(true);
    }
  }

  login = (username, password) => {
    const accessToken = UsersServer.login(username, password);
    this.setToken(accessToken);
    this.currentUser = this.me(this.token);
  }

  logout = (skipServer) => {
    if (skipServer) {
      UsersServer.logout(this.token);
    }

    this.setToken({ token: '' });
  }

  me = () => UsersServer.findUserByToken(this.token)

  isLoggedIn = () => !!this.token

  addPost = (post) => UsersServer.addPost(this.token, post);
}

export default new Users();
