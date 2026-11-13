import { FC } from 'react';

import { PriceBlock, SideBlock } from '@/app/product/[id]/styled';
import { Grid, LayerBlock } from '@/components/Layout';
import { Button, Compare, Favorite, Sticker } from '@/components/ui';
import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { addToCart } from '@/store/reducers/cart';
import { isItemMemoized } from '@/store/reducers/commonSelectors';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleToFavorite } from '@/store/reducers/favorite';
import { cartStore, compareStore, favoriteStore } from '@/store/types';
import { IProduct } from '@/types';

interface SideBlockProps {
	product: IProduct;
}

export const SideBlockContent: FC<SideBlockProps> = ({ product }) => {
	const isInCompare = useAppSelector((state) => isItemMemoized(compareStore(state), product.id));
	const isInFavorite = useAppSelector((state) => isItemMemoized(favoriteStore(state), product.id));
	const isInCart = useAppSelector((state) => isItemMemoized(cartStore(state), product.id));
	const dispatch = useAppDispatch();
	const { formatPriceWithSymbol } = useCurrency();

	return (
		<SideBlock>
			<LayerBlock $fixedPadding>
				<PriceBlock>
					<Grid className="side-price" $direction="column" $align="flex-start" $gap={10}>
						<span>
							{formatPriceWithSymbol(product.price)}{' '}
							<Sticker $danger>-{Math.round(Number(product.discountPercentage))} %</Sticker>
						</span>
					</Grid>

					<div className="side-info">
						{product.stock && <Sticker $success>In Stock: {product.stock}</Sticker>}
					</div>
				</PriceBlock>
				<Grid $direction="column" $templateColumns="1fr 30px 30px" $gap={5} $align="center">
					<Button $primary onClick={() => dispatch(addToCart(product))} disabled={isInCart} icon="cart">
						{isInCart ? 'Добавлено' : 'В корзину'}
					</Button>
					<Compare active={isInCompare} onActive={() => dispatch(toggleCompare(product))} />
					<Favorite active={isInFavorite} onActive={() => dispatch(toggleToFavorite(product))} />
				</Grid>
			</LayerBlock>
		</SideBlock>
	);
};
