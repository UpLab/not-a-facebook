/* eslint-disable new-cap */
import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import uuid from 'uuid';
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

const DELETE_POST_MUTATION = gql`
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

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    refetchQueries: [{ query: POSTS_QUERY }],
    update: (cache, { data: { deletePost: resolve } }) => {
      const { posts: prevPosts } = cache.readQuery({ query: POSTS_QUERY });
      if (resolve) prevPosts.shift();
      const posts = prevPosts;
      cache.writeQuery({
        query: POSTS_QUERY,
        data: { posts },
      });
    },
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

  const handleRemovePost = useCallback(async ({ _id }) => {
    try {
      await deletePost({
        variables: { postId: _id },
        optimisticResponse: { deletePost: true },
      });
      toast.success('Post is removed!');
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
