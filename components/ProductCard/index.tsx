import { AnimatePresence, MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo } from 'react';

import { Flexbox, RatingStars, Space } from '@/components/Layout';
import { Button, Compare, Count, Favorite, LinkIcon, Sticker } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { addToCart, increaseCount, removeFromCart } from '@/store/reducers/cart';
import { countByIdMemoized, isItemMemoized } from '@/store/reducers/commonSelectors';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleToFavorite } from '@/store/reducers/favorite';
import { cartStore, compareStore, favoriteStore } from '@/store/types';
import { IProduct } from '@/types';

import { ProductImage } from './ProductImage';
import { Price, ProductWrapper, Title, Tools, TopBlock } from './styled';

interface ProductCardProps extends MotionProps {
	product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = memo(({ product, ...props }) => {
	const link = `/product/${product.id}`;
	const dispatch = useAppDispatch();
	const { formatPriceWithSymbol } = useCurrency();
	const isInCompare = useAppSelector((state) => isItemMemoized(compareStore(state), product.id));
	const isInFavorite = useAppSelector((state) => isItemMemoized(favoriteStore(state), product.id));
	const isInCart = useAppSelector((state) => isItemMemoized(cartStore(state), product.id));
	const count = useAppSelector((state) => countByIdMemoized(cartStore(state), product.id));

	const handleAdd = () => {
		if (isInCart) {
			dispatch(increaseCount(product.id));
		} else {
			dispatch(addToCart(product));
		}
	};

	const handleRemove = () => {
		dispatch(removeFromCart(product.id));
	};

	const handleToggleCompare = () => {
		dispatch(toggleCompare(product));
	};

	const handleToggleFavorite = () => {
		dispatch(toggleToFavorite(product));
	};

	return (
		<ProductWrapper {...props} $checked={isInCart}>
			<TopBlock>
				{product.discountPercentage && <Sticker $danger>-{Math.round(product.discountPercentage)}%</Sticker>}
				<Flexbox>
					<Compare onActive={handleToggleCompare} active={isInCompare} />
					<Favorite onActive={handleToggleFavorite} active={isInFavorite} />
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
					{count && <LinkIcon icon="trash" initial title="Удалить все из корзины" onClick={handleRemove} />}
				</AnimatePresence>
			</Tools>
			<Button $primary icon={isInCart ? 'arrow-right-line' : 'cart'} onClick={handleAdd}>
				{isInCart ? 'Ещё +1' : 'Добавить'}
				<Count count={count || undefined} />
			</Button>
		</ProductWrapper>
	);
});

export default ProductCard;
