import { FC, memo, ReactNode } from 'react';

import { NavCountItem } from '@/components/Navbar/NavCountItem';
import { NavLink } from '@/components/Navbar/NavLink';
import { useAppSelector } from '@/services';

interface CompareNavItemProps {
	onClose: () => void;
	children?: ReactNode;
}

export const CompareNavItem: FC<CompareNavItemProps> = memo(({ onClose, children }) => {
	const compareCount = useAppSelector((state) => state.compare.items.length);

	return (
		<NavLink
			url="/compare"
			title="Сравнение"
			onClick={onClose}
			component={<NavCountItem title="compare" count={compareCount} />}
		>
			{children}
		</NavLink>
	);
});

CompareNavItem.displayName = 'CompareNavItem';

export default CompareNavItem;
