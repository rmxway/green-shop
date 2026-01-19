import { render } from '@testing-library/react';

import { StyledComponentsRegistry } from '@/lib/registry';

import Page from './page';

describe('Favorite page test:', () => {
	it('Render text', () => {
		const { container, getByText } = render(
			<StyledComponentsRegistry isJest>
				<Page />
			</StyledComponentsRegistry>,
		);

		const text = getByText(/Ничего не добавлено в избранное, перейдите в/i);
		expect(text).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
