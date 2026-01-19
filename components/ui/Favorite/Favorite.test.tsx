import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Favorite } from '@/components/ui/Favorite';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('Favorite:', () => {
	it('Renders favorite icon when active', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Favorite active />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-favorite');
		expect(icon).toBeInTheDocument();
	});

	it('Renders favorite outline icon when not active', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Favorite active={false} />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-favorite-fill');
		expect(icon).toBeInTheDocument();
	});

	it('Calls onActive when clicked', async () => {
		const user = userEvent.setup();
		const mockOnActive = jest.fn();

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Favorite active={false} onActive={mockOnActive} />
			</StyledComponentsRegistry>,
		);

		const favoriteElement = container.firstChild as HTMLElement;
		expect(favoriteElement).toBeInTheDocument();

		await user.click(favoriteElement);
		expect(mockOnActive).toHaveBeenCalledTimes(1);
	});

	it('Applies custom props', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Favorite active data-testid="custom-favorite" />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByTestId('custom-favorite')).toBeInTheDocument();
	});

	it('Defaults to inactive state', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Favorite />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-favorite-fill');
		expect(icon).toBeInTheDocument();
	});
});
