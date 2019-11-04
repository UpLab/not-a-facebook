import React from 'react';
import { Spinner } from 'reactstrap';
import Feed from '../components/Feed';
import PostForm from '../components/PostForm';
import useFeedPage from '../hooks/useFeedPage';
// import posts from '../__mocks__/posts';

const FeedPage = () => {
  const {
    posts, handleAddPost, handleRemovePost, loading,
  } = useFeedPage();

  return (
    <>
      <PostForm handleAddPost={handleAddPost} />
      { !loading ? (
        <Feed posts={posts} handleRemovePost={handleRemovePost} />
      ) : <Spinner style={{ width: '2rem', height: '2rem' }} /> }
    </>

  );
};


export default FeedPage;
