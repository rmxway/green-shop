import type { InputHTMLAttributes } from 'react';
import React from 'react';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import type { InputProps } from '@/components/ui/Input';

export interface WithFormProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
	errors: FieldErrors<TFieldValues>;
	dirtyFields: Partial<Record<keyof TFieldValues, boolean>>;
	register: UseFormRegister<TFieldValues>;
	name: keyof TFieldValues & string;
	noSuccess?: boolean;
}

type FormFieldProps<TFieldValues extends FieldValues> = Pick<InputProps, 'mask' | 'label'> &
	WithFormProps<TFieldValues>;

export function createFormField<TFieldValues extends FieldValues>(Component: React.ComponentType<any>) {
	return ({ errors, name, register, dirtyFields, noSuccess, ...props }: FormFieldProps<TFieldValues>) => {
		const fieldError = errors[name as keyof typeof errors];
		const error =
			fieldError && typeof fieldError === 'object' && 'message' in fieldError
				? (fieldError.message as string | undefined)
				: undefined;
		const success = !error && !!dirtyFields[name];

		return (
			<Component
				{...props}
				{...{ name, error }}
				{...(!noSuccess && { success })}
				{...register(name as Path<TFieldValues>)}
			/>
		);
	};
}
