import styled from 'styled-components';

import { defaultTheme as theme } from '@/theme';

export const TableBody = styled.tbody`
	background: #fff;
`;

export const EmptyCell = styled.td`
	padding: 12px 16px;
	text-align: center;
	color: ${theme.colors.gray.$5};
	font-style: italic;
`;
