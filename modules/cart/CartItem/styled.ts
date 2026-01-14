import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { media } from '@/theme';
import { fadeIn } from '@/theme/styles/animations';

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

export const elementsVars: Variants = {
	hidden: {
		y: -5,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.2,
			delay: 0.1,
		},
	},
};

export const Item = styled(motion.div)`
	${({ theme }) => css`
		position: relative;
		display: flex;
		align-items: stretch;
		flex-direction: row;
		background-color: #fff;
		width: 100%;
		border-radius: ${theme.radius.borderRadius};
		margin-bottom: 10px;
		transition: 0.2s box-shadow;
		padding-right: 40px;

		&:hover {
			box-shadow: ${theme.layout.shadow};
		}

		img {
			margin: 10px 0 10px 10px;
			flex-basis: 65px;
			display: block;
			object-fit: cover;
			border-radius: ${theme.radius.borderRadius};
			flex-shrink: 0;
		}

		${media.greaterThan('xs')`
        padding-right: 12px;
    `};
	`}
`;

export const Content = styled(motion.div)`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: auto 1fr auto;
	flex-wrap: nowrap;
	gap: 20px;
	flex-grow: 1;

	& > a {
		align-self: center;
		flex-shrink: 0;
		text-decoration: none;
	}

	.loader {
		margin-top: -15px;		
	}

	${media.lessThan('mdD')`
        gap: 10px;
    `}
`;

export const WrapperText = styled.div`
	display: grid;
	grid-auto-flow: dense;
	gap: 5px;
	padding-top: 10px;
	padding-bottom: 10px;
	grid-template-columns: 1fr;

	& button {
		width: 20px;
		height: 20px;
		border: 1px solid ${({ theme }) => theme.colors.gray.$4};
		border-radius: 20px;
		font-size: 1rem;

		text-align: center;
		padding: 0;
		padding-bottom: 2px;
		line-height: 1;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.gray.$4};
		transition: 0.2s;

		&:disabled {
			cursor: default;
			pointer-events: none;
			opacity: 0.6;
		}

		&:hover {
			border: 1px solid ${({ theme }) => theme.colors.gray.$6};
			color: ${({ theme }) => theme.colors.gray.$6};
		}
	}

	${media.greaterThan('xs')`
        grid-auto-flow:column;

        align-items: center;
        gap: 10px;
        padding: 0;
    `}
`;

export const Title = styled(Link)`
	${({ theme }) => css`
		display: block;
		color: ${darken(0.1, theme.colors.success)};
		text-decoration: none;
		flex-grow: 1;
		line-height: 1;

		strong {
			display: block;
			margin-bottom: 10px;

			${media.greaterThan('xs')`
                margin-bottom: 5px;
            `}
		}

		& strong + span {
			font-size: 0.9rem;
			line-height: 1.1;
			max-height: 34px;
			color: ${theme.colors.gray.$6};
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`}
`;

export const CountWrapper = styled.div`
	position: relative;
	flex-shrink: 0;
	font-size: 14px;
	font-family: sans-serif;
`;

export const Count = styled(motion.div)`
	display: inline-block;
	padding-right: 5px;
`;

export const Price = styled.div`
	font-size: 20px;
	font-family: sans-serif;
	min-width: auto;
	text-align: left;
	flex-shrink: 0;

	${media.greaterThan('xs')`
        min-width: 70px;
        text-align: right;
    `}
`;

export const Delete = styled.button`
	${({ theme }) => css`
		position: absolute;
		align-self: center;
		top: 5px;
		right: 5px;
		flex-shrink: 0;
		border: 2px solid ${theme.colors.gray.$3};
		appearance: none;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 25px;
		border-radius: 25px;
		cursor: pointer;
		transition:
			0.1s border-color,
			color;
		color: ${theme.colors.gray.$4};

		i {
			position: absolute;
			font-size: 1.5rem;
		}

		&:hover {
			border-color: ${theme.colors.danger};

			i:before {
				color: ${theme.colors.danger};
			}
		}

		${media.greaterThan('xs')`
            position: relative;
            top: auto;
            right: auto;
        `}
	`}
`;

export const ThumbnailContainer = styled(motion.div)`
	${({theme}) => css`
		position: relative;
		width: 70px;
		height: 70px;
		margin: 10px 0 10px 10px;
		flex-shrink: 0;		

		i.icofont-nophoto {
			color: ${theme.colors.gray.$4};
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			font-size: 24px;
			z-index: 1;
			position: relative;
			text-decoration: none;
			opacity: 0;
			border-radius: ${theme.radius.borderRadius};
			${fadeIn}
		}		
	`}
`;
