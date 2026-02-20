import { Metadata } from 'next';

import { AccountContent } from './content';

export const metadata: Metadata = {
	title: 'Личный кабинет | Green Shop',
};

export default function AccountPage() {
	return <AccountContent />;
}
