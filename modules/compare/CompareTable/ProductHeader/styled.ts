import styled from 'styled-components';

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
	top: -16px;
	right: -16px;
	display: flex;
	gap: 4px;
	z-index: 2;
	-webkit-tap-highlight-color: transparent;

	${media.greaterThan('sm')`
		top: -20px;
		right: -20px;
	`}
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
		color: ${({ theme }) => theme.colors.gray.$6};
		transition: 0.2s;
	}

	&:active {
		transition: all 0.1s;
		transform: scale(1.4);
	}

	&:hover .icofont {
		color: ${({ theme }) => theme.colors.danger};
	}
`;

export const ImageWrapper = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.radius.borderRadius};
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
	color: ${({ theme }) => theme.colors.gray.$3};
	background: transparent;
`;

export const ProductTitle = styled.span`
	font-size: 14px;
	line-height: 1.3;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.gray.$9};
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
	font-size: 1.3rem;
	font-weight: 200;
	font-family: sans-serif;
	color: ${({ theme }) => theme.colors.gray.$8};

	${media.greaterThan('xs')`
		font-size: 1.6rem;
	`}
`;

export const ActionsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: auto;
`;
