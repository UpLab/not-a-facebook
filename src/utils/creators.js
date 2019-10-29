import uuid from 'uuid/v4';
// eslint-disable-next-line import/prefer-default-export
export const createPost = (value, user) => ({
  id: uuid(),
  body: value,
  ownerId: user.id,
  ownerUsername: user.username,
});
