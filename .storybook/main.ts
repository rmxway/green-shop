import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Options } from '@swc/core';

const config: StorybookConfig = {
	stories: ['@/components/**/*.stories.@(ts|tsx)'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-essentials'],
	swc: (swcConfig: Options): Options => ({
		...swcConfig,
		jsc: {
			...swcConfig.jsc,
			transform: {
				...(swcConfig.jsc?.transform ?? {}),
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	staticDirs: ['../public'],
	webpackFinal: async (webpackConfig) => {
		const path = require('path');
		const basePath = process.env.BASE_PATH ?? '/';
		webpackConfig.output = webpackConfig.output ?? {};
		webpackConfig.output.publicPath = basePath.endsWith('/') ? basePath : `${basePath}/`;
		webpackConfig.resolve = webpackConfig.resolve ?? {};
		webpackConfig.resolve.alias = {
			...webpackConfig.resolve.alias,
			'@': path.resolve(__dirname, '..'),
			'next/link': path.resolve(__dirname, 'next-link-mock.tsx'),
			'next/image': path.resolve(__dirname, 'next-image-mock.tsx'),
			'next/navigation': path.resolve(__dirname, 'next-navigation-mock.ts'),
		};
		return webpackConfig;
	},
};

export default config;
