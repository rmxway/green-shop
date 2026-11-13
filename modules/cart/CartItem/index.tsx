import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Icon, Loader } from '@/components/ui';
import { useAppDispatch, useCurrency, useLoadTimeout } from '@/services';
import { decreaseCount, increaseCount, removeFromCart } from '@/store/reducers/cart';
import { IProduct } from '@/types';

import {
	Content,
	Count,
	CountWrapper,
	Delete,
	elementsVars,
	Item,
	Price,
	ThumbnailContainer,
	Title,
	WrapperText,
} from './styled';

interface Props extends MotionProps {
	product: IProduct;
}

export const CartItem: FC<Props> = memo(
	({ product, ...props }) => {
		const dispatch = useAppDispatch();
		const { formatPrice, getCurrencySymbol } = useCurrency();
		const { id, price, title, description, thumbnail, count } = product;
		const [isLoad, setIsLoad] = useState(true);
		const [hasError, setHasError] = useState(false);

		// Мемоизируем форматированную цену и символ валюты
		const formattedPrice = useMemo(() => {
			if (!count || !price) return '';
			return formatPrice(count * price);
		}, [count, price, formatPrice]);

		const formattedOnePiecePrice = formatPrice(price);

		const currencySymbol = useMemo(() => getCurrencySymbol(), [getCurrencySymbol]);

		const handleLoadTimeout = useCallback(() => {
			setIsLoad(false);
			setHasError(true);
		}, []);

		useLoadTimeout(isLoad, 0, handleLoadTimeout);

		// Сброс состояний при изменении продукта
		useEffect(() => {
			setIsLoad(true);
			setHasError(false);
		}, [thumbnail]);

		const handleImageLoad = () => {
			setIsLoad(false);
		};

		const handleImageError = () => {
			setIsLoad(false);
			setHasError(true);
		};

		const handleDecrease = () => {
			dispatch(decreaseCount(id));
		};

		const handleIncrease = () => {
			dispatch(increaseCount(id));
		};

		const handleRemove = () => {
			dispatch(removeFromCart(id));
		};

		return (
			<Item {...props}>
				<Content layout variants={elementsVars}>
					<Link href={`/product/${id}`}>
						{thumbnail && !hasError ? (
							<div className="preload">
								<img
									src={thumbnail}
									alt={title}
									width={70}
									height={70}
									onLoad={handleImageLoad}
									onError={handleImageError}
								/>
								<Loader className="loader" loading={isLoad} />
							</div>
						) : (
							<ThumbnailContainer
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.2, ease: 'easeInOut' }}
							>
								<Icon icon="nophoto" />
							</ThumbnailContainer>
						)}
					</Link>
					<WrapperText>
						<Title href={`/product/${id}`}>
							<strong>{title}</strong>
							<span>{description}</span>
						</Title>
						{count && price && (
							<Price>
								<div>
									{formattedPrice} {currencySymbol}
								</div>
								<div className="small">
									{formattedOnePiecePrice} {currencySymbol}
								</div>
								<div>
									{count && (
										<CountWrapper>
											<button type="button" disabled={count === 1} onClick={handleDecrease}>
												-
											</button>{' '}
											<Count>{count}</Count>
											<button type="button" onClick={handleIncrease}>
												+
											</button>
										</CountWrapper>
									)}
								</div>
							</Price>
						)}
					</WrapperText>
					<Delete type="button" onClick={handleRemove}>
						<Icon icon="trash" />
					</Delete>
				</Content>
			</Item>
		);
	},
	(prev, next) => prev.product.count == next.product.count,
);

CartItem.displayName = 'CartItem';
