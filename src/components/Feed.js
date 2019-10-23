import React from 'react';
import ButtonRemove  from './ButtonRemove';
// eslint-disable-next-line no-unused-vars
const Post = (post) => (
  <div>
    <p>{post.body}</p>
    <ButtonRemove />
  </div>
);

const Feed = ({ posts }) => (
  <div>
    { posts.map((post) => (
        <Post key={post.id} body={post.body} />
      ))
    }
  </div>
);

export default Feed;
