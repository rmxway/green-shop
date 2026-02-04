import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Options } from '@swc/core';

const config: StorybookConfig = {
	stories: ['../components/**/*.stories.@(ts|tsx)'],
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
		const publicPath = basePath !== '/' ? './' : '/';
		webpackConfig.output = webpackConfig.output ?? {};
		webpackConfig.output.publicPath = publicPath;
		webpackConfig.resolve = webpackConfig.resolve ?? {};
		const projectRoot = path.resolve(__dirname, '..');
		webpackConfig.resolve.alias = {
			...webpackConfig.resolve.alias,
			'@': projectRoot,
			'react-imask': path.join(projectRoot, 'node_modules/react-imask'),
			'next/link': path.resolve(__dirname, 'next-link-mock.tsx'),
			'next/image': path.resolve(__dirname, 'next-image-mock.tsx'),
			'next/navigation': path.resolve(__dirname, 'next-navigation-mock.ts'),
		};
		webpackConfig.performance = { hints: false };
		webpackConfig.infrastructureLogging = { level: 'error' };
		webpackConfig.optimization = {
			...webpackConfig.optimization,
			splitChunks: {
				...webpackConfig.optimization?.splitChunks,
				chunks: 'all',
				cacheGroups: {
					...(webpackConfig.optimization?.splitChunks as { cacheGroups?: object })?.cacheGroups,
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
					},
				},
			},
		};
		return webpackConfig;
	},
};

export default config;
