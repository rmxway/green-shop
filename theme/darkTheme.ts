// import { darken, desaturate, lighten } from 'polished';
import { DefaultTheme } from 'styled-components';

import { Colors, Gradients } from '@/@types/styled';

import { createGradient, defaultTheme } from './defaultTheme';

const { primary, success, danger, label, dark } = defaultTheme.colors;

const colors: Colors = {
	primary,
	success,
	danger,
	label,
	dark,
	light: '#444',
	link: primary,
	gray: {
		$1: '#1f1f1f',
		$2: '#2a2a2a',
		$3: '#363636',
		$4: '#595959',
		$5: '#626262',
		$6: '#9c9c9c',
		$7: '#cfcfcf',
		$8: '#e0e0e0',
		$9: '#fff',
	},
};

const gradients: Gradients = {
	main: (deg = '150deg') => createGradient(deg, '#e8ffb3', '0%', success, '60%'),
	dark: (deg = '150deg') => createGradient(deg, success, '0%', label, '60%'),
	softDark: (deg = '150deg') => createGradient(deg, success, '0%', '#fff', '40%'),
};

export const darkTheme: DefaultTheme = {
	name: 'dark',
	colors,
	gradients,
	layout: {
		containerWidth: defaultTheme.layout.containerWidth,
		shadow: '0 5px 40px rgba(0, 0, 0, 0.45)',
	},
	radius: defaultTheme.radius,
};

export default darkTheme;
