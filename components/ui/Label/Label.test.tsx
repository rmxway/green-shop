import { render, screen } from '@testing-library/react';

import { Label } from '@/components/ui/Label';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('Label:', () => {
	it('Renders label text', () => {
		const labelText = 'Test Label';
		const inputName = 'testInput';

		render(
			<StyledComponentsRegistry isJest>
				<Label label={labelText} name={inputName} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText(labelText)).toBeInTheDocument();
	});

	it('Has correct htmlFor attribute', () => {
		const labelText = 'Test Label';
		const inputName = 'testInput';

		render(
			<StyledComponentsRegistry isJest>
				<Label label={labelText} name={inputName} />
			</StyledComponentsRegistry>,
		);

		const label = screen.getByText(labelText);
		expect(label).toHaveAttribute('for', inputName);
	});

	it('Renders as label element', () => {
		const labelText = 'Test Label';
		const inputName = 'testInput';

		render(
			<StyledComponentsRegistry isJest>
				<Label label={labelText} name={inputName} />
			</StyledComponentsRegistry>,
		);

		const label = screen.getByText(labelText);
		expect(label.tagName).toBe('LABEL');
	});
});
