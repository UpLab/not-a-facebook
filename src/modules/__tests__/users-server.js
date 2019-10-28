import faker from 'faker';
import UsersServer, {
  encrypt, initUserDocument,
  TOKEN_EXPIRATION_PERIOD,
  generateAccessToken,
} from '../users-server';
import { userFactory } from './utils';


describe('UsersServer helpers', () => {
  const testAccessToken = (accessToken) => {
    expect(accessToken).toHaveProperty('token');
    expect(accessToken).toHaveProperty('expiresAt');
    expect(accessToken.expiresAt.getTime()).toBeGreaterThan(new Date().getTime());
    expect(accessToken.token).toBeType('string');
    expect(accessToken.token.length).toBeGreaterThan(2);
  };

  test('UsersServer is defined', () => {
    expect(UsersServer).toBeDefined();
  });
  test('encrypt()', () => {
    const input = faker.internet.password();
    const result = encrypt(input);
    expect(result).toBeType('string');
    expect(result).not.toEqual(input);
  });
  test('initUserDocument()', () => {
    const { username, password, profile } = userFactory();
    const user = initUserDocument(username, password, profile);
    expect(user).toBeType('object');
    const props = ['username', 'password', 'profile', 'createdAt', 'lastLoginDate', 'accessTokens'];
    props.forEach((p) => {
      expect(user).toHaveProperty(p);
    });
  });
  test('TOKEN_EXPIRATION_PERIOD', () => {
    expect(TOKEN_EXPIRATION_PERIOD).toBeDefined();
    expect(TOKEN_EXPIRATION_PERIOD).toBeGreaterThan(1000);
  });

  test('generateAccessToken()', () => {
    const accessToken = generateAccessToken();
    testAccessToken(accessToken);
  });
  test('addAccessTokenToUser()', () => {
    const accessToken = generateAccessToken();
    const user = {
      _id: faker.random.uuid(),
      accessTokens: [accessToken],
    };
    const accessToken2 = UsersServer.addAccessTokenToUser(user);
    testAccessToken(accessToken2);
    expect(user.accessTokens.length).toBe(2);
    expect(user.accessTokens[1]).toBe(accessToken2);
  });
});


describe('UsersServer', () => {
  describe('createAccount()', () => {
    describe('create account', () => {
      let accessToken;
      let username;
      let password;
      let profile;
      let user;
      beforeAll(() => {
        UsersServer.collection.remove();
        const userParams = userFactory();
        username = userParams.username;
        password = userParams.password;
        profile = userParams.profile;
        accessToken = UsersServer.createAccount(username, password, profile);
        user = UsersServer.findUserByToken(accessToken.token);
      });

      test('it issues a valid access token', () => {
        expect(accessToken).toHaveProperty('token');
        expect(accessToken).toHaveProperty('expiresAt');
      });
      test('it adds user to the collection', () => {
        expect(UsersServer.collection.items.length).toBe(1);
      });

      test('it adds access token to the user', () => {
        expect(user.accessTokens.length).toBe(1);
        expect(user.accessTokens[0]).toEqual(accessToken);
      });

      test('it has username, password and profile', () => {
        expect(user.username).toBe(username);
        expect(user.password).toBeDefined();
        expect(user.profile).toEqual(profile);
      });
    });
    describe('it should not be possible to register with duplicate username', () => {
      let username;
      let profile;
      const { password: password2, profile: profile2 } = userFactory();
      beforeAll(() => {
        UsersServer.collection.remove();
        const { username: _username, password, profile: _profile } = userFactory();
        username = _username;
        profile = _profile;
        UsersServer.createAccount(username, password, profile);
      });
      test('throws error', () => {
        expect(() => UsersServer.createAccount(username, password2, profile2)).toThrow();
      });
      test("it doesn't insert a new user to the collection", () => {
        expect(UsersServer.collection.items.length).toBe(1);
        expect(UsersServer.collection.findOne().profile).toEqual(profile);
      });
    });
  });
  describe('login()', () => {
    let username;
    let password;
    let profile;
    beforeAll(() => {
      UsersServer.collection.remove();
      const userParams = userFactory();
      username = userParams.username;
      password = userParams.password;
      profile = userParams.profile;
      UsersServer.createAccount(username, password, profile);
    });

    test('it throws if password is wrong', () => {
      expect(() => UsersServer.login(username, '1234')).toThrow();
    });
    test('it throws if username is wrong', () => {
      expect(() => UsersServer.login('1234', password)).toThrow();
    });
    test('it returns access token', () => {
      const accessToken = UsersServer.login(username, password);
      expect(accessToken).toHaveProperty('token');
      expect(accessToken).toHaveProperty('expiresAt');
    });
    test('it adds an access token to the user', () => {
      const accessToken = UsersServer.login(username, password);
      const user = UsersServer.collection.findOne({ username });
      expect(user.accessTokens.find((a) => a.token === accessToken.token)).toBeDefined();
    });
  });

  describe('findUserByToken()', () => {
    beforeAll(() => {
      UsersServer.collection.remove();
      [...new Array(5)].forEach(() => {
        const { username, password, profile } = userFactory();
        UsersServer.createAccount(username, password, profile);
        [...new Array(15)].forEach(() => {
          UsersServer.login(username, password);
        });
      });
    });

    test('it returns right user by token', () => {
      UsersServer.collection.find({}).forEach((user) => {
        const { accessTokens } = user;
        accessTokens.forEach(({ token }) => {
          const u = UsersServer.findUserByToken(token);
          expect(u.id).toEqual(user.id);
        });
      });
    });
  });

  describe('logout()', () => {
    let user;
    let username;
    let password;
    let profile;
    beforeAll(() => {
      UsersServer.collection.remove();
      const userParams = userFactory();
      username = userParams.username;
      password = userParams.password;
      profile = userParams.profile;
      UsersServer.createAccount(username, password, profile);
      [...new Array(15)].forEach(() => {
        UsersServer.login(username, password);
      });
      user = UsersServer.collection.findOne({ username });
    });
    test('removes access token', () => {
      const tokensCount = user.accessTokens.length;
      user.accessTokens.forEach(({ token }, i) => {
        UsersServer.logout(token);
        const u = UsersServer.collection.findOne({ username });
        // console.log(u.accessTokens.map(({token}) => token));
        // console.log(token);
        expect(u.accessTokens.length).toBe(tokensCount - i - 1);
        expect(u.accessTokens.find((a) => a.token === token)).toBeUndefined();
      });
    });
  });
});
