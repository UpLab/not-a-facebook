import React from 'react';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import useFeedPage from '../hooks/useFeedPage';
// import posts from '../__mocks__/posts';

const FeedPage = () => {
  const [posts, handleAddPost, handleRemovePost] = useFeedPage();

  return (
    <>
      <PostForm handleAddPost={handleAddPost} />
      <Feed posts={posts} handleRemovePost={handleRemovePost} />
    </>

  );
};


export default FeedPage;
