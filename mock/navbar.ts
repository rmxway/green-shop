type TitleType = 'Главная' | 'Товары' | 'Избранное' | 'Сравнение' | 'Корзина' | 'UI';
interface NavbarItemType {
	title: TitleType;
	url: string;
}

export const navbarItems: NavbarItemType[] = [
	{
		title: 'Главная',
		url: '/',
	},
	{
		title: 'Товары',
		url: '/products',
	},
	{
		title: 'Избранное',
		url: '/favorites',
	},
	{
		title: 'Сравнение',
		url: '/compare',
	},
	{
		title: 'Корзина',
		url: '/cart',
	},
];

/** Заголовки для страниц без пункта в Navbar (аккаунт, авторизация). Используется в TopBlock. */
export const pageTitles: Record<string, string> = {
	'/account': 'Личный кабинет',
	'/account/orders': 'Мои заказы',
	'/login': 'Вход',
	'/register': 'Регистрация',
};

export default navbarItems;
