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
    "jest",
    "react-hooks",
  ],
  "rules": {
    "react/jsx-filename-extension": 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'linebreak-style': 'off',
    'react/jsx-wrap-multilines': 'off',
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "indent": ["error", 2, { "ignoredNodes": ["JSXElement"] }],
  }
};