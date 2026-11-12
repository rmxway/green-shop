import { Metadata } from 'next';

import { LoginContent } from './content';

export const metadata: Metadata = {
	title: 'Вход',
};

export default function LoginPage() {
	return <LoginContent />;
}
