import React, { forwardRef, InputHTMLAttributes } from 'react';
import { IMaskInput, ReactElementProps } from 'react-imask';

import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Label } from '@/components/ui/Label';

import { InputWrapper } from './styled';

export interface InputProps {
	label?: string;
	mask?: string;
	name: string;
	error?: string;
	success?: boolean;
	noPadding?: boolean;
}
interface TargetType {
	target: {
		name: string;
		value: string;
	};
}
type ChangeType = (e: TargetType) => void;

export const Input = forwardRef<HTMLInputElement, InputProps & InputHTMLAttributes<HTMLInputElement>>(
	({ name, label, mask, error, success, noPadding, className, onChange, type = 'text', ...props }, ref) => (
		<InputWrapper {...{ className }} $error={!!error} $success={success} $noPaddings={noPadding}>
			{label && <Label {...{ label, name }} />}
			{mask ? (
				<IMaskInput
					{...{ name, mask, type }}
					onAccept={(value) => {
						(onChange as ChangeType)?.({ target: { name, value } });
					}}
					inputRef={ref}
					{...(props as ReactElementProps<HTMLInputElement>)}
				/>
			) : (
				<input {...props} {...{ ref, name, onChange, type }} id={name} />
			)}

			{error && <ErrorMessage {...{ error }} />}
		</InputWrapper>
	),
);

export default Input;
