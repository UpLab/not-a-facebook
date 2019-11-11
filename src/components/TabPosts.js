import React from 'react';
import Post from './Post';
import usePosts from '../hooks/usePosts';
import Spinner from './Spinner';


const TabPosts = () => {
  const {
    posts, handleRemovePost, loading, isFetchMore: isFetchingMore,
  } = usePosts();

  if (loading && posts.length === 0) return <Spinner />;
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          handleRemovePost={() => handleRemovePost({ _id: post._id })}
          {...post}
        />
      ))}
      {isFetchingMore && <Spinner />}
    </div>
  );
};

export default TabPosts;
