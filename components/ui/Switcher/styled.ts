import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const WrapperSwitcher = styled.div`
	${({ theme }) => css`
		position: relative;

		input {
			display: none;
		}

		& > input + label {
			position: relative;
			cursor: pointer;
			display: block;
			padding: 1px;
			margin-top: 7px;
			width: 35px;
			height: 18px;
			border-radius: 50px;
			background-color: ${theme.colors.gray.$3};
			background-image: none;
			transition: all 0.4s;
			transition-timing-function: ease;

			&:after {
				content: '';
				display: block;
				width: 50%;
				height: 100%;
				border-radius: 18px;
				background-color: #fff;
				transition: all 0.25s;
				transition-timing-function: ease;
			}
		}

		& > input:checked + label {
			background-color: ${darken(0, theme.colors.dark)};

			&:after {
				transform: translate(100%, 0);
			}
		}
	`}
`;
