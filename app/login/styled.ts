import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AuthWrapper = styled.div`
	min-height: 70vh;
	padding: 40px 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AuthCard = styled(motion.div)`
	width: 100%;
	max-width: 450px;
	padding: 40px;
	background: ${({ theme }) => theme.colors.gray.$1};
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const AuthForm = styled.form`
	width: 100%;
`;

export const AuthLinkText = styled.p`
	text-align: center;
	margin-top: 10px;
`;
