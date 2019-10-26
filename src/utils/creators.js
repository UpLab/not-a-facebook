import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const createPost = (value) => ({
  id: faker.random.uuid(),
  body: value,
});
