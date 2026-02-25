import styled, { css } from 'styled-components';

import { Flexbox, Grid } from '@/components/Layout';
import { media } from '@/theme';

export const StepFormHeader = styled.div`
	margin-top: -30px;
	margin-bottom: 10px;
`;

export const WrapperStepForm = styled(Grid)`
	${media.lessThan('md')`
        grid-template-columns: 1fr;
    `}
`;

export const WrapperForm = styled.div`
	position: relative;
	display: block;

	form {
		display: inline-block;
		width: 100%;

		${Flexbox} {
			margin-bottom: 20px;

			& > div,
			& > button {
				margin-bottom: 10px;
				flex-basis: 45%;
				flex-grow: 1;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
`;

export const WrapperProducts = styled.div<{ $fGrow?: boolean }>`
	${({ theme, $fGrow }) => css`
		position: relative;
		display: flex;
		flex-direction: column;
		${$fGrow &&
		css`
			flex-grow: 1;
		`}
		border-radius: ${theme.radius.borderRadius};

		p {
			text-transform: uppercase;
			border-top: 1px solid ${theme.colors.gray.$4};
			padding-top: 20px;
			margin-top: 30px;
			text-align: right;

			span {
				font-size: 1.4rem;
			}
		}
	`}
`;

export const Product = styled.div`
	position: relative;
	display: grid;
	gap: 20px;
	grid-template-columns: 1fr 100px 100px;
	text-align: center;
	align-items: center;
	margin-bottom: 12px;
	font-size: 0.9rem;

	div:first-child {
		text-align: left;
	}

	span {
		font-style: normal;
		font-weight: 600;
		font-size: 0.8rem;
		color: ${({ theme }) => theme.colors.gray.$6};
	}

	&:first-child {
		div {
			font-weight: 600;
			text-transform: uppercase;
		}
	}

	&:last-of-type {
		margin-bottom: 0;
	}
`;
