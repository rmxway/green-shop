'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Container, LayerBlock } from '@/components/Layout';
import { Button, LinkIcon, Modal } from '@/components/ui';
import { CompareTable } from '@/modules/compare';
import { useAppDispatch, useAppSelector } from '@/services';
import { compareItemsMemoized } from '@/store/reducers/commonSelectors';
import { clearCompare } from '@/store/reducers/compare';
import { compareStore } from '@/store/types';

export const ContentCompare = () => {
	const [modalShow, setModalShow] = useState(false);
	const items = useAppSelector((state) => compareItemsMemoized(compareStore(state)));
	const dispatch = useAppDispatch();

	const handleClearCompare = () => {
		dispatch(clearCompare());
		setModalShow(false);
	};

	const isItems = items.length > 0;

	return (
		<Container $pt>
			{isItems && (
				<LinkIcon icon="trash" onClick={() => setModalShow(true)} style={{ top: '10px', position: 'absolute' }}>
					Очистить сравнение
				</LinkIcon>
			)}
			<Modal open={modalShow} onClose={() => setModalShow(false)} title="Очистить сравнение">
				<div>Вы уверены, что хотите удалить все товары из сравнения?</div>
				<br />
				<Button $danger onClick={handleClearCompare}>
					Очистить
				</Button>
			</Modal>

			{!isItems ? (
				<LayerBlock $fixedPadding>
					Нет товаров для сравнения, перейдите на <Link href="/products">страницу товаров</Link>
				</LayerBlock>
			) : (
				<CompareTable items={items} />
			)}
		</Container>
	);
};

export default ContentCompare;
