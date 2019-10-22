import React from 'react';

// eslint-disable-next-line no-unused-vars
const Post = ({ body }) => (
  <div>
    <p>{body}</p>
  </div>
);

const Feed = ({ posts }) => (
  <div>
    { posts.map((post) => (
      <Post key={post.id} body={post.body} />
    ))}
  </div>
);

export default Feed;
