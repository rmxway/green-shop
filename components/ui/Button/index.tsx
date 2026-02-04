import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps } from 'react';
import { FC } from 'react';

import { Icon } from '@/components/ui/Icon';
import icons from '@/public/assets/fonts/icofont/icofont.json';

import { ButtonStyle } from './styled';

const textVar = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

type ButtonProps = ComponentProps<typeof ButtonStyle> & {
	animate?: boolean;
	icon?: keyof typeof icons;
	/** Полиморфный проп styled-components — рендер как другой тег или компонент (например as="span", as={Link}) */
	as?: React.ElementType;
};

/**
 * Custom button with some properties.
 ** Необходимо доработать анимацию
 * @param {?boolean} $w100 - width 100%
 * @param {?boolean} $inactive - pointer-events: none
 * @param {?boolean} $margins - margin-right and margin-bottom 10px
 * @param {?boolean} animate - animate inner text (not working)
 * @param {?boolean} icon - select icon
 * @param {?boolean} (styled boolean params) - $success, $danger, $primary, $white, $dark
 */

export const Button: FC<ButtonProps> = ({ children, animate = false, icon, ...props }) => {
	const memoText = typeof children === 'string' ? children.split('') : [''];

	return (
		<ButtonStyle {...props}>
			{animate ? (
				<AnimatePresence mode="wait">
					<motion.div layout variants={textVar} initial="hidden" animate="visible" exit="hidden">
						{memoText?.map((item, idx) => (
							<motion.span
								layout
								variants={textVar}
								transition={{ delay: 0.1 * idx }}
								key={Number(Math.random())}
							>
								{item}
							</motion.span>
						))}
					</motion.div>
				</AnimatePresence>
			) : (
				children
			)}
			{icon && <Icon {...{ icon }} />}
		</ButtonStyle>
	);
};

export default Button;
