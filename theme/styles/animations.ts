import { css } from 'styled-components';

export const fadeIn = css`
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	animation: fadeIn ease-in-out forwards 0.5s;
`;

export default fadeIn;
