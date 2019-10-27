import uuid from 'uuid';
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import Collection from '../utils/collection';

const ENCRYPT_KEY = 'Key-CryptoJS.HmacSHA1';
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


export const encrypt = (password) => CryptoJS.HmacSHA1(password, ENCRYPT_KEY).toString();

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
export const addAccessTokenToUser = (user) => {
  const accessToken = generateAccessToken();
  user.accessTokens.push(accessToken);
  return accessToken;
};

class Users {
  collection = new Collection('users')

  createAccount = (username, password, profile) => {
    const user = initUserDocument(username, password, profile);
    if (this.collection.findOne({ username })) {
      throw new Error('Duplicate Username. The username already exists! Please use another username.');
    } else if (username.length < 4 || password.length < 4) throw new Error('Username or password too short. Min lenght is 4');
    const accessToken = addAccessTokenToUser(user);
    this.collection.insert(user);
    return accessToken;
  }

  login = (username, password) => {
    const encrypted = encrypt(password);
    const user = this.collection.findOne({ username, password: encrypted });
    if (!user) {
      throw new Error('Username or password is not valid. Please try again!');
    }


    const accessToken = addAccessTokenToUser(user);

    this.collection.updateOne({ id: user.id },
      { lastLoginDate: new Date(), accessTokens: user.accessTokens });
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

    return users.find(({ accessTokens }) => {
      const accessToken = accessTokens.find((a) => {
        if (a.token === token) return true;
        return false;
      });
      return accessToken;
    });
  }

  findUserById = (id) => _.find(this.collection.find(), { id })


  // get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  // add = ({ body }) => this.collection.insert({ body })

  // remove = (post) => this.collection.remove(post);
}

export default new Users();
