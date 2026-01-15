import icofont from '@/public/assets/fonts/icofont/icofont.json';

export interface IProduct {
	id: number;
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
	checked?: boolean;
	favorite?: boolean;
	count?: number;
}

export interface DataFetch {
	limit: number;
	products: IProduct[];
	skip: number;
	total: number;
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

export interface ProductsState {
	title: string;
	fetchedItems: IProduct[];
	reservedItems: IProduct[];
	total: number;
	countPerPage: number;
	countFavorites: number;
	categories: Category[];
	page: number;
	productsPage: number;
	favoritesPage: number;
	typePage: TypePages;
	error: string;
	fetching: boolean;
	sort: SortTypes;
	search: string;
	lastUpdated?: number;
}

export interface CartState {
	items: IProduct[];
	totalPrice: number;
	countPerPage: number;
	page: number;
	step: number;
}

export type Icofont = keyof typeof icofont;
