/* eslint-disable new-cap */
import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import uuid from 'uuid';
import _ from 'lodash';
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
const REMOVE_POST_MUTATION = gql`
mutation ($postId: ID!) {
  deletePost(postId: $postId)
}
 
`;

const useFeedPage = () => {
  const [user] = useMe();
  const { loading, data } = useQuery(POSTS_QUERY, {
    pollInterval: 5000,
  });

  const [addPost] = useMutation(ADD_POST_MUTATION, {
    refetchQueries: [{ query: POSTS_QUERY }],
    update: (cache, { data: { addPost: post } }) => {
      const { posts: prevPosts } = cache.readQuery({ query: POSTS_QUERY });
      const posts = [post, ...prevPosts];
      cache.writeQuery({
        query: POSTS_QUERY,
        data: { posts },
      });
    },
  });

  const [deletePost] = useMutation(REMOVE_POST_MUTATION, {
    refetchQueries: [{ query: POSTS_QUERY, fetchPolicy: 'cache-and-network' }],
  });
  const posts = data && data.posts ? data.posts : [];

  const handleAddPost = useCallback(async (body) => {
    try {
      await addPost({
        variables: { body, createdBy: user && user._id },
        optimisticResponse: {
          addPost: {
            _id: uuid(),
            body,
            createdAt: String(new Date().getTime()),
            creator: user,
            __typename: 'Post',
          },
        },
      });
      toast.success('Published a new post');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [addPost, user]);

  // eslint-disable-next-line no-unused-vars
  const handleRemovePost = useCallback(async (post) => {
    const postId = post._id;
    try {
      await deletePost({
        variables: { postId },
        optimisticResponse: {
          deletePost: {
            postId,
          },
        },
        update: (cache) => {
          const { posts: currentPosts } = cache.readQuery({ query: POSTS_QUERY });
          _.remove(currentPosts, (n) => n._id === postId);
          cache.writeQuery({
            query: POSTS_QUERY,
            data: { posts: currentPosts },
          });
        },
      });
      toast.success('remove post');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [deletePost]);

  return {
    posts,
    handleAddPost,
    handleRemovePost,
    loading,
  };
};

export default useFeedPage;
