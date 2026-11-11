import { AnimatePresence, transform, useAnimation } from 'framer-motion';
import { memo, useEffect } from 'react';

import { CountStyled, countVariants } from './styled';

interface CountProps {
	count?: number;
}

export const Count = memo(({ count }: CountProps) => {
	const controls = useAnimation();
	const velocity = transform(Number(count), [0, 2], [0, 4]);

	useEffect(() => {
		controls
			.start({
				scale: count ? 1 : 0,
				opacity: count ? 1 : 0,
				transition: {
					velocity,
					type: 'spring',
					stiffness: 150,
					duration: 0.1,
				},
			})
			.catch((e: Error) => {
				throw new Error(e.message);
			});
	}, [controls, count, velocity]);

	return (
		<AnimatePresence>
			{count && (
				<CountStyled
					layout
					animate={controls}
					variants={countVariants}
					initial={count ? 'visible' : 'hidden'}
					exit="hidden"
				>
					{count}
				</CountStyled>
			)}
		</AnimatePresence>
	);
});

export default Count;
