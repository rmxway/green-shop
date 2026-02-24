import { apiNotFound, apiSuccess } from '@/app/api/utils/apiResponse';
import { requireAuth } from '@/app/api/utils/auth';
import { handleApiError } from '@/app/api/utils/errorHandler';
import { parseRequestBody } from '@/app/api/utils/validation';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
	try {
		const { userId } = await requireAuth();

		const userDoc = await adminDb.collection('users').doc(userId).get();

		if (!userDoc.exists) {
			return apiNotFound('Пользователь не найден');
		}

		const userData = userDoc.data()!;

		return apiSuccess({
			user: {
				id: userDoc.id,
				email: userData.email,
				name: userData.name,
				surname: userData.surname,
				phone: userData.phone,
				deliveryAddress: userData.deliveryAddress,
			},
		});
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при загрузке профиля');
	}
}

export async function PUT(req: Request) {
	try {
		const { userId } = await requireAuth();

		const body = await req.json();
		const { name, surname, phone, deliveryAddress } = parseRequestBody<{
			name?: string;
			surname?: string;
			phone?: string;
			deliveryAddress?: string;
		}>(body);

		const updateData: Record<string, string> = {};

		if (name !== undefined) updateData.name = name;
		if (surname !== undefined) updateData.surname = surname;
		if (phone !== undefined) updateData.phone = phone;
		if (deliveryAddress !== undefined) updateData.deliveryAddress = deliveryAddress;

		await adminDb.collection('users').doc(userId).update(updateData);

		return apiSuccess({ message: 'Профиль обновлен' });
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при обновлении профиля');
	}
}
