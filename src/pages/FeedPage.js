import React from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import usePostHandlers from '../hooks/usePostHandlers';
// import posts from '../__mocks__/posts';

const FeedPage = () => {
  const { handleAddPost } = usePostHandlers();

  return (
    <>
      <PostForm onSubmit={handleAddPost} />
      <Feed />
    </>

  );
};


export default FeedPage;
