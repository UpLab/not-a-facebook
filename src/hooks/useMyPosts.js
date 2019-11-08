import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import usePostHandlers from './usePostHandlers';

export const MY_POSTS_QUERY = gql`
  query {
    myPosts {
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


const useMyPosts = () => {
  const { handleRemovePost } = usePostHandlers();
  const { loading, data } = useQuery(MY_POSTS_QUERY, {
    pollInterval: 5000,
  });

  const posts = data && data.myPosts ? data.myPosts : [];

  return {
    posts,
    handleRemovePost,
    loading,
  };
};

export default useMyPosts;
