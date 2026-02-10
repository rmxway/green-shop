import { darken } from 'polished';
import styled from 'styled-components';

import { hideGradientMixin } from '@/theme/styles/mixins';

export const WrapperTextToggle = styled.div<{ $isOpen?: boolean }>`
	position: relative;

	& > div {
		position: relative;
		font-size: 1.1rem;
		display: block;
		overflow: hidden;
		margin-bottom: 12px;
		color: ${({ theme }) => theme.colors.gray.$7};

		&:after {
			bottom: 0;
			left: 0;
			right: 0;
			${({ $isOpen, theme }) => !$isOpen && hideGradientMixin(theme.colors.light, 'bottom')}
		}
	}

	button {
		margin: 0;
		padding: 0;
		cursor: pointer;
		font-weight: 600;
		font-size: 1rem;
		color: ${({ theme }) => darken(0.03, theme.colors.success)};

		&:hover {
			color: ${({ theme }) => darken(0.1, theme.colors.success)};
		}
	}
`;

export default WrapperTextToggle;
