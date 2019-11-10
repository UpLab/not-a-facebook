import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import usePostHandlers from './usePostHandlers';
import useInfiniteScroll from './useInfiniteScroll';

export const MY_POSTS_QUERY = gql`
  query($offset: Int!, $limit: Int!) {
   myPosts(offset: $offset, limit: $limit) {
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
  const client = useApolloClient();

  const [posts, setPosts] = useState([]);
  const { handleRemovePost } = usePostHandlers();
  const { loading, data } = useQuery(MY_POSTS_QUERY, {
    variables: { offset: 0, limit: 5 },
    onCompleted: () => {
      const { myPosts } = data;
      setPosts((prevState) => ([...prevState, ...myPosts]));
    },
  });

  const [isFetchingMore, setIsFetching] = useInfiniteScroll(fetchMoreListItems);


  async function fetchMoreListItems() {
    const { data: datas } = await client.query({
      query: MY_POSTS_QUERY,
      variables: { offset: posts.length, limit: 2 },
    });
    const { myPosts: newPosts } = datas;
    setPosts((prevState) => ([...prevState, ...newPosts]));
    setIsFetching(false);
  }
  return {
    posts,
    handleRemovePost,
    loading,
    isFetchingMore,
  };
};

export default useMyPosts;
