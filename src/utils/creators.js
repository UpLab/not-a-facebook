import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const createPost = (value) => ({
  id: faker.random.uuid(),
  body: value,
});

export const upLoginDate = (_user) => {
  const user = _user;
  user.lastLoginDate = new Date();
  return user;
};
