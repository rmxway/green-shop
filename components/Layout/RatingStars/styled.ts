import styled from 'styled-components';

import { Icon } from '@/components/ui/Icon';

export interface RatingTypes {
	rating: number | null;
}

export const Block = styled.div`
	display: flex;
	align-items: center;

	span {
		display: inline-block;
		margin-left: 5px;
		color: ${({ theme }) => theme.colors.gray.$6};
	}
`;

export const RatingStarsStyled = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding-bottom: 3px;
`;

export const Wrapper = styled.div<{ $width?: number | null }>`
	position: ${({ $width }) => (typeof $width === 'number' ? 'absolute' : 'relative')};
	left: 0;
	top: 0;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	width: ${({ $width }) => (typeof $width === 'number' ? `calc((100% / 5) * ${$width})` : '100%')};
`;

export const Star = styled(Icon)<{ $active?: boolean }>`
	width: 16px;
	flex-shrink: 0;
	margin-right: 1px;
	color: ${({ $active, theme }) => ($active ? theme.colors.danger : theme.colors.gray.$2)};

	&:last-child {
		margin-right: 0;
	}
`;
