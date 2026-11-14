import { FC } from 'react';

import { ProductCard } from '@/components';
import { Grid, LayerBlock } from '@/components/Layout';
import { useAppSelector } from '@/services';
import { threeProductsByCategoryMemoized } from '@/store/reducers/commonSelectors';
import { productsStore } from '@/store/types';

import { ProductProps } from './content';
import { Title2 } from './styled';

export const Recommend: FC<ProductProps> = ({ product }) => {
	const categoryItems = useAppSelector((state) =>
		threeProductsByCategoryMemoized(productsStore(state), product.category!, product.id),
	);

	return (
		categoryItems?.length !== 0 && (
			<LayerBlock>
				<Title2>Рекомендуем</Title2>
				<p>Подобрали для вас несколько подходящих товаров</p>
				<div className="category-items">
					<Grid>
						{categoryItems?.map((item) => (
							<ProductCard product={item} key={item.id} />
						))}
					</Grid>
				</div>
			</LayerBlock>
		)
	);
};
