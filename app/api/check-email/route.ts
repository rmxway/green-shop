import { checkEmailExists } from '@/app/api/utils/users';

import { apiSuccess } from '../utils/apiResponse';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get('email')?.trim();

		if (!email) {
			return apiSuccess({ registered: false });
		}

		const registered = await checkEmailExists(email);

		return apiSuccess({ registered });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Ошибка при проверке email:', error);
		return apiSuccess({ registered: false });
	}
}
