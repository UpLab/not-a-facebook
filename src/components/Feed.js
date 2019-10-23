import React from 'react';
import Post  from './Post';
// eslint-disable-next-line no-unused-vars

const Feed = ({ posts, handleRemovePost }) => (
  <div>
    { posts.map((post) => (
        <Post post={post} handleRemovePost={handleRemovePost.bind(this, {id: post.id})}/>
      ))
    }
  </div>
);

export default Feed;
