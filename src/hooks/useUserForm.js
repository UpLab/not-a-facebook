import { useState, useCallback } from 'react';
// import { toast } from 'react-toastify';
// import _ from 'lodash';
// import Uploader from '../modules/uploader';
import useMe from './useMe';

// nice
const useUserForm = () => {
  const [currentUser] = useMe();
  const [state, setState] = useState({
    avatar: currentUser.profile.avatar,
    newAvatar: null,
    username: currentUser.username,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    password: '',
    newPassword: '',
    isUploading: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  /* const validation = useCallback(() => {
     const {
      firstName, lastName, password, newPassword, username,
    } = state;
    const userByUserName = UsersModel.getUserByUsername(username);
    const encryptPassword = UsersModel.encrypt(password);
    if (!_.isEmpty(password) && encryptPassword !== currentUser.password)
     throw new Error('Invalid password!');
    if (!_.isEmpty(password) && _.isEmpty(newPassword)) throw new Error('Invalid  new password!');
    if (userByUserName && userByUserName.id !== currentUser.id)
     throw new Error('Username already taken!');
    if (_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(username))
     throw new Error('Invalid date!');
    return true;
  }, []); */

  /* // TODO:
  const uploadAvatar = async (newAvatar) => {
    const url = await Uploader.upload(newAvatar);
    return url;
  }; */

  // TODO:
  const handleSubmit = useCallback(// async (e) => {
    /* e.preventDefault();
    let newAvatar = e.target.newAvatar.files[0];
    const {
      firstName, lastName, password, newPassword, username, avatar,
    } = state;
    const newUser = {
      id: currentUser.id,
      username,
      password: _.isEmpty(password) ? currentUser.password : UsersModel.encrypt(newPassword),
      profile: { firstName, lastName, avatar },
    };
    try {
      validation();
      if (newAvatar) {
        setState((s) => ({ ...s, isUploading: true }));
        newAvatar = await uploadAvatar(newAvatar) || avatar;
        setState((s) => ({ ...s, avatar: newAvatar, isUploading: false }));
        newUser.profile.avatar = newAvatar;
      }

      UsersModel.update(newUser);
      currentUser.password = newUser.password;
      toast.success('Success');
    } catch (error) {
      setState((s) => ({ ...s, isUploading: false }));
      toast.error(error.message);
    } } */
  );// , []);

  return [state, handleChange, handleSubmit];
};

export default useUserForm;
