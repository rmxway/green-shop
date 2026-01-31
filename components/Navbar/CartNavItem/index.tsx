import { FC, memo, ReactNode } from 'react';

import { NavCountItem } from '@/components/Navbar/NavCountItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { useAppSelector } from '@/services';
import { cartItemsCountMemoized } from '@/store/reducers/commonSelectors';

interface CartNavItemProps {
	onClose: () => void;
	children?: ReactNode;
}

export const CartNavItem: FC<CartNavItemProps> = memo(({ onClose, children }) => {
	const cartItemsCount = useAppSelector((state) => cartItemsCountMemoized(state.cart));

	return (
		<NavLink
			url="/cart"
			title="Корзина"
			onClick={onClose}
			component={<NavCountItem title="cart" count={cartItemsCount} />}
		>
			{children}
		</NavLink>
	);
});

CartNavItem.displayName = 'CartNavItem';

export default CartNavItem;
