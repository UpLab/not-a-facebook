import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import usePostHandlers from './usePostHandlers';
import useInfiniteScroll from './useInfiniteScroll';


export const POSTS_QUERY = gql`
  query($offset: Int!, $limit: Int!) {
    posts(offset: $offset, limit: $limit) {
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
  const client = useApolloClient();

  const [state, setState] = useState({
    posts: [],
    morePost: [],
    isFetchingMore: false,
  });

  const { handleRemovePost } = usePostHandlers();

  const { data, loading } = useQuery(POSTS_QUERY, {
    variables: { limit: 5, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });


  const setIsFetching = useInfiniteScroll(fetchMoreListItems);

  async function fetchMoreListItems() {
    setState((prevState) => ({ ...prevState, isFetchingMore: true }));
    const { data: { posts: newPosts } } = await client.query({
      query: POSTS_QUERY,
      variables:
        { offset: state.posts.length + state.morePost.length, limit: 2 },
    });

    setState((prevState) => ({
      ...prevState,
      morePost: [...prevState.morePost, ...newPosts],
      isFetchingMore: false,
    }));
    setIsFetching(false);
  }

  if (data && data.posts && data.posts !== state.posts) {
    setState((prevState) => ({ ...prevState, posts: data.posts }));
  }


  return {
    posts: [...state.posts, ...state.morePost],
    handleRemovePost,
    loading,
    isFetchingMore: state.isFetchingMore,
  };
};

export default usePosts;
