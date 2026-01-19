import { render } from '@testing-library/react';

import { Loader } from '@/components/ui/Loader';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('Loader:', () => {
	it('Renders loader when loading is true', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Loader loading />
			</StyledComponentsRegistry>,
		);

		// Проверяем что компонент отрендерился
		expect(container.firstChild).toBeInTheDocument();

		// Проверяем наличие 4 спиннеров
		const spans = container.querySelectorAll('span');
		expect(spans).toHaveLength(4);
	});

	it('Does not render when loading is false', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Loader loading={false} />
			</StyledComponentsRegistry>,
		);

		const loaderContainer = document.querySelector('[data-testid="loader"]');
		expect(loaderContainer).toBeNull();
	});

	it('Applies custom className', () => {
		const customClass = 'custom-loader';

		render(
			<StyledComponentsRegistry isJest>
				<Loader loading className={customClass} />
			</StyledComponentsRegistry>,
		);

		const loaderContainer = document.querySelector(`.${customClass}`);
		expect(loaderContainer).toBeInTheDocument();
	});

	it('Renders correct number of spinner elements', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Loader loading />
			</StyledComponentsRegistry>,
		);

		// Проверяем что есть 4 span элемента для анимации
		const spans = container.querySelectorAll('span');
		expect(spans).toHaveLength(4);
	});
});