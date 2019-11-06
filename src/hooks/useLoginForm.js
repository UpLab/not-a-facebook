
import { useReducer, useCallback } from 'react';
import faker from 'faker';
import useAuthHandlers from './useAuthHandlers';
// import UsersModel from '../modules/users';
// import routes from '../router/routes';

const reduce = (state, action) => {
  switch (action.type) {
  case 'change':
    return { ...state, [action.name]: action.value };
  case 'err':
    return { ...state, errLogin: { active: true, msg: action.msg } };
  default:
    return state;
  }
};

const mockProfile = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
});

const useLoginForm = ({ isLogin, onSuccess }) => {
  const [state, dispatch] = useReducer(reduce, {
    username: '',
    password: '',
    errLogin: { active: false, msg: '' },
  });

  const { createAccount, login } = useAuthHandlers();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { username, password } = state;
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await createAccount(username, password, mockProfile());
      }
      onSuccess(data);
    } catch (err) {
      let { message } = err;
      if (err.graphQLErrors) {
        message = err.graphQLErrors.map((error) => error.message).join('\n');
      }
      dispatch({ type: 'err', msg: message });
    }
  }, [createAccount, isLogin, login, onSuccess, state]);

  // handleLogOut = (e) => {
  //   e.preventDefault();
  //   UsersModel.logout(true);
  //   this.setState({ curUser: UsersModel.me() });
  // }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });
  }, []);
  return [state, handleSubmit, handleChange];
};

export default useLoginForm;
