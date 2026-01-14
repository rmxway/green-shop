import { motion } from 'framer-motion';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { WrapperFavorite } from '@/components/ui/Favorite/styled';
import { WrapperSticker } from '@/components/ui/Sticker/styled';
import { defaultTheme as theme } from '@/theme';
import { media } from '@/theme/media';
import { fadeIn } from '@/theme/styles/animations';

export const BlockImgItem = styled.div`
	position: relative;
	flex-grow: 1;
	display: block;

	& + img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;
		width: 100%;
		height: 100%;
		z-index: -10;
		max-height: 500px;
		opacity: 0;
		object-fit: contain;
		object-position: center;
		margin: 20px auto;
	}

	& + img:first-of-type {
		z-index: 0;
	}

	&:hover {
		& + img {
			z-index: 1;
		}
	}
`;

export const WrapperImagesStyled = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	height: 120px;
	text-decoration: none;
	margin-bottom: 20px;

	&:after {
		position: absolute;
		content: '';
		background-color: white;
		left: -1px;
		top: -1px;
		pointer-events: none;
		z-index: -1;
		height: 102%;
		width: 102%;
	}

	&:hover:after {
		z-index: 0;
	}

	@keyframes fetched {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	${media.greaterThan('sm')`
        height: 170px;
    `}

	.fetched {
		animation: fetched 0.4s;
		animation-fill-mode: forwards;
	}

	/* Стили для иконки отсутствия картинки */
	i.icofont-nophoto {
		color: ${theme.colors.gray.$4};
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 34px;
		z-index: 1;
		position: relative;
		text-decoration: none;
		${fadeIn}
	}

	/* Отключаем hover эффекты при ошибке загрузки */
	&.has-error {
		&:hover:after {
			z-index: -1;
		}

		&:hover {
			${BlockImgItem} + img {
				z-index: -10 !important;
			}
		}
	}
`;

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

	${WrapperFavorite} {
		position: absolute;
		top: 0;
		right: 0;
	}

	${WrapperSticker} {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 10px;
	}

	${WrapperImagesStyled} {
		img {
			min-width: 100px;
			min-width: 100px;
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center;
			margin: auto;
		}
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
