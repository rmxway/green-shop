import { AnimatePresence, MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo } from 'react';

import { Flexbox, RatingStars, Space } from '@/components/Layout';
import { Button, Compare, Count, Favorite, LinkIcon, Sticker } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { increaseCount } from '@/store/reducers/cart';
import { moveToCart, removeFromCart } from '@/store/reducers/combineActions';
import { countByIdMemoized, isInCompareMemoized, productByIdMemoized } from '@/store/reducers/commonSelectors';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleFavorite } from '@/store/reducers/products';
import { cartStore, compareStore, productsStore } from '@/store/types';
import { IProduct } from '@/types';

import { ProductImage } from './ProductImage';
import { Price, ProductWrapper, Title, Tools, TopBlock } from './styled';

interface ProductCardProps extends MotionProps {
	product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = memo(
	({ product, ...props }) => {
		const link = `/product/${product.id}`;
		const dispatch = useAppDispatch();
		const { formatPriceWithSymbol } = useCurrency();
		const isInCompare = useAppSelector((state) => isInCompareMemoized(compareStore(state), product.id));
		// Получаем актуальное состояние товара из store
		const actualProduct = productByIdMemoized(useAppSelector(productsStore), product.id) || product;
		const count = countByIdMemoized(useAppSelector(cartStore), product.id);

		// TODO доработать оптимизацию, сделать так же как и Compare
		const handleCartClick = () => {
			if (actualProduct.checked) {
				dispatch(increaseCount(product.id));
			} else {
				moveToCart(product.id);
			}
		};

		const handleToggleCompare = () => {
			dispatch(toggleCompare(product));
		};

		// TODO доработать оптимизацию, сделать так же как и Compare
		const handleToggleFavorite = () => {
			dispatch(toggleFavorite(product.id));
		};

		return (
			<ProductWrapper {...props} $checked={actualProduct.checked}>
				<TopBlock>
					{product.discountPercentage && (
						<Sticker $danger>-{Math.round(product.discountPercentage)}%</Sticker>
					)}
					<Flexbox>
						<Compare onActive={handleToggleCompare} active={isInCompare} />
						<Favorite onActive={handleToggleFavorite} active={actualProduct?.favorite} />
					</Flexbox>
				</TopBlock>
				<Link href={link}>
					<ProductImage images={product.images} alt={product.title} />
				</Link>
				<Title href={link}>
					<div>{product.title}</div>
					<span>{product.brand}</span>
				</Title>
				<Space />
				<Tools>
					<RatingStars rating={product.rating ? Number(product.rating) : 0} />
					<Price>{formatPriceWithSymbol(product.price)}</Price>
					<AnimatePresence>
						{count && (
							<LinkIcon
								icon="trash"
								initial
								title="Удалить все из корзины"
								onClick={() => removeFromCart(product.id)}
							/>
						)}
					</AnimatePresence>
				</Tools>
				<Button $primary icon={actualProduct?.checked ? 'arrow-right-line' : 'cart'} onClick={handleCartClick}>
					{actualProduct?.checked ? 'Ещё +1' : 'Добавить'}
					<Count count={count || undefined} />
				</Button>
			</ProductWrapper>
		);
	},
	(prev, next) => prev.product == next.product,
);

export default ProductCard;
