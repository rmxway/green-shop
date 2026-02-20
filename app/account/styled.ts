import styled from 'styled-components';
import media from 'styled-media-query';

import { CountStyled } from '@/components/Navbar/Count/styled';

export const AccountSection = styled.section`
	padding: 40px 0;
	min-height: 70vh;
`;

export const AccountTitle = styled.h1`
	font-size: 36px;
	font-weight: 700;
	margin-bottom: 30px;
	color: ${({ theme }) => theme.colors.gray.$9};
`;

export const WelcomeCard = styled.div`
	padding: 30px;
	background: ${({ theme }) => theme.gradients.dark()};
	border-radius: 12px;
	margin-bottom: 30px;
	color: ${({ theme }) => theme.colors.light};

	h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	p {
		opacity: 0.9;
	}
`;

export const AccountGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 30px;

	${media.lessThan('medium')`
		grid-template-columns: 1fr;
	`}
`;

export const AccountCard = styled.div`
	padding: 30px;
	background: ${({ theme }) => theme.colors.gray.$1};
	border-radius: 12px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

	h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 10px;
		color: ${({ theme }) => theme.colors.gray.$9};
	}
`;

export const InfoItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const InfoLabel = styled.span`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray.$6};
	font-weight: 500;
`;

export const InfoValue = styled.span`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.gray.$9};
`;

export const OrderButtonWrapper = styled.div`
	position: relative;
	width: 100%;

	a {
		display: block;
		width: 100%;
	}

	${CountStyled} {
		right: -10px;
		background-color: ${({ theme }) => theme.colors.primary};
		border-color: ${({ theme }) => theme.colors.light};
	}
`;
