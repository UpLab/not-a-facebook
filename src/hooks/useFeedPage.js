import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { gql } from 'apollo-boost';
import useMe from './useMe';
// import PostsModel from '../modules/posts';

const POSTS_QUERY = gql`
  query {
    posts {
      _id
      body
      createdAt
      creator {
        _id
        profile {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

const ADD_POST_MUTATION = gql`
  mutation ($body: String!) {
    addPost(body: $body) {
      _id
      body
      createdAt
      creator {
        _id
        profile {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

const useFeedPage = () => {
  const [user] = useMe();
  const { loading, data } = useQuery(POSTS_QUERY);
  const [addPost] = useMutation(ADD_POST_MUTATION);
  const posts = data && data.posts ? data.posts : [];

  const handleAddPost = useCallback(async (body) => {
    try {
      await addPost({
        variables: { body, createdBy: user && user._id },
      });
      toast.success('Published a new post');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [addPost, user]);

  // eslint-disable-next-line no-unused-vars
  const handleRemovePost = (post) => {
    // TODO: handle remove post
    console.warn('remove post is temporarily unavailable');
    // PostsModel.remove(post);
    // const list = PostsModel.get();
    // setPosts(list);
  };

  return {
    posts,
    handleAddPost,
    handleRemovePost,
    loading,
  };
};

export default useFeedPage;
