import { apiError, apiSuccess } from '@/app/api/utils/apiResponse';
import { getSession } from '@/app/api/utils/auth';
import { handleApiError } from '@/app/api/utils/errorHandler';
import { checkEmailExists } from '@/app/api/utils/users';
import { adminDb } from '@/lib/firebase-admin';
import { schemaOrder } from '@/modules/cart/services/schemaOrder';

export async function POST(req: Request) {
	try {
		const body: unknown = await req.json();
		const validatedData = await schemaOrder.validate(body, { abortEarly: false });

		const session = await getSession();
		const isGuest = !session?.user?.id;

		if (isGuest) {
			const emailTrimmed = (validatedData.email as string).trim();
			const emailExists = await checkEmailExists(emailTrimmed);

			if (emailExists) {
				return apiError('Такой email уже используется. Войдите в аккаунт.');
			}
		}

		const orderData = {
			userId: session?.user?.id || null,
			name: validatedData.name,
			surname: validatedData.surname,
			phone: validatedData.phone,
			email: validatedData.email,
			deliveryAddress: validatedData.deliveryAddress,
			toApartment: validatedData.toApartment,
			items: (validatedData as { products?: { items: unknown[] } }).products?.items || [],
			totalPrice: (validatedData as { products?: { totalPrice: number } }).products?.totalPrice || 0,
			status: 'pending' as const,
			createdAt: new Date().toISOString(),
		};

		const counterRef = adminDb.collection('_counters').doc('orders');
		const orderRef = adminDb.collection('orders').doc();

		await adminDb.runTransaction(async (transaction) => {
			const counterSnap = await transaction.get(counterRef);
			const lastNumber = counterSnap.exists ? (counterSnap.data()?.lastOrderNumber ?? 0) : 0;
			const newNumber = lastNumber + 1;

			transaction.set(orderRef, { ...orderData, orderNumber: newNumber });
			transaction.set(counterRef, { lastOrderNumber: newNumber }, { merge: true });
		});

		return apiSuccess({
			orderId: orderRef.id,
			message: 'Заказ успешно оформлен',
		});
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при создании заказа');
	}
}
