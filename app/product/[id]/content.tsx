'use client';

import { useParams, useRouter } from 'next/navigation';

import { Info, Wrapper } from '@/app/product/[id]/styled';
import { MobileWhiteBackground } from '@/components/Layout';
import { LinkIcon } from '@/components/ui';
import { useAppSelector } from '@/services';
import { useGetProductQuery } from '@/store/api';
import { productByIdMemoized } from '@/store/reducers/commonSelectors';
import { productsStore } from '@/store/types';
import { IProduct } from '@/types';

import { MainBlock } from './MainBlock';
import { Recommend } from './Recommend';
import { Reviews } from './Reviews';
import { SideBlockContent } from './SideBlock';

export interface ProductProps {
	product: IProduct;
}

export const ContentProduct = () => {
	const { id } = useParams<{ id: string }>();
	const { fetchedItems, error } = useAppSelector(productsStore);
	useGetProductQuery(id, { skip: fetchedItems.length > 1 });
	const product: IProduct = useAppSelector((state) => productByIdMemoized(productsStore(state), +id))!;

	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<MobileWhiteBackground>
			<Wrapper $pt $pb>
				{error || ''}
				{product && (
					<>
						<Info>
							<LinkIcon
								onClick={handleBack}
								icon="arrow-left"
								style={{ top: '10px', position: 'absolute' }}
							>
								Назад
							</LinkIcon>
							<MainBlock {...{ product }} />
							<Recommend {...{ product }} />
							<Reviews reviews={product.reviews} />
						</Info>
						<SideBlockContent {...{ product }} />
					</>
				)}
			</Wrapper>
		</MobileWhiteBackground>
	);
};

export default ContentProduct;
