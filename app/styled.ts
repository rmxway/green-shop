import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { media } from '@/theme';

export const FirstBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;
	align-items: center;
	max-width: 1200px;
	margin: 0 auto;
	padding: 80px 0;

	${media.lessThan('md')`
		grid-template-columns: 1fr;
		gap: 2rem;
		padding: 60px 20px;
		text-align: center;
	`}
`;

export const ImageLogos = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		background: transparent;
	}
`;

export const HeroSection = styled.section`
	padding: 120px 0 100px;
	text-align: center;
	background: ${({ theme }) => theme.colors.gray.$1};
	color: ${({ theme }) => theme.colors.gray.$9};
	max-width: 1200px;
	margin: 0 auto;

	${media.lessThan('md')`
		padding: 80px 0 60px;
	`}
`;

export const NatureImage = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
	border-radius: 16px;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.3) 100%);
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 1;
	}

	&::after {
		content: attr(data-title);
		position: absolute;
		bottom: 24px;
		left: 24px;
		color: white;
		font-size: 1.25rem;
		font-weight: 600;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.4s ease;
		z-index: 2;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		filter: brightness(1.05) contrast(1.05);
	}

	&:hover {
		transform: scale(1.02);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

		&::before {
			opacity: 1;
		}

		&::after {
			opacity: 1;
			transform: translateY(0);
		}

		img {
			transform: scale(1.08);
			filter: brightness(1.1) contrast(1.1) saturate(1.1);
		}
	}

	&:first-child {
		${media.greaterThan('md')`
			grid-row: span 2;
			height: 824px;
		`}
	}

	${media.lessThan('md')`
		height: 280px;
		margin-bottom: 16px;

		&:first-child {
			height: 280px;
		}
	`}
`;

export const HeroTitle = styled.h1`
	font-size: 3.5rem;
	font-weight: 700;
	line-height: 1.1;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.colors.gray.$9};
	letter-spacing: -0.02em;

	${media.lessThan('md')`
		font-size: 2.5rem;
	`}
`;

export const HeroSubtitle = styled.p`
	font-size: 1.25rem;
	line-height: 1.6;
	color: ${({ theme }) => theme.colors.gray.$7};
	font-weight: 400;
	max-width: 600px;
	margin: 0 auto;

	${media.lessThan('md')`
		font-size: 1.125rem;
		padding: 0 20px;
	`}
`;

export const NatureGallery = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	gap: 24px;
	margin: 60px 0;
	padding: 0;

	${media.greaterThan('md')`
		grid-template-columns: 2fr 1fr 1fr;
	`}

	${media.lessThan('md')`
		grid-template-columns: 1fr;
		gap: 16px;
	`}
`;

export const FeatureTitle = styled.h4`
	color: ${({ theme }) => theme.colors.gray.$9};
	margin-bottom: 1rem;
	font-weight: 600;
`;

export const FeatureList = styled.ul`
	list-style: none;
	padding: 0;
`;

export const FeatureItem = styled.li`
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
`;

export const FeatureIcon = styled.span`
	color: ${({ theme }) => theme.colors.success};
	margin-right: 0.5rem;
`;

export const PrimaryButton = styled.button`
	${({ theme }) => {
		const { colors, layout } = theme;
		return css`
			background: ${colors.success};
			color: ${darken(0.3, colors.success)};
			border: none;
			border-radius: 24px;
			padding: 12px 24px;
			font-size: 1rem;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s ease;
			text-decoration: none;
			display: inline-block;
			margin-top: 2rem;

			&:hover {
				background: ${colors.success}DD;
				transform: translateY(-1px);
				box-shadow: ${layout.shadow};
			}

			&:active {
				transform: translateY(0);
			}
		`;
	}}
`;

export const Section = styled.section<{ $background?: string }>`
	padding: 80px 0;
	background: ${({ $background, theme }) => $background || theme.colors.gray.$1};

	${media.lessThan('md')`
		padding: 60px 0;
	`}
`;

export const SectionTitle = styled.h2`
	font-size: 2.5rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 3rem;
	color: ${({ theme }) => theme.colors.gray.$9};
	letter-spacing: -0.02em;

	${media.lessThan('md')`
		font-size: 2rem;
		margin-bottom: 2rem;
	`}
`;

export const SectionSubtitle = styled.p`
	font-size: 1.25rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.gray.$7};
	line-height: 1.6;
	max-width: 700px;
	margin: 0 auto 3rem;

	${media.lessThan('md')`
		font-size: 1.125rem;
		padding: 0 20px;
		margin-bottom: 2rem;
	`}
`;

export const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2rem;
	margin-top: 3rem;
`;

export const FeatureCardClean = styled.div`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			background: ${colors.gray.$1};
			border-radius: 16px;
			padding: 2rem;
			text-align: center;
			transition: all 0.3s ease;
			border: 1px solid ${colors.gray.$3};

			&:hover {
				transform: translateY(-4px);
				box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
			}

			h3 {
				font-size: 1.25rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
				color: ${colors.gray.$9};
			}

			p {
				color: ${colors.gray.$7};
				line-height: 1.6;
			}
		`;
	}}
`;
