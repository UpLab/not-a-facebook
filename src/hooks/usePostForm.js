
import { useReducer, useCallback } from 'react';

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

const usePostForm = (handleAddPost) => {
  const [state, dispatch] = useReducer(reduce, {
    textAreaVisible: true,
    body: '',
  });

  const toggleTextArea = useCallback(() => {
    // eslint-disable-next-line react/destructuring-assignment
    dispatch({ type: 'changeVisible', visible: !state.textAreaVisible });
  }, [state.textAreaVisible]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'setBody', body: '' });
      await handleAddPost(e.target.body.value);
    } catch (error) {
      // Do nothing
    }
  }, [handleAddPost]);

  const handleChange = useCallback((e) => {
    dispatch({ type: 'inputValueChange', name: e.target.name, value: e.target.value });
  }, []);
  return [state, handleSubmit, handleChange, toggleTextArea];
};

export default usePostForm;
