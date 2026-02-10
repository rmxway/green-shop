'use client';

import { FC } from 'react';

import { Icon } from '@/components/ui';
import { useThemeMode } from '@/theme';

import { ToggleButton } from './styled';

export const ThemeToggle: FC = () => {
	const { mode, toggleMode } = useThemeMode();

	const isDark = mode === 'dark';
	const icon = isDark ? 'sun' : 'moon';
	const label = isDark ? 'Включить светлую тему' : 'Включить тёмную тему';

	return (
		<ToggleButton type="button" onClick={toggleMode} aria-label={label} title={label}>
			<Icon icon={icon} />
		</ToggleButton>
	);
};

export default ThemeToggle;
