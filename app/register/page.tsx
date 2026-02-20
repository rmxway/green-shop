import { Metadata } from 'next';

import { RegisterContent } from './content';

export const metadata: Metadata = {
	title: 'Регистрация | Green Shop',
};

export default function RegisterPage() {
	return <RegisterContent />;
}
