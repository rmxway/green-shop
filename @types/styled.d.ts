import 'styled-components';

import { gradients } from '@/theme';

export interface Colors {
	primary: string;
	success: string;
	danger: string;
	label: string;
	dark: string;
	light: string;
	link: string;
	gray: {
		$1: string;
		$2: string;
		$3: string;
		$4: string;
		$5: string;
		$6: string;
		$7: string;
		$8: string;
		$9: string;
	};
}

export type Gradients = Record<keyof typeof gradients, (deg?: string) => string>;

interface Layout {
	containerWidth: string;
	shadow: string;
}

interface Radius {
	borderRadius: string;
}

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
		colors: Colors;
		gradients: Gradients;
		layout: Layout;
		radius: Radius;
	}
}
