import styled, { css } from 'styled-components';

export const CurrencySwitcherWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 40px;
`;

export const CurrencyLabel = styled.div`
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

	/* Только контекстные отличия: выравнивание и цвет при выборе RUB */
	${() => css`
		> div > input + label {
			margin-top: 0;
		}
	`}
`;

export const RateText = styled.span`
	color: ${({ theme }) => theme.colors.gray.$5};
`;
