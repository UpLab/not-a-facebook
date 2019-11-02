
import { useReducer, useCallback } from 'react';
import { createPost } from '../utils/creators';
import UsersModule from '../modules/users';

const reduce = (state, action) => {
  switch (action.type) {
  case 'changeVisible':
    return { ...state, textAreaVisible: action.visible };
  case 'setBody':
    return { ...state, body: action.body };
  case 'inputValueChange':
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};

const usePostForm = (props) => {
  const [state, dispatch] = useReducer(reduce, {
    textAreaVisible: true,
    curUser: UsersModule.me(),
    body: '',
  });

  const toggleTextArea = () => {
    // eslint-disable-next-line react/destructuring-assignment
    dispatch({ type: 'changeVisible', visible: !state.textAreaVisible });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { curUser } = state;
    const { handleAddPost } = props;
    const post = createPost(e.target.body.value, curUser);
    handleAddPost(post);
    dispatch({ type: 'setBody', body: '' });
  };

  const handleChange = useCallback((e) => {
    dispatch({ type: 'inputValueChange', name: e.target.name, value: e.target.value });
  }, []);
  return [state, handleSubmit, handleChange, toggleTextArea];
};

export default usePostForm;
