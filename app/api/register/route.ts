import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
	try {
		const body: unknown = await req.json();

		if (typeof body !== 'object' || body === null) {
			return NextResponse.json({ success: false, error: 'Неверный формат данных' }, { status: 400 });
		}

		const { email, password, name, surname, phone, deliveryAddress } = body as {
			email?: string;
			password?: string;
			name?: string;
			surname?: string;
			phone?: string;
			deliveryAddress?: string;
		};

		if (!email || !password) {
			return NextResponse.json({ success: false, error: 'Email и пароль обязательны' }, { status: 400 });
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ success: false, error: 'Пароль должен быть не менее 6 символов' },
				{ status: 400 },
			);
		}

		const usersRef = adminDb.collection('users');
		const existingUsers = await usersRef.where('email', '==', email).get();

		if (!existingUsers.empty) {
			return NextResponse.json(
				{ success: false, error: 'Пользователь с таким email уже существует' },
				{ status: 400 },
			);
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = {
			email,
			passwordHash,
			name: name || '',
			surname: surname || '',
			phone: phone || '',
			deliveryAddress: deliveryAddress || '',
			createdAt: new Date().toISOString(),
		};

		const docRef = await usersRef.add(newUser);

		return NextResponse.json(
			{
				success: true,
				user: {
					id: docRef.id,
					email: newUser.email,
					name: newUser.name,
					surname: newUser.surname,
					phone: newUser.phone,
					deliveryAddress: newUser.deliveryAddress,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Registration error:', error);
		return NextResponse.json({ success: false, error: 'Произошла ошибка при регистрации' }, { status: 500 });
	}
}
