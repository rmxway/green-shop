import { Input } from '@/components/ui';

import { ProfileForm } from '../styled';

type ProfileEditFormProps = {
	form: {
		name: string;
		surname: string;
		phone: string;
		deliveryAddress: string;
	};
	onChange: (e: { target: { name: string; value: string } }) => void;
};

const formFields = [
	{ name: 'name', label: 'Имя', placeholder: 'Имя' },
	{ name: 'surname', label: 'Фамилия', placeholder: 'Фамилия' },
	{ name: 'phone', label: 'Телефон', placeholder: '+7 (999) 999-99-99' },
	{ name: 'deliveryAddress', label: 'Адрес доставки', placeholder: 'Адрес доставки' },
] as const;

export const ProfileEditForm = ({ form, onChange }: ProfileEditFormProps) => (
	<ProfileForm>
		{formFields.map(({ name, label, placeholder }) => (
			<Input
				key={name}
				label={label}
				name={name}
				value={form[name]}
				onChange={onChange}
				placeholder={placeholder}
			/>
		))}
	</ProfileForm>
);
