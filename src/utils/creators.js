import uuid from 'uuid/v4';
// eslint-disable-next-line import/prefer-default-export
export const createPost = (value, user) => ({
  id: uuid(),
  body: value,
  ownerId: user.id,
  ownerUsername: user.username,
});
export function createTimeAgo(date) {
  const diff = new Date() - date;

  const min = Math.floor(diff / 60000);
  if (min < 60) {
    if (min < 1) return 'just now';
    return `${min} minutes ago`;
  }
  if (min < 1440) {
    const hours = min / 60;
    return `${Math.trunc(hours)} hours ago`;
  }

  let d = new Date(date);
  d = [`0${d.getHours()}`, `0${d.getMinutes()}`];

  for (let i = 0; i < d.length; i += 1) {
    d[i] = d[i].slice(-2);
  }
  if (new Date(date).getHours() > 12) {
    return (
      `${d.slice(0, 3).join('.')} ${d.slice(3).join(':')}PM`
    );
  }
  return `${d.slice(0, 3).join('.')} ${d.slice(3).join(':')}AM`;
}
