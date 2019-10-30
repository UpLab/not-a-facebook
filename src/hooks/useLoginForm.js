
import { useReducer, useCallback } from 'react';
import faker from 'faker';
import UsersModel from '../modules/users';
import routes from '../routes';

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

const useLoginForm = (props) => {
  const [state, dispatch] = useReducer(reduce, {
    username: '',
    password: '',
    errLogin: { active: false, msg: '' },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { history, isLogin } = props;
    const { username, password } = state;
    try {
      if (isLogin) {
        UsersModel.login(username, password);
      } else {
        UsersModel.createAccount(username, password, mockProfile());
      }
      history.push(routes.feed);
    } catch (err) {
      dispatch({ type: 'err', msg: err.toString() });
    }
  };

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
