import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import PostsModel from '../modules/posts';

const GET_USER = gql`
query ($username: String!){
  user(username: $username)  {
    _id
    username
    profile {
      firstName
      lastName
      avatar
    }
  }
}
`;


const useUser = (username) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });


  const user = data && data.user ? data.user : null;

  return {
    user,
    loading,
  };
};

export default useUser;
