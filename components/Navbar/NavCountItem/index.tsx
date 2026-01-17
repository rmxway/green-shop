import { FC } from 'react';

import { Count } from '@/components/Navbar/Count';
import { Icon } from '@/components/ui';
import { Icofont } from '@/types';

import { NavCountItemStyled } from './styled';

interface NavCountItemProps {
	title?: Icofont;
	count: number;
}

export const NavCountItem: FC<NavCountItemProps> = ({ title, count }) => (
	<NavCountItemStyled>
		{title && <Icon icon={title} />}
		<Count {...{ count }} />
	</NavCountItemStyled>
);

export default NavCountItem;
