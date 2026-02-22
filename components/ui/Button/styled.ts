import { darken, desaturate } from 'polished';
import styled, { css } from 'styled-components';

interface CommonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	$w100?: boolean;
	$fitContent?: boolean;
	$inactive?: boolean;
	$margins?: boolean;
}

export interface Props extends CommonProps {
	$success?: boolean | never;
	$danger?: boolean | never;
	$primary?: boolean | never;
	$white?: boolean | never;
	$dark?: boolean | never;
}

const mixinButton = ($background = '#fff', $color = '#fff') => css`
	border-color: transparent;
	background-color: ${$background};
	color: ${$color};

	&:hover {
		background-color: ${darken(0.05, $background)};
	}

	&:active {
		background-color: ${darken(0.1, $background)};
	}

	&:disabled,
	&:disabled:hover {
		background-color: ${desaturate(0.4, $background)};
		color: ${desaturate(0.6, $color)};
		opacity: 0.45;
		pointer-events: none;
		cursor: default;
	}
`;

export const ButtonStyle = styled.button<Props>`
	${({ theme, $margins, $dark, $danger, $inactive, $primary, $success, $w100, $fitContent, $white }) => css`
		appearance: none;
		border: 1px solid #aaa;
		background: none;
		border-radius: ${theme.radius.borderRadius};
		padding: 11px 16px 10px;
		color: #777;
		font-size: 12px;
		font-weight: 800;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;

		${$margins &&
		css`
			margin-bottom: 10px;
			margin-right: 10px;
		`}

		cursor: pointer;
		line-height: 1;
		transition: 0.1s all;

		&:hover {
			background-color: ${theme.colors.gray.$3};
		}

		&:active {
			background-color: ${theme.colors.gray.$3};
		}

		&:disabled,
		&:disabled:hover {
			background-color: ${theme.colors.gray.$2};
			color: ${theme.colors.gray.$5};
			cursor: default;
		}

		${() => {
			if ($success) return mixinButton(theme.colors.success, theme.colors.dark);
			if ($danger) return mixinButton(theme.colors.danger);
			if ($primary) return mixinButton(theme.colors.primary, '#6d410a');
			if ($white) return mixinButton('#fff', theme.colors.dark);
			if ($dark) return mixinButton(theme.colors.dark, theme.colors.success);
			return null;
		}}

		${$w100 &&
		css`
			width: 100%;
		`}
		${$fitContent &&
		css`
			width: fit-content;
		`}
		${$inactive &&
		css`
			pointer-events: none;
		`}

		i {
			position: relative;
			line-height: 0;
			top: -2px;
			margin-left: 5px;
			font-size: 1rem;
		}
	`}
`;

export default ButtonStyle;
