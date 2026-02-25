import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo } from 'react';

import { Flexbox, RatingStars, Space } from '@/components/Layout';
import { Button, Compare, Favorite, Sticker } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency, useNavigateWithScroll } from '@/services';
import { moveToCart } from '@/store/reducers/combineActions';
import { isInCompareMemoized } from '@/store/reducers/commonSelectors';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleFavorite } from '@/store/reducers/products';
import { compareStore } from '@/store/types';
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

		const handleCartClick = () => {
			if (product.checked) {
				navigateTo('/cart');
			} else {
				moveToCart(Number(product.id));
			}
		};

		const handleToggleCompare = () => {
			dispatch(toggleCompare(product));
		};

		return (
			<ProductWrapper {...props}>
				<TopBlock>
					{product.discountPercentage && (
						<Sticker $danger>-{Math.round(product.discountPercentage)}%</Sticker>
					)}
					<Flexbox>
						<Compare onActive={handleToggleCompare} active={isInCompare} />
						<Favorite
							onActive={() => dispatch(toggleFavorite(Number(product.id)))}
							active={product.favorite}
						/>
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
					$primary={!product.checked}
					$dark={product.checked}
					animate={product.checked}
					icon={product.checked ? 'arrow-right-line' : 'cart'}
					onClick={handleCartClick}
				>
					{product.checked ? 'Корзина' : 'Добавить'}
				</Button>
			</ProductWrapper>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.product === nextProps.product;
	},
);

export default ProductCard;
