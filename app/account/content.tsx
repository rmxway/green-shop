'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Container, Flexbox } from '@/components/Layout';
import { Count } from '@/components/Navbar/Count';
import { Button, Loader } from '@/components/ui';

import {
	AccountCard,
	AccountGrid,
	AccountSection,
	InfoItem,
	InfoLabel,
	InfoValue,
	OrderButtonWrapper,
	WelcomeCard,
} from './styled';

export const AccountContent = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [ordersCount, setOrdersCount] = useState<number | null>(null);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	useEffect(() => {
		if (!session?.user) return;

		fetch('/api/orders')
			.then((res) => res.json())
			.then((data) => setOrdersCount(data.orders?.length ?? 0))
			.catch(() => setOrdersCount(0));
	}, [session]);

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push('/');
	};

	if (status === 'loading') {
		return (
			<Container>
				<Flexbox $justify="center" $align="center" style={{ minHeight: '70vh' }}>
					<Loader loading />
				</Flexbox>
			</Container>
		);
	}

	if (!session?.user) {
		return null;
	}

	const hasOrders = ordersCount !== null && ordersCount > 0;

	const btn = (
		<Button $primary $w100 disabled={!hasOrders} icon="cart">
			Мои заказы
		</Button>
	);

	const ordersButton = (
		<OrderButtonWrapper>
			{hasOrders ? <Link href="/account/orders">{btn}</Link> : btn}
			<Count count={ordersCount ?? 0} />
		</OrderButtonWrapper>
	);

	return (
		<Container>
			<AccountSection>
				<WelcomeCard>
					<h2>Добро пожаловать, {session.user.name || session.user.email}! 👋</h2>
					<p>Управляйте своим профилем и просматривайте историю заказов</p>
				</WelcomeCard>

				<AccountGrid>
					<AccountCard>
						<h3>Информация о профиле</h3>
						<Flexbox $gap={15} $direction="column" style={{ marginTop: '20px' }}>
							<InfoItem>
								<InfoLabel>Email:</InfoLabel>
								<InfoValue>{session.user.email}</InfoValue>
							</InfoItem>
							{session.user.name && (
								<InfoItem>
									<InfoLabel>Имя:</InfoLabel>
									<InfoValue>{session.user.name}</InfoValue>
								</InfoItem>
							)}
							{session.user.surname && (
								<InfoItem>
									<InfoLabel>Фамилия:</InfoLabel>
									<InfoValue>{session.user.surname}</InfoValue>
								</InfoItem>
							)}
							{session.user.phone && (
								<InfoItem>
									<InfoLabel>Телефон:</InfoLabel>
									<InfoValue>{session.user.phone}</InfoValue>
								</InfoItem>
							)}
							{session.user.deliveryAddress && (
								<InfoItem>
									<InfoLabel>Адрес доставки:</InfoLabel>
									<InfoValue>{session.user.deliveryAddress}</InfoValue>
								</InfoItem>
							)}
							<Flexbox
								$gap={15}
								$align="flex-start"
								className="btns"
								$nowrap
								style={{ marginTop: '20px' }}
							>
								{ordersButton}
								<Button $w100 onClick={handleLogout}>
									Выйти
								</Button>
							</Flexbox>
						</Flexbox>
					</AccountCard>
				</AccountGrid>
			</AccountSection>
		</Container>
	);
};
