import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { adminDb } from '@/lib/firebase-admin';
import { schemaOrder } from '@/modules/cart/services/schemaOrder';

export async function POST(req: Request) {
	try {
		const body: unknown = await req.json();
		const validatedData = await schemaOrder.validate(body, { abortEarly: false });

		const session = await getServerSession(authOptions);

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

		const docRef = await adminDb.collection('orders').add(orderData);

		return NextResponse.json(
			{
				success: true,
				orderId: docRef.id,
				message: 'Заказ успешно оформлен',
			},
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof Error && 'inner' in error) {
			const validationErrors = (error as { inner?: Array<{ path?: string; message: string }> }).inner || [];
			const errors = validationErrors.reduce(
				(acc, err) => {
					if (err.path) {
						acc[err.path] = err.message;
					}
					return acc;
				},
				{} as Record<string, string>,
			);

			return NextResponse.json({ success: false, errors }, { status: 400 });
		}

		// eslint-disable-next-line no-console
		console.error('Order creation error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при создании заказа' }, { status: 500 });
	}
}
