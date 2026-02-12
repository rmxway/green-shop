export const currency = '$';

export const VERSION = '1.3';

export const isDev = process.env.NODE_ENV === 'development';

export const protocol = isDev ? 'http' : 'https';

// Products API constants
export const PRODUCTS_LIMIT = 100;
export const PRODUCTS_COUNT_PER_PAGE = 12;
export const CART_COUNT_PER_PAGE = 8;

// UI constants
export const SCROLL_THRESHOLD = 100;
export const SCROLL_DELAY_MS = 350;

export default currency;
