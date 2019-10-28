import faker from 'faker';

faker.locale = 'ru';
// eslint-disable-next-line import/prefer-default-export
export const createPost = (value, user) => ({
  id: faker.random.uuid(),
  body: value,
  creatorsProfile: user.profile,
});
