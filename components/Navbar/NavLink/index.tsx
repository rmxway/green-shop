import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC, HTMLAttributes, ReactNode, useCallback } from 'react';

import { NavbarItem } from '@/components/Navbar/styled';

export interface NavbarProps {
	title?: string;
	url: string;
	component?: ReactNode;
}

type NavbarTypes = NavbarProps &
	Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> &
	MotionProps & {
		onClick?: (event: React.MouseEvent) => void;
	};

export const NavLink: FC<NavbarTypes> = ({ title, url, component, children, onClick, ...props }) => {
	const pathname = usePathname();
	const router = useRouter();
	const isActive = pathname === url;

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();

			// Всегда выполняем onClick первым (для закрытия мобильного меню)
			onClick?.(e);

			// Для навигации на другую страницу
			// Если страница уже вверху, переходим сразу без задержки
			if (window.scrollY === 0) {
				router.push(url);
				return;
			}

			// Если уже на этой странице, просто скроллим вверх
			if (pathname === url) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}

			// Иначе делаем задержку для анимации полоски и скролла
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setTimeout(() => router.push(url), 350);
		},
		[pathname, url, router, onClick],
	);

	return (
		<NavbarItem {...props}>
			<Link href={url} scroll={false} onClick={handleClick} />
			{title}
			{component}
			{isActive && children}
		</NavbarItem>
	);
};

export default NavLink;
