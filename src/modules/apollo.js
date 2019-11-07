import ApolloClient, { gql } from 'apollo-boost';
// import { gql } from 'graphql';
import UserModel from './users';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_SERVER_URL,
  request: (operation) => {
    const headers = {
      Authorization: UserModel.token,
    };
    operation.setContext({ headers });
  },
});

const ME = gql`
query {
  me {
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

client
  .query({
    query: ME,
  });


export default client;
