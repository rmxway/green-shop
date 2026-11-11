import { FC, memo } from 'react';

import { Count, Icon } from '@/components/ui';
import { Icofont } from '@/types';

import { NavCountItemStyled } from './styled';

interface NavCountItemProps {
	title?: Icofont;
	count: number;
}

export const NavCountItem: FC<NavCountItemProps> = memo(({ title, count }) => (
	<NavCountItemStyled>
		{title && <Icon icon={title} />}
		<Count {...{ count }} />
	</NavCountItemStyled>
));

NavCountItem.displayName = 'NavCountItem';

export default NavCountItem;
