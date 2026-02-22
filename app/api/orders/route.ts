import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const userId = session.user.id;
		const userEmail = session.user.email?.trim().toLowerCase();
		const ordersRef = adminDb.collection('orders');

		// Привязываем гостевые заказы с тем же email (если есть) — один раз при загрузке
		if (userEmail) {
			const guestOrdersSnap = await ordersRef.where('userId', '==', null).limit(500).get();

			const guestDocs = guestOrdersSnap.docs.filter((doc) => {
				const orderEmail = (doc.data().email as string)?.trim().toLowerCase();
				return orderEmail === userEmail;
			});

			if (guestDocs.length > 0) {
				const batch = adminDb.batch();
				guestDocs.forEach((doc) => batch.update(doc.ref, { userId }));
				await batch.commit();
			}
		}

		// Теперь все заказы пользователя привязаны — один запрос с сортировкой
		const ordersSnap = await ordersRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get();

		const orders = ordersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		return NextResponse.json({ success: true, orders }, { status: 200 });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Orders fetch error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при загрузке заказов' }, { status: 500 });
	}
}
