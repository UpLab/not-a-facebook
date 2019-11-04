import ApolloClient, { gql } from 'apollo-boost';
// import { gql } from 'graphql';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_SERVER_URL,
});

const ME = gql`
query {
  me {
    id
  }
}
`;

client
  .query({
    query: ME,
  })
  .then((result) => console.log(result));

export default client;
