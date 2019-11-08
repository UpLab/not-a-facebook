import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import usePostHandlers from './usePostHandlers';
// import PostsModel from '../modules/posts';

export const POSTS_QUERY = gql`
  query {
    posts {
      _id
      body
      createdAt
      creator {
        _id
        username        
        profile {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;


const usePosts = () => {
  const { handleRemovePost } = usePostHandlers();
  const { loading, data } = useQuery(POSTS_QUERY, {
    pollInterval: 5000,
  });
  const posts = data && data.posts ? data.posts : [];
  return {
    posts,
    handleRemovePost,
    loading,
  };
};

export default usePosts;
