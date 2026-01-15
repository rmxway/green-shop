'use client';

import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { FC, useState } from 'react';
import CountUp from 'react-countup';

import { Pagination } from '@/components';
import { LayerBlock } from '@/components/Layout';
import { Button, LinkIcon, Modal } from '@/components/ui';
import { CartItem } from '@/modules/cart/CartItem';
import { fadeVariant } from '@/modules/cart/CartItem/styled';
import { currency, useAppDispatch, useAppSelector } from '@/services';
import { changePage, changeStep } from '@/store/reducers/cart';
import { removeAllProducts } from '@/store/reducers/combineActions';
import { currentItemsMemoized } from '@/store/reducers/commonSelectors';
import { cartStore } from '@/store/types';

import { Cart, contentVariant, Sidebar, Title, Total, Wrapper } from './styled';

export const StepCart: FC = () => {
	const [modalShow, setModalShow] = useState(false);
	const { items, totalPrice, page, countPerPage } = useAppSelector(cartStore);
	const isItems = !!items.length;

	const dispatch = useAppDispatch();

	const currentItems = currentItemsMemoized(useAppSelector(cartStore), items);

	const handleTrashAllProducts = () => {
		setModalShow(false);
		removeAllProducts();
	};

	const nextStep = () => {
		dispatch(changeStep(2));
	};

	return (
		<>
			<Modal open={modalShow} onClose={() => setModalShow(false)} title="Удалить все">
				<div>Вы уверены, что хотите удалить все товары из корзины?</div>
				<br />
				<Button $danger onClick={handleTrashAllProducts}>
					Удалить
				</Button>
			</Modal>
			<Cart>
				<LayoutGroup>
					<Wrapper layoutRoot variants={contentVariant} initial="hidden" animate="visible" key="wrapper">
						{isItems && (
							<LinkIcon icon="trash" onClick={() => setModalShow(true)}>
								Удалить все
							</LinkIcon>
						)}

						<AnimatePresence mode="popLayout" presenceAffectsLayout>
							{currentItems?.length !== 0 &&
								currentItems?.map((item, i) => (
									<CartItem
										layout
										key={item.id}
										product={item}
										variants={fadeVariant(i)}
										initial="hidden"
										animate="visible"
										exit={{ opacity: 0, scale: isItems ? 0.9 : 1 }}
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
						<Pagination layout {...{ changePage, items, countPerPage, page }} />
					</Wrapper>

					<Sidebar layoutId="sidebar">
						<Title>Ваш заказ</Title>
						<Total>
							Всего:
							<span>
								<CountUp startVal={0} end={totalPrice} duration={0.5} decimals={2} preserveValue />{' '}
								{currency}
							</span>
						</Total>
						<Button $success disabled={totalPrice === 0} onClick={nextStep}>
							Оформить заказ
						</Button>
					</Sidebar>
				</LayoutGroup>
			</Cart>
		</>
	);
};
