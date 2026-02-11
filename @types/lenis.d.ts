declare module 'lenis/react' {
	import type { ReactElement, ReactNode } from 'react';

	interface ReactLenisOptions {
		root?: HTMLElement | null;
		duration?: number;
		easing?: (t: number) => number;
		autoRaf?: boolean;
	}

	interface ReactLenisProps {
		root?: boolean;
		options?: ReactLenisOptions;
		children: ReactNode;
	}

	export function ReactLenis(props: ReactLenisProps): ReactElement | null;

	export function useLenis(callback?: (lenis: { stop: () => void; start: () => void; isStopped: boolean }) => void):
		| {
				stop: () => void;
				start: () => void;
				isStopped: boolean;
		  }
		| undefined;
}
