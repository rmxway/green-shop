import { motion } from 'framer-motion';
import styled from 'styled-components';

import { defaultTheme as theme } from '@/theme';
import { media } from '@/theme/media';

export const TableWrapper = styled.div`
	overflow-x: auto;
	margin: 0 -20px 40px -20px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

	${media.greaterThan('md')`
		margin: 0 0 40px;
		border-radius: ${theme.radius.borderRadius};
	`}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	min-width: 600px;

	${media.greaterThan('md')`
		min-width: 800px;
	`}
`;

export const HeaderRow = styled.tr`
	position: sticky;
	top: 0;
	z-index: 10;
	background: #fff;
`;

export const HeaderCell = styled.th`
	padding: 16px;
	vertical-align: middle;
	position: sticky;
	top: 0;
	background: #fff;
	min-width: 200px;
	max-width: 250px;
	border-right: 1px solid ${theme.colors.gray.$2};

	${media.greaterThan('sm')`
		padding: 20px;
	`}

	&:first-child {
		min-width: 150px;
		max-width: 150px;
		left: 0;
		z-index: 10;
	}

	&:last-child {
		border-right: none;
	}

	${media.greaterThan('sm')`
		min-width: 220px;
		max-width: 280px;

		&:first-child {
			min-width: 180px;
			max-width: 180px;
		}
	`}

	${media.greaterThan('md')`
		min-width: 250px;
		max-width: 320px;

		&:first-child {
			min-width: 200px;
			max-width: 200px;
		}
	`}
`;

export const CharacteristicRow = styled.tr<{ $index?: number }>`
	position: relative;

	& td {
		border-bottom: 1px solid ${theme.colors.gray.$2};
	}

	&:first-child td {
		border-top: 1px solid ${theme.colors.gray.$2};
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
		z-index: 1;
		width: 100%;
		height: 100%;
		transition: all 0.1s;
	}

	&:hover:after {
		background-color: ${theme.colors.primary}33;
	}
`;

export const CharacteristicLabel = styled.td<{ $index?: number }>`
	padding: 12px 20px;
	font-weight: 600;
	position: sticky;
	left: 0;
	min-width: 160px;
	background-color: #fff;
	z-index: 1;

	border-right: 1px solid ${theme.colors.gray.$2};
	transition: all 0.1s;
	text-align: center;
	vertical-align: middle;
	font-size: 0.8rem;

	${media.greaterThan('sm')`
		padding: 16px 20px;
		font-size: 1rem;
		width: auto;
	`}
`;

export const CharacteristicCell = styled(motion.td)<{ $highlight?: boolean; $index?: number }>`
	position: relative;
	padding: 12px 16px;
	text-align: center;
	border-right: 1px solid ${theme.colors.gray.$2};
	vertical-align: middle;
	background-color: ${({ $index }) => ($index !== undefined && $index % 2 === 0 ? '#fafafa' : theme.colors.gray.$1)};

	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: ${({ $highlight }) => ($highlight ? theme.colors.primary : 'none')};
		opacity: 0.15;
	}

	transition: all 0.1s;

	&:last-child {
		border-right: none;
	}

	${media.greaterThan('sm')`
		padding: 16px 20px;
	`}
`;
