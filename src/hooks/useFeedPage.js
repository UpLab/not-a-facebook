// import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import PostsModel from '../modules/posts';

const POSTS_QUERY = gql`
  query {
    posts {
      id
      body
      createdAt
      creator {
        id
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
      id
      body
      createdAt
      creator {
        id
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
  const { loading, data } = useQuery(POSTS_QUERY);
  const [addPost] = useMutation(ADD_POST_MUTATION);
  const posts = data && data.posts ? data.posts : [];

  const handleAddPost = (post) => {
    // TODO: handle errors
    addPost({
      variables: { body: post.body },
    }).then(console.log).catch(console.warn);
  };

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
