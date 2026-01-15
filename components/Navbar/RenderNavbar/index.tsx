import { FC, useMemo, useState } from 'react';

import { BurgerButton } from '@/components/Navbar/BurgerButton';
import { NavCountItem } from '@/components/Navbar/NavCountItem';
import { NavbarProps, NavLink } from '@/components/Navbar/NavLink';
import { Line, variantsWrapperNavbar, WrapperNavbarItems } from '@/components/Navbar/styled';
import { navbarItems } from '@/mock/navbar';
import { useAppSelector, useMediaQuery } from '@/services';
import { cartStore, productsStore } from '@/store/types';
import { breakpoints } from '@/theme';

export const RenderNavbar: FC = () => {
	const [open, setOpen] = useState(false);
	const { countFavorites } = useAppSelector(productsStore);
	const { items } = useAppSelector(cartStore);
	const cartItemsCount = useMemo(() => items.reduce((acc, cur) => acc + (cur.count || 1), 0), [items]);

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
					const props: NavbarProps = {
						title,
						url,
					};

					// NavCountItem добавляется в пропсы к компоненту NavLinkMotion.component

					if (title === 'Избранное') {
						props.component = <NavCountItem title="favorite-fill" count={countFavorites} />;
					}

					if (title === 'Корзина') {
						props.component = <NavCountItem title="cart" count={cartItemsCount} />;
					}

					return (
						<NavLink key={url} onClick={closeMenu} {...props}>
							<Line
								layoutId="underline"
								transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
							/>
						</NavLink>
					);
				})}
			</WrapperNavbarItems>
		</>
	);
};
export default RenderNavbar;
