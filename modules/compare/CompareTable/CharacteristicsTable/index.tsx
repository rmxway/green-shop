import { FC, memo, useMemo } from 'react';

import { IProduct } from '@/types';

import { characteristics, formatValue, highlightDifferences } from '../helpers';
import { CharacteristicCell, CharacteristicLabel, CharacteristicRow } from '../styled';
import { TableBody } from './styled';

interface CharacteristicsTableProps {
	products: IProduct[];
}

export const CharacteristicsTable: FC<CharacteristicsTableProps> = memo(
	({ products }) => {
		const highlightedCharacteristics = useMemo(() => {
			// Если товар один, не подсвечиваем различия
			const shouldHighlight = products.length > 1;

			return characteristics.map((char) => ({
				...char,
				hasDifferences: shouldHighlight ? highlightDifferences(products, char.key) : false,
			}));
		}, [products]);

		return (
			<TableBody>
				{highlightedCharacteristics.map((char, index) => (
					<CharacteristicRow key={char.key} $index={index}>
						<CharacteristicLabel $index={index}>{char.label}</CharacteristicLabel>
						{products.map((product) => (
							<CharacteristicCell
								key={`${product.id}-${char.key}`}
								$highlight={char.hasDifferences}
								$index={index}
							>
								{formatValue(char.getValue(product))}
							</CharacteristicCell>
						))}
					</CharacteristicRow>
				))}
			</TableBody>
		);
	},
	(prevProps, nextProps) => {
		// Перерендериваем если изменилось количество товаров или их ID
		if (prevProps.products.length !== nextProps.products.length) {
			return false;
		}

		// Проверяем, изменились ли ID товаров
		const prevIds = prevProps.products
			.map((p) => p.id)
			.sort()
			.join(',');
		const nextIds = nextProps.products
			.map((p) => p.id)
			.sort()
			.join(',');

		return prevIds === nextIds;
	},
);

CharacteristicsTable.displayName = 'CharacteristicsTable';

export default CharacteristicsTable;
