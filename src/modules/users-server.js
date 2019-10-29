import uuid from 'uuid';
import _ from 'lodash';
import Collection from '../utils/collection';

const md5 = require('md5');
// const user = {
//   id: String
//   username: String
//   password: String
//   accessTokens: [{
//     token: String
//     expiresAt: Date
//   }]
//   profile: {
//     firstName: String
//     lastName: String
//     avatar: String
//   }
//   createdAt: Date
//   lastLoginDate: Date
// };

export const encrypt = (password) => md5(password);

export const initUserDocument = (username, password, profile) => ({
  username,
  password: encrypt(password),
  profile,
  createdAt: new Date(),
  lastLoginDate: new Date(),
  accessTokens: [],
});

const THIRTY_MINUTES = 30 * 60 * 1000;
export const TOKEN_EXPIRATION_PERIOD = THIRTY_MINUTES;

export const generateAccessToken = () => ({
  token: uuid(),
  expiresAt: new Date(new Date().getTime() + THIRTY_MINUTES),
});

class Users {
  collection = new Collection('users')

  createAccount = (username, password, profile) => {
    const isExist = !!this.collection.findOne({ username });
    if (isExist) {
      throw new Error('Username already taken!');
    }
    const user = initUserDocument(username, password, profile);
    const accessToken = this.addAccessTokenToUser(user);
    this.collection.insert(user);
    return accessToken;
  }

  login = (username, password) => {
    const encrypted = encrypt(password);
    const user = this.collection.findOne({ username, password: encrypted });
    if (!user) {
      throw new Error('Invalid username or password!');
    }
    this.collection.updateOne({ id: user.id }, { lastLoginDate: new Date() });
    const accessToken = this.addAccessTokenToUser(user);
    return accessToken;
  }

  logout = (token) => {
    const user = this.findUserByToken(token);
    if (!user) return;
    const filteredAccessTokens = user.accessTokens.filter(
      (accessToken) => accessToken.token !== token,
    );
    this.collection.updateOne({ id: user.id }, { accessTokens: filteredAccessTokens });
  }

  // eslint-disable-next-line no-unused-vars
  findUserByToken = (token) => {
    const users = this.collection.find();
    const user = users.find(({ accessTokens }) => {
      const accessToken = accessTokens.find((a) => {
        if (a.token === token) return true;
        return false;
      });
      return accessToken;
    });
    return user;
  }

  findUserById = (id) => _.find(this.collection.find(), { id });

  addAccessTokenToUser = (user) => {
    const accessToken = generateAccessToken();
    const accessTokens = [...user.accessTokens, accessToken];
    this.collection.updateOne({ id: user.id }, { accessTokens });
    // eslint-disable-next-line no-param-reassign
    user.accessTokens = accessTokens;
    return accessToken;
  };


  // get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  // add = ({ body }) => this.collection.insert({ body })

  // remove = (post) => this.collection.remove(post);
}

export default new Users();
