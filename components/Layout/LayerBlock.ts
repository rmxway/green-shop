import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { media } from '@/theme';

interface LayerBlockProps {
	$mt?: boolean;
	$shadow?: boolean;
	$fixedPadding?: boolean;
}

/**
 * Layer block with rounded corners and white background
 * @param {?boolean} $mt - Margin top 30px
 * @param {?boolean} $shadow
 * @param {?boolean} $fixedPadding
 */

const LayerBlock = styled(motion.div)<LayerBlockProps>`
	${({ theme, $mt, $shadow, $fixedPadding }) => css`
		position: relative;
		padding: ${$fixedPadding ? '20px' : 0};
		background-color: ${theme.colors.light};
		border-radius: ${theme.radius.borderRadius};
		margin-top: ${$mt ? '30px' : 0};
		margin-bottom: 20px;

		box-shadow: ${$shadow && `0 0 20px rgba(0,0,0,.3)`};

		${media.greaterThan('sm')`
            padding: 20px;
        `}
	`}
`;

export { LayerBlock };
export default LayerBlock;
