import { motion, Variants } from 'framer-motion';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';

import { media } from '@/theme';

import { CountStyled } from './Count/styled';

export const StyledNavbar = styled(motion.div)`
	position: fixed;
	top: 0;
	z-index: 100;
	width: 100%;
	height: 70px;
	background-color: ${({ theme }) => theme.colors.dark};
	text-align: center;
	display: flex;
	align-items: center;
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease;
`;

export const Logo = styled.div`
	${({ theme }) => css`
		position: relative;
		display: flex;
		flex-shrink: 0;
		border-radius: ${theme.radius.borderRadius};
		font-size: 2rem;
		font-weight: 600;
		color: ${theme.colors.success};
		line-height: 1;
		padding: 0 0 0 10px;
		border: 2px solid ${theme.colors.success};
		overflow: hidden;

		a {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		span {
			text-transform: uppercase;
			font-size: 12px;
			text-align: left;
			background-color: ${theme.colors.success};
			display: flex;
			align-items: center;
			padding: 2px 10px;
			color: ${theme.colors.dark};
			margin-left: 10px;
		}
	`}
`;

export const Line = styled(motion.div)`
	position: absolute;
	bottom: -2px;
	left: 0;
	right: 0;
	height: 2px;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.colors.dark};
`;

export const NavbarItem = styled.div`
	${({ theme }) => css`
		position: relative;
		display: flex;
		margin-right: 10px;
		font-size: 1.3rem;
		color: ${theme.colors.dark};
		text-decoration: none;
		margin-bottom: 10px;
		border-bottom: 2px solid transparent;
		transition: all 0.2s;

		a {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}

		&:hover {
			color: ${lighten(0.2, theme.colors.dark)};
		}

		&:last-child {
			margin-right: 0;
		}

		${media.lessThan('mdD')`
			${CountStyled} {
				background-color: ${theme.colors.dark};
				border-color: ${lighten(0.28, theme.colors.success)};
				color: #fff;
			}
		`}

		${media.greaterThan('md')`
			margin-bottom: 0;
			margin-right: 20px;
			font-size: 1.1rem;
			color: ${theme.colors.success};

			&:hover {
				color: ${lighten(0.3, theme.colors.success)};
			}

			${Line} {
				background-color: ${theme.colors.success};
			}
		`}
	`}
`;

export const WrapperNavbarItems = styled(motion.div)`
	position: fixed;
	right: 0;
	top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 0;
	overflow: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	overscroll-behavior: contain;
	touch-action: pan-y;
	padding-bottom: 20px;
	background-image: ${({ theme }) => theme.gradients.softDark('210deg')};
	z-index: 99;

	${media.greaterThan('md')`
		position: relative;
		top: 0;
		height: auto;
		overflow: visible;
		opacity: 1;
		background-image: none;
		flex-direction: row;
		justify-content: flex-end;
	`}
`;

export const variantsWrapperNavbar: Variants = {
	visible: {
		height: 'calc(100vh - 70px)',
		maxHeight: 'calc(100vh - 70px)',
		padding: '40px 20px',
		opacity: 1,
	},
	hidden: {
		height: 0,
		padding: 0,
		opacity: 0,
	},
};
