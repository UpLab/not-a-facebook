import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query me {
    me {
      _id
      username
      profile {
        avatar
        firstName
        lastName
      }
    }
  }
`;


const useMe = () => {
  const { loading, data } = useQuery(ME_QUERY);

  return [data ? data.me : undefined, loading];
};

export default useMe;
