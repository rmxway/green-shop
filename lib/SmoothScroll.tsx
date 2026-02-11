'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { type ReactNode, useEffect } from 'react';

function ScrollLockSync() {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis || typeof document === 'undefined') return;

		const check = () => {
			const locked = document.body.classList.contains('scroll-lock');
			if (locked && !lenis.isStopped) lenis.stop();
			if (!locked && lenis.isStopped) lenis.start();
		};

		check();
		const observer = new MutationObserver(check);
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

		return () => observer.disconnect();
	}, [lenis]);

	return null;
}

interface SmoothScrollProps {
	children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
	return (
		<ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)) }}>
			<ScrollLockSync />
			{children}
		</ReactLenis>
	);
}
