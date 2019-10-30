import { useReducer } from 'react';
import PostsModel from '../modules/posts';

const reduce = (posts, action) => {
  switch (action.type) {
    case 'update':
      return action.posts;
    default:
      return posts;
  }
};

const useFeedPage = () => {
  const [posts, dispatch] = useReducer(reduce, PostsModel.get());

  const handleAddPost = (post) => {
    PostsModel.add(post);
    const list = PostsModel.get();
    dispatch({ type: 'update', posts: list });
  };

  const handleRemovePost = (post) => {
    PostsModel.remove(post);
    const list = PostsModel.get();
    dispatch({ type: 'update', posts: list });
  };

  return [posts, handleAddPost, handleRemovePost];
};

export default useFeedPage;
