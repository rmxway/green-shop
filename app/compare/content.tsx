'use client';

import Link from 'next/link';

import { DialogModal } from '@/components';
import { Container, LayerBlock } from '@/components/Layout';
import { CompareTable } from '@/modules/compare';
import { useAppDispatch, useAppSelector } from '@/services';
import { clearCompare } from '@/store/reducers/compare';

export const ContentCompare = () => {
	const items = useAppSelector((state) => state.compare.items);
	const dispatch = useAppDispatch();

	const handleClearCompare = () => {
		dispatch(clearCompare());
	};

	const isItems = items.length > 0;

	return (
		<Container $pt>
			{isItems && (
				<DialogModal
					title="Удалить сравнение"
					text="Вы уверены, что хотите удалить все товары из сравнения?"
					handleFn={handleClearCompare}
				/>
			)}

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
