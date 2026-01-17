import { FC } from 'react';

import { Flexbox } from '@/components/Layout';
import { Product, WrapperProducts } from '@/modules/cart/StepForm/styled';
import { useAppSelector, useCurrency } from '@/services';
import { cartStore } from '@/store/types';

export const TableProducts: FC<{ fGrow?: boolean }> = ({ fGrow }) => {
	const { items, totalPrice } = useAppSelector(cartStore);
	const { formatPriceWithSymbol, formatPrice, getCurrencySymbol } = useCurrency();

	return (
		<WrapperProducts $fGrow={fGrow}>
			<Product>
				<div>Название</div>
				<div>Количество</div>
				<div>Цена</div>
			</Product>
			{items.length &&
				items.map(({ id, title, price, count }) => (
					<Product key={id}>
						<div>{title}</div>
						<div>{count || 1}</div>
						<Flexbox $nowrap $align="center" $direction="column">
							<div>
								{formatPriceWithSymbol(price)}
							</div>
							{count && count > 1 && (
								<span>({formatPriceWithSymbol(Number(count) * Number(price))})</span>
							)}
						</Flexbox>
					</Product>
				))}
			<p>
				<span>
					{Number(formatPrice(totalPrice)).toFixed(2)} {getCurrencySymbol()}
				</span>
			</p>
		</WrapperProducts>
	);
};
export default TableProducts;
