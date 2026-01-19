import { FC } from 'react';

import { StyledLoader, Wrapper } from './styled';

interface LoaderTypes {
	loading: boolean;
	className?: string;
}

export const Loader: FC<LoaderTypes> = ({ loading, className }) =>
	loading ? (
		<Wrapper {...{ className }}>
			<StyledLoader>
				<span />
				<span />
				<span />
				<span />
			</StyledLoader>
		</Wrapper>
	) : null;

export default Loader;
