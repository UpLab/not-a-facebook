module.exports = {
  parser: "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "airbnb",
    "plugin:jest/recommended"
  ],
  "plugins": [
    "jest"
  ],
  "rules": {
    "react/jsx-filename-extension": 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
    'no-underscore-dangle': 'off',
    "linebreak-style": 0,
  }
};