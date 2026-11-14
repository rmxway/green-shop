import { FC } from 'react';

import { LayerBlock, RatingStars } from '@/components/Layout';
import { IProduct } from '@/types';

import { ReviewItem, Title2 } from './styled';

export const Reviews: FC<Pick<IProduct, 'reviews'>> = ({ reviews }) => {
	const formattedDate = (date: string) =>
		new Date(date).toLocaleString('ru-RU', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	return (
		<LayerBlock>
			<Title2>Отзывы</Title2>

			{reviews?.map(({ reviewerName, comment, date, rating, reviewerEmail }) => (
				<ReviewItem key={reviewerEmail + comment}>
					<div>
						<RatingStars rating={Number(rating)} />
						<strong>{reviewerName}</strong>
						<div className="review-date">{formattedDate(date)}</div>
					</div>
					<div className="review-comment">{comment}</div>
				</ReviewItem>
			))}
		</LayerBlock>
	);
};
