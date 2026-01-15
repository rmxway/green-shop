import { FC } from 'react';

import { WrapperWarning } from './styled';

interface WarningMessageProps {
	message: string;
}

export const WarningMessage: FC<WarningMessageProps> = ({ message }) => (
	<WrapperWarning>
		<span>⚠️ {message}</span>
	</WrapperWarning>
);

export default WarningMessage;