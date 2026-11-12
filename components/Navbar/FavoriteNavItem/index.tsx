import { FC, memo, ReactNode } from 'react';

import { NavCountItem } from '@/components/Navbar/NavCountItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { useAppSelector } from '@/services';
import { favoriteStore } from '@/store/types';

interface FavoriteNavItemProps {
	onClose: () => void;
	children?: ReactNode;
}

export const FavoriteNavItem: FC<FavoriteNavItemProps> = memo(({ onClose, children }) => {
	const { items } = useAppSelector(favoriteStore);

	return (
		<NavLink
			url="/favorites"
			title="Избранное"
			onClick={onClose}
			component={<NavCountItem title="favorite-fill" count={items.length} />}
		>
			{children}
		</NavLink>
	);
});

FavoriteNavItem.displayName = 'FavoriteNavItem';

export default FavoriteNavItem;
