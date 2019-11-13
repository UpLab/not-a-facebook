import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import usePostHandlers from './usePostHandlers';
import useInfiniteScroll from './useInfiniteScroll';


export const POSTS_QUERY = gql`
  query($offset: Int!, $limit: Int!) {
    posts(offset: $offset, limit: $limit) @connection(key: "posts") {
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
  const [state, setState] = useState({
    isFetchingMore: false,
  });

  const { handleRemovePost } = usePostHandlers();

  const { data, loading, fetchMore } = useQuery(POSTS_QUERY, {
    variables: { limit: 5, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });

  const posts = data ? data.posts : [];

  const fetchMoreListItems = useCallback(async () => {
    setState({
      isFetchingMore: true,
    });
    setIsFetching(true);
    await fetchMore({
      variables: {
        offset: posts.length,
        limit: 2,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, posts: [...prev.posts, ...fetchMoreResult.posts] };
      },
    });
    setState({
      isFetchingMore: false,
    });
    setIsFetching(false);
  }, [posts.length, fetchMore, setIsFetching]);

  const setIsFetching = useInfiniteScroll(fetchMoreListItems);

  return {
    posts,
    handleRemovePost,
    loading,
    isFetchingMore: state.isFetchingMore,
  };
};

export default usePosts;
