import React from 'react';
import Post from './Post';
import Spinner from './Spinner';
import useMyPosts from '../hooks/useMyPosts';

const TabMyPosts = () => {
  const {
    posts, handleRemovePost, loading, isFetchMore: isFetchingMore,
  } = useMyPosts();

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

export default TabMyPosts;
