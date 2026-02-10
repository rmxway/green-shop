import styled, { css } from 'styled-components';

interface InputWrapperProps {
	$error?: boolean;
	$success?: boolean;
	$noPaddings?: boolean;
}

const InputWrapper = styled.div<InputWrapperProps>`
	${({ theme, $error, $success, $noPaddings }) => css`
		position: relative;
		padding-bottom: ${$noPaddings ? 0 : '10px'};
		background-color: none;

		input[type='text'] {
			padding: 11px 16px 10px;
			border-radius: ${theme.radius.borderRadius};
			width: 100%;
			transition: 0.2s all;

			color: ${theme.colors.gray.$9};

			border: 1px solid #aaa;
			background-color: ${theme.colors.light};

			${$error &&
			css`
				border: 1px solid ${theme.colors.danger};
				background-color: ${theme.colors.danger}11;
			`}

			${$success &&
			css`
				border: 1px solid ${theme.colors.success};
				background-color: ${theme.colors.success}11;
			`}

			&::placeholder {
				color: ${theme.colors.gray.$6};
			}

			&:active,
			&:focus {
				border-color: ${!$error && theme.colors.success};
				outline: none;
			}

			&:disabled {
				background-color: ${theme.colors.gray.$3};
				opacity: 0.8;
			}
		}
	`}
`;

export { InputWrapper };
export default InputWrapper;
