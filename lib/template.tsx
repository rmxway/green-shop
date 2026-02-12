'use client';

import { usePathname } from 'next/navigation';
import { memo, ReactNode } from 'react';

import { Navbar } from '@/components';
import { TopBlock } from '@/components/ui';
import { SmoothScroll } from '@/lib/SmoothScroll';
import { checkVersion } from '@/services/localStore';
import { store } from '@/store';
import { ReduxProvider } from '@/store/provider';
import { ThemeModeProvider } from '@/theme';

export type TemplateProps = {
	children?: ReactNode | undefined;
};

checkVersion(store);

export const Template = memo(({ children }: TemplateProps) => {
	const pathname = usePathname();
	const isHomePage = pathname === '/';

	const content = (
		<>
			<Navbar />
			<TopBlock />
			{children}
		</>
	);

	return (
		<ReduxProvider>
			<ThemeModeProvider>{isHomePage ? <SmoothScroll>{content}</SmoothScroll> : content}</ThemeModeProvider>
		</ReduxProvider>
	);
});

export default Template;
