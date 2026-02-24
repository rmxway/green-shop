import bcrypt from 'bcryptjs';

import { apiError, apiSuccess } from '@/app/api/utils/apiResponse';
import { handleApiError } from '@/app/api/utils/errorHandler';
import { linkGuestOrdersByEmailBatch } from '@/app/api/utils/orders';
import { checkEmailExists } from '@/app/api/utils/users';
import { parseRequestBody } from '@/app/api/utils/validation';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password, name, surname, phone, deliveryAddress } = parseRequestBody<{
			email?: string;
			password?: string;
			name?: string;
			surname?: string;
			phone?: string;
			deliveryAddress?: string;
		}>(body);

		if (!email || !password) {
			return apiError('Email и пароль обязательны');
		}

		if (password.length < 6) {
			return apiError('Пароль должен быть не менее 6 символов');
		}

		const emailExists = await checkEmailExists(email);

		if (emailExists) {
			return apiError('Пользователь с таким email уже существует');
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

		const usersRef = adminDb.collection('users');
		const docRef = await usersRef.add(newUser);
		const newUserId = docRef.id;

		await linkGuestOrdersByEmailBatch(newUserId, email);

		return apiSuccess(
			{
				user: {
					id: docRef.id,
					email: newUser.email,
					name: newUser.name,
					surname: newUser.surname,
					phone: newUser.phone,
					deliveryAddress: newUser.deliveryAddress,
				},
			},
			201,
		);
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при регистрации');
	}
}
