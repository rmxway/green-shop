import { FC } from 'react';

import { Icon } from '@/components/ui/Icon';

import { WrapperCompare } from './styled';

interface CompareProps {
	active?: boolean;
	onActive?: () => void;
}

/**
 * Toggled component for compare products
 * @param {boolean} active
 * @param {function} onActive
 * @returns
 */

export const Compare: FC<CompareProps> = ({ active = false, onActive, ...props }) => (
	<WrapperCompare {...props} $active={active} onClick={onActive} title="Сравнить">
		<Icon icon="compare" size={22} />
	</WrapperCompare>
);

export default Compare;
