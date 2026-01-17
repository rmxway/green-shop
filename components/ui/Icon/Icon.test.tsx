import { render } from '@testing-library/react';

import { Icon } from '@/components/ui';
import { StyledComponentsRegistry } from '@/lib/registry';
import { Icofont } from '@/types';

describe('Icon/UI', () => {
	it('Render is fine', () => {
		const icon: Icofont = 'star';
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Icon icon={icon} />
			</StyledComponentsRegistry>,
		);

		const iconElement = container.getElementsByTagName('i')[0];

		expect(iconElement).toBeInTheDocument();
		expect(iconElement.className.includes(`icofont-${icon}`)).toBeTruthy();
		expect(iconElement).toMatchSnapshot();
	});
});
