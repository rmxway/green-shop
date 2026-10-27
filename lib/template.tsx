'use client';

import { memo, ReactNode } from 'react';

import { Navbar } from '@/components';
import { TopBlock } from '@/components/ui';
import { SessionProvider } from '@/lib/SessionProvider';
import { checkVersion } from '@/services/localStore';
import { store } from '@/store';
import { ReduxProvider } from '@/store/provider';
import { ThemeModeProvider } from '@/theme';

export type TemplateProps = {
	children?: ReactNode | undefined;
};

checkVersion(store);

export const Template = memo(({ children }: TemplateProps) => {
	return (
		<SessionProvider>
			<ReduxProvider>
				<ThemeModeProvider>
					<Navbar />
					<TopBlock />
					{children}
				</ThemeModeProvider>
			</ReduxProvider>
		</SessionProvider>
	);
});

export default Template;
