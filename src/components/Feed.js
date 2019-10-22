import React from 'react';

// eslint-disable-next-line no-unused-vars
const Post = ({ title, body }) => (
  <div>
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
