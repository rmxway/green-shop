import type { ReactNode } from 'react';

export function ReactLenis({ children }: { root?: boolean; options?: object; children: ReactNode }) {
	return <>{children}</>;
}

export function useLenis() {
	return undefined;
}
