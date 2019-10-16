import faker from 'faker';

const N = 10;

const posts = [...Array(N)].map(() => ({
  // id: faker.random.uuid(),
  title: faker.lorem.words(),
  body: faker.lorem.paragraph(),
}));

export default posts;
