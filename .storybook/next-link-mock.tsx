import React, { ReactNode } from 'react';

interface MockLinkProps {
	href: string;
	children: ReactNode;
	[key: string]: unknown;
}

export default function MockLink({ href, children, ...props }: MockLinkProps) {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
}
