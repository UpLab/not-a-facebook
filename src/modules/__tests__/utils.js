import faker from 'faker';

export const profileFactory = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
});

export const userFactory = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  profile: profileFactory(),
});

// eslint-disable-next-line jest/no-disabled-tests
test.skip('skip', () => { });
