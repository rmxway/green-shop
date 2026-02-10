// import { darken } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div<{ background?: boolean }>`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100px;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	pointer-events: none;
	color: ${({ theme }) => theme.colors.gray.$7};
	mix-blend-mode: multiply;
`;

export const StyledLoader = styled.div`
	@keyframes rotateLoading {
		0% {
			transform: rotate(-90deg);
		}
		100% {
			transform: rotate(630deg);
		}
	}

	mix-blend-mode: multiply;

	span {
		position: absolute;
		display: block;
		width: 5px;
		height: 5px;
		border-radius: 20px;
		background-color: ${({ theme }) => theme.colors.gray.$4};
		margin-left: -20px;
		transform-origin: 20px 0;
		animation-name: rotateLoading;
		animation-duration: 2.5s;
		animation-direction: forwards;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.1, 0.25, 0.35, 0.65);

		&:nth-child(n + 2) {
			animation-delay: 0.15s;
		}

		&:nth-child(n + 3) {
			animation-delay: 0.3s;
		}

		&:nth-child(n + 4) {
			animation-delay: 0.45s;
		}
	}
`;
