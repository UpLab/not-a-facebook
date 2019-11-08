import React from 'react';
import Post from './Post';
import useMyPosts from '../hooks/useMyPosts';

const TabMyPosts = () => {
  const {
    posts, handleRemovePost,
  } = useMyPosts();
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

export default TabMyPosts;
