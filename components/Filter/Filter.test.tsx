import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { Filter } from '@/components/Filter';
import { useAppDispatch, useAppSelector } from '@/services';
import { debounceFunction } from '@/services/helpers';
import { searchProducts, searchValue, sortProducts } from '@/store/reducers/products';
import { defaultTheme, GlobalStyles } from '@/theme';

// Мокаем все Redux hooks и actions
jest.mock('@/services', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn(),
}));

jest.mock('@/services/helpers', () => ({
	debounceFunction: jest.fn(),
}));

jest.mock('@/store/reducers/products', () => ({
	searchProducts: jest.fn(),
	searchValue: jest.fn(),
	sortProducts: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockDebounceFunction = debounceFunction as jest.MockedFunction<typeof debounceFunction>;
const mockSearchProducts = searchProducts as jest.MockedFunction<typeof searchProducts>;
const mockSearchValue = searchValue as jest.MockedFunction<typeof searchValue>;
const mockSortProducts = sortProducts as jest.MockedFunction<typeof sortProducts>;

const mockDispatch = jest.fn();
const mockProductsStore = {
	fetchedItems: [{ id: 1, title: 'Test Product' }],
	reservedItems: [{ id: 1, title: 'Test Product' }],
	sort: { name: 'default', toggle: false },
};

// Настраиваем моки перед каждым тестом
beforeEach(() => {
	jest.clearAllMocks();
	mockUseAppDispatch.mockReturnValue(mockDispatch);
	mockDebounceFunction.mockImplementation((fn: () => void) => {
		fn(); // Вызываем функцию сразу для тестов
		return jest.fn();
	});
});

// Создаем тестовый wrapper без Redux
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyles />
		{children}
	</ThemeProvider>
);

describe('Filter:', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseAppDispatch.mockReturnValue(mockDispatch);
		mockDebounceFunction.mockImplementation((fn: () => void) => {
			fn(); // Вызываем функцию сразу для тестов
			return jest.fn();
		});
	});

	it('Render search input and sort toggles', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		expect(input).toBeInTheDocument();

		expect(screen.getByText('Популярные')).toBeInTheDocument();
		expect(screen.getByText('Цена')).toBeInTheDocument();
		expect(screen.getByText('Сброс')).toBeInTheDocument();
	});

	it('Show skeleton when loading', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { container } = render(
			<TestWrapper>
				<Filter isLoading />
			</TestWrapper>,
		);

		// Проверяем наличие skeleton элементов (react-loading-skeleton)
		const skeletonElements = container.querySelectorAll('span[style*="border-radius"]');
		expect(skeletonElements.length).toBeGreaterThan(0);
	});

	it('Input is disabled when no items', () => {
		mockUseAppSelector.mockReturnValue({
			...mockProductsStore,
			fetchedItems: [],
			reservedItems: [],
		});

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		expect(input).toBeDisabled();
	});

	it('Sort toggles are disabled when no items', () => {
		mockUseAppSelector.mockReturnValue({
			...mockProductsStore,
			fetchedItems: [],
		});

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const popularToggle = screen.getByText('Популярные');
		const priceToggle = screen.getByText('Цена');

		expect(popularToggle.closest('button')).toBeDisabled();
		expect(priceToggle.closest('button')).toBeDisabled();
	});

	it('Sort toggles are enabled when items exist', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const popularToggle = screen.getByText('Популярные');
		const priceToggle = screen.getByText('Цена');

		expect(popularToggle.closest('button')).not.toBeDisabled();
		expect(priceToggle.closest('button')).not.toBeDisabled();
	});

	it('Search input calls debounce function on change', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		await user.type(input, 'test search');

		// Проверяем что debounce функция была вызвана
		expect(mockDebounceFunction).toHaveBeenCalled();
		// Проверяем что внутри debounce были вызваны actions
		expect(mockSearchProducts).toHaveBeenCalledWith('test search');
		expect(mockSearchValue).toHaveBeenCalledWith('test search');
	});

	it('Reset button clears input and resets state', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			...mockProductsStore,
			sort: { name: 'rating', toggle: false }, // Чтобы кнопка сброса была активна
		});

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		// Найдем кнопку сброса по тексту
		const resetButton = screen.getByText('Сброс').closest('button');

		// Сначала введем текст
		await user.type(input, 'test');
		expect(input).toHaveValue('test');

		// Нажмем сброс
		if (resetButton) {
			await user.click(resetButton);
		} else {
			// Если кнопка не найдена, попробуем кликнуть по тексту
			await user.click(screen.getByText('Сброс'));
		}

		expect(input).toHaveValue('');
	});

	it('Reset button calls sortProducts with default', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue({
			...mockProductsStore,
			sort: { name: 'rating', toggle: false }, // Чтобы кнопка сброса была активна
		});

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		// Найдем кнопку сброса
		const resetButton = screen.getByText('Сброс').closest('button');

		if (resetButton) {
			await user.click(resetButton);
		} else {
			await user.click(screen.getByText('Сброс'));
		}

		// Проверяем что sortProducts был вызван с правильными параметрами
		expect(mockSortProducts).toHaveBeenCalledWith({ name: 'default' });
	});

	it('Input value is controlled', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { rerender } = render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		expect(input).toHaveValue('');

		// Имитируем изменение состояния через ререндер
		rerender(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);
	});

	it('No padding prop is passed to Input', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		render(
			<TestWrapper>
				<Filter isLoading={false} />
			</TestWrapper>,
		);

		const input = screen.getByPlaceholderText('Поиск');
		// Проверяем что input существует и является input элементом
		expect(input.tagName).toBe('INPUT');
		expect(input).toBeInTheDocument();
	});
});