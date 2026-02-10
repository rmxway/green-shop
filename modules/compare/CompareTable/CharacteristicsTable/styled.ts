import styled from 'styled-components';

export const TableBody = styled.tbody`
	// 
`;

export const EmptyCell = styled.td`
	padding: 12px 16px;
	text-align: center;
	color: ${({ theme }) => theme.colors.gray.$5};
	font-style: italic;
`;
