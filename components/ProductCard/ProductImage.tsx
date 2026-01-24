import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { Icon, Loader } from '@/components/ui';

import { ImageWrapper, NoPhotoWrapper, StyledImage } from './styled';

interface ProductImageProps {
	images: string[];
	alt: string;
}

export const ProductImage: FC<ProductImageProps> = ({ images, alt }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const imageSrc = images?.[0];

	// Таймер на 10 секунд для прерывания загрузки изображения
	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoading) {
				setIsLoading(false);
				setHasError(true);
			}
		}, 10000);

		return () => clearTimeout(timer);
	}, [isLoading]);

	if (!imageSrc || hasError) {
		return (
			<ImageWrapper>
				<NoPhotoWrapper $isLoading={isLoading}>
					<Icon icon="nophoto" size={32} />
				</NoPhotoWrapper>
			</ImageWrapper>
		);
	}

	return (
		<ImageWrapper>
			<StyledImage $isLoading={isLoading} $hasError={hasError}>
				<Image
					src={imageSrc}
					alt={alt}
					fill
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setHasError(true);
						setIsLoading(false);
					}}
				/>
			</StyledImage>
			<Loader loading={isLoading} />
		</ImageWrapper>
	);
};

export default ProductImage;
