import { FC } from 'react';

import { Icon } from '@/components/ui/Icon';

import { WrapperFavorite } from './styled';

interface FavoriteProps {
	active?: boolean;
	onActive?: () => void;
}

/**
 * Toggled component for favorite product
 * @param {boolean} active
 * @param {function} onActive
 * @returns
 */

export const Favorite: FC<FavoriteProps> = ({ active = false, onActive, ...props }) => (
	<WrapperFavorite {...props} $active={active} onClick={onActive} title="В избранное">
		<Icon icon={active ? 'favorite' : 'favorite-fill'} />
	</WrapperFavorite>
);

export default Favorite;
