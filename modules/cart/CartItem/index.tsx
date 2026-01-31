import { MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';

import { Icon, Loader } from '@/components/ui';
import { useAppDispatch, useCurrency } from '@/services';
import { decreaseCount, increaseCount } from '@/store/reducers/cart';
import { removeFromCart } from '@/store/reducers/combineActions';
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

export const CartItem = forwardRef<HTMLDivElement, Props>(({ product, ...props }, ref) => {
	const dispatch = useAppDispatch();
	const { formatPrice, getCurrencySymbol } = useCurrency();
	const { id, price, title, description, thumbnail, count } = product;
	const [isLoad, setIsLoad] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Таймер на 10 секунд для прерывания загрузки изображения
	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoad) {
				setIsLoad(false);
				setHasError(true);
			}
		}, 10000);

		return () => clearTimeout(timer);
	}, [isLoad]);

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

	return (
		<Item {...props} {...{ ref }}>
			<Content layout variants={elementsVars}>
				<Link href={`/product/${id}`}>
					{thumbnail && !hasError ? (
						<div
							style={{ position: 'relative', width: '70px', height: '70px', margin: '10px 0 10px 10px' }}
						>
							<Image
								src={thumbnail}
								alt={title}
								width={70}
								height={70}
								quality={50}
								onLoad={handleImageLoad}
								onError={handleImageError}
								style={{
									borderRadius: 'var(--radius-borderRadius)',
									objectFit: 'cover',
									width: '100%',
									height: '100%',
								}}
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
							<div>{formatPrice(count * price)} {getCurrencySymbol()}</div>
							<div>
								{count && (
									<CountWrapper>
										<button
											type="button"
											disabled={count === 1}
											onClick={() => dispatch(decreaseCount(Number(id)))}
										>
											-
										</button>{' '}
										<Count>{count}</Count>
										<button type="button" onClick={() => dispatch(increaseCount(Number(id)))}>
											+
										</button>
									</CountWrapper>
								)}
							</div>
						</Price>
					)}
				</WrapperText>
				<Delete type="button" onClick={() => removeFromCart(Number(id))}>
					<Icon icon="times-small" />
				</Delete>
			</Content>
		</Item>
	);
});

export default CartItem;
