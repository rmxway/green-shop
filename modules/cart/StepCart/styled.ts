import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

import { Wrapper as WrapperPagination } from '@/components/Pagination/styled';
import { defaultTheme as theme, media } from '@/theme';

export const contentVariant: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export const Cart = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	align-items: flex-start;

	${WrapperPagination} {
		margin-top: 0;
	}

	${media.greaterThan('sm')`
        grid-template-columns: 1fr minmax(250px, 25%);
        gap: 20px;
    `}
`;

export const Wrapper = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: column;

	${media.greaterThan('sm')`
		flex-grow: 1;
	`}
`;

export const Sidebar = styled(motion.div)`
	position: relative;
	margin-top: 30px;
	flex-shrink: 0;
	padding: 10px;
	background-color: #fff;
	border-radius: ${theme.radius.borderRadius};

	${media.greaterThan('sm')`
        position: sticky;
        top: 20px;
        padding: 20px;
        margin-top: 0;
	`}

	button {
		margin-bottom: 0;
		width: 100%;
	}
`;

export const Title = styled.div`
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 5px;
	text-transform: uppercase;

	${media.lessThan('smD')`
        font-size: 20px;
    `}
`;

export const Total = styled.div`
	font-size: 1.3rem;
	font-family: sans-serif;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;

	span {
		font-size: 1.6rem;
		margin-left: 10px;
		color: ${theme.colors.dark};
	}

	${media.lessThan('smD')`
        font-size: 20px;

        span {
            font-size: 1.8rem
        }
    `}
`;

export default Cart;
