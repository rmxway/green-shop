import Link from 'next/link';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import { Favorite, Icon, Loader } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector, useCurrency, useLoadTimeout, useNavigateWithScroll } from '@/services';
import { moveToCart } from '@/store/reducers/combineActions';
import { productByIdMemoized } from '@/store/reducers/commonSelectors';
import { removeFromCompare } from '@/store/reducers/compare';
import { toggleFavorite } from '@/store/reducers/products';
import { productsStore } from '@/store/types';
import { IProduct } from '@/types';

import {
	ActionsWrapper,
	IconButton,
	IconsWrapper,
	ImageWrapper,
	NoPhotoContainer,
	ProductHeaderWrapper,
	ProductPrice,
	ProductTitle,
} from './styled';

interface ProductHeaderProps {
	product: IProduct;
}

export const ProductHeader: FC<ProductHeaderProps> = memo(({ product }) => {
	const dispatch = useAppDispatch();
	const { formatPriceWithSymbol } = useCurrency();
	const [isLoad, setIsLoad] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Получаем актуальное состояние товара из store
	const actualProduct = productByIdMemoized(useAppSelector(productsStore), product.id) || product;
	const navigateTo = useNavigateWithScroll();

	const handleCartClick = () => {
		if (actualProduct.checked) {
			navigateTo('/cart');
		} else {
			moveToCart(product.id);
		}
	};

	const handleToggleFavorite = () => {
		dispatch(toggleFavorite(product.id));
	};

	const handleRemoveFromCompare = () => {
		dispatch(removeFromCompare(product.id));
	};

	const handleLoadTimeout = useCallback(() => {
		setIsLoad(false);
		setHasError(true);
	}, []);

	useLoadTimeout(isLoad, 10, handleLoadTimeout);

	// Сброс состояний при изменении продукта
	useEffect(() => {
		setIsLoad(true);
		setHasError(false);
	}, [product.id]);

	const handleImageLoad = () => {
		setIsLoad(false);
	};

	const handleImageError = () => {
		setIsLoad(false);
		setHasError(true);
	};

	return (
		<ProductHeaderWrapper>
			<IconsWrapper>
				<Favorite active={actualProduct.favorite} onActive={handleToggleFavorite} />
				<IconButton onClick={handleRemoveFromCompare}>
					<Icon icon="trash" size={20} />
				</IconButton>
			</IconsWrapper>

			<ImageWrapper>
				{!hasError ? (
					<>
						<img
							src={product.images[0] || product.thumbnail}
							alt={product.title}
							onLoad={handleImageLoad}
							onError={handleImageError}
						/>
						<Loader loading={isLoad} />
					</>
				) : (
					<NoPhotoContainer>
						<Icon icon="nophoto" size={38} />
					</NoPhotoContainer>
				)}
			</ImageWrapper>

			<Link href={`/product/${product.id}`}>
				<ProductTitle>{product.title}</ProductTitle>
			</Link>

			<ProductPrice>{formatPriceWithSymbol(product.price)}</ProductPrice>

			<ActionsWrapper>
				<Button
					$primary
					$dark={actualProduct.checked}
					icon={actualProduct.checked ? 'arrow-right-line' : 'cart'}
					onClick={handleCartClick}
				>
					{actualProduct.checked ? 'Корзина' : 'В корзину'}
				</Button>
			</ActionsWrapper>
		</ProductHeaderWrapper>
	);
});

ProductHeader.displayName = 'ProductHeader';

export default ProductHeader;
