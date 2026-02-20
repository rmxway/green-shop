import { FC, useMemo, useState } from 'react';

import { AccountNavItem } from '@/components/Navbar/AccountNavItem';
import { BurgerButton } from '@/components/Navbar/BurgerButton';
import { CartNavItem } from '@/components/Navbar/CartNavItem';
import { CompareNavItem } from '@/components/Navbar/CompareNavItem';
import { FavoriteNavItem } from '@/components/Navbar/FavoriteNavItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { Line, variantsWrapperNavbar, WrapperNavbarItems } from '@/components/Navbar/styled';
import { navbarItems } from '@/mock/navbar';
import { useMediaQuery, useScrollLock } from '@/services';
import { breakpoints } from '@/theme';

export const RenderNavbar: FC = () => {
	const [open, setOpen] = useState(false);

	const match = useMediaQuery(breakpoints.md);
	const isMenuOpen = Boolean(open && match);
	useScrollLock(isMenuOpen);

	const closeMenu = () => {
		setOpen(false);
	};

	useMemo(() => {
		if (!match) closeMenu();
	}, [match]);

	const animatedMobileMenu = () => {
		if (match) return open ? 'visible' : 'hidden';
		return 'desktop';
	};

	const handleClickBurger = () => {
		setOpen((prev) => !prev);
	};

	return (
		<>
			<BurgerButton clickBurger={handleClickBurger} open={open} />
			<WrapperNavbarItems
				variants={variantsWrapperNavbar}
				animate={animatedMobileMenu()}
				transition={{ duration: 0.2, type: 'tween' }}
			>
				{navbarItems.map(({ title, url }) => {
					const lineElement = (
						<Line
							layoutId="underline"
							transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
						/>
					);

					// Используем специализированные компоненты для элементов со счетчиками
					if (title === 'Избранное') {
						return (
							<FavoriteNavItem key={url} onClose={closeMenu}>
								{lineElement}
							</FavoriteNavItem>
						);
					}

					if (title === 'Сравнение') {
						return (
							<CompareNavItem key={url} onClose={closeMenu}>
								{lineElement}
							</CompareNavItem>
						);
					}

					if (title === 'Корзина') {
						return (
							<CartNavItem key={url} onClose={closeMenu}>
								{lineElement}
							</CartNavItem>
						);
					}

					return (
						<NavLink key={url} title={title} url={url} onClick={closeMenu}>
							{lineElement}
						</NavLink>
					);
				})}
				<AccountNavItem onClose={closeMenu}>
					<Line
						layoutId="underline"
						transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
					/>
				</AccountNavItem>
			</WrapperNavbarItems>
		</>
	);
};
export default RenderNavbar;
