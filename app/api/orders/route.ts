import { apiSuccess } from '@/app/api/utils/apiResponse';
import { requireAuth } from '@/app/api/utils/auth';
import { handleApiError } from '@/app/api/utils/errorHandler';
import { linkGuestOrdersToUser } from '@/app/api/utils/orders';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
	try {
		const { session, userId } = await requireAuth();

		const userEmail = session.user.email?.trim().toLowerCase();
		const ordersRef = adminDb.collection('orders');

		if (userEmail) {
			await linkGuestOrdersToUser(userId, userEmail);
		}

		const ordersSnap = await ordersRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get();

		const orders = ordersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		return apiSuccess({ orders });
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при загрузке заказов');
	}
}
