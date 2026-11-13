'use client';

import 'swiper';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Info, NoPhotoContainer, Title, Title2, Wrapper } from '@/app/product/[id]/styled';
import { ProductCard, TextToggle } from '@/components';
import { Grid, LayerBlock, MobileWhiteBackground, RatingStars } from '@/components/Layout';
import { Icon, LinkIcon, Loader, Sticker } from '@/components/ui';
import { useAppSelector, useLoadTimeout } from '@/services';
import { useGetProductQuery } from '@/store/api';
import { productByIdMemoized, threeProductsByCategoryMemoized } from '@/store/reducers/commonSelectors';
import { productsStore } from '@/store/types';
import { IProduct } from '@/types';

import { SideBlockContent } from './SideBlock';

export const ContentProduct = () => {
	const { id } = useParams<{ id: string }>();
	const { fetchedItems, error } = useAppSelector(productsStore);
	useGetProductQuery(id, { skip: fetchedItems.length > 1 });
	const product: IProduct = useAppSelector((state) => productByIdMemoized(productsStore(state), +id))!;

	const categoryItems = useAppSelector((state) =>
		threeProductsByCategoryMemoized(productsStore(state), product.category!, product.id),
	);

	const [isLoad, setIsLoad] = useState(true);
	const [hasError, setHasError] = useState(false);

	const router = useRouter();

	// Таймер на 5 секунд для прерывания загрузки изображений
	const handleLoadTimeout = useCallback(() => {
		setIsLoad(false);
		setHasError(true);
	}, []);

	useLoadTimeout(isLoad, 0, handleLoadTimeout);

	// Сброс состояний при изменении продукта
	useEffect(() => {
		setIsLoad(true);
		setHasError(false);
	}, [product?.id]);

	const handleImageLoad = () => {
		setIsLoad(false);
	};

	const handleImageError = () => {
		setIsLoad(false);
		setHasError(true);
	};

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
							<LayerBlock>
								<Title>{product.title}</Title>
								<Grid className="side-tags" $direction="column" $gap={6}>
									{product.tags && product.tags.map((tag) => <Sticker key={tag}>{tag}</Sticker>)}
								</Grid>
								{product.images && product.images.length > 0 && !hasError ? (
									<div style={{ position: 'relative', height: '300px' }}>
										{!isLoad && (
											<Swiper
												pagination={{
													dynamicBullets: true,
													clickable: true,
												}}
												modules={[Pagination]}
												slidesPerView={1}
												spaceBetween={50}
												style={{ height: '300px' }}
											>
												{product.images.map((image) => (
													<SwiperSlide key={image} style={{ height: '300px' }}>
														<Image
															src={image}
															width={500}
															height={500}
															alt={image}
															priority
															onLoad={handleImageLoad}
															onError={handleImageError}
															style={{
																objectFit: 'cover',
																width: '100%',
																height: '100%',
															}}
														/>
													</SwiperSlide>
												))}
											</Swiper>
										)}
										<Loader loading={isLoad} />
									</div>
								) : (
									<NoPhotoContainer>
										<Icon icon="nophoto" size={38} />
									</NoPhotoContainer>
								)}
								<RatingStars rating={Number(product.rating)} />
								<br />
								<span>
									{product.brand && (
										<Grid $gap={10} $direction="column" $align="center">
											<h5>Company:</h5>
											<p>{product.brand}</p>
										</Grid>
									)}
									{product.returnPolicy && (
										<Grid $gap={10} $direction="column" $align="center">
											<h5>Return policy:</h5>
											<p>{product.returnPolicy}</p>
										</Grid>
									)}
									<h5>Description:</h5>
									<TextToggle length={3}>
										<p>{product.description}</p>
										<p>
											Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
											consequuntur dolorem odio at sunt asperiores harum ducimus consequatur
											placeat, quidem illo facilis eveniet esse vel, totam mollitia ab accusantium
											culpa voluptatem, aperiam ipsa quibusdam! Accusamus dolorem vero aspernatur
											explicabo! Itaque quasi tempora aspernatur laborum pariatur. Quos,
											necessitatibus id! Atque aliquid eius dolores facere autem rem illum libero?
											Quasi, est, beatae quisquam deserunt molestias nam sequi modi sapiente quas
											officia aperiam numquam aut vero quia nisi rem, necessitatibus fugiat. Iure
											molestias perferendis ad, obcaecati veniam fuga molestiae? Rem amet ea
											asperiores eaque odio, quaerat architecto vero sint voluptatibus itaque
											voluptatum ab.
										</p>
									</TextToggle>
								</span>
							</LayerBlock>
							{categoryItems?.length && (
								<LayerBlock>
									<Title2>Рекомендуем</Title2>
									<p>Подобрали для вас несколько подходящих товаров</p>
									<div className="category-items">
										<Grid>
											{categoryItems?.map((item) => (
												<ProductCard product={item} key={item.id} />
											))}
										</Grid>
									</div>
								</LayerBlock>
							)}
							{/* <LayerBlock>
								<Title2>Отзывы</Title2>
							</LayerBlock> */}
						</Info>
						<SideBlockContent product={product} />
					</>
				)}
			</Wrapper>
		</MobileWhiteBackground>
	);
};

export default ContentProduct;
