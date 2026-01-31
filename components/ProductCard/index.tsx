import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo } from 'react';

import { RatingStars, Space } from '@/components/Layout';
import { Button, Favorite, Sticker } from '@/components/ui';
import { useAppDispatch, useCurrency } from '@/services';
import { moveToCart } from '@/store/reducers/combineActions';
import { toggleFavorite } from '@/store/reducers/products';
import { IProduct } from '@/types';

import { ProductImage } from './ProductImage';
import { Price, ProductWrapper, Title, Tools } from './styled';

interface ProductCardProps extends MotionProps {
	product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = memo(
	({ product, ...props }) => {
		const link = `/product/${product.id}`;
		const dispatch = useAppDispatch();
		const { formatPriceWithSymbol } = useCurrency();

		const handleChecked = () => {
			moveToCart(Number(product.id));
		};

		return (
			<ProductWrapper {...props}>
				{product.discountPercentage && <Sticker $danger>-{Math.round(product.discountPercentage)}%</Sticker>}
				<Favorite onActive={() => dispatch(toggleFavorite(Number(product.id)))} active={product.favorite} />
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
				<Button $primary icon="cart" onClick={handleChecked} disabled={product.checked}>
					{product.checked ? 'Добавлено' : 'В корзину'}
				</Button>
			</ProductWrapper>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.product === nextProps.product;
	},
);

export default ProductCard;
