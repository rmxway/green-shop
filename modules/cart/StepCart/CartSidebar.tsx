import { memo, useCallback } from 'react';
import CountUp from 'react-countup';

import { Button } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { changeStep } from '@/store/reducers/cart';
import { cartStore } from '@/store/types';

import { Sidebar, Title, Total } from './styled';

// Вынесенный сайдбар с точечной подпиской только на totalPrice
export const CartSidebar = memo(() => {
	const totalPrice = useAppSelector((state) => cartStore(state).totalPrice);
	const { currency, formatPriceWithoutLocale, getCurrencySymbol } = useCurrency();
	const dispatch = useAppDispatch();

	const handleNextStep = useCallback(() => {
		dispatch(changeStep(2));
	}, [dispatch]);

	return (
		<Sidebar layoutId="sidebar">
			<Title>Ваш заказ</Title>
			<Total>
				Всего:
				<span>
					<CountUp
						startVal={0}
						end={formatPriceWithoutLocale(totalPrice)}
						preserveValue
						duration={1}
						decimal="."
						decimals={currency === 'RUB' ? 0 : 2}
						separator={currency === 'RUB' ? ' ' : ','}
					/>{' '}
					{getCurrencySymbol()}
				</span>
			</Total>
			<Button $primary disabled={totalPrice === 0} onClick={handleNextStep}>
				Оформить заказ
			</Button>
		</Sidebar>
	);
});

CartSidebar.displayName = 'CartSidebar';
