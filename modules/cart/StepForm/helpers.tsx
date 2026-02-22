import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Flexbox } from '@/components/Layout';
import { createFormField, Input, Switcher } from '@/components/ui';
import { OrderFields } from '@/modules/cart/services/schemaOrder';

export const InputOrder = createFormField<OrderFields>(Input);
export const SwitchOrder = createFormField<OrderFields>(Switcher);

const getErrorMessage = (fieldError: FieldErrors<OrderFields>[keyof OrderFields]) =>
	fieldError && typeof fieldError === 'object' && 'message' in fieldError
		? (fieldError.message as string)
		: undefined;

interface EmailInputWithCheckProps {
	control: Control<OrderFields>;
	errors: FieldErrors<OrderFields>;
	dirtyFields: Partial<Record<keyof OrderFields, boolean>>;
	clearErrors: (name: keyof OrderFields) => void;
	checkEmailRegistered: (email: string) => Promise<void>;
	onEmailChange: () => void;
}

export const EmailInputWithCheck = ({
	control,
	errors,
	dirtyFields,
	clearErrors,
	checkEmailRegistered,
	onEmailChange,
}: EmailInputWithCheckProps) => (
	<Controller
		name="email"
		control={control}
		render={({ field }) => (
			<Flexbox $direction="column" $gap={4}>
				<Input
					{...field}
					value={field.value ?? ''}
					label="Email *"
					placeholder="mary-climber@gmail.com"
					name="email"
					error={getErrorMessage(errors.email)}
					success={!getErrorMessage(errors.email) && !!dirtyFields.email}
					onChange={(e) => {
						field.onChange(e);
						onEmailChange();
						clearErrors('email');
					}}
					onBlur={(e) => {
						field.onBlur();
						checkEmailRegistered((e.target as HTMLInputElement).value);
					}}
				/>
			</Flexbox>
		)}
	/>
);
