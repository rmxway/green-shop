import { motion, Variants } from 'framer-motion';
import { lighten } from 'polished';
import styled from 'styled-components';

import { defaultTheme as theme, media } from '@/theme';

import { CountStyled } from './Count/styled';

const logoColor = theme.colors.success;

export const StyledNavbar = styled(motion.div)`
	position: fixed;
	top: 0;
	z-index: 100;
	width: 100%;
	height: 70px;
	background-color: ${theme.colors.dark};
	text-align: center;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${theme.colors.gray.$8};
`;

export const Logo = styled.div`
	position: relative;
	display: flex;
	flex-shrink: 0;
	border-radius: ${theme.radius.borderRadius};
	font-size: 2rem;
	font-weight: 600;
	color: ${logoColor};
	line-height: 1;
	padding: 0 0 0 10px;
	border: 2px solid ${logoColor};
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
		background-color: ${logoColor};
		display: flex;
		align-items: center;
		padding: 2px 10px;
		color: ${theme.colors.dark};
		margin-left: 10px;
	}
`;

export const Line = styled(motion.div)`
	position: absolute;
	bottom: -2px;
	left: 0;
	right: 0;
	height: 2px;
	border-radius: 3px;
	background-color: ${theme.colors.dark};
`;

export const NavbarItem = styled.div`
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
        color: ${logoColor};

        &:hover {
            color: ${lighten(0.3, theme.colors.success)};
        }

        ${Line} {
            background-color: ${theme.colors.success};
        }
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
	background-image: ${theme.gradients.softDark('210deg')};

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
		height: '100%',
		padding: '40px 20px',
		opacity: 1,
	},
	hidden: {
		height: 0,
		padding: 0,
		opacity: 0,
	},
};
