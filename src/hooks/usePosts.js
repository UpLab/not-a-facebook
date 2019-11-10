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
  const [posts, setPosts] = useState([]);
  const [isFetchMore, setFetchMore] = useState(false);

  const { handleRemovePost } = usePostHandlers();
  const { data, loading } = useQuery(POSTS_QUERY, {
    variables: { limit: 5, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });


  const [isFetchingMore, setIsFetching] = useInfiniteScroll(fetchMoreListItems);


  async function fetchMoreListItems() {
    setFetchMore(true);
    const { data: datas } = await client.query({
      query: POSTS_QUERY,
      variables:
      { offset: posts.length, limit: 2 },
    });
    const { posts: newPosts } = datas;
    setPosts((prevState) => ([...prevState, ...newPosts]));
    setIsFetching(false);
  }
  if (data && data.posts && data.posts !== posts && !isFetchMore) {
    setPosts(data.posts);
    console.log(posts);
  }

  return {
    posts,
    handleRemovePost,
    loading,
    isFetchingMore,
  };
};

export default usePosts;
