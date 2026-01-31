import { FC, memo, ReactNode } from 'react';

import { NavCountItem } from '@/components/Navbar/NavCountItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { useAppSelector } from '@/services';
import { productsStore } from '@/store/types';

interface FavoriteNavItemProps {
	onClose: () => void;
	children?: ReactNode;
}

export const FavoriteNavItem: FC<FavoriteNavItemProps> = memo(({ onClose, children }) => {
	const { countFavorites } = useAppSelector(productsStore);

	return (
		<NavLink
			url="/favorites"
			title="Избранное"
			onClick={onClose}
			component={<NavCountItem title="favorite-fill" count={countFavorites} />}
		>
			{children}
		</NavLink>
	);
});

FavoriteNavItem.displayName = 'FavoriteNavItem';

export default FavoriteNavItem;
