'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Layout';
import logos from '@/public/assets/img/logos.jpg';

import { FeatureCardClean, FeatureIcon, FeatureItem, FeatureList, FeaturesGrid, FeatureTitle, FirstBlock, HeroSection, HeroSubtitle, HeroTitle, ImageLogos, NatureGallery, NatureImage, PrimaryButton, Section, SectionSubtitle, SectionTitle } from './styled';

export default function MainPage() {
	return (
		<main>
			{/* Hero Section */}
			<HeroSection>
				<HeroTitle>
					Природа в каждом продукте
				</HeroTitle>
				<HeroSubtitle>
					Современный интернет-магазин натуральной продукции с широким ассортиментом органических товаров для здорового образа жизни
				</HeroSubtitle>
				<Link href="/products">
					<PrimaryButton>
						Посмотреть товары
					</PrimaryButton>
				</Link>
			</HeroSection>

			{/* About Section */}
			<Section $background="#fff">
				<Container>
					<FirstBlock>
						<div>
							<h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1d1d1f' }}>
								Современная платформа
							</h3>
							<p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#86868b', marginBottom: '2rem' }}>
								Создано с использованием Next.js и современных технологий для обеспечения лучшего пользовательского опыта. Интеграция с dummyjson.com для демонстрации функциональности.
							</p>
							<p style={{ fontSize: '1rem', color: '#86868b', lineHeight: '1.5' }}>
								<code style={{ background: '#f5f5f7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9rem' }}>
									create-next-app
								</code>{' '}
								+{' '}
								<a
									href="https://dummyjson.com"
									target="_blank"
									rel="noreferrer"
									style={{ color: '#007aff', textDecoration: 'none' }}
								>
									dummyjson.com API
								</a>
							</p>
						</div>
						<ImageLogos>
							<Image
								src={logos.src}
								width={logos.width}
								height={logos.height}
								priority
								quality={80}
								alt="Технологии"
							/>
						</ImageLogos>
					</FirstBlock>
				</Container>
			</Section>

			{/* Nature Gallery */}
			<Section>
				<Container>
					<SectionTitle>Вдохновлено природой</SectionTitle>
					<SectionSubtitle>
						Мы тщательно отбираем натуральные продукты, которые помогают вам жить в гармонии с природой.
						Каждый товар создан с заботой об окружающей среде и вашем благополучии, предлагая только лучшее из природы для вашего здоровья и красоты.
					</SectionSubtitle>
					<NatureGallery>
						<NatureImage data-title="Лесная природа">
							<Image
								src="/assets/img/nature/forest.jpg"
								width={800}
								height={600}
								alt="Лесная природа"
							/>
						</NatureImage>
						<NatureImage data-title="Горные пейзажи">
							<Image
								src="/assets/img/nature/mountains.jpg"
								width={600}
								height={400}
								alt="Горные пейзажи"
							/>
						</NatureImage>
						<NatureImage data-title="Цветущий луг">
							<Image
								src="/assets/img/nature/meadow.jpg"
								width={600}
								height={400}
								alt="Цветущий луг"
							/>
						</NatureImage>
					</NatureGallery>
				</Container>
			</Section>

			{/* Features Section */}
			<Section $background='#fff'>
				<Container>
					<SectionTitle>Возможности платформы</SectionTitle>
					<FeaturesGrid>
						<FeatureCardClean>
							<h3>Поиск и фильтрация</h3>
							<p>Умный поиск по товарам с множеством фильтров и сортировкой по цене, популярности и категориям</p>
						</FeatureCardClean>
						<FeatureCardClean>
							<h3>Корзина и оформление</h3>
							<p>Удобная корзина покупок с формой заказа и поддержкой избранных товаров</p>
						</FeatureCardClean>
						<FeatureCardClean>
							<h3>Современные технологии</h3>
							<p>ESLint, Prettier, Framer Motion для обеспечения качества кода и плавных анимаций</p>
						</FeatureCardClean>
					</FeaturesGrid>

					<FeaturesGrid>
						<FeatureCardClean>
							<FeatureTitle>🌟 Основные функции:</FeatureTitle>
							<FeatureList>
								<FeatureItem>
									<FeatureIcon>🔍</FeatureIcon> Умный поиск товаров
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📊</FeatureIcon> Сортировка по цене и популярности
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>🏷️</FeatureIcon> Фильтрация по категориям
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>🛒</FeatureIcon> Корзина покупок
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>❤️</FeatureIcon> Система избранных товаров
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📄</FeatureIcon> Пагинация для удобной навигации
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📝</FeatureIcon> Форма оформления заказа
								</FeatureItem>
							</FeatureList>
						</FeatureCardClean>
						<FeatureCardClean>
							<FeatureTitle>🛠️ Технический стек:</FeatureTitle>
							<FeatureList>
								<FeatureItem>
									<FeatureIcon>⚛️</FeatureIcon> Next.js 14 с App Router
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📏</FeatureIcon> ESLint для качества кода
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>✨</FeatureIcon> Prettier для форматирования
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>🎭</FeatureIcon> Framer Motion для анимаций
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>🔗</FeatureIcon> Интеграция с dummyjson.com API
								</FeatureItem>
							</FeatureList>
						</FeatureCardClean>
					</FeaturesGrid>
				</Container>
			</Section>
		</main>
	);
}
