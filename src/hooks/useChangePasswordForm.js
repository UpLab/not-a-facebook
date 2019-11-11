import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useMe from './useMe';

export const CHANGE_PASSWORD_MUTATION = gql`
mutation changePassword ( $password: String! $newPassword: String!) {
    changePassword (
      input:{       
        password: $password
        newPassword: $newPassword
      }
    ) 
  }
`;


const useChangePasswordForm = () => {
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_MUTATION);


  const [me] = useMe();
  const [state, setState] = useState({
    avatar: me.profile.avatar,
    password: '',
    newPassword: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  const validation = useCallback(() => {
    const { newPassword } = state;
    if (_.isEmpty(newPassword)) {
      throw new Error('invalid  new password');
    }
    return true;
  }, [state]);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { password, newPassword } = state;

    try {
      validation();

      const { data: { changePassword } } = await changePasswordMutation({
        variables: { password, newPassword },
      });
      if (changePassword) {
        toast.success('Success');
      } else {
        toast.error('Password not change');
      }
      return changePassword;
    } catch (error) {
      let { message } = error;
      if (error.graphQLErrors) {
        message = error.graphQLErrors.map((err) => err.message).join('\n');
      }

      toast.error(message);
    }
    return false;
  }, [changePasswordMutation, state, validation]);

  return [state, handleChange, handleSubmit];
};
export default useChangePasswordForm;
