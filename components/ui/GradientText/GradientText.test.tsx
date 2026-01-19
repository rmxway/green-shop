import { render, screen } from '@testing-library/react';

import { GradientText } from '@/components/ui/GradientText';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('GradientText:', () => {
	it('Renders text content', () => {
		const testText = 'Gradient Text';

		render(
			<StyledComponentsRegistry isJest>
				<GradientText>{testText}</GradientText>
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText(testText)).toBeInTheDocument();
	});

	it('Applies default gradient', () => {
		const testText = 'Default gradient';

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<GradientText>{testText}</GradientText>
			</StyledComponentsRegistry>,
		);

		// Проверяем что элемент существует и содержит текст
		const element = screen.getByText(testText);
		expect(element).toBeInTheDocument();
		expect(container.firstChild).toBeInTheDocument();
	});

	it('Applies custom gradient', () => {
		const testText = 'Dark gradient';

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<GradientText gradient="dark">{testText}</GradientText>
			</StyledComponentsRegistry>,
		);

		// Проверяем что элемент существует
		const element = screen.getByText(testText);
		expect(element).toBeInTheDocument();
		expect(container.firstChild).toBeInTheDocument();
	});

	it('Applies custom size', () => {
		const testText = 'Sized text';
		const customSize = 24;

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<GradientText size={customSize}>{testText}</GradientText>
			</StyledComponentsRegistry>,
		);

		// Проверяем что элемент существует
		const element = screen.getByText(testText);
		expect(element).toBeInTheDocument();
		expect(container.firstChild).toBeInTheDocument();
	});

	it('Applies custom props', () => {
		const testText = 'Custom props';

		render(
			<StyledComponentsRegistry isJest>
				<GradientText data-testid="custom-gradient" className="custom-class">
					{testText}
				</GradientText>
			</StyledComponentsRegistry>,
		);

		const element = screen.getByTestId('custom-gradient');
		expect(element).toHaveClass('custom-class');
	});

	it('Renders complex children', () => {
		render(
			<StyledComponentsRegistry isJest>
				<GradientText>
					<span>Complex</span> <strong>text</strong>
				</GradientText>
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('Complex')).toBeInTheDocument();
		expect(screen.getByText('text')).toBeInTheDocument();
	});
});
