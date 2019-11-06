import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import UserModel from '../modules/users';
import { ME_QUERY } from './useMe';

const CREATE_ACCOUNT = gql`
  mutation createAccount ($username: String! $password: String! $profile: UserProfileInput) {
    createAccount (
      input:{
        username: $username
        password: $password
        profile: $profile
      }
    ) {
      user {
        _id
        username
        profile {
          firstName
          lastName
          avatar
        }
      }
      token
    }
  }
`;

const LOGIN = gql`
  mutation login ($username: String! $password: String! ) {
    login (
      input:{
        username: $username
        password: $password      
      }
    ) {
      user {
        _id
        username
        profile {
          firstName
          lastName
          avatar
        }
      }
      token
    }
  }
`;

const useAuthHandlers = () => {
  const client = useApolloClient();

  const [createAccountMutate] = useMutation(CREATE_ACCOUNT, {
    onCompleted: ({ createAccount: { token } }) => {
      UserModel.setToken(token);
      client.query({ query: ME_QUERY, fetchPolicy: 'network-only' });
    },
  });
  const [loginMutate] = useMutation(LOGIN, {
    onCompleted: ({ login: { token } }) => {
      UserModel.setToken(token);
      client.query({ query: ME_QUERY, fetchPolicy: 'network-only' });
    },
  });

  const createAccount = useCallback(async (username, password, profile) => {
    const { data: { createAccount: data } } = await createAccountMutate({
      variables: { username, password, profile },
    });
    return data;
  }, [createAccountMutate]);

  const login = useCallback(async (username, password) => {
    const { data: { login: data } } = await loginMutate({
      variables: { username, password },
      // update: (store, { data: { login: { user } } }) => {
      //   store.writeQuery({ query: ME_QUERY, data: { me: user } });
      // },
    });
    return data;
  }, [loginMutate]);

  return { createAccount, login };
};

export default useAuthHandlers;
