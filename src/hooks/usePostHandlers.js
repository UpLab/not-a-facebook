/* eslint-disable new-cap */
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { gql } from 'apollo-boost';
import uuid from 'uuid';
import { MY_POSTS_QUERY } from './useMyPosts';
import { POSTS_QUERY } from './usePosts';
import useMe from './useMe';


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

const usePostHandlers = () => {
  // / const client = useApolloClient();

  const [user] = useMe();

  const [deletePost] = useMutation(REMOVE_POST_MUTATION);

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
          const { myPosts: currentMyPosts } = cache.readQuery({ query: MY_POSTS_QUERY });
          const { posts: currentPosts } = cache.readQuery({ query: POSTS_QUERY });
          _.remove(currentMyPosts, (n) => n._id === postId);
          _.remove(currentPosts, (n) => n._id === postId);
          cache.writeQuery({
            query: MY_POSTS_QUERY,
            data: { myPosts: currentMyPosts },
          });
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


  const [addPost] = useMutation(ADD_POST_MUTATION, {
    refetchQueries: [{
      query: POSTS_QUERY,
      variables: { limit: 5, offset: 0 },
      fetchPolicy: 'cache-and-network',
    }],
    update: (cache, { data: { addPost: post } }) => {
      const { posts: prevPosts } = cache.readQuery({
        query: POSTS_QUERY,
        variables:
          { limit: 5, offset: 0 },
      });

      //  const { myPosts: prevMyPosts } = cache.readQuery({ query: MY_POSTS_QUERY,
      // variables: { limit: 5, offset: 0, } });
      const posts = [post, ...prevPosts];
      // const myPosts = [post, ...prevMyPosts];

      cache.writeQuery({
        query: POSTS_QUERY,
        variables: { limit: 5, offset: 0 },
        data: { posts },
      });
      //   console.log(cache.readQuery({ query: POSTS_QUERY }))
      // cache.writeQuery({
      //   query: MY_POSTS_QUERY,
      //   data: { myPosts },
      // });
    },
  });

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


  return {
    handleRemovePost,
    handleAddPost,
  };
};

export default usePostHandlers;
