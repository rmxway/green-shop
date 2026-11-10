// import { darken, desaturate, lighten } from 'polished';
import { darken } from 'polished';
import { DefaultTheme } from 'styled-components';

import { Colors, Gradients } from '@/@types/styled';

import { createGradient, defaultTheme, gradients } from './defaultTheme';

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

const darkGradients: Gradients = Object.create(gradients);
darkGradients.banner = (deg = '250deg') =>
	createGradient(deg, darken(1, colors.dark), '-120%', colors.success, '120%');
darkGradients.softDark = (deg = '150deg') =>
	createGradient(deg, darken(.1, colors.dark), '-120%', colors.dark, '120%');

export const darkTheme: DefaultTheme = {
	name: 'dark',
	colors,
	gradients: darkGradients,
	layout: {
		containerWidth: defaultTheme.layout.containerWidth,
		shadow: '0 5px 40px rgba(0, 0, 0, 0.45)',
	},
	radius: defaultTheme.radius,
};

export default darkTheme;
