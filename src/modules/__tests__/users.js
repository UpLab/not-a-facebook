import faker from 'faker';
// import sinon from 'sinon';
import UsersModel, { Users as UsersModelConstructor, ACCESS_TOKEN_STORAGE_KEY } from '../users';
// import UsersServer from '../users-server';
import { userFactory } from './utils';

describe('Users', () => {
  beforeAll(() => {
    localStorage.clear();
    // sinon.stub(UsersServer);
  });
  afterAll(() => {
    // UsersServer.restore();
  });
  test('it exports correctly', () => {
    expect(UsersModel).toBeType('object');
    expect(UsersModelConstructor).toBeType('function');
  });

  describe('setToken()', () => {
    test('it sets token to the class instance', () => {
      const token = faker.random.word();
      UsersModel.setToken(token);
      expect(UsersModel.token).toBe(token);
    });
    test('it writes token to the localStorage', () => {
      const token = faker.random.word();
      UsersModel.setToken(token);
      expect(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).toBe(token);
    });
    test('it supports object as param', () => {
      const token = faker.random.word();
      UsersModel.setToken({ token });
      expect(UsersModel.token).toBe(token);
      expect(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).toBe(token);
    });
  });

  describe('logout()', () => {
    let token;
    beforeEach(() => {
      token = faker.random.word();
      UsersModel.setToken(token);
    });
    test('clears token from localStorage', () => {
      UsersModel.logout();
      expect(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).toBeFalsy();
    });
    test('clears token from class instance', () => {
      UsersModel.logout();
      expect(UsersModel.token).toBeFalsy();
    });
  });

  describe('createAccount()', () => {
    let username;

    beforeAll(() => {
      const { password, profile, ...rest } = userFactory();
      username = rest.username;
      UsersModel.createAccount(username, password, profile);
    });
    test('sets access token', () => {
      expect(UsersModel.token).toBeTruthy();
    });
    test('sets user', () => {
      expect(UsersModel.currentUser).toBeType('object');
      expect(UsersModel.currentUser.username).toBe(username);
    });
  });

  describe('resume()', () => {
    test('resumes session', () => {
      const { username, profile, password } = userFactory();
      UsersModel.createAccount(username, password, profile);
      UsersModel.currentUser = null;
      UsersModel.resume();
      expect(UsersModel.currentUser).toBeType('object');
      expect(UsersModel.currentUser.username).toBe(username);
    });
  });

  describe('login()', () => {
    let username;
    let password;

    beforeAll(() => {
      const { profile, ...rest } = userFactory();
      username = rest.username;
      password = rest.password;
      UsersModel.createAccount(username, password, profile);
      UsersModel.logout();
    });

    test('logs in', () => {
      UsersModel.login(username, password);
      expect(UsersModel.token).toBeTruthy();
      expect(UsersModel.currentUser).toBeType('object');
      expect(UsersModel.currentUser.username).toBe(username);
    });
  });

  describe('me()', () => {
    let username;

    beforeAll(() => {
      const { profile, password, ...rest } = userFactory();
      username = rest.username;
      UsersModel.createAccount(username, password, profile);
    });

    test('returns current user', () => {
      const user = UsersModel.me();
      expect(user.username).toBe(username);
    });

    test('returns nothing after logout', () => {
      UsersModel.logout();
      const user = UsersModel.me();
      expect(user).toBeFalsy();
    });
  });

  describe('isLoggedIn()', () => {
    test('returns true if logged in', () => {
      const { username, profile, password } = userFactory();
      UsersModel.createAccount(username, password, profile);
      UsersModel.login(username, password, profile);
      expect(UsersModel.isLoggedIn()).toBe(true);
    });
    test('returns false if not logged in', () => {
      UsersModel.logout();
      expect(UsersModel.isLoggedIn()).toBe(false);
    });
  });
});
