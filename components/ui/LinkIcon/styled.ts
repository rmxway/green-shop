import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const LinkIconStyle = styled(motion.div)`
	${({ theme }) => css`
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: ${theme.colors.gray.$6};
		border-radius: ${theme.radius.borderRadius};
		transition: 0.2s;

		.icofont {
			margin-left: 5px;
			line-height: 1;
		}

		&:hover {
			color: ${theme.colors.gray.$9};
		}
	`}
`;

export const linkIconVariant = {
	initial: { opacity: 0, y: -6 },
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, scale: 0.5 },
};
