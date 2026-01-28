const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const nextPlugin = require('@next/eslint-plugin-next');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      '.next/**',
      'next-env.d.ts',
      'dist/**',
      'build/**',
      'node_modules/**',
      '.vscode/**',
      '.idea/**',
      '.DS_Store',
      'Thumbs.db',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@next/next': nextPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      // ESLint recommended rules
      'no-unused-vars': 'off', // Отключаем базовое правило, используем @typescript-eslint/no-unused-vars
      'no-shadow': 'off', // Отключаем базовое правило, используем @typescript-eslint/no-shadow

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off', // Отключаем в пользу unused-imports
      '@typescript-eslint/no-shadow': 'error',

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/function-component-definition': 'off',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules
      'import/prefer-default-export': 'off',
      'import/no-mutable-exports': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: true,
        },
      ],

      // Simple import sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // JSX a11y
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/label-has-for': 'off',

      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',

      // Custom rules
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-new': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 1,
      'no-console': 1,

      // Prefer destructuring
      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],

      // TypeScript specific
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.ts', '.tsx', '.js'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/extensions': 'off',
    },
  },
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
  },
  // Test files
  {
    files: ['**/*.test.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  // JavaScript files
  {
    files: ['**/*.{js,mjs}'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
  // next-env.d.ts specific rules
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/extensions': 'off',
    },
  },
];