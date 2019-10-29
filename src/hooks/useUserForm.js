import { useMemo, useState, useCallback } from 'react';
import UsersModel from '../modules/users';

const useUserForm = (user) => {
  const currentUser = useMemo(() => user || UsersModel.me(), [user]);
  const [state, setState] = useState({
    avatar: currentUser.profile.avatar,
    username: currentUser.username,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    password: '',
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  return [state, handleChange];
};

export default useUserForm;
