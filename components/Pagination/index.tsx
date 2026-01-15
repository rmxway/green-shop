import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { MotionProps } from 'framer-motion';
import debounce from 'lodash.debounce';
import { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Flexbox, Space } from '@/components/Layout';
import { Icon } from '@/components/ui';
import { containerVars } from '@/modules/products/ProductsGrid/styled';
import { IProduct, useAppDispatch, useAppSelector } from '@/services';
import { productsStore } from '@/store/types';

import { RenderButtons } from './RenderButtons';
import { ArrowButton, Info, Wrapper } from './styled';

interface PaginationProps extends MotionProps {
	items: IProduct[];
	isLoading?: boolean;
	countPerPage: number;
	page: number;
	changePage: ActionCreatorWithPayload<number, string>;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
	({ items, isLoading, countPerPage, page, changePage, ...props }, ref) => {
		const { fetching } = useAppSelector(productsStore);
		const dispatch = useAppDispatch();
		const total = items.length;
		const countPages = Math.ceil(total / countPerPage);
		const maxButtonsCount = 4;
		const countButtons = countPages >= maxButtonsCount ? maxButtonsCount : countPages;

		const debounceChangePage = debounce((num: number) => {
			dispatch(changePage(num));
		}, 200);

		const viewedItems = (): number => {
			if (countPages !== page) {
				return page * countPerPage;
			}
			return total;
		};

		return (
			<Wrapper
				variants={containerVars}
				initial="hidden"
				animate="visible"
				exit="hidden"
				$isItems={!!items.length || isLoading === true}
				{...{ ref }}
				{...props}
			>
				{!isLoading && countPages > 1 && (
					<Info>
						{viewedItems()} / {total}
					</Info>
				)}
				{isLoading && <Skeleton inline height={30} width={300} />}
				<Space />
				{isLoading && <Skeleton inline height={40} width={300} />}
				{!isLoading && countPages > 1 && (
					<Flexbox $align="center">
						{page > 1 && (
							<ArrowButton
								$left
								onClick={() => debounceChangePage(1)}
								disabled={fetching || !items.length}
							>
								<Icon icon="arrow-down" /> В начало
							</ArrowButton>
						)}

						<RenderButtons {...{ countPages, countButtons, page, fetching, items, debounceChangePage }} />

						{page < countPages && page !== countPages && (
							<ArrowButton
								$right
								onClick={() => debounceChangePage(countPages)}
								disabled={fetching || !items.length}
							>
								В конец <Icon icon="arrow-down" />
							</ArrowButton>
						)}
					</Flexbox>
				)}
			</Wrapper>
		);
	},
);

export default Pagination;
