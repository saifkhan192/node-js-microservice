
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: [
    'react',
    '@typescript-eslint',
  ],

  rules: {
    'eslint/no-shadow': 'off',
    'eslint/no-underscore-dangle': 'off',
    'eslintno-unused-vars': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'max-classes-per-file': 'off',
    'max-len': ['error', { code: 130 }],
    'no-lone-blocks': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'off'
    'react/destructuring-assignment': 'off',
    'react/no-danger': 'off',
    'react/no-string-refs': 'off',
    'react/prop-types': 'off',
    'react/static-property-placement': 'off',
    eqeqeq: 'off',
    indent: ['error', 2],
  },
};
