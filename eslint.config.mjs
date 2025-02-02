import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Les globales pour le navigateur
        ...globals.jest, // Ajout des globales pour Jest
      },
    },
  },
  pluginJs.configs.recommended,
];
