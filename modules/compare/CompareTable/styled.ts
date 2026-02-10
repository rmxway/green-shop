import { motion } from 'framer-motion';
import { darken, opacify } from 'polished';
import styled, { type DefaultTheme } from 'styled-components';

import { media } from '@/theme/media';

export const TableWrapper = styled.div`
	overflow-x: auto;
	margin: 0 -20px 40px -20px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	position: relative;

	${media.greaterThan('md')`
		margin: 0 0 40px;
		border-radius: ${(props: { theme: DefaultTheme }) => props.theme.radius.borderRadius};
	`}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	min-width: fit-content;
`;

export const HeaderRow = styled.tr`
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: ${({ theme }) => theme.colors.light};
`;

export const HeaderCell = styled.th`
	padding: 10px;
	vertical-align: middle;
	position: sticky;
	top: 0;
	background: ${({ theme }) => theme.colors.light};
	border-right: 1px solid ${({ theme }) => theme.colors.gray.$2};
	min-width: 250px;

	${media.greaterThan('sm')`
		padding: 20px;
	`}

	&:first-child {
		position: sticky;
		left: 0;
		width: 200px;
		min-width: 150px;
		max-width: 250px;
		z-index: 11;
		box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
	}

	&:last-child {
		border-right: none;
	}
`;

export const CharacteristicRow = styled.tr<{ $index?: number }>`
	position: relative;

	& td {
		border-bottom: 1px solid ${({ theme }) => theme.colors.gray.$2};
	}

	&:first-child td {
		border-top: 1px solid ${({ theme }) => theme.colors.gray.$2};
	}

	&:last-child td {
		border-bottom: none;
	}

	&:after {
		content: '';
		position: absolute;
		display: table;
		left: 0;
		top: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		transition: all 0.1s;
		pointer-events: none;
	}

	&:hover:after {
		background-color: ${({ theme }) => `${theme.colors.primary}22`};
	}
`;

export const CharacteristicLabel = styled.td<{ $index?: number }>`
	padding: 12px 20px;
	font-weight: 600;
	position: sticky;
	left: 0;
	width: 250px;
	min-width: 150px;
	max-width: 250px;
	background-color: ${({ theme, $index }) =>
		$index !== undefined && $index % 2 === 0 ? theme.colors.gray.$1 : darken(0.01, theme.colors.gray.$1)};

	z-index: 1;
	border-right: 1px solid ${({ theme }) => theme.colors.gray.$2};
	box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
	transition: all 0.1s;
	text-align: center;
	vertical-align: middle;
	font-size: 0.8rem;

	${media.greaterThan('sm')`
		padding: 16px 20px;
		font-size: 1rem;
	`}
`;

export const CharacteristicCell = styled(motion.td)<{ $highlight?: boolean; $index?: number }>`
	position: relative;
	padding: 12px 16px;
	text-align: center;
	border-right: 1px solid ${({ theme }) => theme.colors.gray.$2};
	vertical-align: middle;
	min-width: 250px;
	background-color: ${({ theme, $index }) =>
		$index !== undefined && $index % 2 === 0 ? theme.colors.gray.$1 : darken(0.02, theme.colors.gray.$1)};

	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: ${({ theme, $highlight }) => ($highlight ? opacify(-0.85, theme.colors.label) : 'none')};
		opacity: 1;
		z-index: 0;
	}

	transition: all 0.1s;

	&:last-child {
		border-right: none;
	}

	${media.greaterThan('sm')`
		padding: 16px 20px;
	`}
`;
