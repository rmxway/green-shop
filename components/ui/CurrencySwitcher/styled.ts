import styled, { css } from 'styled-components';

export const CurrencySwitcherWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 40px;
`;

export const CurrencyLabel = styled.div<{ $isRUB: boolean }>`
	display: flex;
	align-items: center;
	gap: 14px;
	font-size: 16px;
	font-weight: 500;

	button {
		padding: 4px 0;
		cursor: pointer;
		border: none;
		background: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
	}

	/* Стили для Switcher внутри */
	${({ theme, $isRUB }) => css`
		> div {
			input {
				display: none;
			}

			> input + label {
				position: relative;
				cursor: pointer;
				display: block;
				padding: 2px;
				margin-top: 0;
				width: 50px;
				height: 25px;
				border-radius: 100px;
				background-color: ${$isRUB ? theme.colors.success : theme.colors.gray.$3};
				background-image: none;
				transition: all 0.4s;
				transition-timing-function: ease;

				&:after {
					content: '';
					display: block;
					width: 50%;
					height: 100%;
					border-radius: 25px;
					background-color: #fff;
					transition: all 0.25s;
					transition-timing-function: ease;
					transform: ${$isRUB ? 'translate(100%, 0)' : 'translate(0, 0)'};
				}
			}
		}
	`}
`;

export const RateText = styled.span`
	color: ${({ theme }) => theme.colors.gray.$5};
`;
