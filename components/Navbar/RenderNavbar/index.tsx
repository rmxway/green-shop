import { FC, useMemo, useState } from 'react';

import { BurgerButton } from '@/components/Navbar/BurgerButton';
import { CartNavItem } from '@/components/Navbar/CartNavItem';
import { FavoriteNavItem } from '@/components/Navbar/FavoriteNavItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { Line, variantsWrapperNavbar, WrapperNavbarItems } from '@/components/Navbar/styled';
import { navbarItems } from '@/mock/navbar';
import { useMediaQuery } from '@/services';
import { breakpoints } from '@/theme';

export const RenderNavbar: FC = () => {
	const [open, setOpen] = useState(false);

	const match = useMediaQuery(breakpoints.md);

	const closeMenu = () => {
		setOpen(false);
	};

	useMemo(() => {
		if (!match) closeMenu();
	}, [match]);

	const animatedMobileMenu = () => {
		if (match) return open ? 'visible' : 'hidden';
		return undefined;
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
				transition={{ duration: 0.3, type: 'spring', stiffness: 250, damping: 20 }}
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
						return <FavoriteNavItem key={url} onClose={closeMenu}>{lineElement}</FavoriteNavItem>;
					}

					if (title === 'Корзина') {
						return <CartNavItem key={url} onClose={closeMenu}>{lineElement}</CartNavItem>;
					}

					return (
						<NavLink key={url} title={title} url={url} onClick={closeMenu}>
							{lineElement}
						</NavLink>
					);
				})}
			</WrapperNavbarItems>
		</>
	);
};
export default RenderNavbar;
