'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import { AuthCard, AuthForm, AuthLinkText, AuthWrapper } from '@/app/login/styled';
import { Container, Flexbox } from '@/components/Layout';
import { Button, createFormField, ErrorMessage, Input } from '@/components/ui';
import { fadeVariant } from '@/lib/pageAnimations';
import { emailRegex, phoneRegex } from '@/services/regexes';

const registerSchema = object({
	email: string()
		.required('Email обязателен')
		.trim()
		.matches(emailRegex, { message: 'Email должен быть корректным', excludeEmptyString: true }),
	password: string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
	name: string().required('Имя обязательно').min(3, 'Минимум 3 символа').trim(),
	surname: string().required('Фамилия обязательна').min(5, 'Минимум 5 символов').trim(),
	phone: string()
		.required('Мобильный телефон обязателен')
		.trim()
		.matches(phoneRegex, { message: 'Неверный формат телефона', excludeEmptyString: true }),
	deliveryAddress: string().required('Адрес обязателен'),
});

type RegisterFields = InferType<typeof registerSchema>;

const InputRegister = createFormField<RegisterFields>(Input);

export const RegisterContent = () => {
	const router = useRouter();
	const { status } = useSession();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, dirtyFields },
	} = useForm<RegisterFields>({
		resolver: yupResolver(registerSchema),
		mode: 'all',
	});

	const fieldProps = { errors, register, dirtyFields };

	useEffect(() => {
		if (status === 'unauthenticated') {
			reset();
		}
	}, [status, reset]);

	const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
		try {
			setIsLoading(true);
			setError('');

			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.error || 'Произошла ошибка при регистрации');
				return;
			}

			const signInResult = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});

			if (signInResult?.error) {
				setError('Регистрация прошла успешно, но вход не выполнен. Попробуйте войти вручную.');
				setTimeout(() => router.push('/login'), 2000);
				return;
			}

			router.push('/account');
			router.refresh();
		} catch (err) {
			setError('Произошла ошибка при регистрации');
			// eslint-disable-next-line no-console
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<AuthWrapper>
				<AuthCard initial="hidden" animate="visible" variants={fadeVariant(0)}>
					<AuthForm onSubmit={handleSubmit(onSubmit)}>
						<Flexbox $gap={10}>
							<InputRegister
								label="Email *"
								placeholder="example@mail.com"
								name="email"
								{...fieldProps}
							/>
							<InputRegister
								label="Пароль *"
								type="password"
								placeholder="••••••••"
								name="password"
								{...fieldProps}
							/>
							<InputRegister label="Имя *" placeholder="Мария" name="name" {...fieldProps} />
							<InputRegister label="Фамилия *" placeholder="Иванова" name="surname" {...fieldProps} />
							<InputRegister
								label="Телефон *"
								placeholder="+7 (999) 999-99-99"
								mask="+7 (000) 000-00-00"
								name="phone"
								{...fieldProps}
							/>
							<InputRegister
								label="Адрес доставки *"
								placeholder="Главная улица, 32"
								name="deliveryAddress"
								{...fieldProps}
							/>

							<Button type="submit" $primary $w100 disabled={!isValid || isLoading}>
								{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
							</Button>

							{error && <ErrorMessage error={error} />}

							<AuthLinkText>
								Уже есть аккаунт? <Link href="/login">Войти</Link>
							</AuthLinkText>
						</Flexbox>
					</AuthForm>
				</AuthCard>
			</AuthWrapper>
		</Container>
	);
};
