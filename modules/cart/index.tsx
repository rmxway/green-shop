'use client';

import { useEffect } from 'react';

import { Container } from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/services';
import { changeStep } from '@/store/reducers/cart';
import { cartStore } from '@/store/types';

import { StepCart } from './StepCart';
import { StepFinal } from './StepFinal';
import { StepForm } from './StepForm';

export * from './StepCart';
export * from './StepFinal';
export * from './StepForm';

export const ContentCart = () => {
	const { step } = useAppSelector(cartStore);
	const dispatch = useAppDispatch();

	useEffect(
		() => () => {
			dispatch(changeStep(1));
		},
		[dispatch],
	);

	return (
		<Container $pt $pb $flex>
			{step === 1 && <StepCart />}
			{step === 2 && <StepForm />}
			{step === 3 && <StepFinal />}
		</Container>
	);
};
