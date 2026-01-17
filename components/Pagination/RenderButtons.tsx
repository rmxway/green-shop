import { memo, useCallback } from 'react';

import { IProduct } from '@/types';

import { ButtonPagination } from './styled';

interface RenderButtonsProps {
	countPages: number;
	countButtons: number;
	fetching: boolean;
	items: IProduct[];
	page: number;
	debounceChangePage: (num: number) => void;
}

export const RenderButtons = memo<RenderButtonsProps>((props) => {
	const { countButtons, countPages, fetching, items, page, debounceChangePage } = props;

	const AllButtons = useCallback(() => {
		const arrButtons: React.ReactNode[] = Array.from({ length: countPages });

		for (let i = 0; i < countPages; i++) {
			const currentPage = i + 1;
			arrButtons[i] = (
				<ButtonPagination
					key={i}
					$dark={page === currentPage}
					$inactive={fetching}
					onClick={() => debounceChangePage(currentPage)}
					disabled={!items.length}
				>
					{currentPage}
				</ButtonPagination>
			);
		}

		return arrButtons;
	}, [countPages, page, fetching, items.length, debounceChangePage]);

	const start: number = page - 3 < 0 ? 0 : page - 3;
	const end: number = page <= 2 ? countButtons : page + 1;

	return AllButtons().slice(start, end);
});
export default RenderButtons;
