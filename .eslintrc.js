module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX,
      modules: true, // Allows for use of import/export
    },
  },
  env: {
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    // rules for all files
    'no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-console': 'error',
    'react/prop-types': 'off',
  },
};
