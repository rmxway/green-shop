import type { Transition, Variants } from 'framer-motion';

export const fadeInUpVariants = {
	hidden: { opacity: 0, y: 70 },
	visible: { opacity: 1, y: 0 },
};

export const fadeInUpTransition: Transition = {
	duration: 0.8,
	ease: 'backOut',
};

export const fadeInUpViewport = {
	once: true,
	amount: 0.2,
	margin: '0px 0px -100px 0px',
} as const;

export const fadeInUpViewProps = {
	initial: 'hidden' as const,
	whileInView: 'visible' as const,
	viewport: fadeInUpViewport,
	variants: fadeInUpVariants,
	transition: fadeInUpTransition,
};

export const fadeVariant = (i: number = 1): Variants => ({
	hidden: {
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.35,
			damping: 30,
			delay: i * 0.075,
		},
	},
});

export const precomputedFadeVariants = Array.from({ length: 20 }, (_, i) => fadeVariant(i));
