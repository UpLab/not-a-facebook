import React from 'react';

const initialValue = {
  setTheme: () => {},
  theme: 'light',
};
const ThemeContext = React.createContext(initialValue);

export default ThemeContext;
