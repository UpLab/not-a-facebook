import faker from 'faker';
import UsersServer, {
  encrypt, initUserDocument,
  TOKEN_EXPIRATION_PERIOD,
  generateAccessToken,
  addAccessTokenToUser,
} from '../users-server';

describe('UsersServer helpers', () => {
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
    const profile = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar(),
    };
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

  const testAccessToken = (accessToken) => {
    expect(accessToken).toHaveProperty('token');
    expect(accessToken).toHaveProperty('expiresAt');
    expect(accessToken.expiresAt.getTime()).toBeGreaterThan(new Date().getTime());
    expect(accessToken.token).toBeType('string');
    expect(accessToken.token.length).toBeGreaterThan(2);
  };
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
