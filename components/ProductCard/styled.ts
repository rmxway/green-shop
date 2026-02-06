import { motion } from 'framer-motion';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Flexbox } from '@/components/Layout';
import { Wrapper as WrapperLoader } from '@/components/ui/Loader/styled';
import { defaultTheme as theme, fadeIn } from '@/theme';
import { media } from '@/theme/media';

export const ProductWrapper = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	padding: 12px;
	border-radius: ${theme.radius.borderRadius};
	transition: 0.3s box-shadow;
	background-color: #fff;

	a {
		width: 100%;
		text-decoration: none;
	}

	&:hover {
		box-shadow: ${theme.layout.shadow};
	}

	button {
		width: 100%;
		align-self: center;
	}

	${media.greaterThan('sm')`
        padding: 16px;
    `}
`;

export const Title = styled(Link)`
	text-decoration: none;
	color: initial;
	display: flex;
	flex-direction: column;
	gap: 5px;

	div {
		line-height: 1.15;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

		&::first-letter {
			text-transform: uppercase;
		}
	}

	span {
		display: block;
		color: ${theme.colors.gray.$6};
		font-size: 0.9rem;
		font-weight: 400;
	}

	&:hover {
		text-decoration: underline;
	}

	${media.greaterThan('xs')`
        font-size: 1rem;
        font-weight: 600;
    `}
`;

export const TopBlock = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	z-index: 10;

	${Flexbox} {
		position: relative;
		right: -10px;
		top: -10px;
	}
`;

export const Price = styled.div`
	font-family: sans-serif;
	font-size: 1.3rem;

	${media.greaterThan('xs')`
        font-size: 1.6rem;
        font-weight: 100;
        color: ${theme.colors.dark};
    `}
`;

export const Tools = styled.div`
	font-weight: 500;
	width: 100%;
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	gap: 5px;
	font-size: 14px;
	flex-shrink: 0;

	& > span {
		font-weight: 600;
	}
`;

export const RatingColor = styled.span`
	color: ${({ children }) => {
		if (children) {
			if (Number(children) > 4) return theme.colors.success;
			if (Number(children) < 4 && Number(children) > 3) return theme.colors.primary;
			if (Number(children) < 3) return theme.colors.danger;
		}
		return theme.colors.dark;
	}};
`;

export const Help = styled.button`
	font-size: 12px;
	font-weight: 600;
	align-self: center;
	background: none;
	border: none;
	display: inline-block;
	cursor: pointer;
	text-transform: uppercase;
	margin-bottom: 10px;
	color: ${theme.colors.gray.$5};
`;

export const Description = styled.div<{ open: boolean }>`
	display: -webkit-box;
	font-size: 14px;
	line-height: 1.3;
	text-align: left;
	max-height: 0;
	transition: 0.4s all;
	opacity: 0;
	width: 100%;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	word-break: break-all;

	${(props) =>
		props.open &&
		css`
			max-height: 200px;
			opacity: 1;
		`}
`;

export const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${theme.radius.borderRadius};
	overflow: hidden;

	/* Стили для загрузчика */
	${WrapperLoader} {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
`;

export const StyledImage = styled.div<{ $isLoading: boolean; $hasError: boolean }>`
	${({ $isLoading, $hasError }) => css`
		position: relative;
		width: 100%;
		height: 100%;

		img {
			object-fit: contain;
			width: 100%;
			height: 100%;
			transition: opacity 0.2s ease-in-out;
			opacity: ${$isLoading ? 0 : 1};
			display: ${$hasError ? 'none' : 'block'};
		}
	`}
`;

export const NoPhotoWrapper = styled.div<{ $isLoading: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	color: ${theme.colors.gray.$4};
	${fadeIn}
`;
