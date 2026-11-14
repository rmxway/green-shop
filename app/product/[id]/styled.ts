import { motion } from 'framer-motion';
import Image from 'next/image';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { Container, Grid, LayerBlock } from '@/components/Layout';
import { ProductWrapper } from '@/components/ProductCard/styled';
import { WrapperSticker } from '@/components/ui/Sticker/styled';
import { fadeIn, media } from '@/theme';

export const Wrapper = styled(Container)`
	${({ theme }) => css`
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		margin-bottom: 20px;

		${media.greaterThan('md')`
        grid-template-columns: 1fr 25%;
        padding-bottom: 0;
    `}

		.swiper {
			margin-bottom: 20px;
			border-radius: 10px;
			border: 1px solid ${theme.colors.gray.$2};
			min-width: 1%;

			.swiper-slide {
				height: 75vw;
			}

			.swiper-pagination-bullet-active {
				background-color: ${theme.colors.dark};
			}

			${media.greaterThan('sm')`
				.swiper-slide {
					min-height: 450px;
					max-height: 550px;
				}
			`}
		}

		img {
			height: 100%;
			width: 100%;
			display: block;
			object-position: center;
			object-fit: contain;
		}

		${ProductWrapper} {
			background-color: ${darken(0.04, theme.colors.light)};
		}

		.category-items {
			overflow: hidden;
			overflow-x: scroll;
			position: relative;
			margin-left: -20px;
			margin-right: -20px;
			margin-bottom: -14px;
			padding: 20px;
			overflow-y: auto;
			scrollbar-width: none;

			/* &::-webkit-scrollbar {
				display: none;
			} */

			${Grid} {
				min-width: 800px;
				grid-template-columns: repeat(3, 1fr);
				gap: 20px;
			}
		}
	`}
`;

export const Title = styled.h1`
	line-height: 1;
	font-size: 2.2rem;
	margin: 0;
	margin-bottom: 20px;
	font-weight: 400;
`;

export const Title2 = styled(Title)`
	font-size: 1.6rem;
`;

export const ProductImage = styled(Image)`
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: top center;
`;

export const Info = styled.div`
	min-width: 1px;
	padding-bottom: 70px;

	p {
		margin-bottom: 20px;
		line-height: 1.5;
		font-size: 1.1rem;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

export const SideBlock = styled.div`
	${({ theme }) => css`
		z-index: 10;
		position: fixed;
		left: 0;
		bottom: 0;

		${LayerBlock} {
			background-color: ${theme.colors.light};
		}

		${media.lessThan('mdD')`
			width: 100%;

			${LayerBlock} {
				padding: 10px 20px;
				border-radius: 0;
				margin-bottom: 0;
				box-shadow: 0 0 8px rgba(0, 0, 0, .3)
			}
		`}

		${media.greaterThan('md')`
			position: relative;

			${LayerBlock} {
				position: sticky;
				top: 90px;
			}
		`}
	`}
`;

export const PriceBlock = styled(Grid)`
	position: relative;
	justify-content: start;
	align-items: center;
	grid-template-columns: minmax(135px, auto) auto 1fr;
	gap: 10px;
	margin-bottom: 10px;

	.side {
		&-price {
			grid-template-columns: 1fr;

			span {
				display: inline-block;
				align-self: center;
				font-family: sans-serif;
				font-weight: 300;
				font-size: 2rem;

				${WrapperSticker} {
					bottom: 18px;
				}
			}
		}

		&-tags {
			${WrapperSticker} {
				margin: 0 8px 8px 0;
			}
		}

		&-info {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 14px;
			opacity: 0.8;
		}
	}

	${media.greaterThan('md')`
		.side-info {
			position: relative;
			top: initial;
			right: initial;
		}
	`}

	${media.greaterThan('md')`
        grid-template-columns: 1fr;
        align-items: start;
        grid-auto-flow: dense;
    `}

	button {
		width: 100%;
		margin: 0;
	}

	${media.greaterThan('md')`
        grid-auto-flow: row;
	    grid-template-columns: 1fr;
    `}
`;

export const NoPhotoContainer = styled(motion.div)`
	position: relative;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;

	i.icofont-nophoto {
		color: ${({ theme }) => theme.colors.gray.$4};
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 100px;
		z-index: 1;
		position: relative;
		text-decoration: none;
		${fadeIn}
	}
`;

export const ReviewItem = styled.div`
	${({ theme }) => css`
		width: 100%;
		display: grid;
		grid-template-columns: auto auto;
		gap: 20px;
		justify-content: start;
		align-items: start;
		margin-bottom: 20px;
		padding: 20px;
		border-radius: ${theme.radius.borderRadius};
		background-color: ${darken(0.055, theme.colors.light)};

		&:last-child {
			margin-bottom: 0;
		}

		strong {
			margin: 5px 0;
			font-size: 1.1rem;
			display: block;
		}

		.review-date {
			font-size: 0.9rem;
			color: ${theme.colors.gray.$6};
		}

		.review-comment {
			font-size: 1.1rem;
			background-color: ${theme.colors.light};
			display: inline-block;
			padding: 10px;
			border-radius: 20px;
			border-top-left-radius: 0;
			justify-self: start;
			border: 1px solid ${theme.colors.gray.$2};
		}

		${media.lessThan('sm')`
			grid-template-columns: 1fr;
		`}
	`}
`;
