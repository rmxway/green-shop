export interface IProduct {
	id: number;
	index?: number;
	title: string;
	description: string;
	category?: string;
	price: number;
	discountPercentage?: number;
	rating?: number;
	stock?: number;
	tags?: string[];
	brand?: string;
	sku?: string;
	weight?: number;
	dimensions?: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation?: string;
	shippingInformation?: string;
	availabilityStatus?: string;
	reviews?: {
		rating: number;
		comment: string;
		date: string;
		reviewerName: string;
		reviewerEmail: string;
	}[];
	returnPolicy?: string;
	minimumOrderQuantity?: number;
	meta?: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
	images: string[];
	thumbnail?: string;
	count?: number;
}

export interface SortTypes {
	name: 'rating' | 'price' | 'default';
	toggle?: boolean;
}

export type TypePages = 'products' | 'favorites';

export interface Category {
	name: 'all' | string;
	active: boolean;
}

export interface CompareState {
	items: IProduct[];
	limit: number;
}

export interface ProductsState {
	title: string;
	fetchedItems: IProduct[];
	filteredItems: IProduct[];
	total: number;
	categories: Category[];
	page: number;
	countPerPage: number;
	error: string;
	fetching: boolean;
	sort: SortTypes;
	search: string;
	currency: 'USD' | 'RUB';
	lastUpdated?: number;
}

export interface CartState extends Pick<ProductsState, 'page' | 'countPerPage'> {
	items: IProduct[];
	totalPrice: number;
	step: number;
}

export interface FavoriteState extends Pick<ProductsState, 'page' | 'countPerPage'> {
	items: IProduct[];
}

export interface DataFetch {
	limit: number;
	products: IProduct[];
	skip: number;
	total: number;
}
