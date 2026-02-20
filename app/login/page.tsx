import { Metadata } from 'next';

import { LoginContent } from './content';

export const metadata: Metadata = {
	title: 'Вход | Green Shop',
};

export default function LoginPage() {
	return <LoginContent />;
}
