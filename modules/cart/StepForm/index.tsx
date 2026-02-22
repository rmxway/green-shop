import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Flexbox } from '@/components/Layout';
import { Button, ErrorMessage } from '@/components/ui';
import { OrderFields, schemaOrder } from '@/modules/cart/services/schemaOrder';
import { submitOrder } from '@/modules/cart/services/submitOrder';
import { TableProducts } from '@/modules/cart/StepForm/TableProducts';
import { useAppDispatch } from '@/services';
import { changeStep } from '@/store/reducers/cart';

import { EmailInputWithCheck, InputOrder, SwitchOrder } from './helpers';
import { WrapperForm, WrapperStepForm } from './styled';

export const StepForm = () => {
	const { data: session } = useSession();
	const [submitError, setSubmitError] = useState('');
	const [emailIsRegistered, setEmailIsRegistered] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isValid, dirtyFields },
		setValue,
	} = useForm<OrderFields>({
		resolver: yupResolver(schemaOrder),
		mode: 'all',
	});

	const checkEmailRegistered = useCallback(
		async (email: string) => {
			if (!email.trim()) {
				setEmailIsRegistered(false);
				return;
			}
			try {
				const res = await fetch(`/api/check-email?email=${encodeURIComponent(email.trim())}`);
				const data = (await res.json()) as { registered?: boolean };
				if (data.registered) {
					setEmailIsRegistered(true);
					setError('email', {
						message: 'Такой email уже используется. Войдите в аккаунт.',
						type: 'manual',
					});
				} else {
					setEmailIsRegistered(false);
				}
			} catch {
				setEmailIsRegistered(false);
			}
		},
		[setError],
	);

	useEffect(() => {
		if (session?.user) {
			if (session.user.name) setValue('name', session.user.name, { shouldValidate: true });
			if (session.user.surname) setValue('surname', session.user.surname, { shouldValidate: true });
			if (session.user.email) setValue('email', session.user.email, { shouldValidate: true });
			if (session.user.phone) setValue('phone', session.user.phone, { shouldValidate: true });
			if (session.user.deliveryAddress)
				setValue('deliveryAddress', session.user.deliveryAddress, { shouldValidate: true });
		}
	}, [session, setValue]);

	const inputCommonProps = { errors, register, dirtyFields };

	const dispatch = useAppDispatch();

	const prevStep = () => {
		dispatch(changeStep(1));
	};

	const onSubmit: SubmitHandler<OrderFields> = async (data) => {
		setSubmitError('');
		try {
			await submitOrder(data);
			dispatch(changeStep(3));
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : 'Не удалось оформить заказ');
		}
	};

	return (
		<>
			<Button $margins $fitContent icon="cart" onClick={prevStep}>
				Назад
			</Button>
			<h4>
				Проверьте свои товары и заполните обязательные поля.
				{session?.user && ' (Данные заполнены из вашего профиля)'}
			</h4>
			<br />
			<WrapperStepForm $gap={40} $templateColumns="1fr 1fr">
				<WrapperForm>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flexbox $gap={10}>
							<InputOrder label="Имя *" placeholder="Мария" name="name" {...inputCommonProps} />
							<InputOrder label="Фамилия *" placeholder="Клаймбер" name="surname" {...inputCommonProps} />
							{session?.user ? (
								<InputOrder
									label="Email *"
									placeholder="mary-climber@gmail.com"
									name="email"
									{...inputCommonProps}
								/>
							) : (
								<EmailInputWithCheck
									control={control}
									errors={errors}
									dirtyFields={dirtyFields}
									clearErrors={clearErrors}
									checkEmailRegistered={checkEmailRegistered}
									onEmailChange={() => setEmailIsRegistered(false)}
								/>
							)}
							<InputOrder
								label="Мобильный телефон *"
								placeholder="+7 (999) 999-99-99"
								name="phone"
								mask="+7 (000) 000-00-00"
								{...inputCommonProps}
							/>
							<InputOrder
								label="Адрес доставки *"
								placeholder="Главная улица, 32"
								name="deliveryAddress"
								{...inputCommonProps}
							/>
							<SwitchOrder label="До квартиры" name="toApartment" noSuccess {...inputCommonProps} />
						</Flexbox>
						<Button type="submit" $w100 $primary disabled={!isValid || emailIsRegistered}>
							Отправить
						</Button>
						{submitError && (
							<Flexbox $direction="column" $gap={4}>
								<ErrorMessage error={submitError} />
							</Flexbox>
						)}
					</form>
				</WrapperForm>
				<TableProducts fGrow />
			</WrapperStepForm>
		</>
	);
};
