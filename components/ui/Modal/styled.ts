import { motion, Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

import { LinkIconStyle } from '@/components/ui/LinkIcon/styled';

export const ModalWrapper = styled(motion.div)`
	${({ theme }) => css`
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: ${theme.colors.gray.$1}cc;
		backdrop-filter: blur(5px);
		cursor: pointer;
	`}
`;

export const wrapperVariants: Variants = {
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
};

export const ModalWindow = styled(motion.div)`
	${({ theme }) => css`
		position: relative;
		max-width: 800px;
		background-color: ${theme.colors.light};
		padding: 20px;
		border-radius: ${theme.radius.borderRadius};
		box-shadow: ${theme.layout.shadow};
		cursor: default;

		${LinkIconStyle} {
			position: absolute;
			right: 0;
			top: 0;
			width: 40px;
			height: 40px;
			z-index: 1;

			i {
				font-size: 30px;
			}
		}
	`}
`;

export const windowVariants: Variants = {
	visible: {
		y: 20,
	},
	hidden: {
		y: 0,
	},
};

export const ModalHeader = styled.div`
	position: relative;
	line-height: 1;
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 24px;
`;

export const ModalBody = styled.div``;
