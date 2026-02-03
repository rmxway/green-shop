import icofont from '@/public/assets/fonts/icofont/icofont.json';
import type { Icofont } from '@/types';

export const iconNames = Object.keys(icofont) as Icofont[];

export const ICON_OPTIONS: Record<string, Icofont> = Object.fromEntries(
	iconNames.map((name) => [name, name]),
) as Record<string, Icofont>;

export const iconArgType = {
	control: { type: 'select' as const },
	options: iconNames,
};
