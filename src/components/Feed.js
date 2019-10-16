import MiniReact from '../modules/MiniReact';

// eslint-disable-next-line no-unused-vars
const Post = ({ title, body }) => (
  <div>
    <h1>{title}</h1>
    <p>{body}</p>
  </div>
);

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </div>
  );
};

export default Feed;
