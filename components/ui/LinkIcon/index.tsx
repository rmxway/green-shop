import { HTMLMotionProps } from 'framer-motion';
import { forwardRef, HTMLAttributes } from 'react';

import { Icon } from '@/components/ui/Icon';
import { Icofont } from '@/types';

import { LinkIconStyle, linkIconVariant } from './styled';

interface LinkIconProps extends HTMLAttributes<HTMLDivElement> {
	icon?: Icofont;
	initial?: boolean;
	onClick?: () => void;
}

type LinkIconType = LinkIconProps & HTMLMotionProps<'div'>;

/**
 * Text link with icon from icofont
 * @param {string} icon - select icon
 * @param {boolean} initial - initial animation
 * @param {function} onClick - event
 */

export const LinkIcon = forwardRef<HTMLDivElement, LinkIconType>(
	({ icon, initial, onClick, children, ...props }, ref) => (
		<LinkIconStyle
			key="LinkIcon"
			variants={linkIconVariant}
			initial={initial && 'initial'}
			animate="visible"
			exit="hidden"
			{...{ onClick, ref }}
			{...props}
		>
			{children}
			{icon && <Icon {...{ icon }} />}
		</LinkIconStyle>
	),
);

export default LinkIcon;
