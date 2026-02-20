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

		const querySnapshot = await adminDb
			.collection('orders')
			.where('userId', '==', session.user.id)
			.orderBy('createdAt', 'desc')
			.get();

		const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		return NextResponse.json({ success: true, orders }, { status: 200 });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Orders fetch error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при загрузке заказов' }, { status: 500 });
	}
}
