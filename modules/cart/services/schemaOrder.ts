import { boolean, InferType, object, string } from 'yup';

import { emailRegex, phoneRegex } from '@/services/regexes';

export const schemaOrder = object({
	name: string().required('Имя обязательно').min(3, 'Минимум 3 символа').trim(),
	surname: string().required('Фамилия обязательна').min(5, 'Минимум 5 символов').trim(),
	phone: string()
		.required('Мобильный телефон обязателен')
		.trim()
		.matches(phoneRegex, { message: 'Неверный формат телефона', excludeEmptyString: true }),
	email: string()
		.required('Email обязателен')
		.trim()
		.matches(emailRegex, { message: 'Email должен быть корректным', excludeEmptyString: true }),
	deliveryAddress: string().required('Адрес обязателен'),
	toApartment: boolean().required(),
});

export type OrderFields = InferType<typeof schemaOrder>;
