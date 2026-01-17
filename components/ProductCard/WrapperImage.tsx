import Image from 'next/image';
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';

import { Icon, Loader } from '@/components/ui';
import { useAppSelector } from '@/services';
import { productsStore } from '@/store/types';
import { IProduct } from '@/types';

import { BlockImgItem, WrapperImagesStyled } from './styled';

type PropsType = {
	product: IProduct;
	size: number;
};

export const WrapperImages = ({ product, size }: PropsType) => {
	const [isLoad, setIsLoad] = useState(true);
	const [hasError, setHasError] = useState(false);
	const { fetching } = useAppSelector(productsStore);
	const { id, title, images } = product;

	// Таймер на 2 секунд для прерывания загрузки
	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoad) {
				setIsLoad(false);
				setHasError(true);
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [isLoad]);

	const handleOnLoad = (e: SyntheticEvent<HTMLImageElement>, idx: number) => {
		e.currentTarget.classList.add('fetched');

		if (idx === 0) {
			setIsLoad(false);
		}
	};

	const handleOnError = () => {
		setIsLoad(false);
		setHasError(true);
	};

	return (
		<WrapperImagesStyled id={`wrapper-${id}`} className={hasError ? 'has-error' : ''}>
			<Loader loading={isLoad && !hasError} />

			{hasError ? (
				<Icon icon="nophoto" />
			) : (
				!fetching &&
				images?.map((image, idx) => (
					<Fragment key={image}>
						<BlockImgItem />
						<Image
							src={image}
							alt={title}
							width={size}
							height={size}
							quality={60}
							priority
							onLoad={(e) => handleOnLoad(e, idx)}
							onError={handleOnError}
						/>
					</Fragment>
				))
			)}
		</WrapperImagesStyled>
	);
};

export default WrapperImages;
