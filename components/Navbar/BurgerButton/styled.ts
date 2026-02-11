import styled, { css } from 'styled-components';

import { ButtonStyle } from '@/components/ui/Button/styled';
import { media } from '@/theme';

export const BurgerButtonStyled = styled(ButtonStyle)<{ $isOpen: boolean }>`
	position: relative;
	padding: 8px;
	width: 32px;
	height: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${({ $isOpen }) => ($isOpen ? 'center' : 'space-between')};

	span {
		display: inline-block;
		height: 2px;
		border-radius: 50px;
		min-width: 20px;
		background-color: ${({ theme }) => theme.colors.dark};
		transition: all 0.2s;

		${({ $isOpen }) =>
			$isOpen &&
			css`
				&:first-child {
					transform: rotate(45deg);
					transform-origin: 7px;
				}

				&:nth-child(2) {
					opacity: 0;
				}

				&:last-child {
					transform: rotate(-45deg);
					transform-origin: 7px;
				}
			`}
	}

	${media.greaterThan('md')`
		display: none;
	`}
`;
