'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Layout';
import logos from '@/public/assets/img/logos.jpg';

import { AboutTechText, AboutText, AboutTitle, CodeSnippet, FeatureCardClean, FeatureIcon, FeatureItem, FeatureList, FeaturesGrid, FeatureTitle, FirstBlock, HeroSection, HeroSubtitle, HeroTitle, ImageLogos, NatureBlock, NatureBlockContent, NatureBlockImage, NatureBlockText, NatureBlockTitle, NatureGallery, PrimaryButton, Section, SectionSubtitle, SectionTitle } from './styled';

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
							<AboutTitle>
								Современная платформа
							</AboutTitle>
							<AboutText>
								Создано с использованием Next.js и современных технологий для обеспечения лучшего пользовательского опыта. Интеграция с dummyjson.com для демонстрации функциональности.
							</AboutText>
							<AboutTechText>
								<CodeSnippet>
									create-next-app
								</CodeSnippet>{' '}
								+{' '}
								<a
									href="https://dummyjson.com"
									target="_blank"
									rel="noreferrer"
								>
									dummyjson.com API
								</a>
							</AboutTechText>
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
			<Section>
				<Container>
					<SectionTitle>Вдохновлено природой</SectionTitle>
					<SectionSubtitle>
						Мы тщательно отбираем натуральные продукты, которые помогают вам жить в гармонии с природой.
						Каждый товар создан с заботой об окружающей среде и вашем благополучии, предлагая только лучшее из природы для вашего здоровья и красоты.
					</SectionSubtitle>
				</Container>
			</Section>

			{/* Nature Gallery */}
			<Section $background='#fff'>
				<Container>
					<NatureGallery>
						<NatureBlock $reverse>
							<NatureBlockContent>
								<NatureBlockTitle>Лесная гармония</NatureBlockTitle>
								<NatureBlockText>
									Вдохновляясь величественными лесами, мы создаем продукты, которые несут в себе силу и спокойствие природы.
									Наши натуральные ингредиенты собираются бережно, сохраняя баланс экосистемы и предлагая вам чистоту первозданной природы.
								</NatureBlockText>
							</NatureBlockContent>
							<NatureBlockImage>
								<Image
									src="/assets/img/nature/forest.jpg"
									width={800}
									height={600}
									alt="Лесная природа"
								/>
							</NatureBlockImage>
						</NatureBlock>

						<NatureBlock>
							<NatureBlockContent>
								<NatureBlockTitle>Горная чистота</NatureBlockTitle>
								<NatureBlockText>
									Высокогорные растения, растущие в чистейшем воздухе, становятся основой наших премиальных продуктов.
									Мы заботимся о сохранении горных экосистем, выбирая только те ингредиенты, которые не нарушают природный баланс.
								</NatureBlockText>
							</NatureBlockContent>
							<NatureBlockImage>
								<Image
									src="/assets/img/nature/mountains.jpg"
									width={600}
									height={400}
									alt="Горные пейзажи"
								/>
							</NatureBlockImage>
						</NatureBlock>

						<NatureBlock $reverse>
							<NatureBlockContent>
								<NatureBlockTitle>Цветущие луга</NatureBlockTitle>
								<NatureBlockText>
									Богатство цветущих лугов отражается в наших продуктах. Мы поддерживаем местных производителей,
									которые выращивают растения традиционными методами, сохраняя биоразнообразие и природную красоту наших полей.
								</NatureBlockText>
							</NatureBlockContent>
							<NatureBlockImage>
								<Image
									src="/assets/img/nature/meadow.jpg"
									width={600}
									height={400}
									alt="Цветущий луг"
								/>
							</NatureBlockImage>
						</NatureBlock>
					</NatureGallery>
				</Container>
			</Section>

			{/* Features Section */}
			<Section>
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
