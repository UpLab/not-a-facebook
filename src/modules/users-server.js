import uuid from 'uuid';
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

// TODO: implement encryption
export const encrypt = (password) => password.split('').reverse().join('');

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
    const user = this.collection.findOne({ username, password });
    if (!user) {
      throw new Error('Username or password is not valid. Please try again!');
    }
    // TODO: update last login date in the user's object
    const accessToken = addAccessTokenToUser(user);
    return accessToken;
  }

  logout = (token) => {
    const user = this.findUserByToken(token);
    if (!user) return;
    const filteredAccessTokens = user.accessTokens.filter((accessToken) => accessToken !== token);
    this.collection.updateOne({ id: user.id }, { accessTokens: filteredAccessTokens });
  }

  // eslint-disable-next-line no-unused-vars
  findUserByToken = (token) => this.collection.items[0]


  // get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  // add = ({ body }) => this.collection.insert({ body })

  // remove = (post) => this.collection.remove(post);
}

export default new Users();
