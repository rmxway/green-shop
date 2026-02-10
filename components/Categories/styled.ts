import styled, { css } from 'styled-components';

import { Flexbox } from '@/components/Layout/Flexbox';
import { media } from '@/theme';
import { hideGradientMixin } from '@/theme/styles/mixins';

export const WrapperCategory = styled.div`
	${({ theme }) => css`
		position: relative;
		margin-bottom: 40px;

		::-webkit-scrollbar {
			display: none;
		}

		${media.lessThan('mdD')`
            margin-left: -10px;
            margin-right: -10px;

            &:after {
                ${hideGradientMixin(theme.colors.gray.$2, 'left')}
                left: 0;
                height: 100%;
                width: 30px;
            }

            &:before {
                ${hideGradientMixin(theme.colors.gray.$2, 'right')}
                right: 0;
                height: 100%;
                width: 60px;
            }

            ${Flexbox} {
                flex-wrap: nowrap;
                 overflow: hidden;
                 overflow-x: auto;
            }
        `}
	`}
`;

export const Category = styled.button<{ $active: boolean }>`
	${({ theme, $active }) => css`
		padding: 8px 16px;
		flex-basis: 80px;
		flex-shrink: 0;
		border-radius: ${theme.radius.borderRadius};
		cursor: pointer;
		transition: 0.2s;
		text-transform: capitalize;
		background-color: ${theme.colors.gray.$4};
		font-weight: 600;
		font-size: 0.8rem;
		color: ${theme.colors.gray.$8};
		white-space: nowrap;

		&:hover {
			opacity: 0.9;
		}

		&:disabled {
			opacity: 0.4;
			pointer-events: none;
		}

		${$active &&
		css`
			color: ${theme.colors.success};
			background-color: ${theme.colors.dark};
		`}

		${media.lessThan('mdD')`
            &:first-child {
                margin-left: 10px;
            }

            &:last-child {
                margin-right: 20px;
            }

            min-width: initial;
        `}
	`}
`;
