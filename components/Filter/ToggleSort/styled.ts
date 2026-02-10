import styled from 'styled-components';

interface ToggleTypes {
	$toggle?: boolean;
}

export const Toggle = styled.button<ToggleTypes>`
	display: block;
	border: none;
	background: none;
	position: relative;
	color: ${({ theme }) => theme.colors.gray.$7};
	padding-right: 20px;
	padding-left: 0;
	cursor: pointer;

	&:last-child {
		padding-right: 0;
	}

	&:hover {
		color: ${({ theme }) => theme.colors.gray.$9};
	}

	input {
		display: none;
	}

	label {
		pointer-events: none;
	}

	input:checked + label {
		color: ${({ theme }) => theme.colors.danger};

		i {
			display: block;
		}
	}

	.icofont {
		position: absolute;
		right: 0;
		top: -2px;
		width: 20px;
		height: 20px;
		display: none;
		line-height: 1.3;
		transition: 0.2s all;
		${({ $toggle }) => ($toggle ? 'transform: scale(1, -1);' : '')}
	}
`;

export default Toggle;
