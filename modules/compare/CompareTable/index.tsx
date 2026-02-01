import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { FC, memo } from 'react';

import { IProduct } from '@/types';

import { CharacteristicsTable } from './CharacteristicsTable';
import { ProductHeader } from './ProductHeader';
import { HeaderCell, HeaderRow, Table, TableWrapper } from './styled';

interface CompareTableProps {
	items: IProduct[];
}

export const CompareTable: FC<CompareTableProps> = memo(({ items }) => {
	return (
		<LayoutGroup>
			<AnimatePresence mode="popLayout">
				<TableWrapper>
					<Table>
						<thead>
							<HeaderRow>
								<HeaderCell>Характеристики</HeaderCell>
								{items.map((product) => (
									<HeaderCell key={product.id}>
										<ProductHeader product={product} />
									</HeaderCell>
								))}
							</HeaderRow>
						</thead>
						<CharacteristicsTable products={items} />
					</Table>
				</TableWrapper>
			</AnimatePresence>
		</LayoutGroup>
	);
});

CompareTable.displayName = 'CompareTable';

export default CompareTable;
