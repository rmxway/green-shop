'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import { Container, Flexbox } from '@/components/Layout';
import { Button, createFormField, ErrorMessage, Input } from '@/components/ui';
import { fadeVariant } from '@/lib/pageAnimations';
import { emailRegex } from '@/services/regexes';

import { AuthCard, AuthForm, AuthLinkText, AuthWrapper } from './styled';

const loginSchema = object({
	email: string()
		.required('Email обязателен')
		.trim()
		.matches(emailRegex, { message: 'Email должен быть корректным', excludeEmptyString: true }),
	password: string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
});

type LoginFields = InferType<typeof loginSchema>;

const InputLogin = createFormField<LoginFields>(Input);

export const LoginContent = () => {
	const router = useRouter();
	const { status } = useSession();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, dirtyFields },
	} = useForm<LoginFields>({
		resolver: yupResolver(loginSchema),
		mode: 'all',
	});

	const fieldProps = { errors, register, dirtyFields };

	useEffect(() => {
		if (status === 'unauthenticated') {
			reset();
		}
	}, [status, reset]);

	const onSubmit: SubmitHandler<LoginFields> = async (data) => {
		try {
			setIsLoading(true);
			setError('');

			const result = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});

			if (result?.error) {
				setError(result.error);
				return;
			}

			router.push('/account');
			router.refresh();
		} catch (err) {
			setError('Произошла ошибка при входе');
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
						<Flexbox $gap={20}>
							<InputLogin label="Email" placeholder="example@mail.com" name="email" {...fieldProps} />
							<InputLogin
								label="Пароль"
								type="password"
								placeholder="••••••••"
								name="password"
								{...fieldProps}
							/>

							<Button type="submit" $primary $w100 disabled={!isValid || isLoading}>
								{isLoading ? 'Вход...' : 'Войти'}
							</Button>

							{error && <ErrorMessage error={error} />}

							<AuthLinkText>
								Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
							</AuthLinkText>
						</Flexbox>
					</AuthForm>
				</AuthCard>
			</AuthWrapper>
		</Container>
	);
};
