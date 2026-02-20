'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Container, Flexbox } from '@/components/Layout';
import { Button, ErrorMessage, Loader } from '@/components/ui';
import { Order } from '@/types/auth';

import {
	OrderCard,
	OrderDate,
	OrderHeader,
	OrderId,
	OrderItem,
	OrderItemDetails,
	OrderItemImage,
	OrderItemPrice,
	OrderItems,
	OrderItemTitle,
	OrdersSection,
	OrderStatus,
	OrdersTitle,
	OrderTotal,
} from './styled';

const statusLabels: Record<Order['status'], string> = {
	pending: 'Ожидает обработки',
	processing: 'В обработке',
	completed: 'Выполнен',
	cancelled: 'Отменён',
};

export const OrdersContent = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
			return;
		}

		if (status === 'authenticated') {
			fetchOrders();
		}
	}, [status, router]);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/orders');
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Не удалось загрузить заказы');
			}

			setOrders(data.orders);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка');
		} finally {
			setLoading(false);
		}
	};

	if (status === 'loading' || loading) {
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

	return (
		<Container>
			<OrdersSection>
				<Flexbox $justify="space-between" $align="center" style={{ marginBottom: '30px' }}>
					<OrdersTitle>Мои заказы</OrdersTitle>
					<Link href="/account">
						<Button>Назад в профиль</Button>
					</Link>
				</Flexbox>

				{error && <ErrorMessage error={error} />}

				{!loading && orders.length === 0 && !error && (
					<Flexbox
						$justify="center"
						$align="center"
						$direction="column"
						$gap={20}
						style={{ padding: '60px 0' }}
					>
						<h3>У вас пока нет заказов</h3>
						<Link href="/products">
							<Button $primary>Перейти к покупкам</Button>
						</Link>
					</Flexbox>
				)}

				{orders.map((order) => (
					<OrderCard key={order.id}>
						<OrderHeader>
							<div>
								<OrderId>Заказ #{order.id.slice(0, 8)}</OrderId>
								<OrderDate>{new Date(order.createdAt).toLocaleString('ru-RU')}</OrderDate>
							</div>
							<OrderStatus $status={order.status}>{statusLabels[order.status]}</OrderStatus>
						</OrderHeader>

						<OrderItems>
							{order.items.map((item, index) => (
								<OrderItem key={`${item.id}-${index}`}>
									<OrderItemImage>
										<span>{item.title.charAt(0)}</span>
									</OrderItemImage>
									<OrderItemDetails>
										<OrderItemTitle>{item.title}</OrderItemTitle>
										<p>
											{item.count} шт. × ${item.price / item.count}
										</p>
									</OrderItemDetails>
									<OrderItemPrice>${item.price}</OrderItemPrice>
								</OrderItem>
							))}
						</OrderItems>

						<OrderTotal>
							<strong>Итого:</strong> ${order.totalPrice.toFixed(2)}
						</OrderTotal>

						<div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
							<p>
								<strong>Получатель:</strong> {order.name} {order.surname}
							</p>
							<p>
								<strong>Телефон:</strong> {order.phone}
							</p>
							<p>
								<strong>Адрес доставки:</strong> {order.deliveryAddress}
								{order.toApartment && ' (до квартиры)'}
							</p>
						</div>
					</OrderCard>
				))}
			</OrdersSection>
		</Container>
	);
};
