import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**'] },

  js.configs.recommended,

  {
    files: ['src/**/*.js'],
    ignores: ['src/service-worker.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
  },

  {
    files: ['src/service-worker.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
        __SW_PRECACHE_URLS__: 'readonly',
      },
    },
  },

  {
    files: ['vite.config.js', 'vite/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        __dirname: 'readonly',
      },
    },
  },

  prettier,
];
