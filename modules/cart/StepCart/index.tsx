'use client';

import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { FC, memo, useMemo } from 'react';

import { DialogModal, Pagination } from '@/components';
import { LayerBlock } from '@/components/Layout';
import { fadeVariant, precomputedFadeVariants } from '@/lib/pageAnimations';
import { CartItem } from '@/modules/cart/CartItem';
import { useAppDispatch, useAppSelector } from '@/services';
import { changePage } from '@/store/reducers/cart';
import { removeAllProducts } from '@/store/reducers/combineActions';
import { currentItemsMemoized } from '@/store/reducers/commonSelectors';
import { cartStore } from '@/store/types';

import { CartSidebar } from './CartSidebar';
import { Cart, contentVariant, Wrapper } from './styled';

export const StepCart: FC = memo(() => {
	const { countPerPage, page, items } = useAppSelector(cartStore);
	const dispatch = useAppDispatch();

	const isItems = !!items.length;

	const currentItems = currentItemsMemoized(useAppSelector(cartStore), items);

	const handleTrashAllProducts = () => {
		removeAllProducts();
	};

	const fnChangePage = (p: number) => {
		dispatch(changePage(p));
	};

	const exitAnimation = useMemo(() => ({ opacity: 0, scale: isItems ? 0.9 : 1 }), [isItems]);

	return (
		<>
			<div>
				{isItems && (
					<DialogModal
						title="Удалить все"
						text="Вы уверены, что хотите удалить все товары из корзины?"
						handleFn={handleTrashAllProducts}
					/>
				)}
			</div>
			<Cart>
				<LayoutGroup>
					<Wrapper layoutRoot variants={contentVariant} initial="hidden" animate="visible" key="wrapper">
						<AnimatePresence mode="popLayout" presenceAffectsLayout>
							{currentItems?.length !== 0 &&
								currentItems?.map((item, i) => (
									<CartItem
										layout
										key={item.id}
										product={item}
										variants={precomputedFadeVariants[i] || fadeVariant(i)}
										initial="hidden"
										animate="visible"
										exit={exitAnimation}
									/>
								))}
						</AnimatePresence>

						{!isItems && (
							<LayerBlock
								$fixedPadding
								layout
								variants={fadeVariant()}
								initial="hidden"
								animate="visible"
								exit="hidden"
							>
								Нет товаров, перейдите на&nbsp;<Link href="/products">страницу товаров</Link>
								<br />
							</LayerBlock>
						)}
						<Pagination layout {...{ changePage, items, countPerPage, page, fnChangePage }} />
					</Wrapper>

					<CartSidebar />
				</LayoutGroup>
			</Cart>
		</>
	);
});
