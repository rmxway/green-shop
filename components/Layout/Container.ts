import styled, { css } from 'styled-components';

import { media } from '@/theme';

/**
 * Adaptive container block
 * @param {boolean} $pt - padding-top: 40px
 * @param {boolean} $pb - padding-top: 40px
 * @param {boolean} $flex - display: flex; flex-direction: column
 */

interface ContainerProps {
	$pt?: boolean;
	$pb?: boolean;
	$flex?: boolean;
}

export const Container = styled.div<ContainerProps>`
	position: relative;
	display: block;
	padding: 0 20px;
	width: 100%;
	flex-grow: 1;
	max-width: 100%;
	margin: 0 auto;

	${({ $pt }) =>
		$pt &&
		css`
			padding-top: 60px;
		`}

	${({ $pb }) =>
		$pb &&
		css`
			padding-bottom: 60px;
		`}

	${({ $flex }) =>
		$flex &&
		css`
			display: flex;
			flex-direction: column;
		`}

	${media.greaterThan('sm')`
		max-width: 100%;
	`}

	${media.greaterThan('md')`
		max-width: 1024px;
	`}

	${media.greaterThan('lg')`
		max-width: 1280px;
	`}
`;

export default Container;
