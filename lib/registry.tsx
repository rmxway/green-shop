'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { JestTemplate, Template } from '@/lib';

interface StyledRegistryProps {
	isJest?: boolean;
	children: React.ReactNode;
}

export function StyledComponentsRegistry({ isJest, children }: StyledRegistryProps) {
	const [sheet] = useState(() => new ServerStyleSheet());

	const Tag = isJest ? JestTemplate : Template;

	try {
		useServerInsertedHTML(() => {
			const styles = sheet.getStyleElement();
			sheet.instance.clearTag();

			return <>{styles}</>;
		});

		if (typeof window !== 'undefined') return <Tag>{children}</Tag>;

		return (
			<StyleSheetManager sheet={sheet.instance}>
				<Tag>{children}</Tag>
			</StyleSheetManager>
		);
	} catch (error) {
		throw new Error((error as Error).message);
	} finally {
		sheet.instance.clearTag();
	}
}

export default StyledComponentsRegistry;
