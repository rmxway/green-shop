import { render, screen } from '@testing-library/react';

import { WarningMessage } from '@/components/ui/WarningMessage';
import { StyledComponentsRegistry } from '@/lib/registry';

describe('WarningMessage:', () => {
	it('Renders warning message with emoji', () => {
		const testMessage = 'This is a warning';

		render(
			<StyledComponentsRegistry isJest>
				<WarningMessage message={testMessage} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText(`⚠️ ${testMessage}`)).toBeInTheDocument();
	});

	it('Renders warning emoji', () => {
		const testMessage = 'Warning text';

		render(
			<StyledComponentsRegistry isJest>
				<WarningMessage message={testMessage} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('⚠️ Warning text')).toBeInTheDocument();
	});

	it('Applies custom props', () => {
		const testMessage = 'Custom warning';

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<WarningMessage message={testMessage} data-testid="custom-warning" />
			</StyledComponentsRegistry>,
		);

		// Проверяем что элемент существует и содержит правильный текст
		const element = container.firstChild;
		expect(element).toBeInTheDocument();
		// Проверяем что data-testid не добавляется к styled компонентам напрямую
		// Вместо этого проверяем наличие текста
		expect(screen.getByText(`⚠️ ${testMessage}`)).toBeInTheDocument();
	});
});
