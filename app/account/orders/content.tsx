'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Container } from '@/components/Layout';
import { Button, ErrorMessage, Loader } from '@/components/ui';
import { useCurrency } from '@/services';
import { Order } from '@/types/auth';

import {
	OrderCard,
	OrderDate,
	OrderDetails,
	OrderEmptyState,
	OrderHeader,
	OrderId,
	OrderItem,
	OrderItemDetails,
	OrderItemImage,
	OrderItemPrice,
	OrderItems,
	OrderItemTitle,
	OrdersHeader,
	OrdersLoaderWrapper,
	OrdersSection,
	OrderStatus,
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
	const { formatPriceWithSymbol } = useCurrency();
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
				<OrdersLoaderWrapper>
					<Loader loading />
				</OrdersLoaderWrapper>
			</Container>
		);
	}

	if (!session?.user) {
		return null;
	}

	return (
		<Container>
			<OrdersSection>
				<OrdersHeader>
					<Link href="/account">
						<Button>Назад в профиль</Button>
					</Link>
				</OrdersHeader>

				{error && <ErrorMessage error={error} />}

				{!loading && orders.length === 0 && !error && (
					<OrderEmptyState>
						<h3>У вас пока нет заказов</h3>
						<Link href="/products">
							<Button $primary>Перейти к покупкам</Button>
						</Link>
					</OrderEmptyState>
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
											{item.count} шт. × {formatPriceWithSymbol(item.price / item.count)}
										</p>
									</OrderItemDetails>
									<OrderItemPrice>{formatPriceWithSymbol(item.price)}</OrderItemPrice>
								</OrderItem>
							))}
						</OrderItems>

						<OrderTotal>
							<strong>Итого:</strong> {formatPriceWithSymbol(order.totalPrice)}
						</OrderTotal>

						<OrderDetails>
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
						</OrderDetails>
					</OrderCard>
				))}
			</OrdersSection>
		</Container>
	);
};
