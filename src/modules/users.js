import UsersServer from './users-server';

const ACCESS_TOKEN_STORAGE_KEY = '__access_token__';

class Users {
  currentUser = null

  token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

  constructor() {
    this.resume();
  }

  setToken = (accessToken) => {
    this.token = accessToken.token;
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken.token);
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

    this.setToken('');
  }

  me = () => UsersServer.findUserByToken(this.token)

  isLoggedIn = () => !!this.token
}

export default new Users();
