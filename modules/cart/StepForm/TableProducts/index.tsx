import { FC } from 'react';

import { Flexbox } from '@/components/Layout';
import { Product, WrapperProducts } from '@/modules/cart/StepForm/styled';
import { currency, useAppSelector } from '@/services';
import { cartStore } from '@/store/types';

export const TableProducts: FC<{ fGrow?: boolean }> = ({ fGrow }) => {
	const { items, totalPrice } = useAppSelector(cartStore);
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
								{currency}&nbsp;{price}&nbsp;
							</div>
							{count && count > 1 && (
								<span>({(count * price).toFixed(2)})</span>
							)}
						</Flexbox>
					</Product>
				))}
			<p>
				<span>
					{currency} {totalPrice.toFixed(2)}
				</span>
			</p>
		</WrapperProducts>
	);
};
export default TableProducts;
