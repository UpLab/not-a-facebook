import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Uploader from '../modules/uploader';
import useMe from './useMe';


const UPDATE_ACCOUNT_MUTATION = gql`
mutation updateAccount ($username: String! $profile: UserProfileInput!) {
  updateAccount (
    input:{
      username: $username      
      profile: $profile
    }
  ) {
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
const useUserForm = () => {
  const [updateAccount] = useMutation(UPDATE_ACCOUNT_MUTATION);

  const [me] = useMe();
  const [state, setState] = useState({
    avatar: me.profile.avatar,
    newAvatar: null,
    username: me.username,
    firstName: me.profile.firstName,
    lastName: me.profile.lastName,
    isUploading: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  const validation = useCallback(() => {
    const {
      firstName, lastName, username,
    } = state;

    if (_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(username)) throw new Error('invalid date');
    return true;
  }, [state]);

  const uploadAvatar = async (newAvatar) => {
    const url = await Uploader.upload(newAvatar);
    return url;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    let newAvatar = e.target.newAvatar.files[0];
    const {
      username, firstName, lastName, avatar,
    } = state;
    const profile = { firstName, lastName, avatar };
    try {
      validation();
      if (newAvatar) {
        setState((s) => ({ ...s, isUploading: true }));
        newAvatar = await uploadAvatar(newAvatar) || avatar;
        setState((s) => ({ ...s, avatar: newAvatar, isUploading: false }));
        profile.avatar = newAvatar;
      }

      await updateAccount({
        variables: { username, profile },
      });
      toast.success('Success');
    } catch (error) {
      setState((s) => ({ ...s, isUploading: false }));
      toast.error(error.message);
    }
  }, [state, updateAccount, validation]);

  return [state, handleChange, handleSubmit];
};


export default useUserForm;
