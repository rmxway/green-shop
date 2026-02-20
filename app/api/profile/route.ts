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

		const userDoc = await adminDb.collection('users').doc(session.user.id).get();

		if (!userDoc.exists) {
			return NextResponse.json({ success: false, error: 'Пользователь не найден' }, { status: 404 });
		}

		const userData = userDoc.data()!;

		return NextResponse.json(
			{
				success: true,
				user: {
					id: userDoc.id,
					email: userData.email,
					name: userData.name,
					surname: userData.surname,
					phone: userData.phone,
					deliveryAddress: userData.deliveryAddress,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Profile fetch error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при загрузке профиля' }, { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const body: unknown = await req.json();

		if (typeof body !== 'object' || body === null) {
			return NextResponse.json({ success: false, error: 'Неверный формат данных' }, { status: 400 });
		}

		const { name, surname, phone, deliveryAddress } = body as {
			name?: string;
			surname?: string;
			phone?: string;
			deliveryAddress?: string;
		};

		const updateData: Record<string, string> = {};

		if (name !== undefined) updateData.name = name;
		if (surname !== undefined) updateData.surname = surname;
		if (phone !== undefined) updateData.phone = phone;
		if (deliveryAddress !== undefined) updateData.deliveryAddress = deliveryAddress;

		await adminDb.collection('users').doc(session.user.id).update(updateData);

		return NextResponse.json({ success: true, message: 'Профиль обновлен' }, { status: 200 });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Profile update error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при обновлении профиля' }, { status: 500 });
	}
}
