import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { addToCart } from '@/store/reducers/cart';
import { toggleCompare } from '@/store/reducers/compare';
import { toggleToFavorite } from '@/store/reducers/favorite';
import { defaultTheme, GlobalStyles } from '@/theme';
import { IProduct } from '@/types';

import { ProductCard } from '.';
import { mockProduct } from './mockProduct';

// Создаем тестовый wrapper без Redux
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyles />
		{children}
	</ThemeProvider>
);

// Мокаем ProductImage компонент чтобы избежать проблем с изображениями в тестах
jest.mock('./ProductImage', () => ({
	ProductImage: ({ images, alt }: { images: string[]; alt: string }) => (
		<div data-testid="product-image" data-alt={alt}>
			{images?.length ? 'Image loaded' : 'No photo icon'}
		</div>
	),
}));

const mockPush = jest.fn();

// Моки для Redux и сервисов
jest.mock('@/services', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn(),
	useCurrency: jest.fn(),
	useLoadTimeout: jest.fn(),
	useNavigateWithScroll: () => (url: string) => mockPush(url),
}));

jest.mock('@/store/reducers/favorite', () => ({
	toggleToFavorite: jest.fn(),
}));

jest.mock('@/store/reducers/compare', () => ({
	toggleCompare: jest.fn(),
}));

jest.mock('@/store/reducers/cart', () => ({
	addToCart: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockUseCurrency = useCurrency as jest.MockedFunction<typeof useCurrency>;
const mockToggleToFavorite = toggleToFavorite as jest.MockedFunction<typeof toggleToFavorite>;
const mockToggleCompare = toggleCompare as jest.MockedFunction<typeof toggleCompare>;
const mockAddToCart = addToCart as jest.MockedFunction<typeof addToCart>;
const mockDispatch = jest.fn();

const mockFormatPriceWithSymbol = jest.fn();

// Дополнительные mock продукты для различных сценариев
const mockProductWithDiscount = {
	...mockProduct,
	discountPercentage: 25,
};

const mockProductWithoutDiscount = {
	...mockProduct,
	discountPercentage: undefined,
};

const mockProductWithoutRating = {
	...mockProduct,
	rating: undefined,
};

type MockCartState = {
	items: IProduct[];
	countPerPage: number;
	page: number;
	step: number;
	totalPrice: number;
};

const mockCart: MockCartState = {
	items: [
		{
			...mockProduct,
			id: 6,
			count: 1,
		},
	],
	countPerPage: 8,
	page: 1,
	step: 1,
	totalPrice: mockProduct.price,
};

// const mockFavorite: FavoriteState = {
// 	items: [
// 		{
// 			...mockProduct,
// 			id: 6,
// 		},
// 	],
// 	countPerPage: 8,
// 	page: 1,
// };

// const createMockState = (favorite: FavoriteState = mockFavorite): RootState => ({ favorite }) as RootState;

describe('ProductCard:', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseAppDispatch.mockReturnValue(mockDispatch);
		mockUseAppSelector.mockReturnValue(false);
		mockUseCurrency.mockReturnValue({
			currency: 'USD',
			isLoading: false,
			exchangeRate: 1,
			convertPrice: jest.fn(),
			formatPrice: jest.fn(),
			formatPriceWithSymbol: mockFormatPriceWithSymbol,
			formatPriceWithoutLocale: jest.fn((price: number) => price),
			getCurrencySymbol: jest.fn(() => '$'),
			getCurrencyName: jest.fn(() => 'US Dollar'),
		});
		mockFormatPriceWithSymbol.mockReturnValue('$49.99');
	});

	it('Render card', () => {
		const { container, getByText } = render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		const text = getByText(/Calvin Klein CK One/i);
		expect(text).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('displays discount sticker when discountPercentage exists', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProductWithDiscount} />
			</TestWrapper>,
		);

		expect(screen.getByText('-25%')).toBeInTheDocument();
	});

	it('does not display discount sticker when discountPercentage is undefined', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProductWithoutDiscount} />
			</TestWrapper>,
		);

		expect(screen.queryByText(/-25%/)).not.toBeInTheDocument();
	});

	it('displays brand name', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		expect(screen.getByText('Calvin Klein')).toBeInTheDocument();
	});

	it('displays formatted price', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		expect(mockFormatPriceWithSymbol).toHaveBeenCalledWith(49.99);
		expect(screen.getByText('$49.99')).toBeInTheDocument();
	});

	it('displays "Еще +1" button when product is checked', () => {
		mockUseAppSelector.mockReturnValue(() => mockCart);
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		const button = screen.getByRole('button', { name: 'Ещё +1' });
		expect(button).not.toBeDisabled();
	});

	it('displays "Добавить" button when product is not checked', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		const button = screen.getByRole('button', { name: /Добавить/i });
		expect(button).not.toBeDisabled();
		expect(button).toHaveTextContent('Добавить');
	});

	it('calls moveToCart when add to cart button is clicked', async () => {
		const user = userEvent.setup();

		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		const button = screen.getByRole('button', { name: /Добавить/i });
		await user.click(button);

		expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
	});

	// it('displays favorite icon as active when product is favorite', async () => {
	// 	const user = userEvent.setup();
	// 	mockUseAppSelector.mockImplementation((selector) => selector(createMockState()));

	// 	render(
	// 		<TestWrapper>
	// 			<ProductCard product={mockProduct} />
	// 		</TestWrapper>,
	// 	);

	// 	const button = screen.getByTestId('favorite');

	// 	// Проверяем что компонент Favorite получает правильные props
	// 	// Более детальная проверка будет зависеть от реализации Favorite компонента
	// 	// expect(screen.getByRole('button')).toBeInTheDocument(); // Favorite icon
	// 	await user.click(button);
	// 	expect(mockToggleToFavorite).toHaveBeenCalledWith(mockProduct);
	// 	expect(button).toHaveAttribute('data-test', 'true');
	// });

	it('calls toggleFavorite when favorite icon is clicked', async () => {
		const user = userEvent.setup();

		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		const favoriteElement = screen.getByTitle('В избранное');
		await user.click(favoriteElement);
		expect(mockDispatch).toHaveBeenCalled();
	});

	it('contains link to product page', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		// Найдем ссылку по тексту заголовка товара
		const titleLink = screen.getByText('Calvin Klein CK One').closest('a');
		expect(titleLink).toHaveAttribute('href', '/product/6');
	});

	it('displays rating stars when rating exists', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		// RatingStars компонент должен отображать рейтинг как текст
		expect(screen.getByText('4.85')).toBeInTheDocument();
	});

	it('handles product without rating gracefully', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProductWithoutRating} />
			</TestWrapper>,
		);

		// Компонент должен рендериться без ошибки даже без рейтинга
		expect(screen.getByText('Calvin Klein CK One')).toBeInTheDocument();
	});

	it('displays product title and brand correctly', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		expect(screen.getByText('Calvin Klein CK One')).toBeInTheDocument();
		expect(screen.getByText('Calvin Klein')).toBeInTheDocument();
	});

	it('has correct accessibility attributes', () => {
		render(
			<TestWrapper>
				<ProductCard product={mockProduct} />
			</TestWrapper>,
		);

		// Проверяем что кнопки имеют правильные роли
		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBeGreaterThan(0);

		// Проверяем что ссылки имеют правильные атрибуты
		const links = screen.getAllByRole('link');
		expect(links.length).toBe(2); // Изображение и заголовок

		links.forEach((link) => {
			expect(link).toHaveAttribute('href', '/product/6');
		});
	});
});
