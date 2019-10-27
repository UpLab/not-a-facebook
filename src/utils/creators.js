import uuid from 'uuid/v4';

// eslint-disable-next-line import/prefer-default-export
export const createPost = (value, userId) => ({
  id: uuid(),
  body: value,
  userId,
});
