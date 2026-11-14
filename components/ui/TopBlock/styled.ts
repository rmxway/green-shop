import styled, { css } from 'styled-components';

import { media } from '@/theme';

export type TopBlockProps = { $isFont?: boolean };

export const TopBlockStyle = styled.div<TopBlockProps>`
	${({ theme, $isFont }) => css`
		position: relative;
		background-image: ${theme.gradients.banner()};
		background-color: ${theme.colors.success};
		margin-top: 0;
		height: ${$isFont ? '300px' : '40px'};
		display: flex;
		align-items: center;
		padding: 26px 0;
		color: ${theme.colors.light};
		z-index: 1;
		overflow: hidden;

		h1,
		h2 {
			font-size: 24px;
			margin: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;

			${
				$isFont &&
				css`
					font-size: 2.5rem;
					line-height: 0.9;
					letter-spacing: -2px;
					text-transform: uppercase;
				`
			}
		}

		.icofont {
			position: absolute;
			right: 0;
			top: 0;
			font-size: clamp(200px, 50vw, 800px);
			transform: translate(0%, -50%);
			color: black;
			opacity: 0.1;
			mix-blend-mode: overlay;
		}

		.logo-svg {
			position: absolute;
			right: 50%;
			top: 0;
			transform: scale(30) translate(50%, 0);
			transform-origin: 100%;
			opacity: 0.2;
			mix-blend-mode: luminosity;
			z-index: -10;
		}

		span {
			font-weight: 300;
		}

		p {
			font-size: 1.2rem;
		}

		${media.greaterThan('md')`
			height: ${$isFont ? '500px' : '40px'};

            h1, h2 {
                font-size: ${$isFont ? '4rem' : '22px'};
            }
        `}
	`}
`;
