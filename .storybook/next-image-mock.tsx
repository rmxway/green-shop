import React, { ImgHTMLAttributes } from 'react';

interface MockImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	[key: string]: unknown;
}

export default function MockImage({ src, alt, width, height, ...props }: MockImageProps) {
	return <img src={src} alt={alt} width={width} height={height} {...props} />;
}
