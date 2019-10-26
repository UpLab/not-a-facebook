import uuid from 'uuid';
import md5 from 'md5';
import Collection from '../utils/collection';
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

export const encrypt = (password) => {
  const rPassword = password.split('').reverse().join('');
  return md5(rPassword);
};
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
    this.collection.updateOne({ id: user.id }, { lastLoginDate: new Date() });
    const accessToken = addAccessTokenToUser(user);
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


  // get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  // add = ({ body }) => this.collection.insert({ body })

  // remove = (post) => this.collection.remove(post);
}

export default new Users();
