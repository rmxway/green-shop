import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

import { Container, Grid, LayerBlock } from '@/components/Layout';
import { WrapperSticker } from '@/components/ui/Sticker/styled';
import { fadeIn, media } from '@/theme';

export const Wrapper = styled(Container)`
	position: relative;

	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;

	${media.greaterThan('md')`
        grid-template-columns: 1fr 25%;
        padding-bottom: 0;
    `}

	.swiper {
		margin-bottom: 20px;
		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.colors.gray.$2};
		min-width: 1%;

		.swiper-slide {
			height: 75vw;
		}

		.swiper-pagination-bullet-active {
			background-color: ${({ theme }) => theme.colors.dark};
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
`;

export const Title = styled.h1`
	text-transform: uppercase;
	line-height: 1.2;
	margin: 0;
	margin-bottom: 10px;
`;

export const ProductImage = styled(Image)`
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: top center;
`;

export const Info = styled.div`
	min-width: 1px;

	span {
		line-height: 1.5;
		font-size: 20px;

		p {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
`;

export const SideBlock = styled.div`
	z-index: 1;

	${LayerBlock} {
		background-color: ${({ theme }) => theme.colors.light};
	}

	${media.lessThan('mdD')`
        width: 100%;

        ${LayerBlock} {
            position: fixed;
            top: auto;
            bottom: 0;
            padding: 10px 20px;
            left: 0;
            right: 0;
            border-top: 1px solid #eee;
            border-radius: 0;
            margin-bottom: 0;
        }
    `}

	${media.greaterThan('md')`
        position: relative;

        ${LayerBlock} {
            position: sticky;
            top: 20px;
        }
    `}
`;

export const PriceBlock = styled(Grid)`
	position: relative;
	align-items: center;
	gap: 4px;
	grid-auto-flow: dense;
	grid-template-columns: 1fr 170px;

	.side {
		&-price {
			grid-template-columns: 1fr;

			span {
				display: inline-block;
				align-self: center;
				font-family: sans-serif;
				font-size: 26px;
			}

			${WrapperSticker} {
				bottom: 18px;
			}
		}

		&-info {
			display: none;

			${WrapperSticker} {
				margin: 0 8px 8px 0;
			}
		}
	}

	${media.greaterThan('md')`
        grid-template-columns: 1fr;
        align-items: start;
        grid-auto-flow: dense;
        gap: 16px;

        .side-info {
            display: flex;
        }
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
