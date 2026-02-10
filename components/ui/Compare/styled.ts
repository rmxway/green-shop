import styled, { css } from 'styled-components';

export const WrapperCompare = styled.div<{ $active?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
	z-index: 2;
	color: ${({ theme }) => theme.colors.gray.$6};
	opacity: 0.7;
	transition: 0.4s;
	-webkit-tap-highlight-color: transparent;

	.icofont {
		margin-top: 4px;
	}

	&:active {
		transition: all 0.1s;
		transform: scale(1.4);
	}

	&:hover {
		color: ${({ theme }) => theme.colors.gray.$8};
	}

	${({ $active, theme }) =>
		$active &&
		css`
			color: ${theme.colors.gray.$8};
			opacity: 1;
		`}
`;

export default WrapperCompare;
