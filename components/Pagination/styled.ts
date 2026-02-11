import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { Flexbox } from '@/components/Layout/Flexbox';
import ButtonStyle from '@/components/ui/Button/styled';
import { fadeIn, media } from '@/theme';

export const Info = styled.div`
	color: ${({ theme }) => theme.colors.gray.$6};
	font-size: 0.9rem;

	${media.greaterThan('xs')`
		font-size: 1rem;
	`}
`;

export const Wrapper = styled(motion.div)<{ $isItems: boolean }>`
	display: flex;
	flex-direction: column;

	${Flexbox} {
		margin-top: 10px;
	}

	${({ $isItems }) =>
		$isItems &&
		css`
			margin-top: 30px;
		`}

	${media.greaterThan('xs')`
        flex-direction: row;

        ${Flexbox} {
            margin-top: 0;
        }
    `}
`;

export const ButtonPagination = styled(ButtonStyle)`
	${({ theme }) => css`
		position: relative;
		margin-right: 2px;
		width: 25px;
		padding: 6px 0;
		border-radius: ${theme.radius.borderRadius};
		border: 1px solid ${theme.colors.gray.$4};
		line-height: 1;

		${fadeIn}

		&,
		&:focus,
		&:active,
		&:link {
			transition-duration: 0s;
		}

		&:hover {
			transition-duration: 0.1s;
		}

		${media.greaterThan('xs')`
			width: 30px;
			padding: 8px 0;
			margin-right: 3px;
		`}

		&:last-child {
			margin-right: 0;
		}
	`}
`;

export const ArrowButton = styled(ButtonPagination)<{ $left?: boolean; $right?: boolean }>`
	text-transform: uppercase;
	width: auto;

	.icofont {
		margin-top: 3px;
	}

	${({ $left, $right }) => {
		if ($left)
			return css`
				padding-right: 10px;
				.icofont {
					transform: rotate(90deg);
				}
			`;
		if ($right)
			return css`
				padding-left: 10px;
				.icofont {
					transform: rotate(90deg) scale(1, -1);
					margin-left: 0px;
					margin-right: 3px;
				}
			`;
		return null;
	}}
`;
