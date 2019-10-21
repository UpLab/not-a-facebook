import React from 'react';

// eslint-disable-next-line no-unused-vars
const Post = ({ title, body }) => (
  <div>
    <h1>{title}</h1>
    <p>{body}</p>
  </div>
);

const Feed = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <Post {...post} />
    ))}
  </div>
);

export default Feed;
