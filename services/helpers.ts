import debounce from 'lodash.debounce';

import { SCROLL_THRESHOLD } from './constants';

export const ScrollToTop = (top: number = 0, smooth: boolean = true) => {
	if (typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD) {
		window.scroll({
			top,
			behavior: smooth ? 'smooth' : 'instant',
		});
	}
};

export const debounceFunction = debounce((fn: () => unknown) => fn(), 500);
