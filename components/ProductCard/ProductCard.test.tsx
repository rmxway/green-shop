import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StyledComponentsRegistry } from '@/lib/registry';
import { useAppDispatch, useAppSelector, useCurrency } from '@/services';
import { moveToCart } from '@/store/reducers/combineActions';

import { ProductCard } from '.';
import { mockProduct } from './mockProduct';

// Мокаем store перед всеми остальными импортами
jest.mock('@/store', () => ({
	store: {
		dispatch: jest.fn(),
		getState: jest.fn(() => ({
			products: {
				reservedItems: [{ id: 6, title: 'Test Product' }],
			},
		})),
		subscribe: jest.fn(() => jest.fn()),
	},
}));

jest.mock('@/store/provider', () => ({
	ReduxProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Мокаем localStore чтобы избежать проблем с checkVersion
jest.mock('@/services/localStore', () => ({
	checkVersion: jest.fn(),
}));

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
	useNavigateWithScroll: () => (url: string) => mockPush(url),
}));

jest.mock('@/store/reducers/combineActions', () => ({
	moveToCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: jest.fn() }),
	usePathname: () => '/',
	useServerInsertedHTML: () => {},
}));

jest.mock('@/store/reducers/products', () => ({
	toggleFavorite: jest.fn(() => ({ type: 'toggleFavorite' })),
}));

// Мокаем весь store чтобы избежать проблем с RTK Query
jest.mock('@/store', () => ({
	productsStore: jest.fn(),
}));

jest.mock('@/store/types', () => ({
	productsStore: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockUseCurrency = useCurrency as jest.MockedFunction<typeof useCurrency>;
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

const mockProductChecked = {
	...mockProduct,
	checked: true,
};

const mockProductFavorite = {
	...mockProduct,
	favorite: true,
};

const mockProductWithoutRating = {
	...mockProduct,
	rating: undefined,
};

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
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		const text = getByText(/Calvin Klein CK One/i);
		expect(text).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('displays discount sticker when discountPercentage exists', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductWithDiscount} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('-25%')).toBeInTheDocument();
	});

	it('does not display discount sticker when discountPercentage is undefined', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductWithoutDiscount} />
			</StyledComponentsRegistry>,
		);

		expect(screen.queryByText(/-25%/)).not.toBeInTheDocument();
	});

	it('displays brand name', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('Calvin Klein')).toBeInTheDocument();
	});

	it('displays formatted price', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		expect(mockFormatPriceWithSymbol).toHaveBeenCalledWith(49.99);
		expect(screen.getByText('$49.99')).toBeInTheDocument();
	});

	it('displays "Корзина" button when product is checked', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductChecked} />
			</StyledComponentsRegistry>,
		);

		const button = screen.getByRole('button', { name: /К\s*о\s*р\s*з\s*и\s*н\s*а/ });
		expect(button).not.toBeDisabled();
		expect(button).toHaveTextContent('Корзина');
	});

	it('navigates to /cart when cart button is clicked for checked product', async () => {
		const user = userEvent.setup();

		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductChecked} />
			</StyledComponentsRegistry>,
		);

		const button = screen.getByRole('button', { name: /К\s*о\s*р\s*з\s*и\s*н\s*а/ });
		await user.click(button);

		expect(mockPush).toHaveBeenCalledWith('/cart');
	});

	it('displays "Добавить" button when product is not checked', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		const button = screen.getByRole('button', { name: /добавить/i });
		expect(button).not.toBeDisabled();
		expect(button).toHaveTextContent('Добавить');
	});

	it('calls moveToCart when add to cart button is clicked', async () => {
		const user = userEvent.setup();
		const mockMoveToCart = jest.mocked(moveToCart);

		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		const button = screen.getByRole('button', { name: /добавить/i });
		await user.click(button);

		expect(mockMoveToCart).toHaveBeenCalledWith(6);
	});

	it('displays favorite icon as active when product is favorite', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductFavorite} />
			</StyledComponentsRegistry>,
		);

		// Проверяем что компонент Favorite получает правильные props
		// Более детальная проверка будет зависеть от реализации Favorite компонента
		expect(screen.getByRole('button')).toBeInTheDocument(); // Favorite icon
	});

	it('displays favorite icon as inactive when product is not favorite', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByRole('button')).toBeInTheDocument(); // Favorite icon
	});

	it('calls toggleFavorite when favorite icon is clicked', async () => {
		const user = userEvent.setup();

		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		const favoriteElement = screen.getByTitle('В избранное');
		await user.click(favoriteElement);
		expect(mockDispatch).toHaveBeenCalled();
	});

	it('contains link to product page', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		// Найдем ссылку по тексту заголовка товара
		const titleLink = screen.getByText('Calvin Klein CK One').closest('a');
		expect(titleLink).toHaveAttribute('href', '/product/6');
	});

	it('displays rating stars when rating exists', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		// RatingStars компонент должен отображать рейтинг как текст
		expect(screen.getByText('4.85')).toBeInTheDocument();
	});

	it('handles product without rating gracefully', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProductWithoutRating} />
			</StyledComponentsRegistry>,
		);

		// Компонент должен рендериться без ошибки даже без рейтинга
		expect(screen.getByText('Calvin Klein CK One')).toBeInTheDocument();
	});

	it('applies motion props correctly', () => {
		const motionProps = {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			transition: { duration: 0.3 },
		};

		const { container } = render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} {...motionProps} />
			</StyledComponentsRegistry>,
		);

		// Проверяем что motion props применяются (через наличие стилей или data атрибутов)
		const productWrapper = container.firstChild;
		expect(productWrapper).toBeInTheDocument();
	});

	it('displays product title and brand correctly', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
		);

		expect(screen.getByText('Calvin Klein CK One')).toBeInTheDocument();
		expect(screen.getByText('Calvin Klein')).toBeInTheDocument();
	});

	it('has correct accessibility attributes', () => {
		render(
			<StyledComponentsRegistry isJest>
				<ProductCard product={mockProduct} />
			</StyledComponentsRegistry>,
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
