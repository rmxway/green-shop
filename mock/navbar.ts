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

export default navbarItems;
