import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo } from 'react';

import { Flexbox, RatingStars, Space } from '@/components/Layout';
import { Button, Compare, Favorite, Sticker } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency, useNavigateWithScroll } from '@/services';
import { moveToCart } from '@/store/reducers/combineActions';
import { isInCompareMemoized, productByIdMemoized } from '@/store/reducers/commonSelectors';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleFavorite } from '@/store/reducers/products';
import { compareStore, productsStore } from '@/store/types';
import { IProduct } from '@/types';

import { ProductImage } from './ProductImage';
import { Price, ProductWrapper, Title, Tools, TopBlock } from './styled';

interface ProductCardProps extends MotionProps {
	product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = memo(
	({ product, ...props }) => {
		const link = `/product/${product.id}`;
		const navigateTo = useNavigateWithScroll();
		const dispatch = useAppDispatch();
		const { formatPriceWithSymbol } = useCurrency();
		const isInCompare = useAppSelector((state) => isInCompareMemoized(compareStore(state), product.id));
		// Получаем актуальное состояние товара из store
		const actualProduct = productByIdMemoized(useAppSelector(productsStore), product.id) || product;

		const handleCartClick = () => {
			if (product.checked) {
				navigateTo('/cart');
			} else {
				moveToCart(product.id);
			}
		};

		const handleToggleCompare = () => {
			dispatch(toggleCompare(product));
		};

		const handleToggleFavorite = () => {
			dispatch(toggleFavorite(product.id));
		};

		return (
			<ProductWrapper {...props}>
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
				</Tools>
				<Button
					$primary={!actualProduct?.checked}
					$dark={actualProduct?.checked}
					icon={actualProduct?.checked ? 'arrow-right-line' : 'cart'}
					onClick={handleCartClick}
				>
					{actualProduct?.checked ? 'Корзина' : 'Добавить'}
				</Button>
			</ProductWrapper>
		);
	},
	(prev, next) => prev.product == next.product,
);

export default ProductCard;
