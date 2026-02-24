'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { NavLink } from '@/components/Navbar/NavLink';
import { NavbarItemDisabled } from '@/components/Navbar/styled';

interface AccountNavItemProps {
	onClose: () => void;
	children?: ReactNode;
}

export const AccountNavItem: FC<AccountNavItemProps> = ({ onClose, children }) => {
	const { data: session, status } = useSession();
	const pathname = usePathname();

	if (status === 'loading') {
		return (
			<NavbarItemDisabled aria-busy="true" aria-label="Загрузка">
				<span>Войти</span>
			</NavbarItemDisabled>
		);
	}

	if (!session?.user) {
		return (
			<NavLink title="Войти" url="/login" onClick={onClose}>
				{pathname === '/login' && children}
			</NavLink>
		);
	}

	const displayName = session.user.name || session.user.email?.split('@')[0] || 'Аккаунт';

	return (
		<>
			<NavLink title={displayName} url="/account" onClick={onClose}>
				{pathname === '/account' && children}
			</NavLink>
		</>
	);
};

export default AccountNavItem;
