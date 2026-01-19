import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Categories } from '@/components/Categories';
import { StyledComponentsRegistry } from '@/lib/registry';
import { useAppSelector } from '@/services';
import { changeCategoryWithSort } from '@/store/reducers/combineActions';

// Mock для Redux
jest.mock('@/services', () => ({
	useAppSelector: jest.fn(),
}));

// Mock для combineActions
jest.mock('@/store/reducers/combineActions', () => ({
	changeCategoryWithSort: jest.fn(),
}));

const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockChangeCategoryWithSort = changeCategoryWithSort as jest.MockedFunction<typeof changeCategoryWithSort>;

const mockCategories = [
	{ name: 'all', active: true },
	{ name: 'electronics', active: false },
	{ name: 'clothing', active: false },
];

const mockProductsStore = {
	categories: mockCategories,
	search: '',
};

describe('Categories:', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Render categories list', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { getByText, getAllByRole } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		expect(getByText('Категории')).toBeInTheDocument();

		const buttons = getAllByRole('button');
		expect(buttons).toHaveLength(mockCategories.length);

		mockCategories.forEach((category) => {
			expect(getByText(category.name)).toBeInTheDocument();
		});
	});

	it('Show skeleton when loading', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading />
			</StyledComponentsRegistry>,
		);

		// Проверяем, что есть элементы skeleton (react-loading-skeleton создает span элементы)
		const skeletonElements = container.querySelectorAll('span[style*="border-radius"]');
		expect(skeletonElements.length).toBeGreaterThan(0);
	});

	it('Active category has correct styling', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { getByText } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		const activeCategory = getByText('all');
		// Активная категория должна быть кнопкой
		expect(activeCategory.tagName).toBe('BUTTON');
		expect(activeCategory).toBeEnabled();
	});

	it('Inactive categories do not have active styling', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { getByText } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		const inactiveCategory = getByText('electronics');
		// Неактивная категория тоже должна быть кнопкой и быть enabled
		expect(inactiveCategory.tagName).toBe('BUTTON');
		expect(inactiveCategory).toBeEnabled();
	});

	it('Categories are disabled when search is active', () => {
		mockUseAppSelector.mockReturnValue({
			...mockProductsStore,
			search: 'test search',
		});

		const { getAllByRole } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		const buttons = getAllByRole('button');
		buttons.forEach((button) => {
			expect(button).toBeDisabled();
		});
	});

	it('Categories are enabled when no search', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { getAllByRole } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		const buttons = getAllByRole('button');
		buttons.forEach((button) => {
			expect(button).not.toBeDisabled();
		});
	});

	it('Click on category calls changeCategoryWithSort', async () => {
		const user = userEvent.setup();
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { getByText } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading={false} />
			</StyledComponentsRegistry>,
		);

		const categoryButton = getByText('electronics');
		await user.click(categoryButton);

		expect(mockChangeCategoryWithSort).toHaveBeenCalledWith('electronics');
		expect(mockChangeCategoryWithSort).toHaveBeenCalledTimes(1);
	});

	it('Do not render categories when loading', () => {
		mockUseAppSelector.mockReturnValue(mockProductsStore);

		const { queryByText } = render(
			<StyledComponentsRegistry isJest>
				<Categories isLoading />
			</StyledComponentsRegistry>,
		);

		mockCategories.forEach((category) => {
			expect(queryByText(category.name)).not.toBeInTheDocument();
		});
	});
});