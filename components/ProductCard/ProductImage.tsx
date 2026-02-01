import Image from 'next/image';
import { FC, useCallback, useState } from 'react';

import { Icon, Loader } from '@/components/ui';
import { useLoadTimeout } from '@/services';

import { ImageWrapper, NoPhotoWrapper, StyledImage } from './styled';

interface ProductImageProps {
	images: string[];
	alt: string;
}

export const ProductImage: FC<ProductImageProps> = ({ images, alt }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const imageSrc = images?.[0];

	const handleLoadTimeout = useCallback(() => {
		setIsLoading(false);
		setHasError(true);
	}, []);

	useLoadTimeout(isLoading, 10, handleLoadTimeout);

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
