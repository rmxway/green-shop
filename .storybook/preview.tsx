import type { Preview } from '@storybook/react';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { ReduxProvider } from '@/store/provider';
import { defaultTheme, GlobalStyles } from '@/theme';

const StorybookIcofontFix = createGlobalStyle`
	i[class*='icofont']::before {
		font-size: 100%;
		line-height: 1;
	}
`;

const StorybookLayoutFix = createGlobalStyle`
	.sb-layout-debug {
		border: 1px dashed #999;
		display: inline-block;
		padding: 8px;
		min-width: 120px;
		min-height: 40px;
	}
`;

const withTheme = (Story: React.ComponentType) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyles />
		<StorybookIcofontFix />
		<StorybookLayoutFix />
		<Story />
	</ThemeProvider>
);

const preview: Preview = {
	decorators: [withTheme],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export const withRedux = (Story: React.ComponentType) => (
	<ReduxProvider>
		<Story />
	</ReduxProvider>
);

export default preview;
