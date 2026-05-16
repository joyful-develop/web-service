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
              target: './src/components',
              from: './src/app',
              message: 'components 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/components',
              from: './src/pages',
              message: 'components 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/hooks',
              from: './src/app',
              message: 'hooks 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/hooks',
              from: './src/components',
              message: 'hooks 에서는 components 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/hooks',
              from: './src/pages',
              message: 'hooks 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/hooks',
              from: './src/styles',
              message: 'hooks 에서는 styles 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/pages',
              from: './src/app',
              message: 'pages 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/stores',
              from: './src/app',
              message: 'stores 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/stores',
              from: './src/components',
              message: 'stores 에서는 components 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/stores',
              from: './src/hooks',
              message: 'stores 에서는 hooks 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/stores',
              from: './src/pages',
              message: 'stores 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/stores',
              from: './src/styles',
              message: 'stores 에서는 styles 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/app',
              message: 'styles 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/components',
              message: 'styles 에서는 components 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/hooks',
              message: 'styles 에서는 hooks 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/pages',
              message: 'styles 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/stores',
              message: 'styles 에서는 stores 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/types',
              message: 'styles 에서는 types 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/styles',
              from: './src/utils',
              message: 'styles 에서는 utils 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/app',
              message: 'types 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/components',
              message: 'types 에서는 components 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/hooks',
              message: 'types 에서는 hooks 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/pages',
              message: 'types 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/stores',
              message: 'types 에서는 stores 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/styles',
              message: 'types 에서는 styles 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/types',
              from: './src/utils',
              message: 'types 에서는 utils 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/app',
              message: 'utils 에서는 app 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/components',
              message: 'utils 에서는 components 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/hooks',
              message: 'utils 에서는 hooks 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/pages',
              message: 'utils 에서는 pages 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/stores',
              message: 'utils 에서는 stores 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/styles',
              message: 'utils 에서는 styles 의 모듈을 import할 수 없습니다.',
            },
            {
              target: './src/utils',
              from: './src/types',
              message: 'utils 에서는 types 의 모듈을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  }
);
