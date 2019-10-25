import faker from 'faker';
import UsersServer, {
  encrypt, initUserDocument,
  TOKEN_EXPIRATION_PERIOD,
  generateAccessToken,
  addAccessTokenToUser,
} from '../users-server';

const profileFactory = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
});

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
    const input = 'some$123(432$%';
    const result = encrypt(input);
    expect(result).toBeType('string');
    expect(result).not.toEqual(input);
  });
  test('initUserDocument()', () => {
    const username = 'test';
    const password = 'pass';
    const profile = profileFactory();
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
    const accessToken2 = addAccessTokenToUser(user);
    testAccessToken(accessToken2);
    expect(user.accessTokens.length).toBe(2);
    expect(user.accessTokens[1]).toBe(accessToken2);
  });
});


describe('UsersServer', () => {
  describe('createAccount()', () => {
    describe('create account', () => {
      UsersServer.collection.remove({});
      const username = 'test';
      const password = 'pass';
      const profile = profileFactory();
      const accessToken = UsersServer.createAccount(username, password, profile);
      test('it issues a valid access token', () => {
        expect(accessToken).toHaveProperty('token');
        expect(accessToken).toHaveProperty('expiresAt');
      });
      test('it adds user to the collection', () => {
        expect(UsersServer.collection.items.length).toBe(1);
      });
      const user = UsersServer.collection.findOne();

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
      UsersServer.collection.remove({});
      const username = 'test';
      const password = 'pass';
      const password2 = 'pass1234';
      const profile = profileFactory();
      const profile2 = profileFactory();
      UsersServer.createAccount(username, password, profile);
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
    UsersServer.collection.remove({});
    const username = 'test';
    const password = 'pass';
    const profile = profileFactory();

    UsersServer.createAccount(username, password, profile);
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
      const user = UsersServer.collection.findOne({ username: 'test' });
      expect(user.accessTokens.find((a) => a.token === accessToken.token)).toBeDefined();
    });
  });
});
