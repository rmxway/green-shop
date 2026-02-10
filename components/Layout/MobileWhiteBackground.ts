import styled from 'styled-components';

import { media } from '@/theme';

export const MobileWhiteBackground = styled.div`
	background-color: ${({ theme }) => theme.colors.light};
	flex-grow: 1;

	${media.greaterThan('sm')`
        background-color: transparent;
    `}
`;

export default MobileWhiteBackground;
