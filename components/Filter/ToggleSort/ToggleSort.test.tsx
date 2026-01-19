import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { ToggleSort } from '@/components/Filter/ToggleSort';
import { useAppDispatch, useAppSelector } from '@/services';
import { sortProducts } from '@/store/reducers/products';
import { defaultTheme, GlobalStyles } from '@/theme';

// Mock для Redux
jest.mock('@/services', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn(),
}));

// Mock для Redux actions
jest.mock('@/store/reducers/products', () => ({
	sortProducts: jest.fn(() => ({ type: 'sortProducts' })),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockSortProducts = sortProducts as jest.MockedFunction<typeof sortProducts>;

const mockDispatch = jest.fn();

// Создаем тестовый wrapper без Redux
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyles />
		{children}
	</ThemeProvider>
);

describe('ToggleSort:', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseAppDispatch.mockReturnValue(mockDispatch);
	});

	it('Render toggle button with text and icon', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		expect(screen.getByText('Популярные')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('Radio input is checked when sort matches', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'rating', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const radioInput = screen.getByLabelText('Популярные');
		expect(radioInput).toBeChecked();
	});

	it('Radio input is not checked when sort does not match', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'price', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const radioInput = screen.getByLabelText('Популярные');
		expect(radioInput).not.toBeChecked();
	});

	it('Button is disabled when disabled prop is true', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" disabled />
			</TestWrapper>,
		);

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('Click on rating toggle calls sortProducts with toggle', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'rating', toggle: true });
	});

	it('Second click on rating toggle reverses toggle', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'rating', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');

		// Первый клик
		await user.click(button);
		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'rating', toggle: true });

		// Второй клик должен перевернуть toggle
		await user.click(button);
		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'rating', toggle: false });
	});

	it('Click on default sort resets to default', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'rating', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="default" value="Сброс" />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'default' });
	});

	it('Default sort does not trigger when already default with no search and first category active', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="default" value="Сброс" />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(mockSortProducts).not.toHaveBeenCalled();
	});

	it('onClick prop is called when provided', async () => {
		const user = userEvent.setup();
		const mockOnClick = jest.fn();

		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="default" value="Сброс" onClick={mockOnClick} />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('onClick is called before sort logic', async () => {
		const user = userEvent.setup();
		const mockOnClick = jest.fn();

		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" onClick={mockOnClick} />
			</TestWrapper>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'rating', toggle: true });
	});

	it('Radio input has correct name attribute', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const radioInput = screen.getByLabelText('Популярные');
		expect(radioInput).toHaveAttribute('name', 'sort');
	});

	it('Label is correctly associated with input', () => {
		mockUseAppSelector.mockReturnValue({
			sort: { name: 'default', toggle: false },
			search: '',
			categories: [{ name: 'all', active: true }],
		});

		render(
			<TestWrapper>
				<ToggleSort sort="rating" value="Популярные" />
			</TestWrapper>,
		);

		const label = screen.getByText('Популярные');
		const input = screen.getByLabelText('Популярные');

		expect(label).toHaveAttribute('for', input.id);
	});
});
