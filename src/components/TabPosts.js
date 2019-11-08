import React from 'react';
import Post from './Post';
import usePosts from '../hooks/usePosts';

const TabPosts = () => {
  const {
    posts, handleRemovePost,
  } = usePosts();
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          handleRemovePost={() => handleRemovePost({ _id: post._id })}
          {...post}
        />
      ))}
    </div>
  );
};

export default TabPosts;
