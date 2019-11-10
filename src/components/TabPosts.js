import React from 'react';
import { Spinner } from 'reactstrap';
import Post from './Post';
import usePosts from '../hooks/usePosts';


const TabPosts = () => {
  const {
    posts, handleRemovePost, loading,
  } = usePosts();
  console.log(posts);
  if (loading) return <Spinner />;

  return (
    <div>
      {posts.length > 0
        && posts.map((post) => (
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
