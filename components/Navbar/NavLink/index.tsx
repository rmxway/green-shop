import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, HTMLAttributes, memo, ReactNode, useCallback } from 'react';

import { NavbarItem } from '@/components/Navbar/styled';
import { useNavigateWithScroll } from '@/services';

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

export const NavLink: FC<NavbarTypes> = memo(({ title, url, component, children, onClick, ...props }) => {
	const pathname = usePathname();
	const navigateTo = useNavigateWithScroll();
	const isActive = pathname === url;

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onClick?.(e);
			navigateTo(url);
		},
		[url, navigateTo, onClick],
	);

	return (
		<NavbarItem {...props}>
			<Link href={url} scroll={false} onClick={handleClick} />
			{title}
			{component}
			{isActive && children}
		</NavbarItem>
	);
});

NavLink.displayName = 'NavLink';

export default NavLink;
