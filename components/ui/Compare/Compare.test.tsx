import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Compare } from '@/components/ui/Compare';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('Compare:', () => {
	it('Renders compare icon when active', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Compare active />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-compare');
		expect(icon).toBeInTheDocument();
	});

	it('Renders compare icon when not active', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Compare active={false} />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-compare');
		expect(icon).toBeInTheDocument();
	});

	it('Calls onActive when clicked', async () => {
		const user = userEvent.setup();
		const mockOnActive = jest.fn();

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Compare active={false} onActive={mockOnActive} />
			</StyledComponentsRegistry>,
		);

		const compareElement = container.firstChild as HTMLElement;
		expect(compareElement).toBeInTheDocument();

		await user.click(compareElement);
		expect(mockOnActive).toHaveBeenCalledTimes(1);
	});

	it('Applies custom props', () => {
		render(
			<StyledComponentsRegistry isJest>
				<Compare active data-testid="custom-compare" />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByTestId('custom-compare')).toBeInTheDocument();
	});

	it('Defaults to inactive state', () => {
		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Compare />
			</StyledComponentsRegistry>,
		);

		const icon = container.querySelector('.icofont.icofont-compare');
		expect(icon).toBeInTheDocument();
	});
});
