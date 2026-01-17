module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
	},
	extends: [
		'airbnb',
		'plugin:import/recommended',
		'plugin:@next/next/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier', 'react', 'import'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['*.js'],
			extends: ['plugin:@typescript-eslint/disable-type-checked'],
		},
		{
			files: ['next-env.d.ts'],
			rules: {
				'@typescript-eslint/triple-slash-reference': 'off',
			},
		},
	],
	rules: {
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off',
		'no-shadow': 'off',
		'no-plusplus': 'off',
		'no-new': 'off',
		camelcase: 1,
		'no-console': 1,
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'no-underscore-dangle': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/prefer-default-export': 'off',
		'import/no-mutable-exports': 'off',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': [
			'off',
			{
				devDependencies: true,
			},
		],
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
		'import/no-named-as-default': 'error',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
			},
		],
		'prefer-destructuring': [
			'error',
			{
				object: true,
				array: false,
			},
		],
		'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
		'react/function-component-definition': [
			'off',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
        'react/prop-types': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-misused-promises': [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/label-has-for': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.ts', '.tsx', '.js'],
			},
		},
	},
	parser: '@typescript-eslint/parser',
};
