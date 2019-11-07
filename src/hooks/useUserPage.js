import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USER_QUERY = gql`
query ($username: String!) {
  user(username: $username) {
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

const useUserPage = (props) => {
  const { match: { params: { username } } } = props;
  const { data } = useQuery(USER_QUERY, { variables: { username } });
  const { user } = data || {};
  return [user];
};

export default useUserPage;
