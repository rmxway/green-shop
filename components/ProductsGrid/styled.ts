import { motion } from 'framer-motion';
import styled from 'styled-components';

import { media } from '@/theme';

export const WrapperComponent = styled.div`
	position: relative;
	min-height: 600px;
	padding-bottom: 50px;
`;

export const FetchingBlock = styled(motion.div)`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;

	${media.greaterThan('xxs')`
        grid-template-columns: 1fr 1fr;
    `}

	${media.greaterThan('sm')`
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    `}

    ${media.greaterThan('md')`
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `}
`;

export const containerVars = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};
