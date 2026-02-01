import { motion } from 'framer-motion';
import styled from 'styled-components';

import { defaultTheme as theme } from '@/theme';
import { media } from '@/theme/media';

export const TableWrapper = styled.div`
	width: 100%;
	overflow-x: auto;
	border-radius: ${theme.radius.borderRadius};
	background: #fff;
	margin-bottom: 40px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
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
	vertical-align: top;
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
	background: ${({ $index }) =>
		$index !== undefined && $index % 2 === 0 ? theme.colors.gray.$1 : theme.colors.gray.$2};

	td:after {
		transition: all 0.2s;
	}

	&:hover {
		td:after {
			content: '';
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: ${theme.colors.primary}10;
		}
	}
`;

export const CharacteristicLabel = styled.td<{ $index?: number }>`
	padding: 12px 16px;
	font-weight: 600;
	position: sticky;
	left: 0;
	background: ${({ $index }) => ($index !== undefined && $index % 2 === 0 ? '#f9f9f9' : theme.colors.gray.$1)};
	border-right: 1px solid ${theme.colors.gray.$2};
	z-index: 1;
	white-space: nowrap;
	transition: all 0.1s;

	${media.greaterThan('sm')`
		padding: 16px 20px;
	`}
`;

export const CharacteristicCell = styled(motion.td)<{ $highlight?: boolean; $index?: number }>`
	padding: 12px 16px;
	text-align: center;
	border-right: 1px solid ${theme.colors.gray.$2};
	background: ${({ $highlight, $index }) => {
		if ($highlight) return `${theme.colors.primary}10`;
		if ($index !== undefined && $index % 2 === 0) return '#f9f9f9';
		return theme.colors.gray.$1;
	}};
	transition: all 0.1s;

	&:last-child {
		border-right: none;
	}

	${media.greaterThan('sm')`
		padding: 16px 20px;
	`}
`;
