import { lighten } from 'polished';
import styled from 'styled-components';

export const ToggleButton = styled.button`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0 8px;
	border: none;
	background: transparent;
	cursor: pointer;
	z-index: 100;
	color: ${({ theme }) => theme.colors.success};
	transition:
		color 0.3s ease,
		transform 0.2s ease;

	.icofont {
		font-size: 1.4rem;
		line-height: 1;
	}

	&:hover {
		color: ${({ theme }) => lighten(0.4, theme.colors.success)};
	}
`;
