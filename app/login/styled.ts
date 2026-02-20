import styled from 'styled-components';

export const AuthCard = styled.div`
	width: 100%;
	max-width: 450px;
	padding: 40px;
	background: ${({ theme }) => theme.colors.gray.$1};
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const AuthTitle = styled.h1`
	font-size: 28px;
	font-weight: 700;
	text-align: center;
	margin-bottom: 30px;
	color: ${({ theme }) => theme.colors.gray.$9};
`;

export const AuthForm = styled.form`
	width: 100%;
`;
