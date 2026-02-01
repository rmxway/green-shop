import styled from 'styled-components';

import { defaultTheme as theme } from '@/theme';
import { media } from '@/theme/media';

export const ProductHeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 0;
	height: 100%;
	position: relative;

	${media.greaterThan('sm')`
		gap: 16px;
	`}
`;

export const IconsWrapper = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	display: flex;
	gap: 4px;
	z-index: 2;
`;

export const IconButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
	z-index: 2;

	.icofont {
		font-size: 1.3rem;
		color: ${theme.colors.gray.$4};
		transition: 0.2s;
	}

	&:active {
		transition: all 0.1s;
		transform: scale(1.4);
	}

	&:hover .icofont {
		color: ${theme.colors.danger};
	}
`;

export const ImageWrapper = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${theme.radius.borderRadius};
	overflow: hidden;
	background: transparent;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	${media.greaterThan('sm')`
		height: 180px;
	`}

	${media.greaterThan('md')`
		height: 200px;
	`}
`;

export const NoPhotoContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${theme.colors.gray.$3};
	background: transparent;
`;

export const ProductTitle = styled.span`
	font-size: 14px;
	font-weight: 600;
	line-height: 1.3;
	text-decoration: none;
	color: ${theme.colors.dark};
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	height: calc(14px * 1.3 * 2);
	transition: color 0.2s;

	&:hover {
		text-decoration: underline;
	}

	${media.greaterThan('sm')`
		font-size: 15px;
		height: calc(15px * 1.3 * 2);
	`}

	${media.greaterThan('md')`
		font-size: 16px;
		height: calc(16px * 1.3 * 2);
	`}
`;

export const ProductPrice = styled.div`
	font-size: 18px;
	font-weight: 600;
	color: ${theme.colors.dark};
	font-family: sans-serif;

	${media.greaterThan('sm')`
		font-size: 20px;
	`}

	${media.greaterThan('md')`
		font-size: 22px;
	`}
`;

export const ActionsWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: auto;

	button {
		font-size: 12px;
		padding: 8px 12px;
	}

	${media.greaterThan('sm')`
		button {
			font-size: 13px;
			padding: 10px 16px;
		}
	`}

	${media.greaterThan('md')`
		button {
			font-size: 14px;
		}
	`}
`;
