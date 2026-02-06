import styled, { css } from 'styled-components';

export const WrapperFavorite = styled.div<{ $active?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
	z-index: 2;
	opacity: 0.5;
	transition: 0.4s;
	-webkit-tap-highlight-color: transparent;

	&:active {
		transition: all 0.1s;
		transform: scale(1.4);
	}

	&:hover {
		opacity: 1;
		color: ${({ theme }) => theme.colors.danger};
	}

	${({ $active, theme }) =>
		$active &&
		css`
			color: ${theme.colors.danger};
			opacity: 1;
		`}
`;

export default WrapperFavorite;
