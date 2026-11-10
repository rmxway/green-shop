import '@/public/assets/fonts/icofont/icofont.scss';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { StyledComponentsRegistry } from '@/lib/registry';

const Font = Roboto({
	weight: ['100', '400', '700'],
	subsets: ['cyrillic'],
	preload: true,
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Green Shop | Brand',
	icons: {
		icon: '/logo.svg',
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<body className={Font.className}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
