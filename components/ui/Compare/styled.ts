import styled, { css } from 'styled-components';

export const WrapperCompare = styled.div<{ $active?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
	z-index: 2;
	opacity: 0.4;
	transition: 0.4s;

	.icofont {
		margin-top: 4px;
	}

	&:active {
		transition: all 0.1s;
		transform: scale(1.4);
	}

	&:hover {
		opacity: 1;
		color: ${({ theme }) => theme.colors.dark};
	}

	${({ $active, theme }) =>
		$active &&
		css`
			color: ${theme.colors.dark};
			opacity: 1;
		`}
`;

export default WrapperCompare;
