import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';
import tanStackQuery from '@tanstack/eslint-plugin-query';

export default defineConfig(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2023,
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
      '@tanstack/query': tanStackQuery,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...tanStackQuery.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': 'off',
      'prettier/prettier': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/extensions': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent', 'index'], 'type', 'unknown'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'axios*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'logLevel*',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@*/**/*',
              group: 'internal',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features',
              from: './src/app',
              message: 'features 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/features',
              from: './src/pages',
              message: 'features 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/pages',
              from: './src/pages',
              message: 'pages 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/shared',
              from: './src/app',
              message: 'shared 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/shared',
              from: './src/features',
              message: 'shared 에서는 features 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/shared',
              from: './src/pages',
              message: 'shared 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  }
);
