import { motion, Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

export const CountStyled = styled(motion.div)`
	${({ theme }) => css`
		position: absolute;
		border-radius: 100%;
		top: -10px;
		right: -14px;
		width: 22px;
		height: 22px;
		background-color: ${theme.colors.success};
		border: 2px solid ${theme.colors.dark};
		color: ${theme.colors.dark};
		font-size: 11px;
		text-align: center;
		font-weight: 900;
		line-height: 1.8;
		letter-spacing: -0.5px;
	`}
`;

export const countVariants: Variants = {
	visible: {
		opacity: 1,
		scale: 1,
	},
	hidden: {
		opacity: 0,
		scale: 0,
	},
};
