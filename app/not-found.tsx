'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NotFoundCode, NotFoundPath, NotFoundSection, NotFoundText, NotFoundTitle } from '@/app/styled';
import { Button } from '@/components/ui';

export default function NotFound() {
	const path = usePathname();

	return (
		<NotFoundSection>
			<NotFoundCode>404</NotFoundCode>
			<NotFoundTitle>Страница не найдена</NotFoundTitle>
			<NotFoundText>Похоже, вы забрели не туда. Эта страница не существует или была перемещена.</NotFoundText>
			{path && path !== '/' && <NotFoundPath>{path}</NotFoundPath>}
			<Link href="/">
				<Button as="span" $primary>
					На главную
				</Button>
			</Link>
		</NotFoundSection>
	);
}
