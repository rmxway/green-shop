import styled, { css } from 'styled-components';

export const WrapperWarning = styled.div`
	${({ theme }) => css`
		position: relative;
		width: 100%;
		background-color: #fff3cd;
		color: #856404;
		padding: 12px 16px;
		margin-bottom: 16px;
		border-radius: ${theme.radius.borderRadius};
		border: 1px solid #ffeaa7;
		font-size: 14px;
		line-height: 1.4;

		span {
			display: block;
			font-weight: 500;
		}
	`}
`;