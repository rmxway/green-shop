'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Container } from '@/components/Layout';
import { Button, ErrorMessage, Loader } from '@/components/ui';
import { useCurrency, useMediaQuery } from '@/services';
import { breakpoints } from '@/theme';
import { Order } from '@/types/auth';

import {
	OrderCard,
	OrderDate,
	OrderDetails,
	OrderEmptyState,
	OrderHeader,
	OrderHeaderActions,
	OrderHeaderInfo,
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
	const isMobile = useMediaQuery(breakpoints.xsD);
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

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

	const handleCancelOrder = async (orderId: string) => {
		try {
			setCancellingOrderId(orderId);
			setError('');
			const response = await fetch(`/api/orders/${orderId}`, {
				method: 'PATCH',
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Не удалось отменить заказ');
			}

			setOrders((prev) =>
				prev.map((order) => (order.id === orderId ? { ...order, status: 'cancelled' as const } : order)),
			);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка');
		} finally {
			setCancellingOrderId(null);
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
							<OrderHeaderInfo>
								<OrderId>Заказ #{order.orderNumber ?? order.id.slice(0, 8)}</OrderId>
								<OrderDate>{new Date(order.createdAt).toLocaleString('ru-RU')}</OrderDate>
							</OrderHeaderInfo>
							<OrderHeaderActions>
								{(order.status === 'pending' || order.status === 'processing') && (
									<Button
										$danger
										disabled={cancellingOrderId === order.id}
										onClick={() => handleCancelOrder(order.id)}
									>
										{cancellingOrderId === order.id
											? 'Отмена...'
											: isMobile
												? 'Отменить'
												: 'Отменить заказ'}
									</Button>
								)}
								<OrderStatus $status={order.status}>{statusLabels[order.status]}</OrderStatus>
							</OrderHeaderActions>
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
