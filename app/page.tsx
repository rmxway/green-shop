'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Layout';
import { Button } from '@/components/ui';
import { fadeInUpTransition, fadeInUpVariants, fadeInUpViewProps } from '@/lib/pageAnimations';
import logos from '@/public/assets/img/logos.jpg';

import {
	AboutTechText,
	AboutText,
	AboutTitle,
	CodeSnippet,
	FeatureCardClean,
	FeatureIcon,
	FeatureItem,
	FeatureList,
	FeaturesGrid,
	FeatureTitle,
	FirstBlock,
	HeroSection,
	HeroSubtitle,
	HeroTitle,
	ImageLogos,
	MotionInView,
	NatureBlock,
	NatureBlockContent,
	NatureBlockImage,
	NatureBlockText,
	NatureBlockTitle,
	NatureGallery,
	Section,
	SectionSubtitle,
	SectionTitle,
} from './styled';

const staggerDelay = 0.1;

export default function MainPage() {
	return (
		<main>
			{/* Hero Section */}
			<HeroSection>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						visible: {
							transition: {
								staggerChildren: staggerDelay,
								delayChildren: 0.1,
							},
						},
					}}
				>
					<motion.div variants={fadeInUpVariants} transition={fadeInUpTransition}>
						<HeroTitle>Природа в каждом продукте</HeroTitle>
					</motion.div>
					<motion.div variants={fadeInUpVariants} transition={fadeInUpTransition}>
						<HeroSubtitle>
							Современный интернет-магазин натуральной продукции с широким ассортиментом органических
							товаров для здорового образа жизни
						</HeroSubtitle>
					</motion.div>
					<br />
					<motion.div variants={fadeInUpVariants} transition={fadeInUpTransition}>
						<Link href="/products">
							<Button $white>Посмотреть товары</Button>
						</Link>
					</motion.div>
				</motion.div>
			</HeroSection>

			{/* About Section */}
			<Section $background>
				<Container>
					<FirstBlock>
						<MotionInView {...fadeInUpViewProps}>
							<AboutTitle>Современная платформа</AboutTitle>
							<AboutText>
								Создано на Next.js 16, React 19 и современном стеке: авторизация (NextAuth), состояние
								(Redux Toolkit), формы (react-hook-form + Yup), стили (styled-components), анимации
								(Framer Motion). Данные товаров — dummyjson.com API.
							</AboutText>
							<AboutTechText>
								<CodeSnippet>create-next-app</CodeSnippet> · NextAuth · Redux ·{' '}
								<a href="https://dummyjson.com" target="_blank" rel="noreferrer">
									dummyjson.com API
								</a>
							</AboutTechText>
						</MotionInView>
						<ImageLogos>
							<Image
								src={logos.src}
								width={logos.width}
								height={logos.height}
								quality={75}
								alt="Технологии"
							/>
						</ImageLogos>
					</FirstBlock>
				</Container>
			</Section>
			<Section>
				<Container>
					<MotionInView {...fadeInUpViewProps}>
						<SectionTitle>Вдохновлено природой</SectionTitle>
						<SectionSubtitle>
							Мы тщательно отбираем натуральные продукты, которые помогают вам жить в гармонии с природой.
							Каждый товар создан с заботой об окружающей среде и вашем благополучии, предлагая только
							лучшее из природы для вашего здоровья и красоты.
						</SectionSubtitle>
					</MotionInView>
				</Container>
			</Section>

			{/* Nature Gallery */}
			<Section $background>
				<Container>
					<NatureGallery>
						<MotionInView {...fadeInUpViewProps}>
							<NatureBlock $reverse>
								<NatureBlockContent>
									<NatureBlockTitle>Лесная гармония</NatureBlockTitle>
									<NatureBlockText>
										Вдохновляясь величественными лесами, мы создаем продукты, которые несут в себе
										силу и спокойствие природы. Наши натуральные ингредиенты собираются бережно,
										сохраняя баланс экосистемы и предлагая вам чистоту первозданной природы.
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
						</MotionInView>

						<MotionInView {...fadeInUpViewProps}>
							<NatureBlock>
								<NatureBlockContent>
									<NatureBlockTitle>Горная чистота</NatureBlockTitle>
									<NatureBlockText>
										Высокогорные растения, растущие в чистейшем воздухе, становятся основой наших
										премиальных продуктов. Мы заботимся о сохранении горных экосистем, выбирая
										только те ингредиенты, которые не нарушают природный баланс.
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
						</MotionInView>

						<MotionInView {...fadeInUpViewProps}>
							<NatureBlock $reverse>
								<NatureBlockContent>
									<NatureBlockTitle>Цветущие луга</NatureBlockTitle>
									<NatureBlockText>
										Богатство цветущих лугов отражается в наших продуктах. Мы поддерживаем местных
										производителей, которые выращивают растения традиционными методами, сохраняя
										биоразнообразие и природную красоту наших полей.
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
						</MotionInView>
					</NatureGallery>
				</Container>
			</Section>

			{/* Features Section */}
			<Section>
				<Container>
					<MotionInView {...fadeInUpViewProps}>
						<SectionTitle>Возможности платформы</SectionTitle>
					</MotionInView>
					<FeaturesGrid>
						<FeatureCardClean {...fadeInUpViewProps}>
							<h3>Поиск и фильтрация</h3>
							<p>
								Поиск по товарам с множеством фильтров и сортировкой по цене, популярности и категориям
							</p>
						</FeatureCardClean>
						<FeatureCardClean {...fadeInUpViewProps}>
							<h3>Корзина, оформление и личный кабинет</h3>
							<p>
								Корзина покупок, форма заказа и избранное. Редактирование профиля и просмотр истории
								заказов в личном кабинете.
							</p>
						</FeatureCardClean>
						<FeatureCardClean {...fadeInUpViewProps}>
							<h3>Сравнение товаров</h3>
							<p>Сравнение характеристик товаров в одной таблице для удобного выбора</p>
						</FeatureCardClean>
						<FeatureCardClean {...fadeInUpViewProps}>
							<h3>Светлая и тёмная тема</h3>
							<p>Переключение темы интерфейса с сохранением выбора в настройках</p>
						</FeatureCardClean>
					</FeaturesGrid>
					<FeaturesGrid>
						<FeatureCardClean {...fadeInUpViewProps}>
							<FeatureTitle>🌟 Основные функции:</FeatureTitle>
							<FeatureList>
								<FeatureItem>
									<FeatureIcon>🔍</FeatureIcon> Поиск товаров
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
									<FeatureIcon>⚖️</FeatureIcon> Сравнение товаров по характеристикам
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>🌗</FeatureIcon> Светлая и тёмная тема
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📄</FeatureIcon> Пагинация для удобной навигации
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📝</FeatureIcon> Форма оформления заказа
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>👤</FeatureIcon> Личный кабинет и редактирование профиля
								</FeatureItem>
								<FeatureItem>
									<FeatureIcon>📦</FeatureIcon> История заказов
								</FeatureItem>
							</FeatureList>
						</FeatureCardClean>
					</FeaturesGrid>
				</Container>
			</Section>
		</main>
	);
}
