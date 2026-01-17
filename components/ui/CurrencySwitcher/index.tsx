import { FC, useEffect, useRef } from 'react';

import { Switcher } from '@/components/ui/Switcher';
import { useAppDispatch, useAppSelector } from '@/services';
import { toggleCurrency } from '@/store/reducers/products';
import { currencyStore } from '@/store/types';

import { CurrencyLabel, CurrencySwitcherWrapper, RateText } from './styled';

export const CurrencySwitcher: FC = () => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(currencyStore);
    const isRUB = currency === 'RUB';
    const switcherRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = switcherRef.current;
        if (input) {
            input.checked = isRUB;

            const handleChange = () => {
                dispatch(toggleCurrency());
            };

            input.addEventListener('change', handleChange);
            return () => input.removeEventListener('change', handleChange);
        }
        return undefined;
    }, [dispatch, isRUB]);

    const handleTextClick = (targetCurrency: 'USD' | 'RUB') => {
        if (currency !== targetCurrency) {
            dispatch(toggleCurrency());
        }
    };

    return (
        <CurrencySwitcherWrapper>
            <CurrencyLabel $isRUB={isRUB}>
                <button type="button" onClick={() => handleTextClick('USD')}>доллар</button>
                <Switcher name="currency" ref={switcherRef} />
                <button type="button" onClick={() => handleTextClick('RUB')}>рубль</button>
            </CurrencyLabel>
            <RateText>1$ = 65 ₽</RateText>
        </CurrencySwitcherWrapper>
    );
};

export default CurrencySwitcher;