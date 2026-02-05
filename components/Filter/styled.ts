import styled from 'styled-components';

import { InputWrapper } from '@/components/ui/Input/styled';
import { media } from '@/theme';

export const SearchFieldWrapper = styled.div`
	position: relative;
	width: 100%;

	input {
		padding-right: 36px;
	}
`;

export const SearchClearButton = styled.button`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.gray.$6};
	transition: color 0.2s;

	&:hover {
		color: ${({ theme }) => theme.colors.gray.$8};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.success};
		outline-offset: 2px;
	}
`;

export const StyledFilter = styled.div`
	display: flex;
	margin: 30px 0 10px;
	flex-direction: column;
	align-items: stretch;
	justify-content: flex-start;
	gap: 20px;

	${SearchFieldWrapper} {
		transition: 0.2s;
		width: 100%;
	}

	${InputWrapper} {
		margin-top: 20px;
		width: 100%;

		input {
			width: 100%;
			min-width: 250px;
		}
	}

	${media.greaterThan('xs')`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        ${SearchFieldWrapper} {
            margin-top: 0;
            width: auto;

            &:has(input:focus) {
                flex-grow: 1;
            }
        }

        ${InputWrapper} {
            margin-top: 0;
            width: auto;
        }
    `}

	${media.greaterThan('md')`
        margin: 30px 0;
    `}
`;

export default StyledFilter;
