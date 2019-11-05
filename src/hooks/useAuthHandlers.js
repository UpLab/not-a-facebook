import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import UserModel from '../modules/users';

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
      }
      token
    }
  }
`;

const useAuthHandlers = () => {
  const [createAccountMutate] = useMutation(CREATE_ACCOUNT);

  const createAccount = useCallback(async (username, password, profile) => {
    const { data: { createAccount: data } } = await createAccountMutate({
      variables: { username, password, profile },
    });
    const { token, user } = data;
    UserModel.setToken(token);
    // TODO: remove it later
    UserModel.currentUser = user;
    return data;
  }, [createAccountMutate]);

  const login = useCallback((formData) => {
    console.log(formData);
    // TODO: Login mutation
  }, []);

  return { createAccount, login };
};

export default useAuthHandlers;
