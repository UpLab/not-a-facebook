import { useState } from 'react';
import PostsModel from '../modules/posts';

const useFeedPage = () => {
  const [posts, setPosts] = useState(PostsModel.get());

  const handleAddPost = (post) => {
    PostsModel.add(post);
    const list = PostsModel.get();
    setPosts(list);
  };

  const handleRemovePost = (post) => {
    PostsModel.remove(post);
    const list = PostsModel.get();
    setPosts(list);
  };

  return [posts, handleAddPost, handleRemovePost];
};

export default useFeedPage;
