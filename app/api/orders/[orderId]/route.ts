import { apiError, apiNotFound, apiSuccess } from '@/app/api/utils/apiResponse';
import { requireAuth } from '@/app/api/utils/auth';
import { handleApiError } from '@/app/api/utils/errorHandler';
import { adminDb } from '@/lib/firebase-admin';
import type { Order } from '@/types/auth';

type CancellableStatus = Extract<Order['status'], 'pending' | 'processing'>;
const CANCELLABLE_STATUSES: readonly CancellableStatus[] = ['pending', 'processing'];

export async function PATCH(_: Request, { params }: { params: Promise<{ orderId: string }> }) {
	try {
		const { userId } = await requireAuth();
		const { orderId } = await params;

		if (!orderId) {
			return apiError('ID заказа не указан', 400);
		}

		const orderRef = adminDb.collection('orders').doc(orderId);
		const orderSnap = await orderRef.get();

		if (!orderSnap.exists) {
			return apiNotFound('Заказ не найден');
		}

		const orderData = orderSnap.data();
		const orderUserId = orderData?.userId;

		if (orderUserId !== userId) {
			return apiNotFound('Заказ не найден');
		}

		const currentStatus = orderData?.status;

		if (!CANCELLABLE_STATUSES.includes(currentStatus)) {
			return apiError('Заказ нельзя отменить', 400);
		}

		await orderRef.update({ status: 'cancelled' });

		return apiSuccess({ status: 'cancelled' });
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при отмене заказа');
	}
}
